"use client";

import { useCallback, useEffect, useReducer } from "react";
import {
  createResume,
  deleteResume,
  duplicateResume,
  getActiveResume,
  loadStore,
  renameResume,
  saveStore,
  updateResumeData,
} from "./resumeStore";
import { sampleResume } from "./sampleResume";

const HISTORY_LIMIT = 50;

const initialState = {
  store: null,
  past: [],
  future: [],
  ready: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "INIT": {
      return { store: action.store, past: [], future: [], ready: true };
    }

    case "SET_DATA": {
      const current = getActiveResume(state.store)?.data;
      const newData =
        typeof action.data === "function" ? action.data(current) : action.data;
      const newStore = updateResumeData(state.store, state.store.activeId, newData);
      return {
        ...state,
        store: newStore,
        past: [...state.past, current].slice(-HISTORY_LIMIT),
        future: [],
      };
    }

    case "UNDO": {
      if (!state.past.length) return state;
      const previous = state.past[state.past.length - 1];
      const current = getActiveResume(state.store)?.data;
      return {
        ...state,
        store: updateResumeData(state.store, state.store.activeId, previous),
        past: state.past.slice(0, -1),
        future: [current, ...state.future],
      };
    }

    case "REDO": {
      if (!state.future.length) return state;
      const [next, ...remaining] = state.future;
      const current = getActiveResume(state.store)?.data;
      return {
        ...state,
        store: updateResumeData(state.store, state.store.activeId, next),
        past: [...state.past, current],
        future: remaining,
      };
    }

    case "SWITCH_RESUME": {
      return {
        ...state,
        store: { ...state.store, activeId: action.id },
        past: [],
        future: [],
      };
    }

    case "UPDATE_STORE": {
      return { ...state, store: action.store, past: [], future: [] };
    }

    default:
      return state;
  }
}

export function useResumeStore(templateOverride = null) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const store = loadStore(sampleResume);

    // Apply URL template override to active resume
    if (templateOverride) {
      const active = getActiveResume(store);
      const patched = updateResumeData(store, store.activeId, {
        ...active.data,
        template: templateOverride,
      });
      dispatch({ type: "INIT", store: patched });
    } else {
      dispatch({ type: "INIT", store });
    }
  }, []);

  // Persist every store change
  useEffect(() => {
    if (state.ready && state.store) {
      saveStore(state.store);
    }
  }, [state.store, state.ready]);

  const data = state.store ? getActiveResume(state.store)?.data ?? null : null;

  const setData = useCallback(
    (updater) => dispatch({ type: "SET_DATA", data: updater }),
    [],
  );

  const undo = useCallback(() => dispatch({ type: "UNDO" }), []);
  const redo = useCallback(() => dispatch({ type: "REDO" }), []);

  const switchResume = useCallback(
    (id) => dispatch({ type: "SWITCH_RESUME", id }),
    [],
  );

  const addResume = useCallback(
    (name) =>
      dispatch({
        type: "UPDATE_STORE",
        store: createResume(state.store, sampleResume, name),
      }),
    [state.store],
  );

  const duplicateActive = useCallback(
    (id) =>
      dispatch({
        type: "UPDATE_STORE",
        store: duplicateResume(state.store, id),
      }),
    [state.store],
  );

  const removeResume = useCallback(
    (id) =>
      dispatch({
        type: "UPDATE_STORE",
        store: deleteResume(state.store, id, sampleResume),
      }),
    [state.store],
  );

  const renameActive = useCallback(
    (id, name) =>
      dispatch({
        type: "UPDATE_STORE",
        store: renameResume(state.store, id, name),
      }),
    [state.store],
  );

  return {
    ready: state.ready,
    store: state.store,
    data,
    setData,
    undo,
    redo,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
    switchResume,
    addResume,
    duplicateActive,
    removeResume,
    renameActive,
  };
}

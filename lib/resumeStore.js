import { uid } from "./utils";

const STORE_KEY = "resume-pro-store-v2";
const LEGACY_KEY = "resume-builder-pro-data";

function defaultStore(sampleResume) {
  const id = uid();
  return {
    resumes: [
      {
        id,
        name: "My Resume",
        data: { ...sampleResume },
        updatedAt: new Date().toISOString(),
      },
    ],
    activeId: id,
  };
}

export function loadStore(sampleResume) {
  if (typeof window === "undefined") return defaultStore(sampleResume);
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return JSON.parse(raw);

    // Migrate from legacy single-resume key
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy) {
      const data = JSON.parse(legacy);
      const id = uid();
      const store = {
        resumes: [
          {
            id,
            name: "My Resume",
            data: { accentColor: "#0f172a", coverLetter: { recipientName: "", company: "", position: "", body: "" }, ...data },
            updatedAt: new Date().toISOString(),
          },
        ],
        activeId: id,
      };
      saveStore(store);
      return store;
    }
  } catch {}
  return defaultStore(sampleResume);
}

export function saveStore(store) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
}

export function getActiveResume(store) {
  return store.resumes.find((r) => r.id === store.activeId) || store.resumes[0];
}

export function createResume(store, sampleResume, name = "New Resume") {
  const id = uid();
  return {
    ...store,
    resumes: [
      ...store.resumes,
      {
        id,
        name,
        data: { ...sampleResume },
        updatedAt: new Date().toISOString(),
      },
    ],
    activeId: id,
  };
}

export function duplicateResume(store, sourceId) {
  const source = store.resumes.find((r) => r.id === sourceId);
  if (!source) return store;
  const id = uid();
  return {
    ...store,
    resumes: [
      ...store.resumes,
      {
        id,
        name: `${source.name} (Copy)`,
        data: { ...source.data },
        updatedAt: new Date().toISOString(),
      },
    ],
    activeId: id,
  };
}

export function deleteResume(store, id, sampleResume) {
  const remaining = store.resumes.filter((r) => r.id !== id);
  if (!remaining.length) {
    const newId = uid();
    return {
      resumes: [
        {
          id: newId,
          name: "My Resume",
          data: { ...sampleResume },
          updatedAt: new Date().toISOString(),
        },
      ],
      activeId: newId,
    };
  }
  const activeId =
    store.activeId === id ? remaining[remaining.length - 1].id : store.activeId;
  return { resumes: remaining, activeId };
}

export function renameResume(store, id, name) {
  return {
    ...store,
    resumes: store.resumes.map((r) => (r.id === id ? { ...r, name } : r)),
  };
}

export function updateResumeData(store, id, data) {
  return {
    ...store,
    resumes: store.resumes.map((r) =>
      r.id === id ? { ...r, data, updatedAt: new Date().toISOString() } : r,
    ),
  };
}

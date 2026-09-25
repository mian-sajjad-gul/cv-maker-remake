import {
  ModernTemplate, ClassicTemplate, CompactTemplate, SidebarTemplate,
  ExecutiveTemplate, DeveloperTemplate, TimelineTemplate, CreativeTemplate,
  MBATemplate, EuropassTemplate, HarvardTemplate, ConsultingTemplate,
  ProductManagerTemplate, MinimalATSTemplate,
  NordicTemplate, TwoColumnTemplate, BoldTemplate, InfographicTemplate, SharpTemplate,
} from "./templates";

const TEMPLATES = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  compact: CompactTemplate,
  sidebar: SidebarTemplate,
  executive: ExecutiveTemplate,
  developer: DeveloperTemplate,
  timeline: TimelineTemplate,
  creative: CreativeTemplate,
  mba: MBATemplate,
  europass: EuropassTemplate,
  harvard: HarvardTemplate,
  consulting: ConsultingTemplate,
  productManager: ProductManagerTemplate,
  minimalAts: MinimalATSTemplate,
  nordic: NordicTemplate,
  twoColumn: TwoColumnTemplate,
  bold: BoldTemplate,
  infographic: InfographicTemplate,
  sharp: SharpTemplate,
};

export function ResumePreview({ data }) {
  const Template = TEMPLATES[data.template] || ModernTemplate;
  const accent = data.accentColor || "#0f172a";

  return (
    <div style={{ "--resume-accent": accent }}>
      <Template data={data} />
    </div>
  );
}

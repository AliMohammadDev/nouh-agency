export interface ProjectTag {
  id: number;
  name: string;
}

export interface ProjectCategory {
  id: number;
  name: string;
  description: string;
}

export interface ProjectLinkName {
  ar: string;
  en: string;
}

export interface ProjectLink {
  id: number;
  name: ProjectLinkName;
  url: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  project_number: string;
  url_youtube: string;
  image: string;
  image_vr: string;
  image_real: string;

  all_images: Record<string, string[]>;
  all_images_vr: Record<string, string[]>;
  all_images_real: Record<string, string[]>;

  category: ProjectCategory;
  tags: ProjectTag[];
  links: ProjectLink[];
}
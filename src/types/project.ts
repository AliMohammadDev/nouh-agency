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

  all_images: string[];
  all_images_vr: string[];

  category: ProjectCategory;
  tags: ProjectTag[];
  links: ProjectLink[];
}
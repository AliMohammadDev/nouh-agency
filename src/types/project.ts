export interface ProjectTag {
  id: number;
  name: string;
}

export interface ProjectCategory {
  id: number;
  name: string;
  description: string;
}

export interface ProjectLink {
  id: number;
  name: string;
  url: string;
}

export interface GalleryImage {
  original: string;
  thumbnail: string;
}

export interface GalleryAlbum {
  id: number;
  album_name: string;
  images: GalleryImage[];
}

export interface Project {
  id: number;
  project_number: string;
  name: string;
  description: string;
  likes_count: number;
  is_featured: boolean;
  country: string | null;
  main_image: string | null;

  design_galleries?: GalleryAlbum[];
  vr_galleries?: GalleryAlbum[];
  real_galleries?: GalleryAlbum[];
  drawings_galleries?: GalleryAlbum[];

  gallery_names?: string[];

  categories?: ProjectCategory | null;
  tags?: ProjectTag[];
  links?: ProjectLink[];
}
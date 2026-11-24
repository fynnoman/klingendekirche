export type NewsRow = {
  id: string;
  title_de: string;
  title_en: string | null;
  excerpt_de: string | null;
  excerpt_en: string | null;
  body_de: string;
  body_en: string | null;
  category_de: string | null;
  category_en: string | null;
  image_url: string | null;
  published_at: string; // YYYY-MM-DD
  archived: boolean;
  created_at: string;
  updated_at: string;
};

export type NewsInput = {
  id?: string;
  title_de: string;
  title_en?: string | null;
  excerpt_de?: string | null;
  excerpt_en?: string | null;
  body_de: string;
  body_en?: string | null;
  category_de?: string | null;
  category_en?: string | null;
  image_url?: string | null;
  published_at: string;
  archived?: boolean;
};

export type GalleryRow = {
  id: string;
  title_de: string;
  title_en: string | null;
  excerpt_de: string | null;
  excerpt_en: string | null;
  body_de: string;
  body_en: string | null;
  cover_url: string | null;
  date: string | null;
  sort_order: number;
  archived: boolean;
  created_at: string;
  updated_at: string;
};

export type GalleryInput = {
  id?: string;
  title_de: string;
  title_en?: string | null;
  excerpt_de?: string | null;
  excerpt_en?: string | null;
  body_de: string;
  body_en?: string | null;
  cover_url?: string | null;
  date?: string | null;
  sort_order?: number;
  archived?: boolean;
};

export type GalleryImageRow = {
  id: number;
  gallery_id: string;
  image_url: string;
  caption_de: string | null;
  caption_en: string | null;
  sort_order: number;
  created_at: string;
};

export type GalleryImageInput = {
  gallery_id: string;
  image_url: string;
  caption_de?: string | null;
  caption_en?: string | null;
  sort_order?: number;
};

export type PartnerRow = {
  id: number;
  name_de: string;
  name_en: string | null;
  logo_url: string;
  website_url: string | null;
  note_de: string | null;
  note_en: string | null;
  sort_order: number;
  archived: boolean;
  created_at: string;
  updated_at: string;
};

export type PartnerInput = {
  id?: number;
  name_de: string;
  name_en?: string | null;
  logo_url: string;
  website_url?: string | null;
  note_de?: string | null;
  note_en?: string | null;
  sort_order?: number;
  archived?: boolean;
};

export type BoardMemberRow = {
  id: number;
  role_de: string;
  role_en: string | null;
  name: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type BoardMemberInput = {
  id?: number;
  role_de: string;
  role_en?: string | null;
  name: string;
  sort_order?: number;
};

export type MemberKind = "new" | "deceased";

export type MemberListRow = {
  id: number;
  kind: MemberKind;
  year: number;
  name: string;
  sort_order: number;
  created_at: string;
};

export type SiteSettings = {
  phone: string;
  phoneHref: string;
  fax: string;
  email: string;
  address_chair_de: string;
  address_chair_en: string;
  address_street: string;
  address_city: string;
  church_name_de: string;
  church_name_en: string;
  church_street: string;
  church_city: string;
  bank_name: string;
  bank_holder_de: string;
  bank_holder_en: string;
  bank_iban: string;
  bank_bic: string;
};

export type PageBlockRow = {
  key: string;
  body_de: string;
  body_en: string;
  updated_at: string;
};

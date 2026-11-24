import { sql } from "@/lib/db/client";
import { slugifyTitle } from "@/lib/tickets/types";
import type {
  BoardMemberInput,
  BoardMemberRow,
  GalleryImageInput,
  GalleryImageRow,
  GalleryInput,
  GalleryRow,
  MemberKind,
  MemberListRow,
  NewsInput,
  NewsRow,
  PageBlockRow,
  PartnerInput,
  PartnerRow,
  SiteSettings
} from "./types";

type Row = Record<string, unknown>;

function toIsoDate(v: unknown): string | null {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  if (typeof v === "string" && v) return v.slice(0, 10);
  return null;
}
function toIsoTimestamp(v: unknown): string {
  if (v instanceof Date) return v.toISOString();
  if (typeof v === "string" && v) return v;
  return "";
}

// ---------------------------------------------------------------------------
// News
// ---------------------------------------------------------------------------

function mapNews(r: Row): NewsRow {
  return {
    ...(r as unknown as NewsRow),
    published_at: toIsoDate(r.published_at) ?? "",
    created_at: toIsoTimestamp(r.created_at),
    updated_at: toIsoTimestamp(r.updated_at)
  };
}

export async function listAllNews(): Promise<NewsRow[]> {
  const q = sql();
  const rows = (await q`SELECT * FROM news ORDER BY published_at DESC`) as Row[];
  return rows.map(mapNews);
}

export async function listPublicNews(): Promise<NewsRow[]> {
  const q = sql();
  const rows = (await q`
    SELECT * FROM news
    WHERE archived = FALSE
    ORDER BY published_at DESC
  `) as Row[];
  return rows.map(mapNews);
}

export async function getNewsById(id: string): Promise<NewsRow | null> {
  const q = sql();
  const rows = (await q`SELECT * FROM news WHERE id = ${id} LIMIT 1`) as Row[];
  return rows[0] ? mapNews(rows[0]) : null;
}

export async function upsertNews(input: NewsInput): Promise<NewsRow> {
  const q = sql();
  const id =
    (input.id && input.id.trim()) ||
    slugifyTitle(`${input.title_de}-${input.published_at}`);

  const existing = await getNewsById(id);
  if (existing) {
    const rows = (await q`
      UPDATE news SET
        title_de = ${input.title_de},
        title_en = ${input.title_en ?? null},
        excerpt_de = ${input.excerpt_de ?? null},
        excerpt_en = ${input.excerpt_en ?? null},
        body_de = ${input.body_de},
        body_en = ${input.body_en ?? null},
        category_de = ${input.category_de ?? null},
        category_en = ${input.category_en ?? null},
        image_url = ${input.image_url ?? null},
        published_at = ${input.published_at},
        archived = ${input.archived ?? false},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `) as Row[];
    return mapNews(rows[0]);
  }

  const rows = (await q`
    INSERT INTO news (
      id, title_de, title_en, excerpt_de, excerpt_en,
      body_de, body_en, category_de, category_en,
      image_url, published_at, archived
    ) VALUES (
      ${id}, ${input.title_de}, ${input.title_en ?? null},
      ${input.excerpt_de ?? null}, ${input.excerpt_en ?? null},
      ${input.body_de}, ${input.body_en ?? null},
      ${input.category_de ?? null}, ${input.category_en ?? null},
      ${input.image_url ?? null}, ${input.published_at},
      ${input.archived ?? false}
    )
    RETURNING *
  `) as Row[];
  return mapNews(rows[0]);
}

export async function deleteNews(id: string): Promise<void> {
  const q = sql();
  await q`DELETE FROM news WHERE id = ${id}`;
}

// ---------------------------------------------------------------------------
// Galleries
// ---------------------------------------------------------------------------

function mapGallery(r: Row): GalleryRow {
  return {
    ...(r as unknown as GalleryRow),
    date: toIsoDate(r.date),
    created_at: toIsoTimestamp(r.created_at),
    updated_at: toIsoTimestamp(r.updated_at)
  };
}

export async function listAllGalleries(): Promise<GalleryRow[]> {
  const q = sql();
  const rows = (await q`
    SELECT * FROM galleries
    ORDER BY sort_order ASC, date DESC NULLS LAST
  `) as Row[];
  return rows.map(mapGallery);
}

export async function listPublicGalleries(): Promise<GalleryRow[]> {
  const q = sql();
  const rows = (await q`
    SELECT * FROM galleries
    WHERE archived = FALSE
    ORDER BY sort_order ASC, date DESC NULLS LAST
  `) as Row[];
  return rows.map(mapGallery);
}

export async function getGalleryById(id: string): Promise<GalleryRow | null> {
  const q = sql();
  const rows = (await q`SELECT * FROM galleries WHERE id = ${id} LIMIT 1`) as Row[];
  return rows[0] ? mapGallery(rows[0]) : null;
}

export async function upsertGallery(input: GalleryInput): Promise<GalleryRow> {
  const q = sql();
  const id = (input.id && input.id.trim()) || slugifyTitle(input.title_de);

  const existing = await getGalleryById(id);
  if (existing) {
    const rows = (await q`
      UPDATE galleries SET
        title_de = ${input.title_de},
        title_en = ${input.title_en ?? null},
        excerpt_de = ${input.excerpt_de ?? null},
        excerpt_en = ${input.excerpt_en ?? null},
        body_de = ${input.body_de},
        body_en = ${input.body_en ?? null},
        cover_url = ${input.cover_url ?? null},
        date = ${input.date ?? null},
        sort_order = ${input.sort_order ?? 0},
        archived = ${input.archived ?? false},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `) as Row[];
    return mapGallery(rows[0]);
  }
  const rows = (await q`
    INSERT INTO galleries (
      id, title_de, title_en, excerpt_de, excerpt_en,
      body_de, body_en, cover_url, date, sort_order, archived
    ) VALUES (
      ${id}, ${input.title_de}, ${input.title_en ?? null},
      ${input.excerpt_de ?? null}, ${input.excerpt_en ?? null},
      ${input.body_de}, ${input.body_en ?? null},
      ${input.cover_url ?? null}, ${input.date ?? null},
      ${input.sort_order ?? 0}, ${input.archived ?? false}
    )
    RETURNING *
  `) as Row[];
  return mapGallery(rows[0]);
}

export async function deleteGallery(id: string): Promise<void> {
  const q = sql();
  await q`DELETE FROM galleries WHERE id = ${id}`;
}

export async function listGalleryImages(
  galleryId: string
): Promise<GalleryImageRow[]> {
  const q = sql();
  const rows = (await q`
    SELECT * FROM gallery_images
    WHERE gallery_id = ${galleryId}
    ORDER BY sort_order ASC, id ASC
  `) as Row[];
  return rows.map((r) => ({
    ...(r as unknown as GalleryImageRow),
    created_at: toIsoTimestamp(r.created_at)
  }));
}

export async function replaceGalleryImages(
  galleryId: string,
  images: GalleryImageInput[]
): Promise<void> {
  const q = sql();
  await q`DELETE FROM gallery_images WHERE gallery_id = ${galleryId}`;
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    if (!img.image_url) continue;
    await q`
      INSERT INTO gallery_images (gallery_id, image_url, caption_de, caption_en, sort_order)
      VALUES (${galleryId}, ${img.image_url},
              ${img.caption_de ?? null}, ${img.caption_en ?? null},
              ${img.sort_order ?? i})
    `;
  }
}

// ---------------------------------------------------------------------------
// Partners
// ---------------------------------------------------------------------------

function mapPartner(r: Row): PartnerRow {
  return {
    ...(r as unknown as PartnerRow),
    created_at: toIsoTimestamp(r.created_at),
    updated_at: toIsoTimestamp(r.updated_at)
  };
}

export async function listAllPartners(): Promise<PartnerRow[]> {
  const q = sql();
  const rows = (await q`
    SELECT * FROM partners ORDER BY sort_order ASC, id ASC
  `) as Row[];
  return rows.map(mapPartner);
}

export async function listPublicPartners(): Promise<PartnerRow[]> {
  const q = sql();
  const rows = (await q`
    SELECT * FROM partners
    WHERE archived = FALSE
    ORDER BY sort_order ASC, id ASC
  `) as Row[];
  return rows.map(mapPartner);
}

export async function upsertPartner(input: PartnerInput): Promise<PartnerRow> {
  const q = sql();
  if (input.id) {
    const rows = (await q`
      UPDATE partners SET
        name_de = ${input.name_de},
        name_en = ${input.name_en ?? null},
        logo_url = ${input.logo_url},
        website_url = ${input.website_url ?? null},
        note_de = ${input.note_de ?? null},
        note_en = ${input.note_en ?? null},
        sort_order = ${input.sort_order ?? 0},
        archived = ${input.archived ?? false},
        updated_at = NOW()
      WHERE id = ${input.id}
      RETURNING *
    `) as Row[];
    return mapPartner(rows[0]);
  }
  const rows = (await q`
    INSERT INTO partners (
      name_de, name_en, logo_url, website_url, note_de, note_en,
      sort_order, archived
    ) VALUES (
      ${input.name_de}, ${input.name_en ?? null},
      ${input.logo_url}, ${input.website_url ?? null},
      ${input.note_de ?? null}, ${input.note_en ?? null},
      ${input.sort_order ?? 0}, ${input.archived ?? false}
    )
    RETURNING *
  `) as Row[];
  return mapPartner(rows[0]);
}

export async function deletePartner(id: number): Promise<void> {
  const q = sql();
  await q`DELETE FROM partners WHERE id = ${id}`;
}

// ---------------------------------------------------------------------------
// Board members
// ---------------------------------------------------------------------------

function mapBoard(r: Row): BoardMemberRow {
  return {
    ...(r as unknown as BoardMemberRow),
    created_at: toIsoTimestamp(r.created_at),
    updated_at: toIsoTimestamp(r.updated_at)
  };
}

export async function listBoardMembers(): Promise<BoardMemberRow[]> {
  const q = sql();
  const rows = (await q`
    SELECT * FROM board_members ORDER BY sort_order ASC, id ASC
  `) as Row[];
  return rows.map(mapBoard);
}

export async function upsertBoardMember(
  input: BoardMemberInput
): Promise<BoardMemberRow> {
  const q = sql();
  if (input.id) {
    const rows = (await q`
      UPDATE board_members SET
        role_de = ${input.role_de},
        role_en = ${input.role_en ?? null},
        name = ${input.name},
        sort_order = ${input.sort_order ?? 0},
        updated_at = NOW()
      WHERE id = ${input.id}
      RETURNING *
    `) as Row[];
    return mapBoard(rows[0]);
  }
  const rows = (await q`
    INSERT INTO board_members (role_de, role_en, name, sort_order)
    VALUES (${input.role_de}, ${input.role_en ?? null}, ${input.name}, ${input.sort_order ?? 0})
    RETURNING *
  `) as Row[];
  return mapBoard(rows[0]);
}

export async function deleteBoardMember(id: number): Promise<void> {
  const q = sql();
  await q`DELETE FROM board_members WHERE id = ${id}`;
}

// ---------------------------------------------------------------------------
// Members lists (new + deceased)
// ---------------------------------------------------------------------------

function mapMemberList(r: Row): MemberListRow {
  return {
    ...(r as unknown as MemberListRow),
    created_at: toIsoTimestamp(r.created_at)
  };
}

export async function listMembers(kind: MemberKind): Promise<MemberListRow[]> {
  const q = sql();
  const rows = (await q`
    SELECT * FROM members_list
    WHERE kind = ${kind}
    ORDER BY year DESC, sort_order ASC, id ASC
  `) as Row[];
  return rows.map(mapMemberList);
}

export async function listMembersByYear(
  kind: MemberKind,
  year: number
): Promise<MemberListRow[]> {
  const q = sql();
  const rows = (await q`
    SELECT * FROM members_list
    WHERE kind = ${kind} AND year = ${year}
    ORDER BY sort_order ASC, id ASC
  `) as Row[];
  return rows.map(mapMemberList);
}

export async function replaceMembersForYear(
  kind: MemberKind,
  year: number,
  names: string[]
): Promise<void> {
  const q = sql();
  await q`DELETE FROM members_list WHERE kind = ${kind} AND year = ${year}`;
  for (let i = 0; i < names.length; i++) {
    const name = names[i].trim();
    if (!name) continue;
    await q`
      INSERT INTO members_list (kind, year, name, sort_order)
      VALUES (${kind}, ${year}, ${name}, ${i})
    `;
  }
}

// ---------------------------------------------------------------------------
// Site settings (JSONB key-value)
// ---------------------------------------------------------------------------

export async function getSiteSettings(): Promise<Partial<SiteSettings>> {
  const q = sql();
  const rows = (await q`SELECT key, value FROM site_settings`) as Row[];
  const out: Record<string, unknown> = {};
  for (const r of rows) {
    const key = r.key as string;
    const val = r.value as unknown;
    out[key] = typeof val === "string" ? val : JSON.stringify(val);
  }
  return out as Partial<SiteSettings>;
}

export async function saveSiteSettings(
  values: Partial<SiteSettings>
): Promise<void> {
  const q = sql();
  for (const [key, value] of Object.entries(values)) {
    if (value === undefined) continue;
    await q`
      INSERT INTO site_settings (key, value, updated_at)
      VALUES (${key}, ${JSON.stringify(value)}::jsonb, NOW())
      ON CONFLICT (key) DO UPDATE
        SET value = EXCLUDED.value, updated_at = NOW()
    `;
  }
}

// ---------------------------------------------------------------------------
// Page blocks (freitext)
// ---------------------------------------------------------------------------

function mapBlock(r: Row): PageBlockRow {
  return {
    key: r.key as string,
    body_de: (r.body_de as string) ?? "",
    body_en: (r.body_en as string) ?? "",
    updated_at: toIsoTimestamp(r.updated_at)
  };
}

export async function listPageBlocks(): Promise<PageBlockRow[]> {
  const q = sql();
  const rows = (await q`SELECT * FROM page_blocks ORDER BY key ASC`) as Row[];
  return rows.map(mapBlock);
}

export async function getPageBlock(key: string): Promise<PageBlockRow | null> {
  const q = sql();
  const rows = (await q`SELECT * FROM page_blocks WHERE key = ${key} LIMIT 1`) as Row[];
  return rows[0] ? mapBlock(rows[0]) : null;
}

export async function savePageBlock(
  key: string,
  body_de: string,
  body_en: string
): Promise<PageBlockRow> {
  const q = sql();
  const rows = (await q`
    INSERT INTO page_blocks (key, body_de, body_en, updated_at)
    VALUES (${key}, ${body_de}, ${body_en}, NOW())
    ON CONFLICT (key) DO UPDATE
      SET body_de = EXCLUDED.body_de,
          body_en = EXCLUDED.body_en,
          updated_at = NOW()
    RETURNING *
  `) as Row[];
  return mapBlock(rows[0]);
}

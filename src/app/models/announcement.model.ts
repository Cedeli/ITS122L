export interface Announcement {
  id: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  important: boolean;
  author?: string;
  imageUrl?: string | null;
}

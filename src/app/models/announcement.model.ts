export interface Announcement {
  id: string;
  title: string;
  date: string;
  summary: string;
  description: string;
  important: boolean;
  author?: string;
  imageUrl?: string | null;
}

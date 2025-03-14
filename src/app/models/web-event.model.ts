export interface WebEvent {
  id: string;
  title: string,
  author?: string,
  date: string,
  location: string,
  summary: string,
  description: string,
  imageUrl: string,
  pendingParticipants: string[],
  approvedParticipants: string[],
}

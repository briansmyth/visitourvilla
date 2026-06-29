export type Page =
  | 'home'
  | 'gallery'
  | 'availability'
  | 'location'
  | 'reviews'
  | 'about'
  | 'contact';

export type HomeStyle = 'A' | 'B';

export interface BookingRequest {
  id?: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  submittedAt?: string;
  status?: 'pending' | 'confirmed' | 'declined';
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  preferredDates?: string;
  message: string;
  submittedAt?: string;
}

export interface BookedRange {
  start: string; // ISO date "YYYY-MM-DD"
  end: string;   // ISO date "YYYY-MM-DD" (exclusive)
}

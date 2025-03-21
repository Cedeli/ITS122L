export interface User {
  uid: string;
  email: string;
  first_name?: string;
  last_name?: string;
  birth_date?: string;
  age?: number;
  phone_number?: string;
  address?: string;
  role?: string;
  created_at: string;
  updated_at: string;
  pending_request?: boolean;
}

import { IContractor } from "./contractor";

export interface IDriver {
  id: string; // You can use uuid string representation if you're using uuid for Driver ID
  full_name: string;
  phone: string;
  cccd: string;
  issue_date: string; // Date strings in 'YYYY-MM-DD' format
  date_of_birth: string; // Date strings in 'YYYY-MM-DD' format
  address: string;
  license_number: string;
  license_expiry: string; // Date strings in 'YYYY-MM-DD' format
  contractor_id: string | null; // Contractor UUID, can be null
  note?: string; // Optional field
  created_at: string; // Date string in 'YYYY-MM-DD' format
  updated_at: string; // Date string in 'YYYY-MM-DD' format
  contractor?: IContractor; // Optional association with Contractor (if needed)
}
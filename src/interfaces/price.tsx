export interface IPrice {
  id: string;
  contractor_id: string;
  file_name: string;
  price_details: IPriceDetail[];
  updated_at: string;
  created_at: string;
}

export interface IPriceDetail {
  id: string;
  from_city: string;
  to_city: string;
  from_district: string;
  to_district: string;
  notes: string;
  weight_prices: any;
}

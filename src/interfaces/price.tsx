export interface IPrice {
  id: string;
  owner_type: string;
  owner_id: string;
  file_name: string;
  price_details: IPriceDetail[];
  updated_at: string;
  created_at: string;
}

export interface IPriceDetail {
  id: string;
  pickup_province: string;
  delivery_province: string;
  pickup_district: string;
  delivery_district: string;
  notes: string;
  weight_prices: any;
}

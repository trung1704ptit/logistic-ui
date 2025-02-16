import { IContractor } from "./contractor";
import { IDriver } from "./driver";
import { ITruck } from "./truck";

export interface IOrder {
  id?: string;
  contractor_id: string;
  order_time: string;
  order_type: string;
  client: string;
  driver_id: string;
  truck_id: string;
  price_id: string;
  pickup_province: string;
  pickup_district?: string;
  delivery_province: string;
  delivery_district?: string;
  unit: string;
  package_weight?: number;
  package_volumn?: number;
  trip_salary: number;
  price_for_contractor: number;
  price_from_client: number;
  daily_salary: number;
  point_count: number;
  point_salary: number;
  recovery_fee: number;
  loading_salary: number;
  meal_fee: number;
  standby_fee: number;
  parking_fee: number;
  outside_oil_fee: number;
  oil_fee: number;
  charge_fee: number;
  other_salary: number;
  total_salary: number;
  notes?: string;
  contractor?: IContractor;
  driver?: IDriver
  truck?: ITruck;
  created_at?: string;
  updated_at?: string;
}

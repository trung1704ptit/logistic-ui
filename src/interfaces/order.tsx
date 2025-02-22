import { IClient } from "./client";
import { IContractor } from "./contractor";
import { IDriver } from "./driver";
import { ITruck } from "./truck";

export interface IOrder {
  id?: string;
  contractor_id: string;
  contractor?: IContractor;
  order_time: string;
  order_type: string;
  client: IClient;
  driver_id: string;
  truck_id: string;
  driver?: IDriver
  truck?: ITruck;
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
  price_for_contractor_id: string;
  price_from_client_id: string;
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
  created_at?: string;
  updated_at?: string;
}

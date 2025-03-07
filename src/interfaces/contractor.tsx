import { IDriver } from "./driver";
import { ITruck } from "./truck";

export interface IContractor {
    id: string;
    name: string;
    phone: string;
    address: string;
    type: string;
    note?: string;
    drivers?: IDriver[];
    trucks?: ITruck[];
}
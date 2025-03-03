import { Coin } from "@common/platform/coin";
import { User } from "@common/platform/user";
import { Company } from "@common/platform/company";

export type Entity = Coin | Company | User;
export type EntityId = string | number;
export enum EntityType {
    COIN = 'COIN',
    USER = 'USER',
    COMPANY = 'COMPANY'
}

import { Coin } from "@common/platform/coin";
import { User } from "@common/platform/user";
import { Company } from "@common/platform/company";

export type EntityObject = Coin | Company | User;
export type EntityObjectId = string | number;
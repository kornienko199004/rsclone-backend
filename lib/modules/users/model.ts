import { Document } from "mongoose";
import { ModificationNote } from "../common/model";

export interface IUser {
    _id?: string;
    email: string;
    name?: string;
    password: string;
    is_deleted?: boolean;
    modification_notes: ModificationNote[]
}

export interface IUserBase extends IUser, Document {
    _id: string;
    tokens: { token: string }[];
    generateAuthToken(): Promise<string>;
    getPublicProfile(): { [k: string]: any };
  }

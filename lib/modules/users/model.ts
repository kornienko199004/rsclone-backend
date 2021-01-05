import { ModificationNote } from "../common/model";

export interface IUser {
    _id?: string;
    email: string;
    password: string;
    is_deleted?: boolean;
    modification_notes: ModificationNote[]
}
import { ModificationNote } from "../common/model";

export interface IUser {
    _id?: String;
    email: String;
    password: String;
    is_deleted?: Boolean;
    modification_notes: ModificationNote[]
}
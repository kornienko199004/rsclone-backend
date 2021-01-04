import { ModificationNote } from "../common/model";

export interface INote {
    _id?: string;
    title: string;
    parents?: Array<object>;
    body: object;
    modification_notes: ModificationNote[];
}
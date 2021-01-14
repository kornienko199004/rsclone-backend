import { ModificationNote } from "../common/model";
export interface INote {
    _id?: string;
    title: string,
    parents?: Array<Record<string, any>>;
    body: Record<string, any>;
    owner: string;
    modification_notes: ModificationNote[];
}

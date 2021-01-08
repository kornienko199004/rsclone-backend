import { ModificationNote } from "../common/model";
export interface INote {
    _id?: string;
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
  },
    parents?: Array<Record<string, any>>;
    body: Record<string, any>;
    owner: string;
    modification_notes: ModificationNote[];
}

import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';

const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    parents: Array,
    body: Object,
    // owner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User'
    // },
    modification_notes: [ModificationNote]
});

export default mongoose.model('notes', schema);
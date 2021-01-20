import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';

const {Schema} = mongoose;

const schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    parents: Array,
    body: Object,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    isDaily: {
      type: Boolean,
      required: true,
      default: false,
    },
    modification_notes: [ModificationNote]
});

export default mongoose.model('notes', schema);

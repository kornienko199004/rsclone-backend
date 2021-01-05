import * as mongoose from 'mongoose';
import validator from 'validator';
import { hash } from 'bcrypt';
import { ModificationNote } from '../common/model';

const {Schema} = mongoose;

const schema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    } ,
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('check pass');
            }
        }
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    modification_notes: [ModificationNote]
});

schema.pre('save', async function(next) {
    const user: any = this;
    if (user.isModified('password')) {
        user.password = await hash(user.password, 8);
    }
    next();
});

export default mongoose.model('users', schema);
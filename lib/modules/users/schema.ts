/* eslint-disable @typescript-eslint/no-this-alias */
import * as mongoose from 'mongoose';
import validator from 'validator';
import { hash } from 'bcrypt';
import { ModificationNote } from '../common/model';
import { sign } from 'jsonwebtoken';
import { IUserBase } from './model';

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
    },
    name:{
        type: String,
        required: true,
        trim: true,
    },
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
    modification_notes: [ModificationNote],
    tokens: [{
        token: {
            type: String,
            require: true,
        }
    }]
});

schema.methods.generateAuthToken = async function(): Promise<string> {
    const user: IUserBase = this;
    const token: string = sign({ _id: user._id.toString() }, process.env.TOKEN_SECRET, {expiresIn: '365d'});
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

schema.methods.getPublicProfile = function(): { [k: string]: any } {
    const user: IUserBase = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

schema.pre('save', async function(next) {
    const user: IUserBase = (this as IUserBase);
    if (user.isModified('password')) {
        user.password = await hash(user.password, 8);
    }
    next();
});

export default mongoose.model<IUserBase>('users', schema);

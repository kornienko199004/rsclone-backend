"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const model_1 = require("../common/model");
const { Schema } = mongoose;
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
    modification_notes: [model_1.ModificationNote]
});
exports.default = mongoose.model('notes', schema);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
class NoteService {
    createNote(note_params, callback) {
        const _session = new schema_1.default(note_params);
        _session.save(callback);
    }
    filterNote(query, callback) {
        schema_1.default.findOne(query, callback);
    }
    getNotes(query, callback) {
        schema_1.default.find(query, callback);
    }
    updateNote(note_params, callback) {
        const query = { _id: note_params._id };
        schema_1.default.findOneAndUpdate(query, note_params, callback);
    }
    deleteNote(query, callback) {
        schema_1.default.deleteOne(query, callback);
    }
}
exports.default = NoteService;

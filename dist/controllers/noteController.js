"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteController = void 0;
const service_1 = require("../modules/common/service");
const service_2 = require("../modules/notes/service");
class NoteController {
    constructor() {
        this.note_service = new service_2.default();
    }
    create_note(req, res) {
        if (req.body.title && req.body.body) {
            const note_params = {
                title: req.body.title,
                body: req.body.body,
                parents: req.body.parents,
                owner: req.user._id,
                modification_notes: [{
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'New note created'
                    }]
            };
            this.note_service.createNote(note_params, (err, note_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('note was created successfully', note_data, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    get_note(req, res) {
        if (req.params.id) {
            const note_filter = { _id: req.params.id, owner: req.user._id };
            this.note_service.filterNote(note_filter, (err, note_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('recieved note successfully', note_data, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    get_note_by_title(req, res) {
        if (req.params.title) {
            const note_filter = { title: req.params.title, owner: req.user._id };
            this.note_service.filterNote(note_filter, (err, note_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else {
                    service_1.successResponse('recieved note successfully', note_data, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    get_notes(req, res) {
        const note_filter = { owner: req.user._id };
        this.note_service.getNotes(note_filter, (err, note_data) => {
            if (err) {
                service_1.mongoError(err, res);
            }
            else {
                service_1.successResponse('recieved notes successfully', note_data, res);
            }
        });
    }
    update_note(req, res) {
        if (req.params.id &&
            req.body.title || req.body.body || req.body.parents) {
            const note_filter = { _id: req.params.id, owner: req.user._id };
            this.note_service.filterNote(note_filter, (err, note_data) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (note_data) {
                    note_data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'note was updated'
                    });
                    const note_params = {
                        _id: req.params.id,
                        title: req.body.title ? req.body.title : note_data.title,
                        body: req.body.body ? req.body.body : note_data.body,
                        parents: req.body.parents ? req.body.parents : note_data.parents,
                        owner: req.body.owner ? req.body.owner : note_data.owner,
                        modification_notes: note_data.modification_notes
                    };
                    this.note_service.updateNote(note_params, (err) => {
                        if (err) {
                            service_1.mongoError(err, res);
                        }
                        else {
                            service_1.successResponse('note was updated successfully', null, res);
                        }
                    });
                }
                else {
                    service_1.failureResponse('invalid user', null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
    delete_note(req, res) {
        if (req.params.id) {
            const note_filter = { _id: req.params.id, owner: req.user._id };
            this.note_service.deleteNote(note_filter, (err, delete_details) => {
                if (err) {
                    service_1.mongoError(err, res);
                }
                else if (delete_details.deletedCount !== 0) {
                    service_1.successResponse('delete note successfull', null, res);
                }
                else {
                    service_1.failureResponse('invalid note', null, res);
                }
            });
        }
        else {
            service_1.insufficientParameters(res);
        }
    }
}
exports.NoteController = NoteController;

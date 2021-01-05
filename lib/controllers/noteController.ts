import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { INote } from '../modules/notes/model';
import  NoteService from '../modules/notes/service';

export class NoteController {

    private note_service:  NoteService = new  NoteService();

    public create_note(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.title && req.body.body) {
            const note_params: INote = {
                title: req.body.title,
                body: req.body.body,
                parents: req.body.parents,
                modification_notes: [{
                    modified_on: new Date(Date.now()),
                    modified_by: null,
                    modification_note: 'New note created'
                }]
            };
            this.note_service.createNote(note_params, (err: any, note_data: INote) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('note was created successfully', note_data, res);
                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public get_note(req: Request, res: Response) {
        if (req.params.id) {
            const note_filter = { _id: req.params.id };
            this.note_service.filterNote(note_filter, (err: any, note_data: INote) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('recieved note successfully', note_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public get_notes(req: Request, res: Response) {
            this.note_service.getNotes((err: any, note_data: INote) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('recieved notes successfully', note_data, res);
                }
            });
    }

    public update_note(req: Request, res: Response) {
        if (req.params.id &&
            req.body.title || req.body.body || req.body.parents) {
            const note_filter = { _id: req.params.id };
            this.note_service.filterNote(note_filter, (err: any, note_data: INote) => {
                if (err) {
                    mongoError(err, res);
                } else if (note_data) {
                    note_data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'note was updated'
                    });
                    const note_params: INote = {
                        _id: req.params.id,
                        title: req.body.title ? req.body.title : note_data.title,
                        body: req.body.body ? req.body.body : note_data.body,
                        parents: req.body.parents ? req.body.parents : note_data.parents,
                        modification_notes: note_data.modification_notes
                    };
                    this.note_service.updateNote(note_params, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('note was updated successfully', null, res);
                        }
                    });
                } else {
                    failureResponse('invalid user', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public delete_note(req: Request, res: Response) {
        if (req.params.id) {
            this.note_service.deleteNote(req.params.id, (err: any, delete_details) => {
                if (err) {
                    mongoError(err, res);
                } else if (delete_details.deletedCount !== 0) {
                    successResponse('delete note successfull', null, res);
                } else {
                    failureResponse('invalid note', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}

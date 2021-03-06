import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse, sameTitleFailureResponse } from '../modules/common/service';
import { INote } from '../modules/notes/model';
import NoteService from '../modules/notes/service';

export class NoteController {

  private note_service: NoteService = new NoteService();

  public create_note(req: Request, res: Response) {
    if (req.body.title) {
      const note_filter = { title: req.body.title, owner: req.user._id };
      this.note_service.filterNote(note_filter, (err: any, note_data: INote) => {
        if (!note_data) {
          const note_params: INote = {
            title: req.body.title,
            body: req.body.body,
            parents: req.body.parents,
            isDaily: req.body.isDaily,
            owner: req.user._id,
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
          sameTitleFailureResponse('title must be unique', note_data, res);
        }
      });
    } else {
      insufficientParameters(res);
    }
  }

  public get_note(req: Request, res: Response) {
    if (req.params.id) {
      const note_filter = { _id: req.params.id, owner: req.user._id };
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

  public get_daily_note(req: Request, res: Response) {
    if (req.params.id) {
      const note_filter = { owner: req.user._id, isDaily: true };
      this.note_service.getNotes(note_filter, (err: any, notes_data: INote[]) => {
        if (err) {
          mongoError(err, res);
        } else {
          const note_filter = { _id: req.params.id, owner: req.user._id, isDaily: true };
          this.note_service.filterNote(note_filter, (err: any, note_data: INote) => {
            if (err) {
              mongoError(err, res);
            } else {
              if (!note_data) {
                insufficientParameters(res);
              } else {
                notes_data = notes_data.filter((note) => {
                  return Date.parse(note.modification_notes[0].modified_on.toString()) < Date.parse(note_data.modification_notes[0].modified_on.toString()) ? note : null;
                });
                successResponse('recieved note successfully', notes_data[notes_data.length - 1], res);
              }
            }});
        }
      });
    } else {
      insufficientParameters(res);
    }
  }

  public get_note_by_title(req: Request, res: Response) {
    if (req.params.title) {
      const note_filter = { title: req.params.title, owner: req.user._id };
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
    const note_filter = { owner: req.user._id };
    this.note_service.getNotes(note_filter, (err: any, note_data: INote) => {
      if (err) {
        mongoError(err, res);
      } else {
        successResponse('recieved notes successfully', note_data, res);
      }
    });
  }

  public update_note(req: Request, res: Response) {
    if (req.params.id &&
      req.body.title || req.body.body || req.body.parents || req.body.isDaily) {
      const note_filter = { _id: req.params.id, owner: req.user._id };
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
            owner: req.body.owner ? req.body.owner : note_data.owner,
            isDaily: req.body.isDaily ? req.body.isDaily : note_data.isDaily,
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
      const note_filter = { _id: req.params.id, owner: req.user._id };
      this.note_service.deleteNote(note_filter, (err: any, delete_details) => {
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

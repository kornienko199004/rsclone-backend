import { INote } from './model';
import notes from './schema';

export default class NoteService {
    
    public createNote(note_params: INote, callback: any) {
        const _session = new notes(note_params);
        _session.save(callback);
    }

    public filterNote(query: any, callback: any) {
        notes.findOne(query, callback);
    }

    public getNotes(callback: any) {
        notes.find({}, callback)
    }

    public updateNote(note_params: INote, callback: any) {
        const query = { _id: note_params._id };
        notes.findOneAndUpdate(query, note_params, callback);
    }
    
    public deleteNote(_id: string, callback: any) {
        const query = { _id };
        notes.deleteOne(query, callback);
    }

}
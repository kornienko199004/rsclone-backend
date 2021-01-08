import { Application, Request, Response } from 'express';
import { NoteController } from '../controllers/noteController';
import auth from '../modules/middleware/auth';
export class NoteRoutes {

    private note_controller: NoteController = new NoteController();

    public route(app: Application) {

        app.post('/api/note', auth, (req: Request, res: Response) => {
            this.note_controller.create_note(req, res);
        });

        app.get('/api/note/:id', auth, (req: Request, res: Response) => {
            this.note_controller.get_note(req, res);
        });

        app.get('/api/note/title/:title', auth, (req: Request, res: Response) => {
            this.note_controller.get_note_by_title(req, res);
        });

        app.get('/api/notes', auth, (req: Request, res: Response) => {
            this.note_controller.get_notes(req, res);
        });

        app.put('/api/note/:id', auth, (req: Request, res: Response) => {
            this.note_controller.update_note(req, res);
        });

        app.delete('/api/note/:id', auth, (req: Request, res: Response) => {
            this.note_controller.delete_note(req, res);
        });

    }
}

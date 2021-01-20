"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteRoutes = void 0;
const noteController_1 = require("../controllers/noteController");
const auth_1 = require("../modules/middleware/auth");
class NoteRoutes {
    constructor() {
        this.note_controller = new noteController_1.NoteController();
    }
    route(app) {
        app.post('/api/note', auth_1.default, (req, res) => {
            this.note_controller.create_note(req, res);
        });
        app.get('/api/note/:id', auth_1.default, (req, res) => {
            this.note_controller.get_note(req, res);
        });
        app.get('/api/note/daily/:id', auth_1.default, (req, res) => {
            this.note_controller.get_daily_note(req, res);
        });
        app.get('/api/note/title/:title', auth_1.default, (req, res) => {
            this.note_controller.get_note_by_title(req, res);
        });
        app.get('/api/notes', auth_1.default, (req, res) => {
            this.note_controller.get_notes(req, res);
        });
        app.put('/api/note/:id', auth_1.default, (req, res) => {
            this.note_controller.update_note(req, res);
        });
        app.delete('/api/note/:id', auth_1.default, (req, res) => {
            this.note_controller.delete_note(req, res);
        });
    }
}
exports.NoteRoutes = NoteRoutes;

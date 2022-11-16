const { nanoid } = require("nanoid");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");

class NotesService {
    constructor() {
        this._notes = [];
    }

    addNote({ title, body, tags }) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        // data baru disimpan ke variabel sementara
        const newNote = {
            title,
            tags,
            body,
            id,
            createdAt,
            updatedAt,
        };

        // memasukan data ke dalam array notes
        this._notes.push(newNote);

        const isSuccess = this._notes.filter((n) => n.id === id).length > 0;

        if (!isSuccess) {
            throw new InvariantError("Catatan gagal ditambahkan");
        }

        return id;
    }

    getNotes() {
        // mengembalikan seluruh data dari array notes
        return this._notes;
    }

    getNoteById(id) {
        // mencari note dengan id spesifik
        const note = this._notes.filter((n) => n.id === id)[0];

        if (!note) {
            throw new NotFoundError("Catatan tidak ditemukan");
        }

        return note;
    }

    editNoteById(id, { title, body, tags }) {
        //  mencari index note dari id
        const index = this._notes.findIndex((n) => n.id === id);

        if (index === -1) {
            throw new NotFoundError(
                "Gagal memperbarui catatan. Id tidak ditemukan"
            );
        }

        const updatedAt = new Date().toISOString();

        this._notes[index] = {
            ...this._notes[index],
            title,
            body,
            tags,
            updatedAt,
        };
    }

    deleteNoteById(id) {
        //  mencari index note dari id
        const index = this._notes.findIndex((n) => n.id === id);

        if (index === -1) {
            throw new NotFoundError(
                "Catatan gagal dihapus. Id tidak ditemukan"
            );
        }

        this._notes.splice(index, 1);
    }
}

module.exports = NotesService;

"use client";

import { useState, useEffect } from "react";

import { TrashIcon, Pencil2Icon } from '@radix-ui/react-icons'

function Notes({ user }) {
    const [newNote, setNewNote] = useState('');
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        buildNotes();
    }, []);

    function deleteNote(id) {
    }

    function editNote(id) {

    }

    function buildNotes() {
        setNotes([]);
        const notes = user.get('notes');
        notes.map().on((note, id) => {
            setNotes((notes) => [
                ...notes,
                <div className="flex justify-between items-center w-full border-2 border-green-50 hover:bg-green-50 h-10">
                    <button onClick={() => editNote(id)}
                        className="font-bold h-full w-10 scale-110 hover:scale-125 transition-all px-4">
                        <Pencil2Icon />
                    </button>
                    <li key={id} className="px-4 py-2 w-full ">{note}</li>
                    <button onClick={() => deleteNote(id)}
                        className="font-bold h-full w-10 scale-110 hover:scale-125 transition-all px-4">
                        <TrashIcon />
                    </button >
                </div >
            ]);
        });
    }


    function addNote() {
        if (newNote.trim() === '') {
            setNewNote('');
            window.alert("Please enter a message")
            return;
        }

        if (!user.is) {
            window.alert("Please sign in to add notes")
            return;
        }

        user.get('notes').set(newNote);
        buildNotes();
        setNewNote('');
    }


    return (
        <div id="notes-div">
            <form id="notes-form">
                <div className="flex gap-1">
                    <input value={newNote} onChange={(e) => setNewNote(e.target.value)} type="text" placeholder="New Note"
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    <button
                        onClick={addNote}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-1 mx-2 rounded"
                    > 🗒️ note </button>
                </div>
            </form>
            <ul className="flex flex-col gap-2 items-center justify-center p-4 my-2">{notes}</ul>
        </div>
    )
}

export default Notes
"use client";
import { useState, useEffect } from 'react'

function Notes({ gun }) {


    const [notes, setNotes] = useState([]);

    useEffect(() => {
        gun.on('auth', function (e) {
            console.log(e);
            setNotes("THIS IS SO GOOD")
        });
    }, []);

    return (
        <div>{notes}</div>
    )
}

export default Notes
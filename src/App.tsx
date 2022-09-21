/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useRef } from 'react';
import './App.scss';
import { Header } from './components/Header/Header';
import { Note } from './components/Note/Note';
import { NoteForm } from './components/NoteForm/NoteForm';
import emptyNotesEmoji from './assets/images/emptyNotesEmoji.png';

export type notesType = {
  id: number;
  title: string;
  desc: string;
  date: any;
};

export const App: FC = () => {
  const [notes, setNotes] = useState<notesType[]>([]);
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isNoteHeadEmpty, setIsNoteHeadEmpty] = useState<boolean>(false);
  const [isNoteTextEmpty, setIsNoteTextEmpty] = useState<boolean>(false);

  let emptyNotesRef = useRef<HTMLDivElement>(null);

  let date = new Date();
  let hour = date.getHours();
  let mins = date.getMinutes();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let result =
    String(hour) +
    ':' +
    String(mins < 10 ? '0' + mins : mins) +
    ' ' +
    String(day) +
    '.' +
    String(month < 12 ? '0' + month : month) +
    ' ' +
    String(year);

  const addNote = (noteHead: string, noteText: string) => {
    console.log(noteHead);
    if (noteHead !== '' && noteText !== '') {
      setNotes([
        ...notes,
        {
          id: Number(
            notes.length ? notes.find((e) => notes.indexOf(e) === notes.length - 1)!.id + 1 : 1,
          ),
          title: noteHead,
          desc: noteText,
          date: result,
        },
      ]);
      setIsNoteHeadEmpty(false);
      setIsNoteTextEmpty(false);
      setIsAddOpen(false);
    } else if (noteHead === '') {
      setIsNoteHeadEmpty(true);

      if (noteText === '') {
        setIsNoteTextEmpty(true);
      } else if (noteText !== '') {
        setIsNoteTextEmpty(false);
      }
    } else if (noteText === '') {
      setIsNoteTextEmpty(true);

      if (noteHead !== '') {
        setIsNoteHeadEmpty(false);
      }
    }
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((e) => e.id !== id));
  };

  return (
    <div className="appWrapper">
      <Header />
      <div className="appContainer">
        {!isAddOpen ? (
          <button className="button" onClick={() => setIsAddOpen(true)}>
            Добавить
          </button>
        ) : (
          <NoteForm
            addNote={addNote}
            isNoteHeadEmpty={isNoteHeadEmpty}
            isNoteTextEmpty={isNoteTextEmpty}
          />
        )}
        {notes.length ? (
          notes.map((obj) => (
            <Note key={obj.id} {...obj} deleteNote={deleteNote} setNotes={setNotes} notes={notes} />
          ))
        ) : (
          <div className="emptyNotes" ref={emptyNotesRef}>
            <h1>Список заметок пуст</h1>
            <p>
              <img src={emptyNotesEmoji} alt="" />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

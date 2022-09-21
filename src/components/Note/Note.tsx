/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useRef, useState } from 'react';
import { notesType } from '../../App';
import styles from './Note.module.scss';

type NoteProps = {
  id: number;
  title: string;
  desc: string;
  date: string;
  deleteNote: (id: number) => void;
  setNotes: (notes: notesType[]) => void;
  notes: notesType[];
};

export const Note: FC<NoteProps> = ({ id, title, desc, date, deleteNote, setNotes, notes }) => {
  let noteRef = useRef<HTMLDivElement>(null);

  const [isNoteEdit, setIsNoteEdit] = useState<boolean>(false);
  const [editNoteHead, setEditNoteHead] = useState<string>('');
  const [editNoteText, setEditNoteText] = useState<string>('');

  const opacityUp = [
    {
      opacity: 0,
      transform: ' translateY(-200px)',
      transition: 'all 0.20s ease-in-out',
    },
    {
      opacity: 1,
      transform: ' translateY(0px)',
      transition: 'all 0.20s ease-in-out',
    },
  ];

  const opacityDown = [
    {
      opacity: 1,
      transform: ' translateY(0px)',
      transition: 'all 0.20s ease-in-out',
    },
    {
      opacity: 0,
      transform: ' translateY(-200px)',
      transition: 'all 0.20s ease-in-out',
    },
  ];

  const timing = {
    duration: 200,
    iterations: 1,
  };

  useEffect(() => {
    noteRef?.current?.animate(opacityUp, timing);
  }, []);

  const onClickDelete = (id: number) => {
    noteRef?.current?.animate(opacityDown, timing);
    setTimeout(() => {
      deleteNote(id);
    }, 200);
  };

  const editNote = () => {
    setIsNoteEdit(!isNoteEdit);

    setEditNoteHead(notes[id - 1].title);
    setEditNoteText(notes[id - 1].desc);
  };

  const updateNotes = (id: number, editNoteHead: string, editNoteText: string) => {
    setNotes(
      notes.map((obj) => {
        if (obj.id === id) {
          return { ...obj, title: editNoteHead, desc: editNoteText };
        }
        return obj;
      }),
    );
    setIsNoteEdit(false);
  };

  return (
    <div className={styles.container} ref={noteRef}>
      <div className={styles.noteHeader}>
        <p className={styles.date}>{date}</p>
        <svg
          onClick={editNote}
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_26840_18)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.96514 2.80892C9.76595 2.66325 9.53411 2.56858 9.28989 2.53319C9.04566 2.49781 8.79649 2.52278 8.56414 2.60592C7.47775 3.0039 6.46875 3.58757 5.58214 4.33092C5.3943 4.4904 5.24833 4.69344 5.157 4.92231C5.06566 5.15117 5.03172 5.39892 5.05814 5.64392C5.13314 6.39692 5.00014 7.12392 4.63814 7.74992C4.27714 8.37692 3.71314 8.85591 3.02314 9.16691C2.79749 9.26687 2.59975 9.42057 2.44722 9.61459C2.29469 9.80861 2.192 10.037 2.14814 10.2799C1.95062 11.4181 1.95062 12.5818 2.14814 13.7199C2.24114 14.2569 2.60814 14.6459 3.02314 14.8339C3.71314 15.1439 4.27714 15.6239 4.63914 16.2499C5.00014 16.8769 5.13314 17.6029 5.05814 18.3559C5.01314 18.8079 5.16514 19.3199 5.58214 19.6689C6.46874 20.4123 7.47774 20.996 8.56414 21.3939C8.79634 21.477 9.04534 21.5019 9.28939 21.4665C9.53343 21.4311 9.7651 21.3365 9.96414 21.1909C10.5791 20.7489 11.2761 20.4999 12.0001 20.4999C12.7241 20.4999 13.4201 20.7489 14.0351 21.1909C14.4051 21.4569 14.9251 21.5809 15.4361 21.3939C16.5225 20.9959 17.5315 20.4123 18.4181 19.6689C18.8351 19.3199 18.9881 18.8089 18.9421 18.3559C18.8671 17.6029 18.9991 16.8759 19.3621 16.2499C19.7231 15.6229 20.2871 15.1449 20.9771 14.8339C21.3911 14.6459 21.7591 14.2569 21.8521 13.7199C22.0496 12.5817 22.0496 11.4181 21.8521 10.2799C21.8083 10.037 21.7056 9.80861 21.5531 9.61459C21.4005 9.42057 21.2028 9.26687 20.9771 9.16691C20.2871 8.85591 19.7231 8.37692 19.3611 7.74992C18.9991 7.12392 18.8671 6.39692 18.9421 5.64392C18.9685 5.39892 18.9345 5.15121 18.8432 4.92235C18.7518 4.6935 18.6059 4.49046 18.4181 4.33092C17.5315 3.58757 16.5225 3.0039 15.4361 2.60592C15.2039 2.52295 14.955 2.49807 14.7109 2.53346C14.4669 2.56884 14.2352 2.66341 14.0361 2.80892C13.4201 3.24992 12.7231 3.49992 12.0001 3.49992C11.2771 3.49992 10.5801 3.25092 9.96514 2.80892ZM9.00014 11.9999C9.00014 11.2043 9.31621 10.4412 9.87882 9.87859C10.4414 9.31599 11.2045 8.99992 12.0001 8.99992C12.7958 8.99992 13.5589 9.31599 14.1215 9.87859C14.6841 10.4412 15.0001 11.2043 15.0001 11.9999C15.0001 12.7956 14.6841 13.5586 14.1215 14.1212C13.5589 14.6838 12.7958 14.9999 12.0001 14.9999C11.2045 14.9999 10.4414 14.6838 9.87882 14.1212C9.31621 13.5586 9.00014 12.7956 9.00014 11.9999Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_26840_18">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <p className={styles.title}>
        {!isNoteEdit ? (
          title
        ) : (
          <input
            type="text"
            placeholder="Заголовок"
            value={editNoteHead}
            onChange={(e) => setEditNoteHead(e.target.value)}
          />
        )}
      </p>
      <p className={styles.desc}>
        {!isNoteEdit ? (
          desc
        ) : (
          <textarea
            placeholder="Текст"
            value={editNoteText}
            onChange={(e) => setEditNoteText(e.target.value)}></textarea>
        )}
      </p>

      {!isNoteEdit ? (
        <p className={styles.close} onClick={() => onClickDelete(id)}>
          &times;
        </p>
      ) : (
        <button onClick={() => updateNotes(id, editNoteHead, editNoteText)}>Сохранить</button>
      )}
    </div>
  );
};

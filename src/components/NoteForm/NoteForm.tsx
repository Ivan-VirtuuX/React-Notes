/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useRef, useEffect, useState } from 'react';
import styles from './NoteForm.module.scss';

type NoteFormProps = {
  addNote: (noteHead: string, noteText: string) => void;
  isNoteHeadEmpty: boolean;
  isNoteTextEmpty: boolean;
};

export const NoteForm: FC<NoteFormProps> = ({ addNote, isNoteHeadEmpty, isNoteTextEmpty }) => {
  let formRef = useRef<HTMLDivElement>(null);

  const [noteHead, setNoteHead] = useState<string>('');
  const [noteText, setNoteText] = useState<string>('');

  const opacityDown = [
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

  const timing = {
    duration: 200,
    iterations: 1,
  };

  useEffect(() => {
    formRef?.current?.animate(opacityDown, timing);
  }, []);

  return (
    <div className={styles.noteFormContainer} ref={formRef}>
      <h1>Новая заметка</h1>
      <input
        type="text"
        placeholder="Заголовок"
        value={noteHead}
        onChange={(e) => setNoteHead(e.target.value)}
        style={{ boxShadow: isNoteHeadEmpty ? '0 0 50px 1px #FF4163' : 'none' }}
      />
      <textarea
        placeholder="Текст"
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        style={{ boxShadow: isNoteTextEmpty ? '0 0 50px 1px #FF4163' : 'none' }}></textarea>
      <button onClick={() => addNote(noteHead, noteText)}>Добавить</button>
    </div>
  );
};

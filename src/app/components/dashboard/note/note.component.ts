import { Component, Input, OnInit } from '@angular/core';
import { Note, Tag } from '../../../services/note.service';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  @Input()
  note: Note = {
    title: '',
    subtitle: '',
    content: '',
    tag: Tag.General,
    favorite: false,
    createdAt: Timestamp.now(),
    lastModified: Timestamp.now(),
  };

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Note, Tag } from '../../../services/note.service';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  // Useful to have some default values
  @Input()
  note: Note = {
    title: '',
    description: '',
    content: '',
    tag: Tag.General,
    favorite: false,
    createdAt: Timestamp.now(),
    lastModified: Timestamp.now(),
  };

  constructor() { }

  ngOnInit(): void {
  }

  tagToColour(tag:string): string {
    switch (tag) {
      case Tag.General:
        return 'bg-cyan-300 dark:bg-blue-700';
      case Tag.Personal:
        return 'bg-green-300 dark:bg-green-700';
      case Tag.Work:
        return 'bg-yellow-300 dark:bg-yellow-700';
      case Tag.Leisure:
        return 'bg-pink-300 dark:bg-pink-700';
      default:
        return 'bg-transparent';
    }
  }

}

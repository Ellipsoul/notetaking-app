import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from '../../../services/note.service';
import { Timestamp } from 'firebase/firestore';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.css'],
})
export class NoteDialogComponent implements OnInit {
  currentNote: Note;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Note | null, private themeService: ThemeService) {
    const tempTimestamp = Timestamp.now();
    // Create a deep copy to prevent mutation of original note
    this.currentNote = data ? JSON.parse(JSON.stringify(data)) : {
      title: '',
      description: '',
      content: '',
      tag: '',
      favorite: false,
      createdAt: tempTimestamp,
      lastModified: tempTimestamp,
    };
  }

  ngOnInit(): void {}

  // Required to theme internal elements
  applyTheme(): string {
    return this.themeService.getTheme();
  }

  upsertNote(): void {
    this.currentNote.createdAt.toMillis();
  }

  deleteNote(): void {
  }
}

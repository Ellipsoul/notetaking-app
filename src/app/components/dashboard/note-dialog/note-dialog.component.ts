import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from '../../../services/note.service';

@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.css'],
})
export class NoteDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Note | null) { }

  ngOnInit(): void {
    console.log(this.data);
  }

}

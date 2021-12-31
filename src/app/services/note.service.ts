import { Injectable } from '@angular/core';
import { Timestamp } from 'firebase/firestore';

export enum Tag {
  General = 'General',
  Personal = 'Personal',
  Work = 'Work',
  Other = 'Other',
}

export interface Note {
  title: string;
  subtitle: string;
  content: string;
  tag: string;
  favorite: boolean;
  createdAt: Timestamp;
  lastModified: Timestamp;
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor() { }
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth/';

import { ThemeService } from '../../services/theme.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Output() themeEvent = new EventEmitter<string>();

  currentTheme:string;

  constructor(
    private themeService: ThemeService,
    private afAuth: AngularFireAuth,
    private toaster: ToastrService) {
    this.currentTheme = this.themeService.getTheme();
  }

  ngOnInit(): void {
  }

  toggleTheme():void {
    this.themeService.toggleTheme();
    this.currentTheme = this.themeService.getTheme();
    this.themeEvent.emit(this.currentTheme);
  }

  async handleClick():Promise<void> {
    const user = await this.afAuth.currentUser;
    if (user === null) {
      this.toaster.error('You must be logged in to view your notes', 'Oops!');
    }
  }
}

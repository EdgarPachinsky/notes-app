import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {AddNoteComponent} from "./components/add-note/add-note.component";
import {NotesZoneComponent} from "./components/notes-zone/notes-zone.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, AddNoteComponent, NotesZoneComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'NoteNest';
}

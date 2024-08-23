import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NoteManagementService} from "../../services/note-management.service";
import {Subscription} from "rxjs";
import {ClickedOutsideDirective} from "../../directives/clicked-outside.directive";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray} from "@angular/cdk/drag-drop";
import {INote} from "../../models/note.model";
import {editNote, removeNote} from "../../utils/utils";

@Component({
  selector: 'app-notes-zone',
  standalone: true,
  imports: [
    ClickedOutsideDirective,
    MatCard,
    MatCardContent,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatIcon,
    MatTooltip,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag
  ],
  templateUrl: './notes-zone.component.html',
})
export class NotesZoneComponent implements OnInit, OnDestroy{

  private readonly $subscription = new Subscription();
  @Input() isPinned: boolean = false;

  constructor(
    public noteManagementService: NoteManagementService
  ) {
  }

  ngOnInit() {
  }

  pinAction(note: INote, action:boolean){
    editNote(note.uniqueId, note.title, '', action);
  }
  deleteAction(note: INote){
    removeNote(note.uniqueId)
  }

  ngOnDestroy() {
    this.$subscription.unsubscribe();
  }
}

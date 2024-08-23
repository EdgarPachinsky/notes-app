import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ClickedOutsideDirective} from "../../directives/clicked-outside.directive";
import {addNote} from "../../utils/utils";
import {NoteManagementService} from "../../services/note-management.service";
import {NgClass} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-add-note',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, ClickedOutsideDirective, NgClass, MatButton

  ],
  templateUrl: './add-note.component.html',
})
export class AddNoteComponent implements OnInit{

  activeNoteAdd: boolean = false;
  formGroup!: FormGroup;

  constructor(
    public noteManagementService: NoteManagementService
  ) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup<any>({
      'title': new FormControl('', []),
      'description': new FormControl('',[]),
    })
  }

  handleClickEvent(isOutSideCLick:any){
    this.activeNoteAdd = !isOutSideCLick

    if(!this.activeNoteAdd){
      this.addNote();
    }
  }

  addNote(){
    if(this.formGroup.get('title')?.value || this.formGroup.get('description')?.value){
      let doNotAddDescription: boolean = false;
      let title: string = '';

      if(this.formGroup.get('title')?.value){
        title = this.formGroup.get('title')?.value;
      }else{
        title = this.formGroup.get('description')?.value;
        doNotAddDescription = true;
      }
      let description = !doNotAddDescription ? this.formGroup.get('description')?.value || '' : '';

      addNote(
        title , description , false
      )
    }

    this.formGroup.reset()
  }
}

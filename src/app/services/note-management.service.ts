import {EventEmitter, Injectable, Input, OnDestroy, OnInit} from '@angular/core';
import {INote} from "../models/note.model";
import {getAllNotes} from "../utils/utils";
import {BehaviorSubject, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NoteManagementService implements OnInit, OnDestroy{

  private readonly $subscription = new Subscription();
  constructor() { }

  ngOnInit() {

  }

  getAllNotes(isPinned:boolean = false): INote[]{
    return getAllNotes(isPinned)
  }

  ngOnDestroy() {
    this.$subscription.unsubscribe()
  }
}

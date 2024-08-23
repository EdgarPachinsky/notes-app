import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appClickedOutside]',
  standalone: true
})
export class ClickedOutsideDirective {

  @Output() public clickedOutside = new EventEmitter<boolean>();

  constructor(
    private el: ElementRef,
  ) { }

  @HostListener('document:click', ['$event.target'])
  public onClick(target:any){

    const clickedInside = this.el.nativeElement.contains(target)
    this.clickedOutside.emit(!clickedInside)
  }

}

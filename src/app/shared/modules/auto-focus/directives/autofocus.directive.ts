import { Directive, AfterViewInit, ElementRef, AfterContentInit } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterContentInit {

  constructor(private el: ElementRef) {
  }

  ngAfterContentInit() {
    this.el.nativeElement.focus();
  }

}

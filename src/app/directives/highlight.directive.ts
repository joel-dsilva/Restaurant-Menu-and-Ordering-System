import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {

  constructor(private el: ElementRef) {

    this.el.nativeElement.style.border = '2px solid orange';
    this.el.nativeElement.style.boxShadow = '0 0 8px rgba(255,165,0,0.6)';

  }

}
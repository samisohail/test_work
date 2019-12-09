import { HostListener, Directive } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector:'[NumberOnly]'
})
export class NumberOnlyDirective {
    constructor(private el: NgControl) {}
  
    @HostListener('input', ['$event.target.value'])
    onInput(value: string) {
      // NOTE: use NgControl patchValue to prevent the issue on validation
      this.el.control.patchValue(value.replace(/[^0-9]/g, ''));
    }
  }
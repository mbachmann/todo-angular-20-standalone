import { Directive, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  // inputs: ['tooltip', 'delay'],
})
export class TooltipDirective implements OnDestroy {
  @Input() appTooltip = ''; // The text for the tooltip to display
  @Input() appTooltipDelay = '190'; // Optional delay input, in ms
  private myPopup: any;
  private timer: any;
  constructor(private el: ElementRef) {}
  ngOnDestroy(): void {
    if (this.myPopup) {
      this.myPopup.remove();
    }
  }
  @HostListener('mouseenter', ['$event']) onMouseEnter(event: MouseEvent) {
    this.timer = setTimeout(() => {
      const x = this.el.nativeElement.getBoundingClientRect().left + this.el.nativeElement.offsetWidth / 2; // Get the middle of the element
      // x = event.clientX; In case position should be under the mouse
      console.log('mouse pos', event.clientX, event.clientY);
      const y = this.el.nativeElement.getBoundingClientRect().top + this.el.nativeElement.offsetHeight + 6; // Get the bottom of the element, plus a little extra
      this.createTooltipPopup(x, y);
    }, Number.parseInt(this.appTooltipDelay));
  }
  @HostListener('mouseleave') onMouseLeave() {
    if (this.timer) clearTimeout(this.timer);
    if (this.myPopup) {
      this.myPopup.remove();
    }
  }
  private createTooltipPopup(x: number, y: number) {
    const popup = document.createElement('div');
    popup.innerHTML = this.appTooltip;
    popup.setAttribute('class', 'tooltip-container');
    popup.style.top = y.toString() + 'px';
    popup.style.left = x.toString() + 'px';
    document.body.appendChild(popup);
    this.myPopup = popup;
    setTimeout(() => {
      if (this.myPopup) this.myPopup.remove();
    }, 5000); // Remove tooltip after 5 seconds
  }
}

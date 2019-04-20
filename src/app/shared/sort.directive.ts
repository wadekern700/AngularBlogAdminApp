import { Directive, Input, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appSort]'
})
export class SortDirective implements OnInit {
  ngOnInit(): void {
    console.log("in sort dir")
  }

  @HostListener('click') click(eventData: Event) {
    console.log(this.data);
    console.log(this.key)
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
    if (this.assending) {
      this.sortArray()
      this.assending = !this.assending;
    }
    else {
      this.reserveSort()
      this.assending = !this.assending;
    }
  }
  @Input() data: any[];
  @Input('sortKey') key: any;
  assending = true;

  constructor() { }

  sortArray() {
    return this.data.sort((a, b) => {
      if (a[this.key] > b[this.key]) {
        return 1;
      }
      else {
        return -1;
      }
    })
  }
  reserveSort() {
    return this.data.sort((a, b) => {
      if (a[this.key] < b[this.key]) {
        return 1;
      }
      else {
        return -1;
      }
    })
  }
}

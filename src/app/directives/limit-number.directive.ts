import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appLimitNumber]'
})
export class LimitNumberDirective implements OnInit {

  @Input() receivedNumber: number = 0;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.classList.add(this.receivedNumber);
  }

/*   function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            var limit = parseInt(attrs.limitTo);
            angular.element(elem).on("keypress", function(e) {
                if (this.value.length == limit) e.preventDefault();
            });
        }
    }
} */

}

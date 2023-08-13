import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  HostListener,
  Injector,
  Input,
  OnDestroy
} from '@angular/core';
import {TooltipComponent} from "../components/tooltip/tooltip.component";

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements OnDestroy {
  @Input() item: any = null;
  @Input() direction: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  private componentRef: ComponentRef<any> | null = null;

  constructor(
    private elementRef: ElementRef,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector) {
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.componentRef === null && this.item) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);
      this.componentRef = componentFactory.create(this.injector);
      this.appRef.attachView(this.componentRef.hostView);
      const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
      document.body.appendChild(domElem);
      this.setTooltipComponentProperties();
    }
  }

  private setTooltipComponentProperties() {
    if (this.componentRef !== null) {
      this.componentRef.instance.item = this.item;
      this.componentRef.instance.direction = this.direction;
      const {left, right, bottom, top} = this.elementRef.nativeElement.getBoundingClientRect();
      if (this.direction === 'top') {
        this.componentRef.instance.top = bottom - (bottom - top);
        this.componentRef.instance.left = (right - left) / 2 + left;
      } else if (this.direction === 'bottom') {
        this.componentRef.instance.top = bottom;
        this.componentRef.instance.left = (right - left) / 2 + left;
      } else if (this.direction === 'left') {
        this.componentRef.instance.top = bottom - ((bottom - top) / 2);
        this.componentRef.instance.left = left;
      } else if (this.direction === 'right') {
        this.componentRef.instance.top = bottom - ((bottom - top) / 2);
        this.componentRef.instance.left = right - left + left;
      }
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.destroy();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  destroy(): void {
    if (this.componentRef !== null) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}

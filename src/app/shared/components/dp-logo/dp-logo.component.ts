import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-dp-logo',
    templateUrl: './dp-logo.component.html',
    styleUrls: ['./dp-logo.component.scss'],
    standalone: false
})
export class DpLogoComponent implements OnInit, OnChanges {
  imgStyle: {} = {};
  logoStyles: {} = {};
  @Input() height!: string;
  @Input() width!: string;
  @Input() borderWidth!: string;

  ngOnInit() {
    this.logoStyles = {
      height: this.height,
      width: this.width
    };
    this.imgStyle = {
      borderWidth: this.borderWidth
    };
  }

  ngOnChanges() {
    this.ngOnInit();
  }
}
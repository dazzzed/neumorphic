import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lib-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() action: string;
  @Input() pressed: boolean;
  @Input() hex: string;

  rgbRoot: any;
  darker: any;
  lighter: any;
  shadow: string;
  lightRgba: string;
  lightRgb: { r: any; g: any; b: any };
  darkRgb: { r: any; g: any; b: any };
  darkRgba: string;
  border: string;
  constructor() {}

  ngOnInit() {
    this.rgbRoot = this.hexToRgb(this.hex);

    this.lightRgba = `${
      this.pressed ? 'inset -6px -6px 26px 0' : '-6px -6px 26px 0'
    } ${this.colorLuminance(this.hex, 0.03)}`;

    this.darkRgba = `${
      this.pressed ? 'inset 6px 6px 16px 0' : '6px 6px 16px 0'
    } ${this.colorLuminance(this.hex, -0.09)}`;

    this.border =
      '1px solid rgba(' +
      this.rgbRoot.r +
      ', ' +
      this.rgbRoot.g +
      ', ' +
      this.rgbRoot.b +
      ', 0.20)';
  }

  hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  }

  colorLuminance(hex: string, lum: number) {
    // validate hex string
    hex = this.validateHexString(hex);

    lum = lum || 0;

    // convert to decimal and change luminosity
    return this.changeLuminosity(hex, lum);
  }

  validateHexString(hex: string) {
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    return hex;
  }

  changeLuminosity(hex: string, lum: number) {
    let rgb = '#';
    let c: any;
    let i = 0;
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i * 2, 2), 16);
      c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
      rgb += ('00' + c).substr(c.length);
    }
    return rgb;
  }
}

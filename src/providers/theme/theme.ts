import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {  Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
//import * as Color from 'color';
import { Storage } from '@ionic/storage';
/*
  Generated class for the ThemeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ThemeProvider {

  constructor(public http: Http,@Inject(DOCUMENT) private document: Document,private storage: Storage) 
  {
    console.log('Hello ThemeProvider Provider');
    storage.get('theme').then(cssText => {
      this.setGlobalCSS(cssText);
    });
  }
  // Override all global variables with a new theme
  setTheme(theme) {
    const cssText = CSSTextGenerator(theme);
    this.setGlobalCSS(cssText);
    this.storage.set('theme', cssText);
  }

  // Define a single CSS variable
  setVariable(name, value) {
    this.document.documentElement.style.setProperty(name, value,"important");
    
  }
  getVariable(name){
    return this.document.documentElement.style.getPropertyValue(name);
  }

  private setGlobalCSS(css: string) {
    this.document.documentElement.style.cssText = css;
  }

  get storedTheme() {
    return this.storage.get('theme');
  }
}

const defaults = {
  primary: '#3880ff',
  secondary: '#0cd1e8',
  tertiary: '#7044ff',
  success: '#10dc60',
  warning: '#ffce00',
  danger: '#f04141',
  dark: '#222428',
  medium: '#989aa2',
  light: '#f4f5f8'
};

function CSSTextGenerator(colors) {
  colors = { ...defaults, ...colors };

  const {
    primary,
    secondary,
    tertiary,
    success,
    warning,
    danger,
    dark,
    medium,
    light
  } = colors;

  const shadeRatio = 0.1;
  const tintRatio = 0.1;

  return `
    --ion-color-base: ${light};
    --ion-color-contrast: ${dark};
    --ion-background-color: ${light};
    --ion-text-color: ${dark};
    

    --ion-color-primary: ${primary};
    --ion-color-primary-rgb: 56,128,255;
 
    --ion-color-primary-contrast-rgb: 255,255,255;
   

    --ion-color-secondary: ${secondary};
    --ion-color-secondary-rgb: 12,209,232;
    
    --ion-color-secondary-contrast-rgb: 255,255,255;
    

    --ion-color-tertiary:  ${tertiary};
    --ion-color-tertiary-rgb: 112,68,255;
    
    --ion-color-tertiary-contrast-rgb: 255,255,255;
  

    --ion-color-success: ${success};
    --ion-color-success-rgb: 16,220,96;
   
    --ion-color-success-contrast-rgb: 255,255,255;
    

    --ion-color-warning: ${warning};
    --ion-color-warning-rgb: 255,206,0;
    
    --ion-color-warning-contrast-rgb: 255,255,255;
   

    --ion-color-danger: ${danger};
    --ion-color-danger-rgb: 245,61,61;
    
    --ion-color-danger-contrast-rgb: 255,255,255;
  
    
    --ion-color-dark: ${dark};
    --ion-color-dark-rgb: 34,34,34;
    
    --ion-color-dark-contrast-rgb: 255,255,255;
    
    --ion-color-medium: ${medium};
    --ion-color-medium-rgb: 152,154,162;
    
    --ion-color-medium-contrast-rgb: 255,255,255;
 
    --ion-color-light: ${light};
    --ion-color-light-rgb: 244,244,244;
    
    --ion-color-light-contrast-rgb: 0,0,0;
   `;
}

/*function contrast(color, ratio = 0.8) {
  color = Color(color);
  return color.isDark() ? color.lighten(ratio) : color.darken(ratio);
}*/



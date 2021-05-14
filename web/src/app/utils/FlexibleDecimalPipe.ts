import { DecimalPipe } from '@angular/common';
import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flexibleDecimalPipe',
})
export class FlexibleDecimalPipe extends DecimalPipe {
  transform(value: number | string, digitsInfo?: string, locale?: string): string | null;
  transform(value: null | undefined, digitsInfo?: string, locale?: string): null;
  transform(value: number | string | null | undefined, digitsInfo?: string, locale?: string): string | null {

    let number = Number(value);
    if (typeof value === 'string' && isNaN(number)) return value;

    if (digitsInfo === null || typeof digitsInfo === 'undefined') {
      if (number >= 10 || number <= -10) {
        digitsInfo = '1.2-2';
      } else if (number >= 1 || number <= -1) {
        digitsInfo = '1.3-3';
      } else if (number >= 0.1 || number <= -0.1) {
        digitsInfo = '1.4-4';
      } else if (number >= 0.01 || number <= -0.01) {
        digitsInfo = '1.5-5';
      } else if (number >= 0.001 || number <= -0.001) {
        digitsInfo = '1.6-6';
      } else if (number >= 0.0001 || number <= -0.0001) {
        digitsInfo = '1.7-7';
      } else {
        digitsInfo = '1.8-8';
      }
    }

    return super.transform(value, digitsInfo, locale);
  }

  getPreferredDecimals(value: number, accumulatedValue: number = 2): number {
    if (value >= 10 || accumulatedValue === 8) return accumulatedValue;

    return this.getPreferredDecimals(value * 10, accumulatedValue + 1);
  }
}

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
      const preferredDecimal = this.getPreferredDecimal(number);

      digitsInfo = `1.${preferredDecimal}-${preferredDecimal}`;
    }

    return super.transform(value, digitsInfo, locale);
  }

  getPreferredDecimal(value: number, accumulatedValue: number = 2): number {
    if (value >= 10 || accumulatedValue === 8) return accumulatedValue;

    return this.getPreferredDecimal(value * 10, accumulatedValue + 1);
  }
}

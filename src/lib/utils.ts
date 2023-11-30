import {clsx} from 'clsx';
import type {ClassValue} from 'clsx';

export const cn = (...inputs: ClassValue[]) => {
	return clsx(inputs);
};

export function lerp(a: number, b: number, alpha: number) {
	return a + alpha * (b - a );
}

export function adjust(value: number, r0: number, r1: number, r2: number, r3: number) {
	var mag = Math.abs(value - r0), sgn = value < 0 ? -1 : 1;
	return sgn * mag * (r3 - r2) / (r1 - r0);
  }
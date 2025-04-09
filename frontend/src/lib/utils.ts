import {  clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type {ClassValue} from 'clsx';

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}

export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

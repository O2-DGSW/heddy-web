import type { Carrier, SignupStep } from '../model/types';

export const CARRIERS: Carrier[] = ['SKT', 'KT', 'LG U+', '알뜰폰'];

export const STEP_TITLE: Record<SignupStep, string> = {
  'type-select': '헤디에 오신것을 환영해요!',
  terms: '계정 생성',
  account: '계정 생성',
  shop: '상점 생성',
};
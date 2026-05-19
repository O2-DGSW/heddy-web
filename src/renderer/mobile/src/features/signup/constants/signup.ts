import type { MainCarrier, MvnoCarrier, SignupStep } from "../model/types";

export const MAIN_CARRIERS: MainCarrier[] = ["SKT", "KT", "LG U+"];

export const MVNO_CARRIERS: MvnoCarrier[] = ["SKT 알뜰폰", "KT 알뜰폰", "LGU+ 알뜰폰"];

export const STEP_TITLE: Record<SignupStep, string> = {
  "type-select": "헤디에 오신것을 환영해요!",
  terms: "계정 생성",
  account: "계정 생성",
  shop: "상점 생성",
};

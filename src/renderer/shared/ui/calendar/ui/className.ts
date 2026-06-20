export const getClassName = (...classNames: Array<false | null | undefined | string>) =>
  classNames.filter(Boolean).join(" ");

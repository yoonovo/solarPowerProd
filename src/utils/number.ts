export const insertComma = (num: string) => {
  const reg = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g;
  return num.replace(reg, ",");
};

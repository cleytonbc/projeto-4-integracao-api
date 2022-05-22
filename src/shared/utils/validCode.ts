function validCode(code: string) {
  return /^[A-Z]{2}[0-9]{9}[A-Z]{2}$/.test(code);
}
export { validCode };

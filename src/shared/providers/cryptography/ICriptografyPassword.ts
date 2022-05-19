interface ICriptografyPassword {
  Hash(password: string): Promise<string>;
  CompareHash(password: string, password_hash: string): Promise<boolean>;
}
export { ICriptografyPassword };

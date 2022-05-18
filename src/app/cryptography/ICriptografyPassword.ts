interface ICriptografyPassword {
  Hash(password: string): Promise<string>;
  CompareHash(password: string, passowrd_hash: string): Promise<boolean>;
}
export { ICriptografyPassword };

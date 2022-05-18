import { hash, compare } from "bcrypt";
import { ICriptografyPassword } from "../ICriptografyPassword";

class CriptografyPasswordBcrypt implements ICriptografyPassword {
  async Hash(password: string): Promise<string> {
    return hash(password, 8);
  }
  CompareHash(password: string, passowrd_hash: string): Promise<boolean> {
    return compare(password, passowrd_hash);
  }
}

export { CriptografyPasswordBcrypt };

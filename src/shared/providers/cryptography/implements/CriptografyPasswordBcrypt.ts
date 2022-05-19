import { hash, compare } from "bcrypt";
import { ICriptografyPassword } from "../ICriptografyPassword";

class CriptografyPasswordBcrypt implements ICriptografyPassword {
  async Hash(password: string): Promise<string> {
    return hash(password, 8);
  }
  async CompareHash(password: string, password_hash: string): Promise<boolean> {
    return compare(password, password_hash);
  }
}

export { CriptografyPasswordBcrypt };

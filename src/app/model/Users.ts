import { v4 as uuidV4 } from "uuid";

class Users {
  id: string;

  name: string;

  email: string;

  password_hash: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Users };

import { container } from "tsyringe";

import { IUserRepository } from "../../modules/User/repositories/IUserRepository";
import { UserRespository } from "../../modules/User/repositories/implements/UserRepository";
import { ITrackerRepository } from "../../modules/Tracker/repository/ITrackerRepository";
import { TrackerRepository } from "../../modules/Tracker/repository/implements/TrackerRepository";
import { ICriptografyPassword } from "../providers/cryptography";
import { CriptografyPasswordBcrypt } from "../providers/cryptography/implements/CriptografyPasswordBcrypt";

container.registerInstance<IUserRepository>(
  "UserRepository",
  new UserRespository(),
);
container.registerSingleton<ITrackerRepository>(
  "TrackerRepository",
  TrackerRepository,
);

container.registerSingleton<ICriptografyPassword>(
  "CriptografyPasswordBcrypt",
  CriptografyPasswordBcrypt,
);

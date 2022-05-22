import { ICreateTrackerDTO } from "../DTOS/ICreateTrackerDTO";
import { ITracker } from "../schemas/ITracker";

export interface ITrackerRepository {
  create(data: ICreateTrackerDTO): Promise<ITracker>;
  findByCode(code: string): Promise<ITracker>;
  findByUser(userId: string): Promise<ITracker[]>;
}

import { ICreateTrackerDTO } from "../DTOS/ICreateTrackerDTO";
import { IUpdateTrackerDTO } from "../DTOS/IUpdateTrackerDTO";
import { ITracker } from "../schemas/ITracker";

export interface ITrackerRepository {
  create(data: ICreateTrackerDTO): Promise<ITracker>;
  findByCodeAndUser(code: string, userId): Promise<ITracker>;
  findByUser(userId: string): Promise<ITracker[]>;
  findById(id: string): Promise<ITracker>;
  findAndUpdate(data: IUpdateTrackerDTO): Promise<ITracker>;
}

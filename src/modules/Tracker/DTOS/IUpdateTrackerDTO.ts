export interface IUpdateTrackerDTO {
  _id: string;
  code: string;
  service: string;
  userId: string;
  isDelivery: boolean;
  amount: number;
  lastUpdate: Date;
  events: object;
}

export interface IUpdateTrackerDTO {
  _id: string;
  code: string;
  description: string;
  service: string;
  userId: string;
  isDelivery: boolean;
  amount: number;
  lastUpdate: Date;
  events: object;
}

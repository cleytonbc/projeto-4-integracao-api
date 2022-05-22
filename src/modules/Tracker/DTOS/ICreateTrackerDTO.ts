export interface ICreateTrackerDTO {
  code: string;
  service: string;
  userId: string;
  isDelivery: boolean;
  amount: number;
  lastUpdate: Date;
  events: object;
}

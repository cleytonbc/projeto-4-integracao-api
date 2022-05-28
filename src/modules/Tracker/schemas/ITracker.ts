export interface ITracker {
  _id?: string;
  code: string;
  description: string;
  service?: string;
  userId: string;
  isDelivery: boolean;
  amount: number;
  lastUpdate: Date;
  events: {
    date?: string;
    hour?: string;
    locality?: string;
    status?: string;
    subStatus?: object;
  }[];
}

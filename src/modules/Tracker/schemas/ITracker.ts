export interface ITracker {
  _id: string;
  code: string;
  service: string;
  userId: string;
  isDelivery: boolean;
  amount: number;
  events: [
    {
      date: string;
      hour: string;
      locality: string;
      status: string;
      subStatus: [];
    },
  ];
}

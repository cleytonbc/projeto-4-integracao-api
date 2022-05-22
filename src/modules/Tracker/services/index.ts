import { CallApiTrackerServices } from "./callApiTrackerServices";

const call = new CallApiTrackerServices();

//call.execute("qj292916754br");
//call.execute("qj292916754bl");
const response = async () => {
  const res = await call.execute("qj292916754br", "huahusihauiah");
  console.log(res);
};
response();

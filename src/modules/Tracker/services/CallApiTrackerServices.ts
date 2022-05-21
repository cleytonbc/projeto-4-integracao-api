import { AxiosResponse } from "axios";
import apiTrack from "../../../shared/api/apiTrack";
import { ITracker } from "../schemas/ITracker";

interface IResponse {
  codigo: string;
  host: string;
  time: number;
  quantidade: number;
  servico: string;
  ultimo: string;
  eventos?: [
    {
      status: string;
      local: string;
      data: string;
      hora: string;
      subStatus: object;
    },
  ];
}

class CallApiTrackerServices {
  async execute(code: string, userId: string) {
    const response: AxiosResponse<IResponse> = await apiTrack
      .get("", {
        params: {
          user: process.env.LINKETRACK_USER,
          token: process.env.LINKETRACK_TOKEN,
          codigo: code,
        },
      })
      .catch(err => err);

    if (!response.data) {
      return { error: true };
    } else if (response.status === 200) {
      const { codigo, servico, quantidade, eventos } = response.data;

      const track = {
        code: codigo,
        service: servico,
        userId,
        isDelivery: false,
        amount: quantidade,
        events: eventos.map(evento => {
          return {
            date: evento.data,
            hour: evento.hora,
            locality: evento.local,
            status: evento.status,
            subStatus: evento.subStatus,
          };
        }),
      };
      return track;
    } else if (response.status === 401) {
      return { message: "erro ao consultar codigo" };
    }
  }
}

export { CallApiTrackerServices };

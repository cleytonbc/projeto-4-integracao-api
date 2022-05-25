import { AxiosResponse } from "axios";
import apiTrack from "../../../shared/api/apiTrack";
import { AppError } from "../../../shared/errors/AppError";
import { convertDateStrAndHouStr } from "../../../shared/utils/convertDate";
import { validCode } from "../../../shared/utils/validCode";
import { ITracker } from "../schemas/ITracker";

interface IResponseTracker {
  codigo: string;
  host: string;
  time: number;
  quantidade: number;
  servico: string;
  ultimo?: string;
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
interface IResponseError {
  error: boolean;
  message: string;
}

class CallApiTrackerJobServices {
  async execute(code: string, userId: string): Promise<ITracker> {
    const codeFomartIsValid = validCode(code);

    if (!codeFomartIsValid) {
      return;
    }

    const response: AxiosResponse<IResponseTracker> = await apiTrack
      .get("", {
        params: {
          user: process.env.LINKETRACK_USER,
          token: process.env.LINKETRACK_TOKEN,
          codigo: code,
        },
      })
      .catch(err => err);

    try {
      const { codigo, servico, quantidade, eventos } = response.data;
      let lastUpdate: Date;
      let isDelivery = false;

      if (eventos.length > 0) {
        lastUpdate = convertDateStrAndHouStr(eventos[0].data, eventos[0].hora);

        if (eventos[0].status === "Objeto entregue ao destinatário") {
          isDelivery = true;
        }
      } else {
        lastUpdate = new Date();
      }

      return {
        code: codigo,
        service: servico,
        userId,
        isDelivery,
        amount: quantidade,
        lastUpdate,
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
    } catch {
      return;
    }
  }
}

export { CallApiTrackerJobServices };

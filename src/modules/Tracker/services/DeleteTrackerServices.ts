import { AppError } from "../../../shared/errors/AppError";
import { TrackerRepository } from "../repository/implements/TrackerRepository";
import { ITrackerRepository } from "../repository/ITrackerRepository";

class DeleteTrackerServices {
  private trackerRepository: ITrackerRepository;
  constructor() {
    this.trackerRepository = new TrackerRepository();
  }
  async execute(id: string, userId: string) {
    const trackerExists = await this.trackerRepository.findById(id);

    if (!trackerExists) {
      throw new AppError("Rastreio não encontrado para esse usuário");
    }

    if (trackerExists.userId !== userId) {
      throw new AppError(
        "Não é possível excluir esse rastreio, verifique usas permissões",
        403,
      );
    }

    await this.trackerRepository.delete(id);
  }
}

export { DeleteTrackerServices };

import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import auth from "../../../config/auth";
import { UserRespository } from "../../../modules/User/repositories/implements/UserRepository";
import { AppError } from "../../errors/AppError";

interface IPayload {
  sub: string;
}

export async function authenticatedUser(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  const { secret_token } = auth;

  if (!authHeader) {
    throw new AppError("Token não informado", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, secret_token) as IPayload;

    const userRepository = new UserRespository();

    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new AppError("Usuario não existe",401);
    }

    request.user = {
      id: user._id,
    };

    next();
  } catch {
    throw new AppError("Token inválido",401);
  }
}

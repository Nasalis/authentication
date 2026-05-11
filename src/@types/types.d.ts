import type { UserDTO } from "../@dto/UserDTO.ts";

declare global {
  namespace Express {
    interface Request {
      user?: UserDTO;
    }
  }
}

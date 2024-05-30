import { User as ExternalUser } from "@/database/entity/User";

declare global {
  namespace Express {
    interface User extends ExternalUser {}
  }
}

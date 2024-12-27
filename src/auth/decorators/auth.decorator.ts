import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles.guard";
import { Role } from "../enum/rol.enum";
import { Roles } from "./roles.decorator";

export function Auth(role:Role[]){
    return applyDecorators(Roles(role), UseGuards (AuthGuard, RolesGuard));
}
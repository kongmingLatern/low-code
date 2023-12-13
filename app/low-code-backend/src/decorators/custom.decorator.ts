import { SetMetadata } from '@nestjs/common';

export const RequireLogin = (bool: boolean = true) =>
  SetMetadata('require-login', bool);

export const RequireRole = (role) => SetMetadata('require-role', role);

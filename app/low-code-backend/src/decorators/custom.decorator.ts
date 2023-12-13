import { SetMetadata } from '@nestjs/common';

export const RequireLogin = () => SetMetadata('require-login', true);

export const RequireRole = (role) => SetMetadata('require-role', role);

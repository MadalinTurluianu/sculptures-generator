import { CanMatchFn } from '@angular/router';

export const canMatchEditOrderGuard: CanMatchFn = (route) => {
  console.log(route);

  return false;
};

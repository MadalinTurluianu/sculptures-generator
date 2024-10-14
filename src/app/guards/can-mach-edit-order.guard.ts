import { CanMatchFn } from '@angular/router';

export const canMatchEditOrderGuard: CanMatchFn = (_route, segments) => {
  if (segments[segments.length - 1].path === 'new') {
    return false;
  }

  return true;
};

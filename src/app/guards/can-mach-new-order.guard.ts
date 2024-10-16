import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { SculpturesService } from 'app/services/sculptures.service';

export const canMatchNewOrderGuard: CanMatchFn = async () => {
  const sculpturesService = inject(SculpturesService);

  const sculptures = await sculpturesService.getAll();

  if (sculptures.length > 0) return true;

  window.alert(
    'You must have at least one sculpture. \nYou will be redirected to the new sculpture page.'
  );

  window.electronAPI?.fixFocus();

  return false;
};

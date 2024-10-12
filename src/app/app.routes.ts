import { Routes } from '@angular/router';
import { OrdersComponent } from './components/orders/orders.component';
import { canDeactivateFormGuard } from './guards/can-deactivate-form.guard';
import { EditOrderComponent } from './components/edit-order/edit-order.component';
import { SculpturesComponent } from './components/sculptures/sculptures.component';
import { EditSculptureComponent } from './components/edit-sculpture/edit-sculpture.component';
import { canMatchNewOrderGuard } from './guards/can-mach-new-order.guard';
import { canMatchEditOrderGuard } from './guards/can-mach-edit-order.guard';

export const routes: Routes = [
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'orders/new',
    loadComponent: () =>
      import('./components/edit-order/edit-order.component').then(
        (modules) => modules.EditOrderComponent
      ),
    canDeactivate: [canDeactivateFormGuard],
    canMatch: [canMatchNewOrderGuard],
  },
  {
    path: 'orders/:id',
    loadComponent: () =>
      import('./components/edit-order/edit-order.component').then(
        (modules) => modules.EditOrderComponent
      ),
    canDeactivate: [canDeactivateFormGuard],
    canMatch: [canMatchEditOrderGuard],
  },
  {
    path: 'sculptures',
    loadComponent: () =>
      import('./components/sculptures/sculptures.component').then(
        (modules) => modules.SculpturesComponent
      ),
  },
  {
    path: 'sculptures/new',
    loadComponent: () =>
      import('./components/edit-sculpture/edit-sculpture.component').then(
        (modules) => modules.EditSculptureComponent
      ),
    canDeactivate: [canDeactivateFormGuard],
  },
  {
    path: 'sculptures/:id',
    loadComponent: () =>
      import('./components/edit-sculpture/edit-sculpture.component').then(
        (modules) => modules.EditSculptureComponent
      ),
    canDeactivate: [canDeactivateFormGuard],
  },
  {
    path: 'orders/:id',
    redirectTo: 'sculptures/new',
  },
  {
    path: '',
    redirectTo: 'orders',
    pathMatch: 'full',
  },
];

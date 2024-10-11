import { Routes } from '@angular/router';
import { OrdersComponent } from './components/orders/orders.component';
import { canDeactivateForm } from './app.guards';

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
    canDeactivate: [canDeactivateForm],
  },
  {
    path: 'orders/:id',
    loadComponent: () =>
      import('./components/edit-order/edit-order.component').then(
        (modules) => modules.EditOrderComponent
      ),
    canDeactivate: [canDeactivateForm],
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
    canDeactivate: [canDeactivateForm],
  },
  {
    path: 'sculptures/:id',
    loadComponent: () =>
      import('./components/edit-sculpture/edit-sculpture.component').then(
        (modules) => modules.EditSculptureComponent
      ),
    canDeactivate: [canDeactivateForm],
  },
  {
    path: '',
    redirectTo: 'orders',
    pathMatch: 'full',
  },
];

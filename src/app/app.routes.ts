import { Routes } from '@angular/router';
import { OrdersComponent } from './components/orders/orders.component';

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
  },
  {
    path: 'orders/:id',
    loadComponent: () =>
      import('./components/edit-order/edit-order.component').then(
        (modules) => modules.EditOrderComponent
      ),
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
  },
  {
    path: 'sculptures/:id',
    loadComponent: () =>
      import('./components/edit-sculpture/edit-sculpture.component').then(
        (modules) => modules.EditSculptureComponent
      ),
  },
  {
    path: '',
    redirectTo: 'orders',
    pathMatch: 'full',
  },
];

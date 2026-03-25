import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      { path: '', redirectTo: 'data', pathMatch: 'full' },
      { path: 'data', loadComponent: () => import('./components/data-table/data-table.component').then(m => m.DataTableComponent) },
      { path: 'charts', loadComponent: () => import('./components/charts/charts.component').then(m => m.ChartsComponent) },
      { path: 'map', loadComponent: () => import('./components/map/map.component').then(m => m.MapComponent) }
    ]
  }
];
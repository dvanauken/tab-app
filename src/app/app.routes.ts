import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeoComponent } from './geo/geo.component';
import { TableTreeComponent } from './table-tree/table-tree.component'; // Import your components

const routes: Routes = [
  { path: 'geox', component: GeoComponent },  // Route to GeoComponent
  { path: 'todo', component: TableTreeComponent },  // Route to TableTreeComponent
  { path: '', redirectTo: '/geox', pathMatch: 'full' }  // Redirect root path to /geox
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Initialize routing with the configured routes
  exports: [RouterModule]  // Export RouterModule so it can be used in other parts of the app
})
export class AppRoutingModule { }

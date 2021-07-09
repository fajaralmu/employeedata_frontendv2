import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';
import { AppListComponent } from './app-list/app-list.component';
import { AppFormComponent } from './app-form/app-form.component';
import { AppFormPositionComponent } from './app-form-position/app-form-position.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'addEdit', component: AppFormComponent },
  { path: 'addRole', component: AppFormPositionComponent },
  { path: 'index', component: AppListComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  


exports: [RouterModule]
})
export class AppRoutingModule { }

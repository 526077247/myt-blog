import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {PageNotFoundComponent} from './component/page-not-found/page-not-found.component';
import {ContainerComponent} from './component/container/container.component';
import {LoginComponent} from './component/login/login.component';
import {LoginGuard} from './guard/login.guard';
import {EditComponent} from './component/edit/edit.component';
import {ListComponent} from './component/list/list.component';
import { ShowComponent } from './component/show/show.component';


const routes: Routes = [{
  path: '',
  component: ContainerComponent,
  children: [
    {path: '', component: HomeComponent},
    {path: 'list', component: ListComponent},
    {path: 'list/:type', component: ListComponent},
    {path: 'login', component: LoginComponent},
    {path: 'details/:id', component: ShowComponent},
    {
      path: 'edit',
      canActivate: [LoginGuard],
      children: [
        {path: '', component: EditComponent},
        {path: ':id', component: EditComponent},
      ]
    },
    {path: '404', component: PageNotFoundComponent},
  ]
},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

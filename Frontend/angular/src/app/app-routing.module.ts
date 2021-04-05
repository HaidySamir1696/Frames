import { AddProjectComponent } from './admin/add-project/add-project.component';
import { ProjectsAdminComponent } from './admin/projects-admin/projects-admin.component';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './admin/login/login.component';
import { AddImgComponent } from './admin/add-img/add-img.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"about",
    component:AboutComponent
  },
  {
    path:"projects",
    component:ProjectsComponent
  },
  {
    path:"products",
    component:ProductsComponent
  },
  {
    path:"contact",
    component:ContactComponent
  },
  {
  path:"login",
  component:LoginComponent
  },
  {
    path:"projectsAdmin",
    component:ProjectsAdminComponent
  },
  {
    path:"addProject",
    component:AddProjectComponent
  },
  {
    path:"addImg",
    component:AddImgComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

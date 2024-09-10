import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Component } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';

export const routes: Routes = [
    { path:"", redirectTo:"/inicio", pathMatch:"full"},
    {path:"inicio", component:DashboardComponent},
    {path:"iniciar-sesion", component:LoginComponent},
    {path:"user-list", component:UserListComponent},
    {path:"**", redirectTo:"inicio", pathMatch:"full"}  
];

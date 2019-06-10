import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from 'src/app/core/guards/auth-guard.service';
import { UnauthorizedAccessComponent } from './core/unauthorized-access/unauthorized-access.component';
// import { GetFormComponent } from './features/get-form/get-form.component';
import { MainComponent } from './features/main/main.component';
import { CreateJobComponent } from './features/create-job/create-job.component';

const routes: Routes = [
    {
        path: 'login',
        loadChildren:
            './features/login/login.module#LoginModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'home',
        loadChildren:
            './features/home-component/home.module#HomeModule',
        canActivate: [AuthGuard]
    },
    {
        path:'main',
        component:MainComponent,
        children:[
            { path: 'create-job', component: CreateJobComponent},
        ]

    },



    {
        path: 'unauthorized-access',
        component: UnauthorizedAccessComponent
    },

    {
        path: '**',
        redirectTo: '/login'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class Routing { }

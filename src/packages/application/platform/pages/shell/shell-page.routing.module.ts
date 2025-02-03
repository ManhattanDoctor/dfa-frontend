import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterService } from '@core/service';
import { LoginGuard } from '@ts-core/angular';
import { ShellPageComponent } from './shell-page.component';

const routes: Routes = [
    {
        path: '',
        component: ShellPageComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('../main/main-page.module')
            },
            {
                path: RouterService.ABOUT_URL,
                loadChildren: () => import('@page/about/about-page.module')
            },
            {
                path: RouterService.PROFILE_URL,
                canActivate: [LoginGuard],
                loadChildren: () => import('@page/profile/profile-page.module')
            },
            {
                path: '**',
                loadChildren: () => import('@page/not-found/not-found-page.module'),
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShellPageRoutingModule { }

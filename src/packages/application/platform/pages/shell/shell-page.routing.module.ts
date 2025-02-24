import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterService } from '@core/service';
import { CompanyResolver, UserResolver } from '@shared/resolver';
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
                path: RouterService.USER_URL,
                loadChildren: () => import('@page/user/user-page.module'),
                resolve: { item: UserResolver },
            },
            {
                path: `${RouterService.USER_URL}/:id`,
                loadChildren: () => import('@page/user/user-page.module'),
                resolve: { item: UserResolver },
            },
            {
                path: RouterService.COMPANY_URL,
                loadChildren: () => import('@page/company/company-page.module'),
                resolve: { item: CompanyResolver },
            },
            {
                path: `${RouterService.COMPANY_URL}/:id`,
                loadChildren: () => import('@page/company/company-page.module'),
                resolve: { item: CompanyResolver },
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

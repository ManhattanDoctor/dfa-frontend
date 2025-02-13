import { NgModule } from '@angular/core';
import { RouterModule, Routes, NoPreloading } from '@angular/router';
import { LanguageResolver, LoginIfCanGuard, LoginNotGuard, LoginResolver } from '@ts-core/angular';
import { RouterService, SocketResolver } from '@core/service';
import { PermissionResolver } from '@shared/resolver';

const routes: Routes = [
    {
        path: RouterService.LOGIN_URL,
        resolve: {
            language: LanguageResolver,
        },
        canActivate: [LoginNotGuard],
        loadChildren: () => import('@page/login/login-page.module')
    },
    {
        path: RouterService.OAUTH_URL,
        loadChildren: () => import('@page/oauth/oauth-page.module')
    },
    {
        path: '',
        resolve: {
            login: LoginResolver,
            socket: SocketResolver,
            language: LanguageResolver,
            permission: PermissionResolver
        },
        canActivate: [LoginIfCanGuard],
        loadChildren: () => import('../pages/shell/shell-page.module')
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', scrollPositionRestoration: 'top', preloadingStrategy: NoPreloading, enableTracing: false })],
    exports: [RouterModule]
})
export class RootRoutingModule { }


//--------------------------------------------------------------------------
//
// 	Imports
//
//--------------------------------------------------------------------------

import { UserModule } from '@feature/user';
import { OAuthModule } from '@feature/oauth';
import { LoginModule } from '@feature/login';
import { CompanyModule } from '@feature/company';

export let LAZY_MODULES: Array<any> = [
    {
        id: LoginModule.ID,
        commands: LoginModule.COMMANDS,
        path: async () => (await import('@feature/login')).LoginModule
    },
    {
        id: UserModule.ID,
        commands: UserModule.COMMANDS,
        path: async () => (await import('@feature/user')).UserModule
    },
    {
        id: CompanyModule.ID,
        commands: CompanyModule.COMMANDS,
        path: async () => (await import('@feature/company')).CompanyModule
    },
    {
        id: OAuthModule.ID,
        commands: OAuthModule.COMMANDS,
        path: async () => (await import('@feature/oauth')).OAuthModule,
    }
];

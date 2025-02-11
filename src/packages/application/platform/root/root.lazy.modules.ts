//--------------------------------------------------------------------------
//
// 	Imports
//
//--------------------------------------------------------------------------

import { UserModule } from '@feature/user';
import { OAuthModule } from '@feature/oauth';
import { LoginModule } from '@feature/login';

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
        id: OAuthModule.ID,
        commands: OAuthModule.COMMANDS,
        path: async () => (await import('@feature/oauth')).OAuthModule,
    }
];

//--------------------------------------------------------------------------
//
// 	Imports
//
//--------------------------------------------------------------------------

import { OAuthModule } from '@feature/oauth';
import { LoginModule } from '@feature/login';
import { ProfileModule } from '@feature/profile';

export let LAZY_MODULES: Array<any> = [
    {
        id: LoginModule.ID,
        commands: LoginModule.COMMANDS,
        path: async () => (await import('@feature/login')).LoginModule
    },
    {
        id: ProfileModule.ID,
        commands: ProfileModule.COMMANDS,
        path: async () => (await import('@feature/profile')).ProfileModule
    },
   
    {
        id: OAuthModule.ID,
        commands: OAuthModule.COMMANDS,
        path: async () => (await import('@feature/oauth')).OAuthModule,
    }
];

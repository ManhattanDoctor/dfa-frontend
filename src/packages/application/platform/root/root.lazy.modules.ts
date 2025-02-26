//--------------------------------------------------------------------------
//
// 	Imports
//
//--------------------------------------------------------------------------

import { HlfModule } from '@feature/hlf';
import { CoinModule } from '@feature/coin';
import { UserModule } from '@feature/user';
import { OAuthModule } from '@feature/oauth';
import { LoginModule } from '@feature/login';
import { EntityModule } from '@feature/entity';
import { CompanyModule } from '@feature/company';

export let LAZY_MODULES: Array<any> = [
    {
        id: HlfModule.ID,
        commands: HlfModule.COMMANDS,
        path: async () => (await import('@feature/hlf')).HlfModule
    },
    {
        id: LoginModule.ID,
        commands: LoginModule.COMMANDS,
        path: async () => (await import('@feature/login')).LoginModule
    },
    {
        id: EntityModule.ID,
        commands: EntityModule.COMMANDS,
        path: async () => (await import('@feature/entity')).EntityModule
    },
    {
        id: UserModule.ID,
        commands: UserModule.COMMANDS,
        path: async () => (await import('@feature/user')).UserModule
    },
    {
        id: CoinModule.ID,
        commands: CoinModule.COMMANDS,
        path: async () => (await import('@feature/coin')).CoinModule
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

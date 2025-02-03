import { InjectionToken } from "@angular/core";

export interface IServerInitializeOptions {
    config: any;
    locales: Map<string, any>;
}

export const SERVER_INITIALIZE_OPTIONS = new InjectionToken<IServerInitializeOptions>('SERVER_INITIALIZE_OPTIONS');


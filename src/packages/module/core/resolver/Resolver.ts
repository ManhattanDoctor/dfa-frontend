import { ActivatedRouteSnapshot, Resolve as BaseResolver, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { RouterService } from '@core/service';
import { RouterBaseService, WindowService } from '@ts-core/angular';
import * as _ from 'lodash';

export abstract class Resolver<T> implements BaseResolver<T> {
    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(protected windows: WindowService, protected router: RouterBaseService) { }

    // --------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    // --------------------------------------------------------------------------

    protected parseError(message: string, isShowWindowInfo: boolean): Promise<T> {
        if (isShowWindowInfo) {
            this.windows.info(message);
        }
        this.router.navigate(RouterService.DEFAULT_URL);
        return Promise.reject(message);
    }

    abstract resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<T>;
}
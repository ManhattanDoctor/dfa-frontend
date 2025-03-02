import { Component, ViewContainerRef } from '@angular/core';
import { ViewUtil } from '@ts-core/angular';
import { Transport } from '@ts-core/common';
import { takeUntil } from 'rxjs'
import { Coin } from '@common/platform/coin';
import { ActivatedRoute } from '@angular/router';
import { PipeService } from '@core/service';
import { SeoCommand } from '@core/transport';
import { EntityObjectComponent } from '@shared/component';
import { EntityObjectType } from '@feature/entity';
import * as _ from 'lodash';

@Component({
    templateUrl: './coin-page.component.html',
    standalone: false
})
export class CoinPageComponent extends EntityObjectComponent<Coin> {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ViewContainerRef, transport: Transport, route: ActivatedRoute, private pipe: PipeService) {
        super(container, transport);
        ViewUtil.addClasses(container, 'h-100');
        route.data.pipe(takeUntil(this.destroyed)).subscribe(data => this.item = data.item);
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    protected async commitItemProperties(): Promise<void> {
        super.commitItemProperties();
        this.transport.send(new SeoCommand({ title: this.pipe.coinName.transform(this.item), description: this.pipe.coinDescription.transform(this.item), image: this.item.picture }));
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get type(): EntityObjectType {
        return EntityObjectType.COIN;
    }
}
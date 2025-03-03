import { Component, ViewContainerRef } from '@angular/core';
import { ViewUtil } from '@ts-core/angular';
import { Transport } from '@ts-core/common';
import { takeUntil } from 'rxjs'
import { User } from '@common/platform/user';
import { ActivatedRoute } from '@angular/router';
import { PipeService } from '@core/service';
import { SeoCommand } from '@core/transport';
import { EntityComponent } from '@shared/component';
import { EntityType } from '@feature/entity';
import * as _ from 'lodash';

@Component({
    templateUrl: './user-page.component.html',
    standalone: false
})
export class UserPageComponent extends EntityComponent<User> {

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
        this.transport.send(new SeoCommand({ title: this.pipe.userName.transform(this.item), description: this.pipe.userDescription.transform(this.item), image: this.item.preferences.picture }));
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get type(): EntityType {
        return EntityType.USER;
    }
}
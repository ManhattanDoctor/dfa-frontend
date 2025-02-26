import { Injectable } from '@angular/core';
import { Logger } from '@ts-core/common';
import { Transport } from '@ts-core/common';
import { EntityObjectService, RouterService } from '@core/service';
import { CompanyOpenCommand } from '../CompanyOpenCommand';
import { Client } from '@common/platform/api';
import { Company } from '@common/platform/company';
import { EntityObjectHandler } from '@feature/entity/transport/handler';
import { BottomSheetService, WindowService } from '@ts-core/angular';
import { ComponentType } from '@angular/cdk/portal';
import { EntityObjectId } from '@feature/entity';
import { CompanyContainerComponent } from '@shared/component';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class CompanyOpenHandler extends EntityObjectHandler<Company> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------


    constructor(logger: Logger, transport: Transport, windows: WindowService, sheets: BottomSheetService, router: RouterService, private api: Client, private entityObject: EntityObjectService) {
        super(logger, transport, CompanyOpenCommand.NAME, windows, sheets, router);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected getUrl(id: EntityObjectId): string {
        return `${RouterService.COMPANY_URL}/${id}`;
    }

    protected getPrefix(): string {
        return 'company';
    }

    protected getComponent(): ComponentType<any> {
        return CompanyContainerComponent;
    }

    protected async getItem(id: EntityObjectId): Promise<Company> {
        if (_.isString(id)) {
            id = await this.entityObject.id(id);
        }
        return this.api.companyGet(Number(id));
    }

}

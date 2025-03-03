import { Injectable } from '@angular/core';
import { Logger } from '@ts-core/common';
import { Transport } from '@ts-core/common';
import { EntityService, RouterService } from '@core/service';
import { CompanyOpenCommand } from '../CompanyOpenCommand';
import { Client } from '@common/platform/api';
import { Company } from '@common/platform/company';
import { EntityHandler } from '@feature/entity/transport/handler';
import { BottomSheetService, WindowService } from '@ts-core/angular';
import { ComponentType } from '@angular/cdk/portal';
import { EntityId } from '@feature/entity';
import { CompanyContainerComponent } from '@shared/component';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class CompanyOpenHandler extends EntityHandler<Company> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------


    constructor(logger: Logger, transport: Transport, windows: WindowService, sheets: BottomSheetService, router: RouterService, private api: Client, private entity: EntityService) {
        super(logger, transport, CompanyOpenCommand.NAME, windows, sheets, router);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected getUrl(id: EntityId): string {
        return `${RouterService.COMPANY_URL}/${id}`;
    }

    protected getPrefix(): string {
        return 'company';
    }

    protected getComponent(): ComponentType<any> {
        return CompanyContainerComponent;
    }

    protected async getItem(id: EntityId): Promise<Company> {
        if (_.isString(id)) {
            id = await this.entity.id(id);
        }
        return this.api.companyGet(Number(id));
    }

}

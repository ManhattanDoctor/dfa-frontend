import { Injectable } from '@angular/core';
import { Logger, Transport, TransportCommandAsyncHandler } from '@ts-core/common';
import { Client } from '@common/platform/api';
import { CompanySaveCommand, ICompanyEditDto } from '../CompanySaveCommand';
import { Company } from '@common/platform/company';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class CompanySaveHandler extends TransportCommandAsyncHandler<ICompanyEditDto, Company, CompanySaveCommand> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(transport: Transport, logger: Logger, private api: Client) {
        super(logger, transport, CompanySaveCommand.NAME);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected async execute(params: ICompanyEditDto): Promise<Company> {
        return this.api.companyEdit(params.id, params);
    }
}

import { TransportCommandAsync } from '@ts-core/common';
import { Company } from '@common/platform/company';

export class CompanyEditCommand extends TransportCommandAsync<number, ICompanyEditDtoResponse> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'CompanyEditCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: number) {
        super(CompanyEditCommand.NAME, request);
    }
}

export type ICompanyEditDtoResponse = Company;

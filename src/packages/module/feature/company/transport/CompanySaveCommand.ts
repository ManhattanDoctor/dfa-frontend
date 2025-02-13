import { TransportCommandAsync } from '@ts-core/common';
import { Company, CompanyPreferences, CompanyStatus } from '@common/platform/company';

export class CompanySaveCommand extends TransportCommandAsync<ICompanyEditDto, Company> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'CompanySaveCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: ICompanyEditDto) {
        super(CompanySaveCommand.NAME, request);
    }
}

export interface ICompanyEditDto {
    id: number;
    status?: CompanyStatus;
    preferences?: Partial<CompanyPreferences>;
}


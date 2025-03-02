import { TransportCommandAsync } from '@ts-core/common';
import { Company, CompanyPreferences, CompanyStatus } from '@common/platform/company';

export class CompanySaveCommand extends TransportCommandAsync<ICompanySaveDto, Company> {
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

    constructor(request: ICompanySaveDto) {
        super(CompanySaveCommand.NAME, request);
    }
}

export interface ICompanySaveDto {
    id: number;
    preferences?: Partial<CompanyPreferences>;
}


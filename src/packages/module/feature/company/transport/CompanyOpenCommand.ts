import { TransportCommand } from '@ts-core/common';

export class CompanyOpenCommand extends TransportCommand<ICompanyOpenDto> {
    // --------------------------------------------------------------------------
    //
    //   Constants
    //
    // --------------------------------------------------------------------------

    public static NAME = 'CompanyOpenCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: ICompanyOpenDto) {
        super(CompanyOpenCommand.NAME, request);
    }
}

export interface ICompanyOpenDto {
    id: number;
    isBriefly?: boolean;
}

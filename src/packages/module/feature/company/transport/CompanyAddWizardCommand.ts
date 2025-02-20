import { TransportCommand } from '@ts-core/common';

export class CompanyAddWizardCommand extends TransportCommand<void> {
    // --------------------------------------------------------------------------
    //
    //   Constants
    //
    // --------------------------------------------------------------------------

    public static NAME = 'CompanyAddWizardCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor() {
        super(CompanyAddWizardCommand.NAME);
    }
}

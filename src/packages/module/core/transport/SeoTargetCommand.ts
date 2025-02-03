import { TransportCommand } from '@ts-core/common';

export class SeoTargetCommand extends TransportCommand<string> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'SeoTargetCommand';

    // --------------------------------------------------------------------------
    //`
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: string) {
        super(SeoTargetCommand.NAME, request);
    }
}
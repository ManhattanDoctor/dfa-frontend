import { TransportCommand } from '@ts-core/common';

export class SeoCommand extends TransportCommand<ISeoDto> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'SeoCommand';

    // --------------------------------------------------------------------------
    //`
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: ISeoDto) {
        super(SeoCommand.NAME, request);
    }
}

export interface ISeoDto {
    link?: string;
    title?: string;
    image?: string;
    description?: string;
}

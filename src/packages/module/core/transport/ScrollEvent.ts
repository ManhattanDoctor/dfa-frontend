import { TransportEvent } from '@ts-core/common';

export class ScrollEvent extends TransportEvent<IScrollEventDto> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'ScrollEvent';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: IScrollEventDto) {
        super(ScrollEvent.NAME, request);
    }
}

export interface IScrollEventDto {
    isTop?: boolean;
    isBottom?: boolean;
}

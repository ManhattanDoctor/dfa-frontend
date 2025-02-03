import * as _ from 'lodash';
import { Injectable } from "@angular/core";
import { Transport, TransportCommandAsyncHandler } from "@ts-core/common";
import { Logger } from "@ts-core/common";
import { OAuthLoginCommand } from "../OAuthLoginCommand";
import { OAuthService } from "../../service";
import { LoginResource } from '@common/platform/api/login';
import { IOAuthDto } from '@ts-core/oauth';

@Injectable({ providedIn: 'root' })
export class OAuthLoginHandler extends TransportCommandAsyncHandler<LoginResource, IOAuthDto, OAuthLoginCommand>  {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(logger: Logger, transport: Transport, private service: OAuthService) {
        super(logger, transport, OAuthLoginCommand.NAME);
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    //--------------------------------------------------------------------------

    protected async execute(resource: LoginResource): Promise<IOAuthDto> {
        return this.service.getAuth(resource).getCode();
    };
}

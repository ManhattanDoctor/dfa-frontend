import { Logger, getUid, LoggerWrapper, UID } from '@ts-core/common';
import { Client } from '@common/platform/api';
import { Assets } from '@ts-core/frontend';
import { Injectable } from '@angular/core';
import { PipeService } from './PipeService';
import { getType } from '@common/hlf';
import { IEntityObject } from '@common/platform/api/entity';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class EntityObjectService extends LoggerWrapper {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    private map: Map<string, Promise<IEntityObject>>;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(logger: Logger, private pipe: PipeService, private api: Client) {
        super(logger);
        this.map = new Map();
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public async id(item: UID): Promise<number> {
        let { id } = await this.get(item);
        return id;
    }

    public async picture(item: UID): Promise<string> {
        let { picture } = await this.get(item);
        return picture;
    }

    public async name(item: UID): Promise<string> {
        let { name } = await this.get(item);
        return name;
    }

    public async get(item: UID): Promise<IEntityObject> {
        let uid = getUid(item);
        if (this.map.has(uid)) {
            return this.map.get(uid)
        }
        let promise = new Promise<IEntityObject>(async resolve => {
            let item = null;
            try {
                item = await this.api.entityObjectGet(uid);
            }
            catch (error) {
                item = { id: null, name: this.pipe.language.translate('general.unknown'), type: getType(uid), picture: Assets.getIcon('72') };
            }
            finally {
                resolve(item);
            }
        })
        this.map.set(uid, promise);
        return promise;
    }
}

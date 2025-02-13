import { Injectable } from '@angular/core';
import { Destroyable, UrlUtil } from '@ts-core/common';
import { Transport } from '@ts-core/common';
import { ISeoDto, SeoCommand, SeoTargetCommand } from '../transport';
import { takeUntil } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { LanguageService } from '@ts-core/frontend';
import { IViewElement, LanguagePipe, PlatformService, ViewUtil } from '@ts-core/angular';
import { EnvironmentService } from './EnvironmentService';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class SeoService extends Destroyable {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    public imageDefault: string;
    public titleDefault: string;
    public descriptionDefault: string;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(transport: Transport,
        environment: EnvironmentService,
        // private metrika: Metrika,
        private platform: PlatformService,
        private language: LanguageService,
        private title: Title,
        private meta: Meta) {
        super();

        this.imageDefault = meta.getTag('name=image').content;
        this.titleDefault = title.getTitle();
        this.descriptionDefault = meta.getTag('name=description').content;

        transport.listen<SeoCommand>(SeoCommand.NAME).pipe(takeUntil(this.destroyed)).subscribe(command => this.seoHandler(command.request));
        transport.listen<SeoTargetCommand>(SeoTargetCommand.NAME).pipe(takeUntil(this.destroyed)).subscribe(command => this.seoTargetHandler(command.request));
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    private setImage(item: string): void {
        let value = this.getImage(item);
        this.meta.updateTag({ property: 'image', content: value });
        this.meta.updateTag({ property: 'og:image', content: value });
    }

    private setTitle(key: string): void {
        let value = this.getTitle(key);
        this.title.setTitle(value);
        this.meta.updateTag({ property: 'og:title', content: value });
    }

    private setDescription(key: string): void {
        let value = this.getDescription(key);
        this.meta.updateTag({ property: 'description', content: value });
        this.meta.updateTag({ property: 'og:description', content: value });
    }

    private getImage(item: string): string {
        return !_.isNil(item) ? item : this.imageDefault;
    }

    private getTitle(key: string): string {
        return !_.isNil(key) && this.language.isHasTranslation(key, true) ? `${LanguagePipe.removeTags(this.language.translate(key))} | ${this.titleDefault}` : this.descriptionDefault;
    }

    private getDescription(key: string): string {
        return !_.isNil(key) && this.language.isHasTranslation(key, true) ? LanguagePipe.removeTags(this.language.translate(key)) : this.descriptionDefault;
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public addLinkIfNeed(container: IViewElement, url: string, titleId?: string): void {
        if (!this.isNeed || _.isEmpty(url)) {
            return;
        }
        let title = !_.isEmpty(titleId) ? this.language.translate(titleId) : null;
        let element = ViewUtil.createElement('a', 'link', title);
        element.href = UrlUtil.isAbsoluteUrl(url) ? url : `/${url}`;
        ViewUtil.appendChild(ViewUtil.parseElement(container), element);
    }

    //--------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    //--------------------------------------------------------------------------

    private seoHandler(item: ISeoDto): void {
        this.setTitle(item.title);
        this.setImage(item.image);
        this.setDescription(item.description);
    }

    private seoTargetHandler(item: string): void {

    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get isNeed(): boolean {
        return this.platform.isPlatformServer;
    }
}


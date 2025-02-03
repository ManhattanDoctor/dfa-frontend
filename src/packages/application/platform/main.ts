import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RootBrowserModule } from './root/root.browser.module';

//--------------------------------------------------------------------------
//
// 	Bootstrap
//
//--------------------------------------------------------------------------

function bootstrap() {
    platformBrowserDynamic().bootstrapModule(RootBrowserModule).catch(error => console.error(error));
};

//--------------------------------------------------------------------------
//
// 	Main
//
//--------------------------------------------------------------------------

enableProdMode();

if (document.readyState === 'complete') {
    bootstrap();
} else {
    document.addEventListener('DOMContentLoaded', bootstrap);
}
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import python from 'highlight.js/lib/languages/python';
import * as _ from 'lodash';

hljs.registerLanguage('json', json);
hljs.registerLanguage('python', python);

export class TextHighlightUtil {
    //--------------------------------------------------------------------------
    //
    // 	Static Methods
    //
    //--------------------------------------------------------------------------

    public static text(data: string, language?: TextHighlightLanguage): string {
        if (_.isNil(language)) {
            language = TextHighlightLanguage.JSON;
        }
        let value = hljs.highlight(data, { language }).value;
        return value;
    }
}

export enum TextHighlightLanguage {
    JSON = 'json',
    PYTHON = 'python',
}
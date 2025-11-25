import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import React from "react";
import parseHtmlToReact from 'html-react-parser';
import {htmlToText} from 'html-to-text';

export function BasicFormattedTextEditor({onChange, data}) {
    return <CKEditor
        editor={ClassicEditor}
        data={data}
        config={{
            toolbar: [
                'heading', '|', "", 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
                'blockQuote', 'undo', 'redo'
            ]
        }}
        onReady={editor => {
            // console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
            const data = editor.getData();
            console.log({event, editor, data});

            onChange && onChange(data);
        }}
    />
}

export function HtmlToReact({children}) {
    if (!children || typeof children !== "string") children = "";

    return parseHtmlToReact(children)
}

export function HtmlToText({children}) {
    if (!children || typeof children !== "string") children = "";

    return htmlToText(children);
}

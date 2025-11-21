import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import React from "react";

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
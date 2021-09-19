import React, { useState, useEffect } from 'react';
import { EditorState, ContentState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import htmlToDraft from 'html-to-draftjs';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './RichTextEditor.css';

const toolbar = {
  options: [
    'inline',
    'blockType',
    'fontSize',
    'fontFamily',
    'list',
    'textAlign',
    'link',
    'history',
  ],
  inline: {
    inDropdown: false,
  },
  blockType: {
    inDropdown: true,
    options: [
      "Normal",
      "H1",
      "H2",
      "H3",
      "H4",
      "H5",
      "H6",
    ]
  },
  fontSize: {
    options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
  },
  fontFamily: {
    options: [
      'Arial',
      'Georgia',
      'Impact',
      'Tahoma',
      'Times New Roman',
      'Verdana',
    ],
  },
  list: {
    inDropdown: false,
  },
  textAlign: {
    inDropdown: false,
  },
  link: {
    inDropdown: false,
  },
  history: {
    inDropdown: false,
  }
};

const TextEditor = props => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );

  /*const [editorState, setEditorState] = useState();

  useEffect(() => {
    const state = props.contentVal
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(props.contentVal)))
      : EditorState.createEmpty();
    setEditorState(state);
  }, [props.contentVal]);*/

  const [convertedContent, setConvertedContent] = useState(null);

  const handleEditorChange = state => {
    setEditorState(state);
    convertContentToHTML();
  };
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };

  const printValue = () => {
    props.onValueChange(convertedContent);
  };

  const createMarkup = html => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };
  return (
    <div className="text-editor">
      <Editor
        editorState={editorState}
        onChange={printValue}
        onEditorStateChange={handleEditorChange}
        toolbar={toolbar}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
      <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
    </div>
  );
};
export default TextEditor;

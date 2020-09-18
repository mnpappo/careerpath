import React, { Component } from 'react';
import { Button, Space, Affix } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            editorState: EditorState.createEmpty(),
         }
    }
    uploadImageCallBack(file) {
        // return new Promise(
        //   (resolve, reject) => {
        //     const xhr = new XMLHttpRequest();
        //     xhr.open('POST', 'https://api.imgur.com/3/image');
        //     xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
        //     const data = new FormData();
        //     data.append('image', file);
        //     xhr.send(data);
        //     xhr.addEventListener('load', () => {
        //       const response = JSON.parse(xhr.responseText);
        //       resolve(response);
        //     });
        //     xhr.addEventListener('error', () => {
        //       const error = JSON.parse(xhr.responseText);
        //       reject(error);
        //     });
        //   }
        // );
    }

    toolbarOptions = {
        options: ['inline', 'link', 'emoji', 'image'],
        inline: { 
            inDropdown: false,
            options: ['bold', 'italic', 'underline', 'strikethrough'],
        },
        image: {
            urlEnabled: true,
            uploadEnabled: true,
            alignmentEnabled: true,
            uploadCallback: this.uploadImageCallBack,
            previewImage: false,
            inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
            alt: { present: false, mandatory: false },
            defaultSize: {
                height: 'auto',
                width: '300px',
            },
        },
    }

    onEditorStateChange = (editorState) => {
        this.setState({
          editorState
        });
    };

    render() { 
        return ( 
            <div>
                <Editor
                    editorState={this.state.editorState} //this is actual state of editor
                    onEditorStateChange={this.onEditorStateChange}
                    placeholder="Type away :)"
                    wrapperClassName="editorWrapper"
                    editorClassName="editorClass"
                    toolbar={this.toolbarOptions}
                />

                <Affix offsetBottom={10}>
                    <Button style={{ marginTop: 15 }} type="primary" block>
                        Post
                    </Button>
                </Affix>
            </div> 
        );
    }
}
 
export default NewPost;

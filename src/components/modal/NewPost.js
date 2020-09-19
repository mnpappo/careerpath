import React, { Component } from 'react';
import { Button, Space, Affix } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import  { firebase }  from './../../firebase/config'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import  AuthContext  from './../../context/authContext'
import { Input } from 'antd';
import { Upload , message} from 'antd';
import ImgCrop from 'antd-img-crop'
import { v1 as uuidv1 } from 'uuid';
const { TextArea } = Input;
class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            editorState: EditorState.createEmpty(),
            text: null,
            url: null,
            fileList: [],
         }
    }
    uploadImageCallBack(file) {
        return new Promise(
          (resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://api.imgur.com/3/image');
            xhr.setRequestHeader('Authorization', 'Client-ID b89791d2969161b');
            const data = new FormData();
            data.append('image', file);
            xhr.send(data);
            xhr.addEventListener('load', () => {
              const response = JSON.parse(xhr.responseText);
              resolve(response);
            });
            xhr.addEventListener('error', () => {
              const error = JSON.parse(xhr.responseText);
              reject(error);
            });
          }
        );
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

    onChangeText = ({ target: { value } }) => {
        this.setState({...this.state, text:  value });
    };

    onChange = ({ fileList: newFileList }) => {
        // console.log(newFileList);
        this.setState({...this.state, fileList:  newFileList });
    };
    
    onPreview = async file => {
        // console.log(file);
        let src = file.url;
        if (!src) {
          src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
      };

    onPost = () =>{
        
        // close modal
        const { onCancel } = this.props;
        onCancel();
       
        const baseMessage = this.state.fileList[0].thumbUrl;
        const fileName = uuidv1() + this.state.fileList[0].name;
        const uploadTask = firebase.storage().ref().child(fileName).putString(baseMessage, 'data_url');
        uploadTask.on(
            "state_changed",
            snapshot => {
                // const progress = Math.round(
                // (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                // );
                // setProgress(progress);
            },
            error => {
                console.log(error);
            },
            () => {
                firebase.storage()
                .ref()
                .child(fileName)
                .getDownloadURL()
                .then(imageUrl => {
                    this.setState({...this.state, url:  imageUrl });
                    this.updateNewData();
                })
                .catch((error) => {
                    alert(error)
                 });
            }
        );
      
        // 
    }

    updateNewData(){
        const { user } = this.context;
      
        // console.log(onCancel);
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const newdata = {
            id: user.id,
            name: user.fullName,
            text:  this.state.text,
            createdAt: timestamp,
            url: this.state.url
        };
        const usersRef = firebase.firestore().collection('posts');
        usersRef
        .add(newdata)
        .then(_doc => {
            message.success('added new post')
                // cancel modal
               
        })
        .catch((error) => {
                // alert(error)
            message.error(error)
        });
    }

    render() { 
        return ( 
            <div>
                {/* <Editor
                    editorState={this.state.editorState} //this is actual state of editor
                    onEditorStateChange={this.onEditorStateChange}
                    placeholder="Type away :)"
                    wrapperClassName="editorWrapper"
                    editorClassName="editorClass"
                    toolbar={this.toolbarOptions}
                /> */}
               <TextArea
                value={this.state.text}
                onChange={this.onChangeText}
                placeholder="Controlled autosize"
                autoSize={{ minRows: 3, maxRows: 5 }}
                />

            <ImgCrop rotate>
                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={this.state.fileList}
                    onChange={this.onChange}
                    onPreview={this.onPreview}
                >
                    {this.state.fileList.length < 1 && '+ Upload'}
                </Upload>
                </ImgCrop>
                

                <Affix offsetBottom={10}>
                    <Button style={{ marginTop: 15 }} onClick={this.onPost} type="primary" block>
                        Post
                    </Button>
                </Affix>
            </div> 
        );
    }
}
 
export default NewPost;
NewPost.contextType = AuthContext;
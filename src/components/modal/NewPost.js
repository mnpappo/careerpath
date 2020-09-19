import React, { Component } from 'react';
import { Button, Space, Affix } from 'antd';
import  { firebase }  from './../../firebase/config';
import  AuthContext  from './../../context/authContext';
import { Upload , message, Input} from 'antd';
import ImgCrop from 'antd-img-crop'
import { v1 as uuidv1 } from 'uuid';
const { TextArea } = Input;

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            text: null,
            url: null,
            fileList: [],
         }
    }

    onChangeText = ({ target: { value } }) => {
        this.setState({...this.state, text:  value });
    };

    onChange = ({ fileList: newFileList }) => {
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
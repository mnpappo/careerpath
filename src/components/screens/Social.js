import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import { Card } from 'antd';
import NewPost from './../modal/NewPost';
import  { firebase }  from './../../firebase/config'
import  AuthContext  from './../../context/authContext'
import PostList from './../common/postList'
import { PlusOutlined } from '@ant-design/icons';
// const postRef = firebase.firestore().collection('posts').orderBy('createdAt', 'desc').get()
// const postRef = firebase.firestore().collection('posts')

class Social extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { posts: [] };
    }

    showModal = () => {
        this.setState({
        visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
        visible: false,
        });
    };

    

    handleCancel = e => {
        console.log(e);
        this.setState({
        visible: false,
        });
        
        this.state = { posts: null };
        // this.getpost();
    };

    // getpost(){
    //     const { user } = this.context;
    //     postRef.then(querySnapshot => {
    //         const newEntities = [];
    //         querySnapshot.forEach(doc => {
    //             const entity = doc.data()
    //             newEntities.push(entity)
    //         });

    //         this.setState({...this.state, posts : newEntities})
            
    //     })
    // }

    componentDidMount(){
       
        // this.getpost()

        firebase.firestore()
        .collection('posts')
        .onSnapshot(querySnapshot => {
            const newEntities = [];
            querySnapshot.forEach(documentSnapshot => {
                const entity = documentSnapshot.data()
                newEntities.push(entity)
            });
            
            this.setState({...this.state, posts : newEntities})
        });
    }

  render() {
    console.log(this.state);
    return (
      <>

        <Button  type="primary fixed-bottom" size="large" shape="circle" icon={<PlusOutlined />} onClick={this.showModal}/>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <NewPost  onCancel={this.handleCancel} />
        </Modal>

        <PostList posts= {this.state.posts}></PostList>
      </>

     
    );
  }
}

export default Social;
Social.contextType = AuthContext;
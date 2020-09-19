import React, { Component } from 'react';
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
           <>
                <List
                itemLayout="vertical"
                size="large"
                dataSource={this.props.posts}
                    renderItem={item => (
                    <List.Item
                        key={item.title}
                        actions={[
                        // <IconText icon={StarOutlined} text="0" key="list-vertical-star-o" />,
                        <IconText icon={LikeOutlined} text="0" key="list-vertical-like-o" />,
                        <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                        ]}
                        extra={
                        <img
                            width={272}
                            alt="logo"
                            src={item.url}
                        />
                        }
                    >
                        <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a href={item.href}>{item.name}</a>}
                        description={item.text}
                        />
                        {item.content}
                    </List.Item>
                    )}
                
                />
           
           </> 
        );
    }
}

export default PostList;
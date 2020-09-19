import React, { Component } from 'react';
import { Table, Tag, Space, Button, message } from 'antd';
import  HomeContext  from './../../context/authContext'

const columns = [
    {
      title: 'University',
      dataIndex: 'uni_name',
      key: 'uni_name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
    },
    {
      title: 'Min Grade',
      dataIndex: 'min_grade',
      key: 'min_grade',
    },
    {
      title: 'Career Choice',
      dataIndex: 'career',
      key: 'career',
    },
    {
      title: 'Subjects',
      key: 'subjects',
      dataIndex: 'subjects',
      render: subjects => (
        <>
          {subjects.map(subject => {
            let color = subject.length > 5 ? 'geekblue' : 'green';
            if (subject === 'Civil') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={subject}>
                {subject.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];
  
  const data = [
    {
      key: '1',
      uni_name: 'JU',
      rank: 32,
      min_grade: 'Phy: 4, Math: 4',
      career: 'Engineer',
      subjects: ['CSE', 'EEE'],
    },
    {
      key: '2',
      uni_name: 'DU',
      rank: 42,
      min_grade: 'Bio: 4, Chem: 4',
      career: 'Pharmasist',
      subjects: ['Pharmacy'],
    },
    {
      key: '3',
      uni_name: 'BUET',
      rank: 32,
      min_grade: 'Bio: 4, Math: 4, Phy: 4',
      career: 'Botanist',
      subjects: ['Bootany', 'Civil'],
    },
  ];

class Result  extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    removeUser = () =>{
      debugger;

      const { userDataRemove} = this.context;
      console.log(userDataRemove);
      userDataRemove();
    }
    render() { 
        return ( <>
             {/* <Button type="primary" size={12} onClick={this.removeUser}> reset</Button> */}
          <Table columns={columns} dataSource={data} /> 
        </>
        );
    }
}
 
export default Result;
import React, { Component } from 'react';
import { Table, Tag, Space, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';


  
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
      min_grade: 'Bio: 3, Chem: 4',
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
    getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : '',
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => this.searchInput.select(), 100);
        }
      },
      render: text =>
        this.state.searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      this.setState({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex,
      });
    };
  
    handleReset = clearFilters => {
      clearFilters();
      this.setState({ searchText: '' });
    };
    render() { 
        const columns = [
            {
                title: "University",
                dataIndex: "uni_name",
                key: "uni_name",
                ...this.getColumnSearchProps('uni_name'),
                render: (text) => <a>{text}</a>,
            },
            // {
            //     title: "Rank",
            //     dataIndex: "rank",
            //     key: "rank",
            //     ...this.getColumnSearchProps('rank'),
            // },
            // {
            //     title: "Min Grade",
            //     dataIndex: "min_grade",
            //     key: "min_grade",
            //     ...this.getColumnSearchProps('min_grade'),
            // },
            {
              title: 'Career Choice',
              dataIndex: 'career',
              key: 'career',
            },
            {
                title: "Subjects",
                key: "subjects",
                dataIndex: "subjects",
                ...this.getColumnSearchProps('subjects'),
                render: (subjects) => (
                    <>
                        {subjects.map((subject) => {
                            let color = subject.length > 5 ? "geekblue" : "green";
                            if (subject === "Civil") {
                                color = "volcano";
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
        
        return ( <>
             {/* <Button type="primary" size={12} onClick={this.removeUser}> reset</Button> */}
          <Table columns={columns} dataSource={data} /> 
        </>
        );
    }
}
 
export default Result;
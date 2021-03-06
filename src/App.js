import React, { Component } from 'react';
import { Layout, Input, Row, Col, Button, Table } from 'antd';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      query: ''
    }
  }

  getColumns() {
    let columns = [{
      title: '章節',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '內容',
      dataIndex: 'content',
      key: 'content',
    }]

    return columns
  }

  setData = () => {
    fetch(`http://140.123.97.228:8000/data?q=${this.state.query}`)
      .then(res => res.json())
      .then((result) => {
        console.log(result)
        result = result.map((val, idx) => {
          let content = val.split('@content:')[1].split('\n')[0]
          let book = val.split('@book:')[1].split('\n')[0]
          let chap = val.split('@chap:')[1].split('\n')[0]
          let verse = val.split('@verse:')[1].split('\n')[0]
          
          return {
            key: idx,
            id: `${book}${chap}:${verse}`,
            content: content
          }
        })


        this.setState({ data: result })
      })
  }

  render() {
    const { Header, Content } = Layout;
    return (
      <Layout className="layout">
        <Header>
          <div className="logo"><font color="white">Bible Parsing</font></div>
        </Header>
        <Content>
          <Row>
            <Col span={12}>
              <Input placeholder="輸入搜尋字串" onChange={e => this.setState({query: e.target.value})}/>
              
            </Col>
            <Col span={3}>
              <Button type="primary" onClick={this.setData}>搜尋</Button>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Table columns={this.getColumns()} dataSource={this.state.data}/>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default App;
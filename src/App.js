import './App.css';
import React, { Component } from 'react';
import TOC from './components/TOC';
import Content from './components/Content';
import Subject from './components/Subject';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'read',
      selected_comtent_id:1,
      subject: { title: 'WEB', sub: 'World Wide Web!' },
      welcome: { title: 'welcome', desc: 'hello, React!' },
      textContents: { title: 'HTML', desc: 'HTML is ...' },
      contents: [
        { id: 1, title: 'HTML', desc: 'HTML is for information' },
        { id: 2, title: 'CSS', desc: 'CSS is for design' },
        { id: 3, title: 'JavaScript', desc: 'JavaScript is for interactive' },
      ],
    };
  }
  render() {
    let _title,
      _desc = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if (this.state.mode === 'read') {
      let i = 0;
      while(i< this.state.contents.length){
        let data = this.state.contents[i];
        if(data.id === this.state.selected_comtent_id){
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i+=1;
      }
    }
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function(){//컴포넌트에서 만든 props 설정
            this.setState({
              mode: "welcome"
            })
          }.bind(this)}
          >
        </Subject>
        <TOC onChangePage={function(id){//이벤트를 받기 위한 setState가 있는 함수를 props 선언으로 생성
          this.setState({
            mode: "read",
            selected_comtent_id:Number(id) 
          });
        }.bind(this)} 
        data={this.state.contents}></TOC>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;

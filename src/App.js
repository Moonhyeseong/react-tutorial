import './App.css';
import React, { Component } from 'react';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import Subject from './components/Subject';
import Control from './components/Control';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: 'welcome',
      selected_comtent_id: 1,
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
  getReadContent() {
    let i = 0;
    while (i < this.state.contents.length) {
      let data = this.state.contents[i];
      if (data.id === this.state.selected_comtent_id) {
        return data;
        break;
      }
      i += 1;
    }
  }
  getContent() {
    let _title,
      _desc,
      _article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if (this.state.mode === 'read') {
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>;
    } else if (this.state.mode === 'create') {
      _article = (
        <CreateContent
          onSubmit={function (_title, _desc) {
            this.max_content_id = this.max_content_id + 1;
            //#기존 배열에 push 함수를 사용해 데이터를 추가할 시 원본이 변경되기 때문에 부적합
            // this.state.contents.push(
            //   {id: this.max_content_id, title:_title, desc:_desc}
            // )
            //#concat을 사용하면 원본 배열을 복제한 새로운 배열에 항목이 추가됨
            // let _contents = this.state.contents.concat(
            //   {id: this.max_content_id, title:_title, desc:_desc}
            // )
            //#배열을 복제하여 새로운 배열을 만드는 방법
            //#객체의 경우는 object.assign()
            let newContents = Array.from(this.state.contents);
            newContents.push({
              id: this.max_content_id,
              title: _title,
              desc: _desc,
            });
            this.setState({
              contents: newContents,
              mode: 'read',
              selected_comtent_id: this.max_content_id,
            });
          }.bind(this)}></CreateContent>
      );
    } else if (this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = (
        <UpdateContent
          data={_content}
          onSubmit={function (_id, _title, _desc) {
            let _contents = Array.from(this.state.contents);
            let i = 0;
            while (i < _contents.length) {
              if (_contents[i].id === _id) {
                _contents[i] = { id: _id, title: _title, desc: _desc };
                break;
              }
              i = i + 1;
            }
            this.setState({
              contents: _contents,
              mode: 'read',
            });
          }.bind(this)}></UpdateContent>
      );
    }
    return _article;
  }
  render() {
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            //컴포넌트에서 만든 props 설정
            this.setState({
              mode: 'welcome',
            });
          }.bind(this)}></Subject>
        <h3>my subjects</h3>
        <TOC
          onChangePage={function (id) {
            //이벤트를 받기 위한 setState가 있는 props
            this.setState({
              //setState로 state 변경
              mode: 'read', //state의 모드를 read로
              selected_comtent_id: Number(id),
            });
          }.bind(this)}
          data={this.state.contents}></TOC>
        <br />
        <Control
          onChangeMode={function (_mode) {
            if (_mode === 'delete') {
              if (window.confirm('really?')) {
                let _contents = Array.from(this.state.contents);
                let i = 0;
                while (i < _contents.length) {
                  if (_contents[i].id === this.state.selected_comtent_id) {
                    _contents.splice(i, 1);
                    break;
                  }
                  i += 1;
                }
                this.setState({
                  mode: 'welcome',
                  contents: _contents,
                });
                alert('deleted!');
              }
            } else {
              this.setState({
                mode: _mode,
              });
            }
          }.bind(this)}></Control>
        {/* 선택에 따라 변환되는 contents 컴포넌트 */}
        {this.getContent()}
      </div>
    );
  }
}

export default App;

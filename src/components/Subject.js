import React, { Component } from 'react';

class Subject extends Component {
  render() {
    return (
      <header>
        <h1><a href="/" onClick={function(e){//컴포넌트 내에 이벤트 생성
          e.preventDefault(); //이벤트시 발생하는 동작 멈춤
          this.props.onChangePage(); //onChangePage함수를 props로 선언
        }.bind(this)}>
        {this.props.title}</a></h1>
        {this.props.sub}
      </header>
    );
  }
}

export default Subject;

import React, { Component } from 'react';

//모드 선택 리스트 컴포넌트
class Control extends Component {
  render() {
    return (
      <div>
      <h3>mode</h3>
      <ul>
          <li><a href="/create" onClick={function(e){
            e.preventDefault();
            this.props.onChangeMode('create');
          }.bind(this)}>create</a></li>
          <li><a href="/update" onClick={function(e){
            e.preventDefault();
            this.props.onChangeMode('update');
          }.bind(this)}>update</a></li>
          <li><input onClick={function(e){
            e.preventDefault();
            this.props.onChangeMode('delete');
          }.bind(this)} type="button" value="delete"></input></li>
        </ul>
        </div>
    );
  }
}

export default Control;

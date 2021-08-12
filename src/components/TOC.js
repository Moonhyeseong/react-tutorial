import React, { Component } from 'react';

class TOC extends Component {
  //컴포넌트를 렌더릴 할때 변경사항이 있을때만 렌더링 하는 법
  //return true => render()실행 O
  //return false => render()실행 X
  shouldComponentUpdate(newProps) {
    console.log('===> TOC shouldComponentUpdate');
    if (this.props.data === newProps.data) {
      return false;
    }
    return true;
  }
  render() {
    console.log('===> TOC Render');
    var lists = [];
    var data = this.props.data;
    var i = 0;
    while (i < data.length) {
      lists.push(
        <li key={data[i].id}>
          <a
            href={'/content/' + data[i].id}
            onClick={function (id, e) {
              e.preventDefault();
              this.props.onChangePage(id); //이벤트가 동작시 props 로
            }.bind(this, data[i].id)}
          >
            {data[i].title}
          </a>
        </li>
      );
      i = i + 1;
    }
    return (
      <nav>
        <ul>{lists}</ul>
      </nav>
    );
  }
}

export default TOC;

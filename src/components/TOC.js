import React, { Component } from 'react';

class TOC extends Component {
  render() {
    var lists = [];
    var data = this.props.data;
    var i = 0;
    while(i < data.length){
      lists.push(
      <li key={data[i].id}>
        <a 
          href={"/content/"+data[i].id}
          onClick={function(id, e){
            e.preventDefault();
            this.props.onChangePage(id); //이벤트가 동작시 props 로 
          }.bind(this, data[i].id)}
        >{data[i].title}</a>
      </li>);
      i = i + 1;
    }
    return (
      <nav>
        <ul>
          {lists}
        </ul>
      </nav>
    );
  }
}

export default TOC;

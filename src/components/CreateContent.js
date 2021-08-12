import React, { Component } from 'react';

//creact mode 선택 시 나타나는 컴포넌트
class CreateContent extends Component {
  render() {
    return (
      <article>
        <h2>Create</h2>
        <form action = '/create_process' method="post"
          onSubmit={
            function(e){
              e.preventDefault();
              this.props.onSubmit(
                e.target.title.value,
                e.target.desc.value
              );
            }.bind(this)}
        >
          <p><input type="text" name="title" placeholder="title" /></p>
          <p>
            <textarea name = 'desc' placeholder = 'description'></textarea>
          </p>
          <p>
            <input type="submit"/>
          </p>
        </form>
      </article>
    );
  }
}
export default CreateContent;

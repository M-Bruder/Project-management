import React from 'react';
import { connect } from 'react-redux';
import Post from '../../components/Post/Post';
import { deletePost, fetchAllPosts } from '../../actions';

function PostList({ posts, onDelete, onLoadProject }) {
  if(!posts.length) {
    var user = localStorage.getItem('user');
    return (
      <div>
        <h1 onLoadProject = { onLoadProject(user) } >No Posts</h1>
      </div>
    )
  }
  return (
    <div>
      {posts.map(post => {
        return (
          <Post post={ post } onDelete={ onDelete } key={ post._id } />
        );
      })}
    </div>
  );
}


const mapStateToProps = state => {
  return {
    posts: state.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadProject: (user) => {dispatch(fetchAllPosts(user));},
    onDelete: id => {
      dispatch(deletePost(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);
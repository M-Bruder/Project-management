import { ADD_POST, DELETE_POST, FETCH_POST } from './types';
import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/posts';

export const createPost = ({ title, body, user }) => {
  return (dispatch) => {
    return axios.post(`${apiUrl}/add`, {title, body, user})
      .then(res => {
        dispatch(createPostSuccess(res.data))
        console.log(res.data);
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const createPostSuccess =  (data) => {
  return {
    type: ADD_POST,
    payload: {
      _id: data._id,
      title: data.title,
      body: data.body,
      user: data.user
    }
  }
};

export const deletePostSuccess = id => {
  return {
    type: DELETE_POST,
    payload: {
      id
    }
  }
}

export const deletePost = id => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/delete/${id}`)
      .then(response => {
        dispatch(deletePostSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};


export const EditPostSuccess = id => {
  return {
    type: EDIT_POST,
    payload: {
      id
    }
  }
}

export const editPost = id => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/edit/${id}`)
      .then(response => {
        dispatch(editPostSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const fetchPosts = (posts) => {
  return {
    type: FETCH_POST,
    posts
  }
};


export const fetchAllPosts = (user) => {
  return (dispatch) => {
    return axios.post(`${apiUrl}/getPost`, { user })
      .then(res => {
        console.log(user)
        dispatch(fetchPosts(res.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};


/* 
export const fetchAllPosts = (user) => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/getPost/${user}`, { user })
      .then(res => {
        console.log(user)
        dispatch(fetchPosts(res.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

*/
/*
export const fetchPosts = (posts) => {
  return {
    type: FETCH_POST,
    posts
  }
};

export const fetchAllPosts = () => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/getPost`)
      .then(res => {
        dispatch(fetchPosts(res.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};
*/
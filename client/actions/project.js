import { ADD_PROJECT, DELETE_PROJECT, FETCH_PROJECT } from './types';
import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/projects';

export const createProject = ({ title, body, user }) => {
  return (dispatch) => {
    return axios.post(`${apiUrl}/add`, {title, body, user})
      .then(res => {
        dispatch(createProjectSuccess(res.data))
        console.log(res.data);
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const createProjectSuccess =  (data) => {
  return {
    type: ADD_PROJECT,
    payload: {
      _id: data._id,
      title: data.title,
      body: data.body,
      user: data.user
    }
  }
};

export const deleteProjectSuccess = id => {
  return {
    type: DELETE_PROJECT,
    payload: {
      id
    }
  }
}

export const deleteProject = id => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/delete/${id}`)
      .then(response => {
        dispatch(deleteProjectSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};


export const EditProjectSuccess = id => {
  return {
    type: EDIT_PROJECT,
    payload: {
      id
    }
  }
}

export const editProject = id => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/edit/${id}`)
      .then(response => {
        dispatch(editProjectSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const fetchProjects = (posts) => {
  return {
    type: FETCH_PROJECT,
    posts
  }
};


export const fetchAllProjects = (user) => {
  return (dispatch) => {
    return axios.post(`${apiUrl}/getProject`, { user })
      .then(res => {
        dispatch(fetchProjects(res.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};


/* 
export const fetchAllProjects = (user) => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/getProject/${user}`, { user })
      .then(res => {
        console.log(user)
        dispatch(fetchProjects(res.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

*/
/*
export const fetchProjects = (posts) => {
  return {
    type: FETCH_PROJECT,
    posts
  }
};

export const fetchAllProjects = () => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/getProject`)
      .then(res => {
        dispatch(fetchProjects(res.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};
*/
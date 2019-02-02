import { ADD_TASK, DELETE_TASK, FETCH_TASK } from './types';
import axios from 'axios';

const apiUrl = 'http://localhost:5000/tasks';

export const createTask = ({ task, startTime, endTime, status}) => {
  return (dispatch) => {
    return axios.post(`${apiUrl}/add`, {task, startTime, endTime, status})
      .then(res => {
        dispatch(createPostSuccess(res.data))
        console.log(res.data);
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const createTaskSuccess =  (data) => {
  return {
    type: ADD_TASK,
    payload: {
      _id: data._id,
      task : data.task,
      startTime: data.startTime,
      endTime: data.endTime,
      status: data.status
    }
  }
};

export const deleteTaskSuccess = id => {
  return {
    type: DELETE_TASK,
    payload: {
      id
    }
  }
}

export const deleteTask = id => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/delete/${id}`)
      .then(response => {
        dispatch(deleteTaskSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};


export const EditTaskSuccess = id => {
  return {
    type: EDIT_TASK,
    payload: {
      id
    }
  }
}

export const editTask = id => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/edit/${id}`)
      .then(response => {
        dispatch(editTaskSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const fetchTasks = (tasks) => {
  return {
    type: FETCH_TASK,
    tasks
  }
};


export const fetchAllTasks = (user) => {
  return (dispatch) => {
    return axios.post(`${apiUrl}/getTask`, { user })
      .then(res => {
        console.log(user)
        dispatch(fetchTasks(res.data))
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
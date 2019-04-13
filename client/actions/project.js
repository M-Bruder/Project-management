import axios from 'axios';
import {
  ADD_PROJECT,
  DELETE_PROJECT,
  FETCH_PROJECT,
  EDIT_PROJECT,
} from './types';

const apiUrl = 'http://localhost:5000/api/projects';

export const createProjectSuccess = data => ({
  type: ADD_PROJECT,
  payload: {
    _id: data._id,
    title: data.title,
    body: data.body,
    user: data.user,
  },
});

export const createProject = ({ title, body, user }) => dispatch => axios
  .post(`${apiUrl}/add`, { title, body, user })
  .then((res) => {
    dispatch(createProjectSuccess(res.data));
  })
  .catch((error) => {
    throw error;
  });

export const deleteProjectSuccess = id => ({
  type: DELETE_PROJECT,
  payload: {
    id,
  },
});

export const deleteProject = id => dispatch => axios
  .get(`${apiUrl}/delete/${id}`)
  .then((response) => {
    dispatch(deleteProjectSuccess(response.data));
  })
  .catch((error) => {
    throw error;
  });

export const editProjectSuccess = data => ({
  type: EDIT_PROJECT,
  payload: {
    id: data._id,
    title: data.title,
    body: data.body,
  },
});

export const editProject = ({ id, title, body }) => dispatch => axios
  .put(`${apiUrl}/update/${id}`, { id, title, body })
  .then((response) => {
    dispatch(editProjectSuccess(response.data));
  })
  .catch((error) => {
    throw error;
  });

export const fetchProjects = projects => ({
  type: FETCH_PROJECT,
  projects,
});

export const fetchAllProjects = user => dispatch => axios
  .post(`${apiUrl}/getProject`, { user })
  .then((res) => {
    dispatch(fetchProjects(res.data));
  })
  .catch((error) => {
    throw error;
  });

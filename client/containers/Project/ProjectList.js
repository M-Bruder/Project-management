import React from 'react';
import { connect } from 'react-redux';
import Project from '../../components/Project/Project';
import { deleteProject, fetchAllProjects } from '../../actions/project';

function ProjectList({ projects, onDelete, onLoadProject }) {
  if(!projects.length) {
    var user = localStorage.getItem('user');
    onLoadProject(user);
    //console.log('Stan aplikacji z get' + getState());
    return (
      <div>
        <h1 >No Projects Nie znaleziono projektów!</h1>
      </div>
    )
  }
  return (
    <div>
      <div>
      {projects.map(project => {
        return (
          <Project project={ project } onDelete={ onDelete } key={ project._id } />
        );
      })}
      </div>
    </div>
  );
}


const mapStateToProps = state => {
  return {
    projects: state.projects
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadProject: (user) => {dispatch(fetchAllProjects(user));},
    onDelete: id => {
      dispatch(deleteProject(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectList);
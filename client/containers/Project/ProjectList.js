import React from 'react';
import { connect } from 'react-redux';
import Project2 from '../../components/Project/Project2';
import { deleteProject, fetchAllProjects, editProject } from '../../actions/project';

function ProjectList({ projects, onDelete, onLoadProject, onEditProject}) {
  if(!projects.length) {
    var user = localStorage.getItem('user');
    onLoadProject(user);
    //console.log('Stan aplikacji z get' + getState());
    return (
      <div className="text-white text-center">
        <h2 >Kliknij stwórz nowy projekt, aby rozwinąć formularz!</h2>
        <h4 >Nie znaleziono projektów!</h4>
      </div>
    )
  }
  return (
    <div>
      <div>
      {projects.map(project => {
        return (
          <Project2 project={ project } onDelete={ onDelete } key={ project._id } onEditProject = {onEditProject} />
        );
      })}
      </div>
    </div>
  );
}


const mapStateToProps = state => {
  return {
    projects: state.projects,
    project: state.project
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadProject: (user) => {
      dispatch(fetchAllProjects(user));
    },
    onDelete: id => {
      dispatch(deleteProject(id));
    },
    onEditProject: (project) => {
      dispatch(editProject(project));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectList);
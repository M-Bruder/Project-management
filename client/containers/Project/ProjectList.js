import React from 'react';
import { connect } from 'react-redux';
import Project from '../../components/Project/EditProject';
import {
  deleteProject,
  fetchAllProjects,
  editProject
} from '../../actions/project';

function ProjectList({
  projects, onDelete, onLoadProject, onEditProject
}) {
  if (!projects.length) {
    const user = localStorage.getItem('user');
    onLoadProject(user);
    return (
      <div className="text-white text-center">
        <h2>Kliknij stwórz nowy projekt, aby rozwinąć formularz!</h2>
        <h4>Nie znaleziono projektów!</h4>
      </div>
    );
  }
  return (
    <div>
      <div>
        {projects.map(project => (
          <Project
            project={project}
            onDelete={onDelete}
            key={project._id}
            onEditProject={onEditProject}
          />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  projects: state.projects,
  project: state.project
});

const mapDispatchToProps = dispatch => ({
  onLoadProject: (user) => {
    dispatch(fetchAllProjects(user));
  },
  onDelete: (id) => {
    dispatch(deleteProject(id));
  },
  onEditProject: (project) => {
    dispatch(editProject(project));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectList);

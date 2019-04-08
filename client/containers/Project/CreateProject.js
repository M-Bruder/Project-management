import { connect } from 'react-redux';
import { createProject } from '../../actions/project';
import NewProject from '../../components/Project/NewProject';

const mapDispatchToProps = dispatch => ({
  onAddProject: (project) => {
    dispatch(createProject(project));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(NewProject);

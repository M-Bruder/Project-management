import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button, ButtonGroup, Row, Col 
} from 'reactstrap';
import PropTypes from 'prop-types';
import '../../styles/project.css';
import MemberList from '../Member/MemberList';

class Project extends Component {
  static get propTypes() {
    return {
      project: PropTypes.func,
      onDelete: PropTypes.func.isRequired,
      onEditProject: PropTypes.func.isRequired
    };
  }

  /* static defaultProps = {
    project: '',
  }; */

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.state = {
      isEditing: false,
      project: this.props.project,
      title: '',
      body: ''
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => {
    const { onEditProject } = this.props;
    const { title, body, project } = this.state;
    e.preventDefault();
    if (title.trim() && body.trim()) {
      onEditProject({
        id: project._id,
        title,
        body
      });
      this.toggleEdit();
      window.location.reload();
    }
  };

  toggleEdit() {
    const { isEditing } = this.state;
    this.setState({ isEditing: !isEditing });
  }

  toggleEditCancel() {
    this.setState({ isEditing: false });
  }

  render() {
    const { onDelete } = this.props;
    const {
      body, title, isEditing, project 
    } = this.state;
    if (isEditing) {
      return (
        <div className="content">
          <Row>
            <Col>
              <h4>
                <b>{title}</b>
              </h4>
              <p>{body}</p>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Nazwa projektu"
                    className="form-control"
                    name="title"
                    onChange={this.handleInputChange}
                    value={title || project.title}
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    rows="5"
                    cols="33"
                    placeholder="Opis"
                    className="form-control"
                    name="body"
                    onChange={this.handleInputChange}
                    value={body || project.body}
                    required
                  />
                </div>
                <ButtonGroup size="sm" className="optionsProject">
                  <Button color="primary" type="onSubmit">
                    Zapisz zmiany
                  </Button>
                  <Button
                    color="info"
                    onClick={this.toggleEditCancel.bind(this)}
                  >
                    Anuluj
                  </Button>
                </ButtonGroup>
              </form>
            </Col>
            <Col>
              <div className="members">
                <MemberList project={project._id} />
              </div>
            </Col>
          </Row>
        </div>
      );
    }
    return (
      <div className="content">
        <Row>
          <Col>
            <h4>
              <b>{project.title}</b>
            </h4>
            <p>{project.body}</p>
            <ButtonGroup size="sm" className="optionsProject">
              <Button color="primary" onClick={this.toggleEdit}>
                Edytuj
              </Button>
              <Button color="info" tag={Link} to={`/project/${project._id}`}>
                Szczegóły projektu
              </Button>
              <Button color="danger" onClick={() => onDelete(project._id)}>
                Usuń
              </Button>
            </ButtonGroup>
          </Col>
          <Col>
            <div className="members">
              <MemberList project={project._id} />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Project;

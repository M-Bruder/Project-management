import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Row,
  Col
} from "reactstrap";
import "../../styles/Project.css";
import MemberList from "../Member/MemberList";

class Project extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.state = {
      isEditing: false,
      project: this.props.project,
      title: "",
      body: "",
      onDelete: "",
      user: localStorage.getItem("user")
    };
  }

  toggleEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.title.trim() && this.state.body.trim()) {
      this.props.onEditProject({
        id: this.state.project._id,
        title: this.state.title,
        body: this.state.body
      });
      this.toggleEdit();
      location.reload();
    }
  };

  toggleEditCancel() {
    this.setState({ isEditing: false });
  }

  render() {
    const { onDelete } = this.props;
    if (this.state.isEditing) {
      return (
        <div className="content">
          <Row>
            <Col>
              <div className="project">
                <h4>
                  <b>{this.state.title}</b>
                </h4>
                <p>{this.state.body}</p>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Nazwa projektu"
                      className="form-control"
                      name="title"
                      onChange={this.handleInputChange}
                      value={this.state.title || this.state.project.title}
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
                      value={this.state.body || this.state.project.body}
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
              </div>
            </Col>
            <Col>
              <div className="members">
                <MemberList project={this.state.project._id} />
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
            <div className="post">
              <h4>
                <b>{this.state.project.title}</b>
              </h4>
              <p>{this.state.project.body}</p>
              <ButtonGroup size="sm" className="optionsProject">
                <Button color="primary" onClick={this.toggleEdit}>
                  Edytuj
                </Button>
                <Button
                  color="info"
                  tag={Link}
                  to={`/project/${this.state.project._id}`}
                >
                  Szczegóły projektu
                </Button>
                <Button
                  color="danger"
                  onClick={() => onDelete(this.state.project._id)}
                >
                  Usuń
                </Button>
              </ButtonGroup>
            </div>
          </Col>
          <Col>
            <div className="member">
              <MemberList project={this.state.project._id} />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Project;

import React, { Component } from "react";
import { FormGroup, Button, Input, Form, Row, ListGroupItem, ListGroup } from "reactstrap";
import axios from "axios";
import "../../styles/memberList.css";

class AddMemberList extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.state = {
      membersData: [],
      name: "",
      user: localStorage.getItem("user")
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentWillMount = () => {
    this.getData();
  };

  getData = () => {
    const { project } = this.props;
    axios
      .post("http://localhost:5000/api/members/getMember", {
        project
      })
      .then(res => {
        const membersData = res.data;
        this.setState({ membersData });
      })
      .catch(error => {
        if (error.response.status === 401) {
          console.log(error);
        }
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { project } = this.props;
    axios
      .post("http://localhost:5000/api/members/addMember", {
        memberName: this.state.name,
        user: this.state.user,
        project
      })
      .then(res => {
        const { data } = res;
        this.setState({ membersData: [...this.state.membersData, data] });
      })
      .catch(error => {
        console.log(error);
      });
    this.handleReset();
  };

  handleReset = () => {
    this.setState({
      name: ""
    });
  };

  onDelete = id => {
    const membersData = this.state.membersData.filter(r => r.id !== id);
    axios
      .get(`http://localhost:5000/api/members/delete/${id}`)
      .then(response => { 
        this.setState({ membersData });
        this.getData();
      })
      .catch(error => {
        throw error;
      });
  };

  render() {
    const membersData = this.state.membersData.map(d => (
      <ListGroupItem key={d._id}>
        {" "}
        {d.members}
        <Button
          size="sm"
          className="float-right"
          color="danger"
          onClick={this.onDelete.bind(this, d._id)}
        >
          Usuń
        </Button>{" "}
      </ListGroupItem>
    ));
    return (
      <div>
        <div className="member">
          <p>
            <b>Lista członków: </b>
          </p>
          <ListGroup>
            {membersData.length ? (
              membersData
            ) : (
              <p>Nie przydzielono członków do projektu!</p>
            )}
          </ListGroup>
          <Form bssize="sm" className="form-addMember" onSubmit={this.handleSubmit}>
            <Row form>
              <FormGroup>
                <Input
                  bssize="sm"
                  type="text"
                  name="name"
                  id="nameTask"
                  placeholder="Nazwa użytkownika"
                  onChange={this.handleInputChange}
                  value={this.state.name}
                />
              </FormGroup>
              <FormGroup>
                <button type="submit" className="btn btn-primary btn-sm btn-add">
                  Dodaj
                </button>
              </FormGroup>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

export default AddMemberList;

import React, { Component } from 'react';
import {
  FormGroup,
  Button,
  Input,
  Form,
  Row,
  ListGroupItem,
  ListGroup
} from 'reactstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../../styles/memberList.css';

class AddMemberList extends Component {
  static get propTypes() {
    return {
      project: PropTypes.string,
    };
  }

  static defaultProps = {
    project: '',
  };


  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);

    this.state = {
      membersData: [],
      name: ''
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentWillMount = () => {
    this.setState();
    this.getData();
  };

  getData = () => {
    const { project } = this.props;
    axios
      .post('http://localhost:5000/api/members/getMember', {
        project
      })
      .then((res) => {
        const membersData = res.data;
        this.setState({ membersData });
      })
      .catch((error) => {
        if (error.response.status === 401) {
          console.log(error);
        }
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { project } = this.props;
    const { name, membersData } = this.state;
    axios
      .post('http://localhost:5000/api/members/addMember', {
        memberName: name,
        project
      })
      .then((res) => {
        const { data } = res;
        this.setState({ membersData: [...membersData, data] });
      })
      .catch((error) => {
        console.log(error);
      });
    this.handleReset();
  };

  handleReset = () => {
    this.setState({
      name: ''
    });
  };

  onDelete = (id) => {
    let { membersData } = this.state;
    membersData = membersData.filter(r => r.id !== id);
    axios
      .get(`http://localhost:5000/api/members/delete/${id}`)
      .then(() => {
        this.setState({ membersData });
        this.getData();
      })
      .catch((error) => {
        throw error;
      });
  };


  render() {
    const { membersData, name } = this.state;
    const members = membersData.map(d => (
      <ListGroupItem key={d._id}>
        {' '}
        {d.members}
        <Button
          size="sm"
          className="float-right"
          color="danger"
          onClick={this.onDelete.bind(this, d._id)}
        >
          Usuń
        </Button>
        {' '}
      </ListGroupItem>
    ));
    return (
      <div>
        <div className="member">
          <p>
            <b>Lista członków: </b>
          </p>
          <ListGroup>
            {members.length ? (
              members
            ) : (
              <p>Nie przydzielono członków do projektu!</p>
            )}
          </ListGroup>
          <Form
            bssize="sm"
            className="form-addMember"
            onSubmit={this.handleSubmit}
          >
            <Row form>
              <FormGroup>
                <Input
                  bssize="sm"
                  type="text"
                  name="name"
                  id="nameTask"
                  placeholder="Nazwa użytkownika"
                  onChange={this.handleInputChange}
                  value={name}
                />
              </FormGroup>
              <FormGroup>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm btn-add"
                >
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

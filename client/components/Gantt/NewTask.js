import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Col,
  FormGroup,
  Container,
  Button,
  Input,
  Form,
  Row
} from 'reactstrap';

class NewTask extends Component {
  static get propTypes() {
    return {
      handlerFromParant: PropTypes.func.isRequired
    };
  }
  

  constructor(props) {
    super(props);
    this.sendData = this.sendData.bind(this);
    this.state = {
      name: '',
      start: '',
      end: '',
      color: '#ff0000',
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  checkName = (nameValue) => {
    if (nameValue === '') {
      this.setState({ name: 'Nowe zadanie' });
      return 'Nowe zadanie';
    }
    return nameValue;
  };

  checkStart = (startValue) => {
    const date = new Date();
    if (startValue === null || startValue === '') {
      this.setState({ start: date });
      return date;
    }
    return startValue;
  };

  checkEnd = (endValue) => {
    const date = new Date();
    date.setDate(date.getDate() + 5);

    if (endValue === null || endValue === '') {
      this.setState({ end: date });
      return date;
    }
    return endValue;
  };

  sendData = () => {
    const { handlerFromParant } = this.props;
    const {
      name, start, end, color 
    } = this.state;
    const newData = {
      name: this.checkName(name),
      start: this.checkStart(start),
      end: this.checkEnd(end),
      color
    };
    handlerFromParant(newData);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      name, start, end, color 
    } = this.state;
    this.sendData();
    const project = window.location.hash.substr(10);
    axios
      .post('http://localhost:5000/api/tasks/add', {
        name: this.checkName(name),
        start: this.checkStart(start),
        end: this.checkEnd(end),
        color,
        project
      })
      .then((result) => {
        console.log(result);
      });

    this.handleReset();
  };

  handleReset = () => {
    this.setState({
      name: '',
      start: '',
      end: ''
    });
  };

  render() {
    const {
      name, start, end, color 
    } = this.state;
    return (
      <div>
        <Container>
          <div className="mt-3">
            <Form onSubmit={this.handleSubmit}>
              <Row form>
                <Col>
                  <FormGroup>
                    <Input
                      type="text"
                      name="name"
                      id="nameTask"
                      placeholder="Nazwa zadania"
                      onChange={this.handleInputChange}
                      value={name}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Input
                      type="date"
                      name="start"
                      id="start"
                      placeholder="Czas rozpoczęcia"
                      onChange={this.handleInputChange}
                      value={start}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Input
                      type="date"
                      name="end"
                      id="end"
                      placeholder="Czas zakończenia"
                      onChange={this.handleInputChange}
                      value={end}
                    />
                  </FormGroup>
                </Col>
                <Col xs="1">
                  <FormGroup>
                    <Input
                      type="color"
                      name="color"
                      id="color"
                      placeholder="green"
                      onChange={this.handleInputChange}
                      value={color}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Button type="submit" color="primary">
                      Dodaj zadanie
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </div>
        </Container>
      </div>
    );
  }
}

export default NewTask;

import React, { Component } from 'react';
import axios from 'axios';
import { Col, FormGroup, Container, Button, Collapse, Label, Input, Card, CardBody, Form, Row } from 'reactstrap';
import { InputGroup, InputGroupText, InputGroupAddon } from 'reactstrap';


class NewTask extends Component {
    constructor(props) {
        super(props);
        this.sendData = this.sendData.bind(this);
        this.state = { 
            id: '',
            name: '',
            start: '',
            end: '',
            color: '#ff0000',
            user: localStorage.getItem('user')
          };
      }
    
    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }
    handleInputChange = e => {
        this.setState({
        [e.target.name]: e.target.value
        });
    };

    checkName = (nameValue) => {
        if(nameValue == '') {
        this.setState({name: 'Nowe zadanie'}); 
        return 'Nowe zadanie'
        }
        return nameValue;
    }

    checkStart = (startValue) => {
        let date = new Date();
        if(startValue === null || startValue === '') {
        this.setState({start: date}); 
        return date;
        }
        return startValue;
    }

    checkEnd = (endValue) => {
            let date = new Date();
            date.setDate(date.getDate() + 5);

            if(endValue === null || endValue === '') {
            this.setState({end: date}); 
            return date;
            }
            return endValue;
        }
    

    sendData = () => {
        let newData = {
            id: this.props.id,
            name: this.checkName(this.state.name),
            start: this.checkStart(this.state.start),
            end:  this.checkEnd(this.state.end),
            color: this.state.color 
        };
        this.props.handlerFromParant(newData);
        console.log(newData);
    }

    handleSubmit = e => {
        e.preventDefault();
        
        this.sendData();
        var project = window.location.hash.substr(10)
        axios.post('http://localhost:5000/api/tasks/add', { 
        idTask: this.props.id,
        name: this.checkName(this.state.name),
        start: this.checkStart(this.state.start),
        end: this.checkEnd(this.state.end),
        color: this.state.color,
        user: this.state.user,
        project: project})
          .then((result) => {
            console.log(result);
          });

        this.handleReset();
        
    };

    handleReset = () => {
        this.setState({
          idTask: '',
          name: '',
          start: '',
          end: '',
          start: '',
        });
      };

  render() {
    return (
      <div>
        <Container>
            <div className="mt-3">
                                <Form onSubmit={ this.handleSubmit }>       
                                    <Row form>
                                        <Col>
                                            <FormGroup>
                                                <Input type="text" name="name" id="nameTask" placeholder="Nazwa zadania" onChange={ this.handleInputChange } value={this.state.name} />
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>   
                                                <Input type="date" name="start" id="start" placeholder="Czas rozpoczęcia" onChange={ this.handleInputChange } value={this.state.start} />
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>                                            
                                                <Input type="date" name="end" id="end" placeholder="Czas zakończenia" onChange={ this.handleInputChange } value={this.state.end} />
                                            </FormGroup>
                                        </Col>
                                        <Col xs="1">
                                            <FormGroup >                                            
                                                <Input type="color" name="color" id="exampleZip" placeholder="green" onChange={ this.handleInputChange } value={this.state.color} />
                                            </FormGroup>  
                                        </Col>
                                        <Col >
                                                <FormGroup >   
                                                    <Button type="submit" color="primary">Dodaj zadanie</Button> 
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
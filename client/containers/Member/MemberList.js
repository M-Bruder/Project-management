import React, { Component } from 'react';
import { Col, FormGroup, Button, Input, Form, Row } from 'reactstrap';
import './MemberList.css';
class MemberList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            members: [],
            username: ''
          };
      }
    
    handleInputChange = e => {
        this.setState({
        [e.target.name]: e.target.value
        });
    };
    
    handleSubmit = e => {
        e.preventDefault();
        this.setState({ members: [...this.state.members, username]});
        this.handleReset();
    };

    handleReset = () => {
        this.setState({
          name: ''
        });
      };

    

  render() {
    return (
      <div>
            <div className="content">
                <p><b>Lista członków: </b></p>
                <p> {this.state. members} </p>
                <Form size="sm" onSubmit={this.handleSubmit}>       
                    <Row form>
                            <FormGroup>
                                <Input size="sm" type="text" name="name" id="nameTask" placeholder="Nazwa użytkownika" onChange={ this.handleInputChange } value={this.state.username} />
                            </FormGroup>
                            <FormGroup >   
                                <Button size="sm" type="submit" color="primary">Dodaj</Button> 
                            </FormGroup>             
                    </Row> 
                </Form>              
            </div>
      </div>
    );
  }
}

export default MemberList;
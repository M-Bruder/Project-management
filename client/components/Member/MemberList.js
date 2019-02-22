import React, { Component } from 'react';
import { FormGroup, Button, Input, Form, Row, ListGroup, ListGroupItem } from 'reactstrap';
import axios from 'axios';
import '../../styles/memberList.css'
class AddMemberList extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { 
            membersData: [],
            name: '',
            user: localStorage.getItem('user'),
            projectID: ''
          };
      }
    
    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
          });
    };


componentWillMount = () => {
        var project = this.props.project;
        axios.post('http://localhost:5000/api/members/getMember', { 
            project: project
        })
        .then((res) => {
            let membersData = res.data;
            this.setState({ membersData });
        })
        .catch((error) => {
          if(error.response.status === 401) {
            console.log(error);
          }
        });
    }

handleSubmit = e => {
        e.preventDefault();
        var project = this.props.project;
        //this.setState({ members: [...this.state.members, this.state.username]});
        axios.post(`http://localhost:5000/api/members/addMember`, { 
            memberName: this.state.name, 
            user: this.state.user,
            project: project})
            .then(res => {
                const data = res.data;
                this.setState({ membersData: [...this.state.membersData, data]});
            })
            .catch(error => {
                console.log(error);
            });
        this.handleReset();
  };

  onDelete = (id) => {
    axios.get(`http://localhost:5000/api/members/delete/` + id)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          throw(error);
        });
          this.state.membersData.splice(id, 1);
          this.setState({ membersData: [...this.state.membersData] });
        
      }

    handleReset = () => {
            this.setState({
            name: '',
            projectID: ''
        });
    };
      

  render() {
  const listItems = this.state.membersData.map((d) => <ListGroupItem key={d._id }> {d.members}<Button size= "sm" className="float-right" color="danger" onClick={this.onDelete.bind(this, d._id)}>Usuń</Button> </ListGroupItem>);
  const listItems2 = this.state.membersData.map((d) => 
  <li key={d._id } class="list-group-item">{d.members}<button className="btn btn-danger btn-sm float-right" onClick={this.onDelete.bind(this, d._id)}>Usuń</button></li>);
    return (
      <div>
            <div className="content">
                <p><b>Lista członków: </b></p>
                <ul class="list-group">{ listItems2.length ?  listItems2 : <p>Nie przydzielono członków do projektu!</p>}</ul>
                <Form size="sm" className="addMember" onSubmit={this.handleSubmit}>       
                    <Row form>
                            <FormGroup>
                                <Input size="sm" type="text" name="name" id="nameTask" placeholder="Nazwa użytkownika" onChange={ this.handleInputChange } value={ this.state.name } />
                            </FormGroup>
                            <FormGroup >   
                                <button type="submit" class="btn btn-primary btn-sm">Dodaj</button> 
                            </FormGroup>             
                    </Row> 
                </Form>              
            </div>
      </div>
    );
  }
}



export default AddMemberList;
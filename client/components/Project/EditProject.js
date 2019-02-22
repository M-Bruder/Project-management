import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button, ButtonGroup, Row, Col, Form, FormGroup, Input } from 'reactstrap';
import '../../styles/Project.css';
import MemberList from '../Member/MemberList';

const styles = {
  borderBottom: '2px solid #eee',
  background: '#fafafa',
  margin: '.75rem auto',
  padding: '.6rem 1rem',
  maxWidth: '900px',
  borderRadius: '7px',
};

class EditProject extends Component {
    constructor(props) {
        super(props);
    state = {
      isEditing: this.props.isEditing,
        title: this.props.title,
        body: this.props.body,
        user: localStorage.getItem('user')
      };
    }
      handleInputChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
      };
    
      handleSubmit = e => {
        e.preventDefault();
        if (this.state.title.trim() && this.state.body.trim()) {
          console.log(this.state);
          this.props.onEditProject(
            {
                title: this.state.title,
                body: this.state.body,
                user: this.state.user
            }
        );
        }
      };
    
   

    render() {
    return (
        <div className="content" style={ styles }>
        <Row>
            <Col>
            <div className="post">
                <h4><b>{ this.state.title }</b></h4>
                <p>{ this.state.body }</p>
                <ButtonGroup size="sm" className="optionsProject">
                    <Button color="primary" tag={Link} to={"/groups/" + _id}>Zapisz</Button>
                    <Button color="info" tag={Link} to={"/project/" + _id}>Szczegóły projektu</Button>
                    <Button color="danger" onClick={() => onDelete(_id)}>Usuń</Button>
                </ButtonGroup>
            </div>
            </Col> 
            <Col>
            <div className="member">
                <MemberList project={ _id } />
            </div>
            </Col>
        </Row>
        </div>
    ); 
    }
}

export default EditProject;

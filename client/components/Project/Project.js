import React from 'react';
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

export default ({ project: { title, body, _id }, onDelete }) => {
  return (
    <div className="content" style={ styles }>
      <Row>
        <Col>
          <div className="post">
            <h4><b>{ title }</b></h4>
            <p>{ body }</p>
            <ButtonGroup size="sm" className="optionsProject">
                <Button color="primary" tag={Link} to={"/groups/" + _id}>Edytuj</Button>
                <Button color="info" tag={Link} to={"/project/" + _id}>Szczegóły projektu</Button>
                <Button color="danger" onClick={() => onDelete(_id)}>Usuń</Button>
            </ButtonGroup>
          </div>
        </Col> 
        <Col>
          <div className="member">
            <MemberList post={ _id } />
          </div>
        </Col>
      </Row>
    </div>
  );
  
};

/*<Card>
<CardBody>
  <CardTitle tag="h2">{ title }</CardTitle>
  <CardText>{ body }</CardText>
  <ButtonGroup size="sm">
    <Button color="primary" tag={Link} to={"/groups/" + _id}>Edytuj</Button>
    <Button color="info" tag={Link} to={"/project/" + _id}>Szczegóły projektu</Button>
    <Button color="danger" onClick={() => onDelete(_id)}>Usuń</Button>
</ButtonGroup>
</CardBody>
</Card>*/
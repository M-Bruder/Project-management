import React, { Component } from 'react';
import '../../styles/ProjectDetails.css';
import { Row, Col, Container } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import Gantt from '../../components/Gantt/Gantt';


class ProjectDetails extends Component {
    render() {
    return(
       <div>
         <Container>
          <Row>
            <Col xs="auto">
              <Gantt />
            </Col>
          </Row>
        </Container>
      </div>
    );   
}
}

export default ProjectDetails;
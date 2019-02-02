import React, { Component } from 'react';
import './styles/ProjectDetails.css';
import { Row, Col, Container } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import TaskTable from './components/ProjectDetails/TaskTable';
import NewTask from './components/ProjectDetails/NewTask';
//import Gantt from './containers/Gantt/Gantt2';
import Ganttreact from './containers/Gantt/Gantt';


class ProjectDetails extends Component {
    render() {
    return(
       <div>
         <Container>
         <Row>
          <Col xs="3">
            <NewTask />
            <TaskTable />
          </Col>
          </Row>
          <Row>
          <Col xs="auto">
            <Ganttreact />
          </Col>
          </Row>
        </Container>
      </div>
    );   
}
}

export default ProjectDetails;
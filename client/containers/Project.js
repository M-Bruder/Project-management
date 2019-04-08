import React, { Component } from "react";
import { Button, Collapse, Row, Col } from "reactstrap";
import CreateProject from "./Project/CreateProject";
import ProjectList from "./Project/ProjectList";

const stylesApp = {
  marginTop: 40
};

class App extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <div className="container">
        <div style={stylesApp}>
          <Button
            color="primary"
            onClick={this.toggle}
            style={{ marginBottom: "1rem" }}
          >
            Stwórz nowy projekt
          </Button>
          <Row>
            <Col>
              <Collapse isOpen={this.state.collapse}>
                <CreateProject />
              </Collapse>
              <ProjectList />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default App;

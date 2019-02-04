import React, { Component } from 'react';
import { Button, Collapse, Container, Table, ButtonGroup, Badge } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';

class Members extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
      }
    
      toggle() {
        this.setState({ collapse: !this.state.collapse });
      }
    

    render() {
    return(
       <div>
        <Container>
          <Table className="table mt-4" dark>
            <thead>
              <tr>
                <th width="5%">#</th>
                <th width="20%">Nazwa zadania</th>
                <th width="20%">Data rozpoczęcia</th>
                <th width="20%">Data zakończenia</th>
                <th width="20%">Priorytet</th>
                <th width="10%">Opcje</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row"> 1</td>
                <td>Zadanie 1</td>
                <td>2018-10-01</td>
                <td>2018-12-01</td>
                <td>Wysoki</td>
                <td>
                    <ButtonGroup size="sm">
                        <Button color="warning">Edytuj</Button>
                        <Button color="danger">Usuń</Button>
                    </ButtonGroup>
                </td>
              </tr>
            </tbody>
          </Table>
        </Container>
      </div>
    );   
}
}

export default Members;
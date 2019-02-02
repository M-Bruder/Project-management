import React from 'react';
import { FormGroup,ControlLabel,FormControl } from 'react-bootstrap';
import { Table, Container, Button, Collapse,  Form, Label, Input, FormText } from 'reactstrap';
class NewTask extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false,
            task : '',
            startTime: '',
            endTime: '',
            status: '',
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

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.title.trim() && this.state.body.trim()) {
        console.log(this.state);
        this.props.onAddTask(
            {
                task: this.state.task,
                startTime: this.state.startTime,
                endTime: this.state.endTime,
                status: this.state.status
            }
        );
        this.handleReset();
        }
    };


  render() {
    return (
      <div>
        <Container>
            <div className="float-left mt-3">
                <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Dodaj zadanie</Button>
                    <Collapse isOpen={this.state.collapse}>
                    <Table className="table mt-4" dark>
                    <thead>
                    <th width="20%">
                        <FormGroup>
                            <Label for="exampleEmail">Nazwa zadania</Label>
                            <Input type="text" name="Nazwa zadania" id="exampleEmail" placeholder="with a placeholder" />
                        </FormGroup>
                    </th>
                    <th width="20%">
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input type="text" name="Nazwa zadania" id="exampleEmail" placeholder="with a placeholder" />
                        </FormGroup>
                    </th>
                    <th width="20%">
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input type="text" name="Nazwa zadania" id="exampleEmail" placeholder="with a placeholder" />
                        </FormGroup>
                    </th>
                    <th width="20%">
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input type="text" name="Nazwa zadania" id="exampleEmail" placeholder="with a placeholder" />
                        </FormGroup>
                    </th>
                    <th width="10%">
                        <Button size="sm">Dodaj</Button>
                    </th>
                    </thead>
                    </Table>
                    </Collapse>
            </div>
        </Container>
      </div>
    );
  }
}

export default NewTask;
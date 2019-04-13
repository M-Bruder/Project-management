import React, { Component } from 'react';
import { Button } from 'reactstrap';
import TimeLine from 'react-gantt-timeline';
import '../../styles/gantt.css';
import axios from 'axios';
import NewTask from './NewTask';

const config = {
  header: {
    top: {
      style: {
        fontSize: 12
      }
    },
    middle: {
      style: {
        fontSize: 10
      }
    },
    bottom: {
      style: {
        fontSize: 10,
        color: '#FFFFFF'
      },
      selectedStyle: {
        fontWeight: '700',
        color: '#FF0000'
      }
    }
  },
  taskList: {
    title: {
      label: 'Zadania:'
    },
    task: {
      style: {
        backgroundColor: '#808080',
        color: '#FFFFFF'
      }
    }
  },
  dataViewPort: {
    rows: {
      style: {
        borderBottom: 'solid 1px #808080'
      }
    },
    task: {
      showLabel: false,
      style: {
        borderRadius: 10,
        boxShadow: '2px 2px 8px #888888'
      },
      selectedStyle: {
        border: 'solid 1px #ff00fa'
      }
    }
  }
};
class Gantt extends Component {
  constructor(props) {
    super(props);
    this.handleData = this.handleData.bind(this);
    this.state = {
      date: new Date(),
      data: [],
      selectedItem: null,
      timelineMode: 'month'
    };
  }

  componentDidMount() {
    const project = window.location.hash.substr(10);
    axios
      .post('http://localhost:5000/api/tasks/getTask', { project })
      .then((res) => {
        const { data } = res;
        this.setState({ data });
      })
      .catch((error) => {
        throw error;
      });
  }

  getbuttonStyle(value) {
    const { timelineMode } = this.state;
    return timelineMode === value
      ? { backgroundColor: '#808080', boder: 'solid 1px #223344' }
      : {};
  }

  modeChange = (value) => {
    this.setState({ timelineMode: value });
  };

  onUpdateTask = (items, props) => {
    const item = items;
    const { data } = this.state;
    item.start = props.start ? props.start : item.start;
    item.end = props.end ? props.end : item.end;
    item.name = props.name ? props.name : item.name;
    this.onUpdate(item._id, item.name, item.start, item.end);
    this.setState({ data: [...data] });
  };

  onUpdate = (id, name, start, end) => {
    axios
      .put(`http://localhost:5000/api/tasks/update/${id}`, { name, start, end })
      .catch((error) => {
        throw error;
      });
  };

  onSelectItem = (item) => {
    this.setState({ selectedItem: item });
  };

  idExists = (id) => {
    const { data } = this.state;
    data.some(el => el.id === id);
  };

  addID = (id) => {
    if (this.idExists(id)) {
      return this.addID(id + 1);
    }
    return id;
  };

  addTask = () => {
    const { data, date } = this.state; 
    const newTask = {
      id: this.addID(data.length + 1),
      start: date,
      end: this.getRandomDate(),
      name: 'Nowe zadanie',
      color: this.getRandomColor()
    };
    this.setState({ data: [...data, newTask] });
  };

  delete = () => {
    const { selectedItem, data } = this.state;
    this.onDelete(selectedItem._id);
    if (selectedItem) {
      const index = data.indexOf(selectedItem);
      if (index > -1) {
        data.splice(index, 1);
        this.setState({ data: [...data] });
      }
    }
  };

  onDelete = (id) => {
    axios
      .get(`http://localhost:5000/api/tasks/delete/${id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        throw error;
      });
  };

  onHorizonChange = (start, end) => {
    const result = this.data.filter(
      item => (item.start < start && item.end > end)
        || (item.start > start && item.start < end)
        || (item.end > start && item.end < end)
    );
    this.setState({ data: result });
  };

  handleData = (newData) => {
    const { data } = this.state;
    this.setState({ data: [...data, newData] });
  };

  genID = () => {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return `${S4() + S4()}-${S4()}-4${S4().substr(
      0,
      3
    )}-${S4()}-${S4()}${S4()}${S4()}`.toLowerCase();
  }

  render() {
    const { data, timelineMode, selectedItem } = this.state;
    return (
      <div className="app-container">
        <div className="mode-container row mt-3">
          <NewTask
            id={this.addID(data.length + 1)}
            handlerFromParant={this.handleData}
          />
          <div className="operation-button-container">
            <Button color="danger" onClick={this.delete}>
              Usuń wybrane zadanie
            </Button>
            <div className="mode-container float-left">
              <div
                className="mode-container-item mode-container-item-left"
                onClick={() => this.modeChange('month')}
                style={this.getbuttonStyle('month')}
                role="button"
                tabIndex={0}
                aria-hidden="true"
              >
                Miesiąc
              </div>
              <div
                className="mode-container-item mode-container-item-right"
                onClick={() => this.modeChange('year')}
                style={this.getbuttonStyle('year')}
                role="button"
                tabIndex={0}
                aria-hidden="true"
              >
                Rok
              </div>
            </div>
          </div>
        </div>
        <div className="time-line-container">
          <TimeLine
            data={data}
            onUpdateTask={this.onUpdateTask}
            onSelectItem={this.onSelectItem}
            selectedItem={selectedItem}
            mode={timelineMode}
            config={config}
          />
        </div>
      </div>
    );
  }
}

export default Gantt;

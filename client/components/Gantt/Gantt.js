import React, { Component } from "react";
import { Button } from "reactstrap";
import TimeLine from "react-gantt-timeline";
import "../../styles/gantt.css";
import axios from "axios";
import NewTask from "./NewTask";

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
        color: "#FFFFFF"
      },
      selectedStyle: {
        fontWeight: "700",
        color: "#FF0000"
      }
    }
  },
  taskList: {
    title: {
      label: "Zadania:"
    },
    task: {
      style: {
        backgroundColor: "#808080",
        color: "#FFFFFF"
      }
    }
  },
  dataViewPort: {
    rows: {
      style: {
        borderBottom: "solid 1px #808080"
      }
    },
    task: {
      showLabel: false,
      style: {
        borderRadius: 10,
        boxShadow: "2px 2px 8px #888888"
      },
      selectedStyle: {
        border: "solid 1px #ff00fa"
      }
    }
  }
};
class Gantt extends Component {
  constructor(props) {
    super(props);
    this.handleData = this.handleData.bind(this);
    this.state = {
      user: localStorage.getItem("user"),
      fromChild: [],
      idTask: "",
      data: [],
      selectedItem: null,
      timelineMode: "month"
    };
  }

  componentDidMount() {
    const project = window.location.hash.substr(10);
    axios
      .post("http://localhost:5000/api/tasks/getTask", { project })
      .then(res => {
        const { data } = res;
        this.setState({ data });
      })
      .catch(error => {
        throw error;
      });
  }

  getbuttonStyle(value) {
    return this.state.timelineMode == value
      ? { backgroundColor: "#808080", boder: "solid 1px #223344" }
      : {};
  }

  modeChange = value => {
    this.setState({ timelineMode: value });
  };

  genID() {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return `${S4() + S4()}-${S4()}-4${S4().substr(
      0,
      3
    )}-${S4()}-${S4()}${S4()}${S4()}`.toLowerCase();
  }

  onUpdateTask = (item, props) => {
    item.start = props.start ? props.start : item.start;
    item.end = props.end ? props.end : item.end;
    item.name = props.name ? props.name : item.name;
    this.onUpdate(item._id, item.name, item.start, item.end);
    this.setState({ data: [...this.state.data] });
  };

  onUpdate = (id, name, start, end) => {
    axios
      .put(`http://localhost:5000/api/tasks/update/${id}`, { name, start, end })
      .catch(error => {
        throw error;
      });
  };

  onSelectItem = item => {
    this.setState({ selectedItem: item });
  };

  idExists = id => this.state.data.some(el => el.id === id);

  addID = id => {
    if (this.idExists(id)) {
      return this.addID(id + 1);
    }
    return id;
  };

  addTask = () => {
    const newTask = {
      id: this.addID(this.state.data.length + 1),
      start: new Date(),
      end: this.getRandomDate(),
      name: "Nowe zadanie",
      color: this.getRandomColor()
    };
    this.setState({ idTask: newTask.id, data: [...this.state.data, newTask] });
  };

  delete = () => {
    this.onDelete(this.state.selectedItem._id);
    if (this.state.selectedItem) {
      let index = this.state.data.indexOf(this.state.selectedItem);
      if (index > -1) {
        this.state.data.splice(index, 1);
        this.setState({ data: [...this.state.data] });
      }
    }
  };

  onDelete = id => {
    axios
      .get(`http://localhost:5000/api/tasks/delete/${id}`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        throw error;
      });
  };

  onHorizonChange = (start, end) => {
    const result = this.data.filter(
      item =>
        (item.start < start && item.end > end) ||
        (item.start > start && item.start < end) ||
        (item.end > start && item.end < end)
    );
    this.setState({ data: result });
  };

  handleData = newData => {
    const genID = { id: this.addID(this.state.data.length + 1) };
    this.setState({ idTask: genID });
    this.setState({
      fromChild: newData
    });
    this.setState({ data: [...this.state.data, newData] });
  };

  render() {
    return (
      <div className="app-container">
        <div className="mode-container row mt-3">
          <NewTask
            id={this.addID(this.state.data.length + 1)}
            handlerFromParant={this.handleData}
          />
          <div className="operation-button-container">
            <Button color="danger" onClick={this.delete}>
              Usuń wybrane zadanie
            </Button>
            <div className="mode-container float-left">
              <div
                className="mode-container-item mode-container-item-left"
                onClick={e => this.modeChange("month")}
                style={this.getbuttonStyle("month")}
              >
                Miesiąc
              </div>
              <div
                className="mode-container-item mode-container-item-right"
                onClick={e => this.modeChange("year")}
                style={this.getbuttonStyle("year")}
              >
                Rok
              </div>
            </div>
          </div>
        </div>
        <div className="time-line-container">
          <TimeLine
            data={this.state.data}
            onUpdateTask={this.onUpdateTask}
            onSelectItem={this.onSelectItem}
            selectedItem={this.state.selectedItem}
            mode={this.state.timelineMode}
            config={config}
          />
        </div>
      </div>
    );
  }
}

// <Button color="warning" onClick={this.addTask}>Dodaj zadanie</Button>

export default Gantt;

import React, { Component } from "react";
import { Button } from 'reactstrap';
import TimeLine from "react-gantt-timeline";
import '../../styles/Gantt.css';
import NewTask from '../../components/ProjectDetails/NewTask';
import axios from 'axios';
import { isNull } from "util";

const config = {
  header: {
    top: {
      style: {
        fontSize: 12
      }
    },
    middle: {
      style: {
        backgroundColor: "",
        fontSize: 10
      }
    },
    bottom: {
      style: {
        fontSize: 10,
        color: "white"
      },
      selectedStyle: {
        fontWeight: "bold",
        color: "red"
      }
    }
  },
  taskList: {
    title: {
      label: "Zadania:",
      style: {
      }
    },
    task: {
      style: {
        backgroundColor: "grey",
        color: "white"
      }
    },
    verticalSeparator: {
      style: {
      },
      grip: {
        style: {
          backgroundColor: ""
        }
      }
    }
  },
  dataViewPort: {
    rows: {
      style: {
        backgroundColor: "",
        borderBottom: "solid 1px gray"
      }
    },
    task: {
      showLabel: false,
      style: {
        borderRadius: 10,
        boxShadow: "2px 2px 8px #888888",
      },
      selectedStyle: {
        border: "solid 1px #ff00fa"
      },
    },
  },
  links:{//The link between two task
		color:'black',
		selectedColor:'#ff00fa'
	}
};
class Gantt extends Component {
  constructor(props) {
    super(props);
    this.handleData = this.handleData.bind(this);
    let d1 = new Date();
    let d2 = new Date();
    d2.setDate(d2.getDate() + 5);
    let d3 = new Date();
    d3.setDate(d3.getDate() + 8);
    let d4 = new Date();
    d4.setDate(d4.getDate() + 20);
    console.log(d1, d2, d3, d4);

    let data = [
      {
        id: 1,
        start: d1,
        end: d2,
        name: "Zadanie 1",
        color: "green"
      },
      {
        id: 2,
        start: d3,
        end: d4,
        name: "Zadanie 2",
        color: "orange"
      }
    ];
    this.state = {user: localStorage.getItem('user'), fromChild: [], idTask: '', data: [], links: [], selectedItem: null, timelineMode:"month" };
  }


  componentDidMount() {
    const { user } = this.state;
    axios.post(`http://localhost:5000/api/tasks/getTask`, { user }) 
      .then(res => {
        const data = res.data;
        this.setState({ data });
        console.log(res.data);
      })
      .catch(error => {
        throw(error);
      });
  }

//Do sprawdzenia
  handleDayWidth=(e)=>{
    this.setState({daysWidth:parseInt(e.target.value)})
  }
  handleItemHeight=(e)=>{
    this.setState({itemheight:parseInt(e.target.value)})
  }
//Do tego momentu
  getbuttonStyle(value){
    return this.state.timelineMode==value?{backgroundColor:"grey",boder:'solid 1px #223344'}:{}
  }

  modeChange=(value)=>{
    this.setState({timelineMode:value})
  }

  genID() {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-4" +
      S4().substr(0, 3) +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    ).toLowerCase();
  }

  getRandomDate() {
    let result = new Date();
    result.setDate(result.getDate() + Math.random() * 10);
    return result;
  }
  getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  createLink(start, end) {
    return {
      id: this.genID(),
      start: start.task.id,
      end: end.task.id
    };
  }

  onUpdateTask = (item, props) => {
    item.start = props.start ? props.start : item.start;
    item.end = props.end ? props.end : item.end;
    item.name = props.name ? props.name : item.name;
    this.onUpdate(item._id, item.name, item.start, item.end);
    this.setState({ data: [...this.state.data] });
   
    console.log(item._id);
    //this.state.item._id
    
  };

  onUpdate = (id, name, start, end) => {
    axios.put(`http://localhost:5000/api/tasks/update/` + id, { name, start, end })
    .then(result => {
      console.log(result.data);
    })
    .catch(error => {
      throw(error);
    });
  }

  onCreateLink = item => {
    let newLink = this.createLink(item.start, item.end);
    this.setState({
      links: [...this.state.links, newLink],
      selectedItem: newLink
    });
  
  };

  onSelectItem = item => {
    console.log(`Select Item ${item}`);
    this.setState({ selectedItem: item });
  };

  idExists = (id) => {
    return this.state.data.some(function(el) {
      return el.id === id;
    }); 
  }
  
  addID = (id) => {
    if (this.idExists(id)) {
      return this.addID(id + 1); 
    }
    return id;
  }
  

  addTask = () => {
    let newTask = {
      id: this.addID(this.state.data.length + 1),
      start: new Date(),
      end: this.getRandomDate(),
      name: "Nowe zadanie",
      color: this.getRandomColor()
    };
    this.setState({ idTask: newTask.id , data: [...this.state.data, newTask] });
  };

  delete = () => {
    console.log("On delete");
    console.log(this.state.selectedItem._id);
    this.onDelete(this.state.selectedItem._id);
    if (this.state.selectedItem) {
      let index = this.state.links.indexOf(this.state.selectedItem);
      if (index > -1) {
        this.state.links.splice(index, 1);
        this.setState({ links: [...this.state.links] });
      }
      index = this.state.data.indexOf(this.state.selectedItem);
      console.log('Index: ' + index);
      if (index > -1) {
        this.state.data.splice(index, 1);
        this.setState({ data: [...this.state.data] });
      }
    }
  };

  onDelete = (id) => {
  axios.get(`http://localhost:5000/api/tasks/delete/` + id)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        throw(error);
      });
    }

  onHorizonChange=(start,end)=>{
    let result = this.data.filter((item)=>{
      return  (item.start<start && item.end>end) ||
              (item.start>start && item.start<end) ||
              (item.end>start && item.end<end)})
    console.log('Calculating ')
    this.setState({data:result})
  }

  handleData = (newData) => {
    let genID = {id: this.addID(this.state.data.length + 1)};
    this.setState({ idTask: genID });
    this.setState({
      fromChild: newData
    });
    this.setState({ data: [...this.state.data, newData] });
  }

  render() {
    return (
      <div className="app-container">
        <NewTask id={ this.addID(this.state.data.length + 1) } handlerFromParant={this.handleData} />
          <div className="operation-button-container">
            <div className="mode-button mb-1 float-right">
              <Button color="warning" onClick={this.addTask}>Dodaj zadanie</Button>
              <Button color="danger" onClick={this.delete}>Usuń wybrany element</Button>
            </div>
            <div className="mode-container float-right">
            <div className="mode-container-item mode-container-item-left" 
                onClick={(e)=>this.modeChange('month')}
                style={this.getbuttonStyle('month')}>Miesiąc</div>
             <div className="mode-container-item mode-container-item-right" 
                onClick={(e)=>this.modeChange('year')}
                style={this.getbuttonStyle('year')}>Rok</div>
            </div>
          </div>
        <div className="time-line-container">
          <TimeLine
            data={this.state.data}
            links={this.state.links}
            onUpdateTask={this.onUpdateTask}
            onCreateLink={this.onCreateLink}
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

  
export default Gantt;

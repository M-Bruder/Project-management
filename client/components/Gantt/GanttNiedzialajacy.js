import React, { Component } from 'react';
import * as d3 from 'd3v4';

class GanttNiedziala extends Component {

componentWillMount () {
    d3.gantt = function() {
        var FIT_TIME_DOMAIN_MODE = "fit";
        var FIXED_TIME_DOMAIN_MODE = "fixed";
      
        var margin = {
          top : 100,
          right : 100,
          bottom : 20,
          left : 100
        };
        var timeDomainStart = d3.timeDay.offset(new Date(),-3);
        var timeDomainEnd = d3.timeHour.offset(new Date(),+3);
        var timeDomainMode = FIXED_TIME_DOMAIN_MODE;// fixed or fit
        var taskTypes = [];
        var taskStatus = [];
        var height = document.body.clientHeight - margin.top - margin.bottom-5;
        var width = document.body.clientWidth - margin.right - margin.left-5;
      
        var tickFormat = "%d.%m %H:%M";
      
        var keyFunction = function(d) {
          return d.startDate + d.taskName + d.endDate;
        };
      
        var rectTransform = function(d) {
          return "translate(" + x(d.startDate) + "," + y(d.taskName) + ")";
        };
      
        
      
        var x,y,y2,xAxis,yAxis,xAxis2,yAxis2;
      
        initAxis();
      
        var initTimeDomain = function() {
          if (timeDomainMode === FIT_TIME_DOMAIN_MODE) {
            if (tasks === undefined || tasks.length < 1) {
              timeDomainStart = d3.timeDay.offset(new Date(), -3);
              timeDomainEnd = d3.timeHour.offset(new Date(), +3);
              return;
            }
            tasks.sort(function(a, b) {
              return a.endDate - b.endDate;
            });
            timeDomainEnd = tasks[tasks.length - 1].endDate;
            tasks.sort(function(a, b) {
              return a.startDate - b.startDate;
            });
            timeDomainStart = tasks[0].startDate;
          }
        };
      
      
       function initAxis() {
          x = d3.scaleTime().domain([ timeDomainStart, timeDomainEnd ])
          .range([ 0, width], 1).clamp(true);
      
          y = d3.scaleBand().domain(taskTypes)
          .range([ 0, height - margin.top - margin.bottom]).padding(0.1);
      
          xAxis = d3.axisTop().scale(x)
          .tickFormat(d3.timeFormat(tickFormat))
            .tickSize(-height + margin.bottom);
             //.tickSize(8).tickPadding(8),
      
          yAxis = d3.axisLeft().scale(y).tickSize(0);//.ticks(5).tickPadding(12);
      
          //x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
              //y = d3.scale.linear().range([height, 0]);
              //xAxis = d3.svg.axis().scale(x).orient("bottom").tickSize(-5);
              //yAxis = d3.svg.axis().scale(y).orient("left").ticks(11, "$").tickSize(-width).tickPadding(8);
        }
      
        function gantt(tasks) {
      
          initTimeDomain();
          initAxis();
      
          var svg = d3.select(".zoom")
            .append("svg")
            .attr("class", "chart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("class", "gantt-chart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
      
          svg.selectAll(".chart")
            .data(tasks, keyFunction)
            .enter()
            .append("rect")
            .attr("rx", 5)
            .attr("ry", 5)
            .attr("class", function(d){ 
              if(taskStatus[d.status] == null){ return "bar";}
              return taskStatus[d.status];
            }) 
            .attr("y", 0)
            .attr("transform", rectTransform)
            .attr("height", function(d) { return 70; })
            .attr("width", function(d) { 
              return (x(d.endDate) - x(d.startDate)); 
            });
      
            svg.append("g")
              .attr("class", "x axis")
              //.attr("transform", "translate(0," + 0 + ")")
              //.transition()
              .call(xAxis);
      
            svg.append("g")
            .attr("class", "y axis")
            //.transition()
            .call(yAxis);
      
        // Gratuitous intro zoom!
              var d0 = new Date("2018-01-01"),
              d1 = new Date("2020-01-01");
              var td = gantt.timeDomain();
      
             var zoom = d3.zoom()
              .scaleExtent([1, 64]) //Infinity=64
              .translateExtent([[0, 0], [width, height]])
              .extent([[0, 0], [width, height]])
              //.extent([timeDomainStart,timeDomainEnd])
              .on("zoom", zoomed);
      
            svg
            .call(zoom)
            .transition()
            .duration(1500)
            .call(zoom.transform, d3.zoomIdentity
            //.scale("width", function(d) { 
            //    return (x(d.endDate) - x(d.startDate));})
            .scale(width/(x(d1) - x(d0)))
            .translate(-x(d0), 0));
            /*.scale("width", function(d) { 
                return (x(d.endDate) - x(d.startDate));})
                .translate(-x(d.startDate), 0));
      */
                function zoomed () {
                  var t = d3.event.transform, xt = t.rescaleX(x);
                  //svg.select(".chart").attr("width", rectTransform.x(function(d) { return xt(d.date); }));
                  //svg.attr("width", function(d) { return xt(x(d1) - x(d0));  });
                  svg.selectAll(".x").call(xAxis.scale(xt));
                  svg.selectAll("rect", ".chart").attr("width", function(d) { 
                    return (xt(d.endDate) - xt(d.startDate));});
                  //gantt.redraw(tasks);
                  //gantt.tickFormat(format);
                  //gantt.redraw(tasks);
                }
      
            return gantt;
      
        }
        
      
        gantt.redraw = function(tasks) {
      
          initTimeDomain();
          initAxis();
      
          var svg = d3.select("svg");
          var ganttChartGroup = svg.select(".gantt-chart");
          var rect = ganttChartGroup.selectAll("rect").data(tasks, keyFunction);
      
          rect.enter()
            .insert("rect",":first-child")
            .attr("rx", 5)
            .attr("ry", 5)
            .attr("class", function(d){ 
              if(taskStatus[d.status] == null){ return "bar";}
              return taskStatus[d.status];
            }) 
            //.transition()
            .attr("y", 0)
            .attr("transform", rectTransform)
            .attr("height", function(d) { return y.bandwidth(); })
            .attr("width", function(d) { 
               return (x(d.endDate) - x(d.startDate)); 
            });
      
            rect.merge(rect).transition()
                .attr("transform", rectTransform)
                .attr("height", function(d) { return y.bandwidth(); })
              .attr("width", function(d) { 
                 return (x(d.endDate) - x(d.startDate));
              });
      
              rect.exit().remove();
      
              svg.select(".x")
              //.transition()
              .call(xAxis);
              svg.select(".y")
              //.transition()
              .call(yAxis);
      
              return gantt;
        };
      
        gantt.margin = function(value) {
          if (!arguments.length)
            return margin;
          margin = value;
          return gantt;
        };
      
        gantt.timeDomain = function(value) {
          if (!arguments.length)
            return [ timeDomainStart, timeDomainEnd ];
          timeDomainStart = +value[0], timeDomainEnd = +value[1];
          return gantt;
        };
      
          /**
        * @param {string}
        *                vale The value can be "fit" - the domain fits the data or
        *                "fixed" - fixed domain.
        */
        gantt.timeDomainMode = function(value) {
          if (!arguments.length)
            return timeDomainMode;
          timeDomainMode = value;
          return gantt;
      
        };
      
        gantt.taskTypes = function(value) {
          if (!arguments.length)
            return taskTypes;
          taskTypes = value;
          return gantt;
        };
      
        gantt.taskStatus = function(value) {
          if (!arguments.length)
            return taskStatus;
          taskStatus = value;
          return gantt;
        };
      
        gantt.width = function(value) {
          if (!arguments.length)
            return width;
          width = +value;
          return gantt;
        };
      
        gantt.height = function(value) {
          if (!arguments.length)
            return height;
          height = +value;
          return gantt;
        };
      
        gantt.tickFormat = function(value) {
          if (!arguments.length)
            return tickFormat;
          tickFormat = value;
          return gantt;
        };
        //Dodane ostatnio
        gantt.taskList = function(value) {
              if (!arguments.length)
                  return tasksPT;
              tasksPT = value;
              return gantt;
        };
        
          gantt.taskMedicList = function(value) {
              if (!arguments.length)
                  return tasksMD;
              tasksMD = value;
              return gantt;
          };
      
        return gantt;
      };
}

componentDidMount () {
    var tasks = [{"startDate": new Date("2018-10-01"),
        "endDate":new Date("2018-12-01"),
        "taskName":"Task 1",
        "status":"SUCCEEDED"},
        {"startDate": new Date("2018-09-23"),
        "endDate":new Date("2018-09-27"),
        "taskName":"Task 2",
        "status":"FAILED"},
        {"startDate": new Date("2018-03-01"),
        "endDate":new Date("2018-07-30"),
        "taskName":"Task 3",
        "status":"RUNNING"},
        {"startDate": new Date("2018-11-01"),
        "endDate":new Date("2018-12-23"),
        "taskName":"Task 4",
        "status":"KILLED"},
    ]; 
    
        var taskStatus = {
            "SUCCEEDED" : "bar",
            "FAILED" : "bar-failed",
            "RUNNING" : "bar-running",
            "KILLED" : "bar-killed"
        };
    
            
        var taskNames = [ "Task 1", "Task 2", "Task 3", "Task 4"];
    
        tasks.sort(function(a, b) {
            return a.endDate - b.endDate;
        });
        var maxDate = tasks[tasks.length - 1].endDate;
        tasks.sort(function(a, b) {
            return a.startDate - b.startDate;
        });
        var minDate = tasks[0].startDate;
        
        var format = "%d.%m %H:%M"; //"%H:%M";
        var timeDomainString = "1year";
    
        var gantt = d3.gantt().taskTypes(taskNames).taskStatus(taskStatus).tickFormat(format).height(450).width(800);
        
        gantt.timeDomainMode("fixed");
        changeTimeDomain(timeDomainString);
    
        gantt(tasks);
    
        function changeTimeDomain(timeDomainString) {
            switch (timeDomainString) {
            case "1hr":
            format = "%H:%M:%S";
            gantt.timeDomain([ d3.timeHour.offset(getEndDate(), -1), getEndDate() ]);
            break;
            case "3hr":
            format = "%H:%M";
            gantt.timeDomain([ d3.timeHour.offset(getEndDate(), -3), getEndDate() ]);
            break;
        
            case "6hr":
            format = "%H:%M";
            gantt.timeDomain([ d3.timeHour.offset(getEndDate(), -6), getEndDate() ]);
            break;
        
            case "1day":
            format = "%H:%M";
            gantt.timeDomain([ d3.timeDay.offset(getEndDate(), -1), getEndDate() ]);
            break;
        
            case "1week":
            format = "%a %H:%M";
            gantt.timeDomain([ d3.timeDay.offset(getEndDate(), -7), getEndDate() ]);
            break;
    
            case "1month":
            format = "%m-%d";
            gantt.timeDomain([ d3.timeMonth.offset(getEndDate(), -1), getEndDate() ]);
            break;
    
            case "1year":
            format = "%Y-%m-%d";
            gantt.timeDomain([ d3.timeYear.offset(getEndDate(), -1), getEndDate() ]);
            break;
    
            default:
            format = "%H:%M"
                break;
            }
            gantt.tickFormat(format);
            gantt.redraw(tasks);
        }
    
        
        function getEndDate() {
            var lastEndDate = Date.now();
            if (tasks.length > 0) {
            lastEndDate = tasks[tasks.length - 1].endDate;
            }
            return lastEndDate;
        }
    
        function addTask() {
            var taskStatusName = document.getElementById("barstatus").value;
            var taskName = document.getElementById('tasknames').value; 
            var start = document.getElementById('starttime').value; 
            var end = document.getElementById('endtime').value; 
            
            //Add element to y axis
            taskNames.push(taskName);
    
            tasks.push({
            "startDate" : new Date(start),
            "endDate" : new Date(end),
            "taskName" : taskName,
            "status" : taskStatusName
            });
    
            changeTimeDomain(timeDomainString);
            gantt.redraw(tasks);
        };
        
        function removeTask() {
            var taskName = document.getElementById('tasknames').value;
            taskNames.pop(taskName);
            tasks.pop();
            console.log(tasks.pop());
            console.log(tasks);
            changeTimeDomain(timeDomainString);
            gantt.redraw(tasks);
        };
    
    
        function addTask2(taskName, start, end, taskStatusName) {
    
            if (taskNames.indexOf(taskName) === -1) {
                console.log("element doesn't exist");
            taskNames.push(taskName);
            tasks.push({
            "startDate" : new Date(start),
            "endDate" : new Date(end),
            "taskName" : taskName,
            "status" : taskStatusName
            });
            changeTimeDomain(timeDomainString);
            gantt.redraw(tasks);
            }
              else {
                console.log("element found");
            }
        };
    
        function removeTask2(taskName, start, end, taskStatusName) {
            //var selectTask = taskNames.find(taskName);
            //taskNames.pop(selectTask);
            //tasks.pop();
    
            var taskStatusName2 = {
                "SUCCEEDED" : "bar",
                "FAILED" : "bar-failed",
                "RUNNING" : "bar-running",
                "KILLED" : "bar-killed"
            };
    
            var deleteTask = {
                "startDate" : new Date(start),
                "endDate" : new Date(end),
                "taskName" : taskName,
                "status" : taskStatusName
                };
    
            console.log(taskStatusName);
            console.log(deleteTask);
            console.log(tasks);
            console.log(taskNames);
            if (taskNames.indexOf(taskName) === -1) {
                console.log("element doesn't exist");
              }
              else {
                console.log("element found");
            taskNames.splice($.inArray(taskName, taskNames),1);
            tasks.splice($.inArray(deleteTask, tasks), 1);
            console.log("Usuniete zadania" + tasks.splice($.inArray(deleteTask, tasks), 1));
            changeTimeDomain(timeDomainString);
            gantt.redraw(tasks);
            }
        };
    
        function removeTask3(taskName, start, end, taskStatusName) {
            //var selectTask = taskNames.find(taskName);
            //taskNames.pop(selectTask);
            //tasks.pop();
            var data1 = [taskName];
            var items = tasks;
            var i = items.length;
            
            while (i--) {
                if (data1.indexOf(items[i].taskName) != -1) {
                    items.splice(i, 1);
                }
            
            }
            taskNames.splice($.inArray(taskName, taskNames),1);
            changeTimeDomain(timeDomainString);
            gantt.redraw(tasks);
        };  
}

render () {
return (
    <div className='zoom'>

    </div>
);
}
} 

export default GanttNiedziala;
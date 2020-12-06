# r-todo-list


### Instalation
```javascript
npm i r-todo-list
```
### Example
```javascript
import React,{Component} from "react";
import RTodoList from 'r-todo-list';
import "./style.css";

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      list:{
        Name:'my list'
      },
      tasks:[
        {Name:'task1',Id:'1'},
        {Name:'task2',Id:'2'},
        {Name:'task3',Id:'3'},
        {Name:'task4',Id:'4'},
        {Name:'task5',Id:'5'},
        {Name:'task6',Id:'6'},
        {Name:'task7',Id:'7'},
        {Name:'task8',Id:'8'},
        {Name:'task9',Id:'9'},
        {Name:'task10',Id:'10'},
        {Name:'task11',Id:'11'},
        {Name:'task12',Id:'12'},
      ],
      activeTaskId:false
    }
  }
  getTaskIndexById(id){
    var {tasks} = this.state;
    for(var i = 0; i < tasks.length; i++){
      if(tasks[i].Id === id){return i}
    }
  }
  onTaskClick(task){
    this.setState({activeTaskId:task.Id})
  }
  renameList(name){
    var {list} = this.state;
    list.Name = name;
    this.setState({list})
  }
  removeList(){
    debugger;
  }
  addTask(name){
    var {tasks} = this.state;
    tasks.push({Name:name,Id:Math.round(Math.random() * 100000)})
    this.setState({tasks});
  }
  editTask(editedTask){
    var {tasks} = this.state;
    var index = this.getTaskIndexById(editedTask.Id);
    tasks[index] = editedTask;
    this.setState({tasks})
  }
  render(){
    var {list,activeTaskId} = this.state;
    var {tasks} = this.state;
    //var tasks = this.state.tasks.filter((t)=>!t.completed) 
    return (
     <div className='app'>
        <RTodoList 
          //list object (required)
          list={list}
          // tasks list
          tasks={tasks}
          // send id of active task to highlight it
          activeTaskId={activeTaskId}
          // get clicked task
          onTaskClick={this.onTaskClick.bind(this)}
          // get new name for rename list
          renameList={this.renameList.bind(this)}
          // request for remove list
          removeList={this.removeList.bind(this)}
          // get new name for add a task
          addTask={this.addTask.bind(this)}
          // get edited task. (used for set task completed only)
          editTask={this.editTask.bind(this)}
          // propeties mapping of list (required)
          listDataset={{name:'Name',id:'Id'}}
          // properties mapping of tasks (required)
          taskDataset={{name:'Name',id:'Id',completed:'completed',important:'important'}}
          // style (optional)
          style={undefined}
          // id (optional)
          id={'list1'}
          // class (optional)
          className={'list1'}
          // direction
          rtl={false}
          // language ('en' or 'fa')
          globalization='en'
        />
      </div>
    );
  }
}

```

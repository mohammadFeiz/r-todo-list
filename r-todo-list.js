import React,{Component,createContext,Fragment,createRef} from "react";
import $ from 'jquery';
import RDropdownButton from 'r-dropdown-button';
import "./index.css";

var rTodoListContext = createContext();
export default class RTodoList extends Component{
  constructor(props){
    super(props);
    this.state = {renameText:false} 
    this.translate = this.props.translate?(text)=>this.props.translate(text):(text)=>text
  }

  getValueByField(obj, field, def) {
    if (!field || field === null) { return undefined; }
    var fieldString = typeof field === 'function' ? field(obj) : field;
    if (!fieldString || typeof fieldString !== 'string') { console.error('Grid.getValueByField() receive invalid field'); return undefined }
    var fields = fieldString.split('.');
    var value = obj[fields[0]];
    if (value === undefined) { return def; }
    for (var i = 1; i < fields.length; i++) {
        value = value[fields[i]];
        if (value === undefined || value === null) { return def; }
    }
    return value;
  }
  setValueByField(obj, field, value) {
    var fields = field.split('.');
    var node = obj;
    for (var i = 0; i < fields.length - 1; i++) {
        if (node[fields[i]] === undefined) { return; }
        node = node[fields[i]];
    }
    node[fields[fields.length - 1]] = value;
    return obj;
  }
  SetState(obj){
    this.setState(obj);
  }
  onTaskClick(task){
    this.props.onTaskClick(task)
  }
  render(){
    var {list,addTask,id,className,style,rtl} = this.props;
    if(!list){return ( <div className='r-todo-list'></div>)}
    var context = {
      ...this.props,
      ...this.state,
      SetState:this.SetState.bind(this),
      getValueByField:this.getValueByField,
      setValueByField:this.setValueByField,
      translate:this.translate.bind(this),
      onTaskClick:this.onTaskClick.bind(this)
    }
    return (
      <rTodoListContext.Provider value={context}>
        <div className={'r-todo-list' + (className?' ' + className:'') + (rtl?' rtl':'')} id={id} style={{direction:(rtl?'rtl':'ltr'),...style}}>
          <RTodoListHeader />
          {false && <RTodoListDetails/>}
          {addTask && <RTodoListAdd />}
          <RTodoListTasks />
        </div>
      </rTodoListContext.Provider>
    )
  }
}
RTodoList.defaultProps = {toolbar:[],tasks:[],globalization:'en',onTaskClick:()=>{}}
class RTodoListHeader extends Component{
  static contextType = rTodoListContext;
  constructor(props){
    super(props);
    this.input = createRef();
  }
  renameList(){
    var {renameList,SetState,renameText} = this.context;
    if(renameText){renameList(renameText);}
    SetState({renameText:false});
  }
  componentDidUpdate(){
    var input = $(this.input.current);
    if(input.length === 0 || input.is(":focus")){return;}
    input.focus().select();
  }
  inputKeyDown(e){
    if(e.keyCode === 13){
      this.renameList();
    }
  }
  render(){
    var {list,removeList,renameList,translate,renameText,SetState,rtl,getValueByField,listDataset,toolbar} = 
    this.context;
    var editItems = [];
    if(renameList){
      editItems.push({
        text:<DropdownItem text={translate('Rename List')} icon='rename'/>,
        onClick:()=>SetState({renameText:getValueByField(list,listDataset.name)})
      })
    }
    if(removeList){
      editItems.push({
        text:<DropdownItem text={translate('Remove List')} icon='remove'/>,
        onClick:()=>removeList()
      })
    }
    return (
      <div className='r-todo-list-header'>
        <div className='r-todo-list-header-name'>
          {
            renameText === false && 
            getValueByField(list,listDataset.name)}
          {
            renameText !== false &&
            <Fragment>
              <div className='r-todo-list-header-name-backdrop' onClick={this.renameList.bind(this)}></div>
              <input className='r-todo-list-header-rename-input' ref={this.input} onKeyDown={this.inputKeyDown.bind(this)}
                type='text' style={{width:renameText.length * 6 + 'px'}} value={renameText} 
                onChange={(e)=>SetState({renameText:e.target.value})}
              />
            </Fragment>
          }
        </div>
        {
          editItems.length !== 0 &&
          <RDropdownButton 
            rtl={rtl}
            className='r-todo-list-header-options'
            text='...'
            items={editItems}
          />
        }
        <div className='r-todo-list-header-empty'></div>
        {
          toolbar.length !== 0 &&
          <div className='r-todo-list-header-toolbar'>
          {
            toolbar.map((t,i)=>{
              let {title} = t;
              return <div onClick={t.onClick} key={i} title={title} className='r-todo-list-header-toolbar-item'>{t.icon}</div>
            })
          }
        </div>
        }
      </div>
    )
  }
}
class RTodoListDetails extends Component{
  static contextType = rTodoListContext;
  render(){
    var {list,getValueByField,listDataset} = this.context;
    return (
      <div className='r-todo-list-details'>
        {getValueByField(list,listDataset.userName)}
      </div>
    )
  }
}
class RTodoListAdd extends Component{
  static contextType = rTodoListContext;
  constructor(props){
    super(props);
    this.state = {value:''}
  }
  getIcon(name){
    var colors = {
      blue:'#465efc',
      grey:'#888'
    }
    var icons = {
      plus:(
        <svg style={{width:'24px',height:'24px',transform:'scale(0.7)'}} width={24} height={24}>
          <path fill="none" stroke={colors.blue} d="M12 2 L12 22" strokeLinejoin="miter" strokeLinecap="round" strokeWidth={1}></path>
          <path fill="none" stroke={colors.blue} d="M2 12 L22 12" strokeLinejoin="miter" strokeLinecap="round" strokeWidth={1}></path>
        </svg>
      )
    }
    return icons[name]
  }
  addTask(){
    var {value} = this.state;
    if(!value){return;}
    var {addTask} = this.context;
    addTask(value);
    this.setState({value:''})
  }
  keyDown(e){
    var code = e.keyCode;
    if(code === 13){this.addTask();}
    else if(code === 27){this.setState({value:''})}
  }
  render(){
    var {translate} = this.context;
    var {value} = this.state;
    return (
      <div className='r-todo-list-add' onKeyDown={this.keyDown.bind(this)}>
        <div className='r-todo-list-add-icon' onClick={this.addTask.bind(this)}>{this.getIcon('plus')}</div>
        <div className='r-todo-list-add-name'>
          <input type='text' value={value} onChange={(e)=>this.setState({value:e.target.value})} placeholder={translate('Add A Task')}/>
        </div>  
      </div>
    )
  }
}
class RTodoListTasks extends Component{
  static contextType = rTodoListContext;
  constructor(props){
    super(props);
    this.state = {openCompleted:true}
  }
  getIcon(name){
    var colors = {
      blue:'#465efc',
      grey:'#888'
    }
    var icons = {
      collapse:(
        <svg style={{width:'24px',height:'24px',transform:'scale(0.6)'}} width={24} height={24}>
          <path fill="none" stroke={colors.blue} d="M2 7 L12 17 L22 7" strokeLinejoin="miter" strokeLinecap="round" strokeWidth={1}></path>
        </svg>
      )
    }
    return icons[name]
  }
  render(){
    var {list,tasks,translate,getValueByField,taskDataset,listDataset} = this.context;
    var {openCompleted} = this.state;
    var completedTasks = [],notCompletedTasks = [];
    for(var i = 0; i < tasks.length; i++){
      let task = tasks[i]
      let completed = getValueByField(task,taskDataset.completed,false);
      if(completed === true){
        completedTasks.push(<RTodoListTask key={i} task={task}/>)
      }
      else{
        notCompletedTasks.push(<RTodoListTask key={i} task={task}/>)
      }
    }
    return (
      <div className='r-todo-list-tasks'>
          {notCompletedTasks}
          {
            completedTasks.length !== 0 &&
            <div className='r-todo-list-tasks-completed'>
              <div 
                className={'r-todo-list-tasks-completed-icon' + (openCompleted?' opened':' closed')} 
                onClick={()=>this.setState({openCompleted:!openCompleted})}
              >{this.getIcon('collapse')}</div>
              <div className='r-todo-list-tasks-completed-title'>{translate('Completed')}</div> 
              <div className='r-todo-list-tasks-completed-badge'>{`(${completedTasks.length})`}</div>  
            </div>
          }
          {openCompleted === true && completedTasks}
          
      </div>
    )
  }
}
class RTodoListTask extends Component{
  static contextType = rTodoListContext;
  click(e){
    var target = $(e.target);
    if(target.hasClass('r-todo-list-task-completed') || target.hasClass('r-todo-list-task-important') || target.parents('.r-todo-list-task-important').length){return;}
    var {onTaskClick,getValueByField} = this.context;
    var {task} = this.props;
    onTaskClick(task);
  }
  render(){
    var {activeTaskId,editTask,getValueByField,setValueByField,taskDataset} = this.context;
    var {task} = this.props;
    var completed = getValueByField(task,taskDataset.completed,false);
    var important = getValueByField(task,taskDataset.important,false);
    var name = getValueByField(task,taskDataset.name);
    var id = getValueByField(task,taskDataset.id);
    var active = activeTaskId === id;
    return (
      <div className={'r-todo-list-task' + (active?' active':'')} onClick={this.click.bind(this)}>
        <div 
          className={'r-todo-list-task-completed' + (completed?' completed':'')}
          onClick={()=>{
            var newTask = JSON.parse(JSON.stringify(task));
            setValueByField(newTask,taskDataset.completed,!completed)
            editTask(newTask);
          }}
        ></div>
        <div className='r-todo-list-task-empty'></div>
        <div className='r-todo-list-task-name'>{name}</div>
        {
          false && 
          <div 
          className={'r-todo-list-task-important'}
          onClick={()=>{
            var newTask = JSON.parse(JSON.stringify(task));
            setValueByField(newTask,taskDataset.important,!important)
            editTask(newTask);
          }}
        >{getIcon(important?'importantFill':'important')}</div>
        }
      </div>
    )
  }
}
class DropdownItem extends Component{
  getIcon(name){
    var colors = {
    blue:'#465efc',
    grey:'#888'
  }
  var icons = {
    rename:(
      <svg style={{width:'24px',height:'24px',transform:'scale(0.8)'}} width={24} height={24}>    
      <path fill="none" stroke={colors.grey} d="M14 9 L2 9 L2 15 L14 15" strokeLinejoin="miter" strokeLinecap="round" strokeWidth={1}>
      </path>
      <path fill="none" stroke={colors.grey} d="M18 9 L22 9 L22 15 L18 15" strokeLinejoin="miter" strokeLinecap="round" strokeWidth={1}>
      </path>
      <path fill="none" stroke={colors.grey} d="M16 17 L16 7" strokeLinejoin="miter" strokeLinecap="round" strokeWidth={1}>
      </path>
      <path fill="none" stroke={colors.grey} d="M16 7 q1 -1 2 -1" strokeLinejoin="miter" strokeLinecap="round" strokeWidth={1}>
      </path>
      <path fill="none" stroke={colors.grey} d="M16 7 q-1 -1 -2 -1" strokeLinejoin="miter" strokeLinecap="round" strokeWidth={1}>
      </path>
      <path fill="none" stroke={colors.grey} d="M16 17 q1 1 2 1" strokeLinejoin="miter" strokeLinecap="round" strokeWidth={1}>
      </path>
      <path fill="none" stroke={colors.grey} d="M16 17 q-1 1 -2 1" strokeLinejoin="miter" strokeLinecap="round" strokeWidth={1}>
      </path>
      <path fill={colors.grey} stroke="none" d="M3 10 L3 14 L12 14 L12 10 L3 10" strokeLinejoin="miter" strokeLinecap="round" strokeWidth={1}>
      </path>
      </svg>
    ),
    remove:(
      <svg style={{width:"24px",height:"24px",background:"unset"}} width={24} height={24}>
      <path fill="none" stroke="#000000" d="M10 6 L10 4 L14 4 L14 6 L10 6" strokeLinejoin="miter" strokeLinecap="round" strokeWidth={1}>
      </path>
      <path fill="none" stroke={colors.grey} d="M5 6 L19 6 L5 6" strokeLinejoin="round" strokeLinecap="round" strokeWidth={1}>
      </path>
      <path fill="none" stroke={colors.grey} d="M12 9 L12 17 L12 9" strokeLinejoin="round" strokeLinecap="round" strokeWidth={1}>
      </path>
      <path fill="none" stroke={colors.grey} d="M15 9 L15 17 L15 9" strokeLinejoin="round" strokeLinecap="round" strokeWidth={1}>
      </path>
      <path fill="none" stroke={colors.grey} d="M9 9 L9 17 L9 9" strokeLinejoin="round" strokeLinecap="round" strokeWidth={1}>
      </path>
      <path fill="none" stroke={colors.grey} d="M17 6 L17 20 L7 20 L7 6 L17 6" strokeLinejoin="round" strokeLinecap="round" strokeWidth={1}>
      </path>
      </svg>
    )
  }
  return icons[name]
  }
  render(){
    var {text,icon} = this.props;
    return (
      <div className='dropdown-item'>
        <div className='dropdown-item-icon'>{this.getIcon(icon)}</div>
        <div className='dropdown-item-empty'></div>
        <div className='dropdown-item-title'>{text}</div>
      </div>
    )
  }
}
"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _jquery = _interopRequireDefault(require("jquery"));

var _rDropdownButton = _interopRequireDefault(require("r-dropdown-button"));

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var rTodoListContext = /*#__PURE__*/(0, _react.createContext)();

var RTodoList = /*#__PURE__*/function (_Component) {
  _inherits(RTodoList, _Component);

  var _super = _createSuper(RTodoList);

  function RTodoList(props) {
    var _this;

    _classCallCheck(this, RTodoList);

    _this = _super.call(this, props);
    _this.state = {
      renameText: false
    };
    return _this;
  }

  _createClass(RTodoList, [{
    key: "translate",
    value: function translate(key) {
      var globalization = this.props.globalization;
      var dictionary = {
        RenameList: {
          en: 'Rename List',
          fa: 'تغییر نام لیست'
        },
        RemoveList: {
          en: 'Remove List',
          fa: 'حذف لیست'
        },
        AddATask: {
          en: 'Add A Task',
          fa: 'افزودن اقدام'
        },
        Completed: {
          en: 'Completed',
          fa: 'انجام شده'
        }
      };
      return dictionary[key][globalization];
    }
  }, {
    key: "getValueByField",
    value: function getValueByField(obj, field, def) {
      if (!field || field === null) {
        return undefined;
      }

      var fieldString = typeof field === 'function' ? field(obj) : field;

      if (!fieldString || typeof fieldString !== 'string') {
        console.error('Grid.getValueByField() receive invalid field');
        return undefined;
      }

      var fields = fieldString.split('.');
      var value = obj[fields[0]];

      if (value === undefined) {
        return def;
      }

      for (var i = 1; i < fields.length; i++) {
        value = value[fields[i]];

        if (value === undefined || value === null) {
          return def;
        }
      }

      return value;
    }
  }, {
    key: "setValueByField",
    value: function setValueByField(obj, field, value) {
      var fields = field.split('.');
      var node = obj;

      for (var i = 0; i < fields.length - 1; i++) {
        if (node[fields[i]] === undefined) {
          return;
        }

        node = node[fields[i]];
      }

      node[fields[fields.length - 1]] = value;
      return obj;
    }
  }, {
    key: "SetState",
    value: function SetState(obj) {
      this.setState(obj);
    }
  }, {
    key: "onTaskClick",
    value: function onTaskClick(task) {
      this.props.onTaskClick(task);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          list = _this$props.list,
          addTask = _this$props.addTask,
          id = _this$props.id,
          className = _this$props.className,
          style = _this$props.style,
          rtl = _this$props.rtl;

      if (!list) {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "r-todo-list"
        });
      }

      var context = { ...this.props,
        ...this.state,
        SetState: this.SetState.bind(this),
        getValueByField: this.getValueByField,
        setValueByField: this.setValueByField,
        translate: this.translate.bind(this),
        onTaskClick: this.onTaskClick.bind(this)
      };
      return /*#__PURE__*/_react.default.createElement(rTodoListContext.Provider, {
        value: context
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: 'r-todo-list' + (className ? ' ' + className : '') + (rtl ? ' rtl' : ''),
        id: id,
        style: {
          direction: rtl ? 'rtl' : 'ltr',
          ...style
        }
      }, /*#__PURE__*/_react.default.createElement(RTodoListHeader, null), false && /*#__PURE__*/_react.default.createElement(RTodoListDetails, null), addTask && /*#__PURE__*/_react.default.createElement(RTodoListAdd, null), /*#__PURE__*/_react.default.createElement(RTodoListTasks, null)));
    }
  }]);

  return RTodoList;
}(_react.Component);

exports.default = RTodoList;
RTodoList.defaultProps = {
  toolbar: [],
  tasks: [],
  globalization: 'en',
  onTaskClick: function onTaskClick() {}
};

var RTodoListHeader = /*#__PURE__*/function (_Component2) {
  _inherits(RTodoListHeader, _Component2);

  var _super2 = _createSuper(RTodoListHeader);

  function RTodoListHeader(props) {
    var _this2;

    _classCallCheck(this, RTodoListHeader);

    _this2 = _super2.call(this, props);
    _this2.input = /*#__PURE__*/(0, _react.createRef)();
    return _this2;
  }

  _createClass(RTodoListHeader, [{
    key: "renameList",
    value: function renameList() {
      var _this$context = this.context,
          renameList = _this$context.renameList,
          SetState = _this$context.SetState,
          renameText = _this$context.renameText;

      if (renameText) {
        renameList(renameText);
      }

      SetState({
        renameText: false
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var input = (0, _jquery.default)(this.input.current);

      if (input.length === 0 || input.is(":focus")) {
        return;
      }

      input.focus().select();
    }
  }, {
    key: "inputKeyDown",
    value: function inputKeyDown(e) {
      if (e.keyCode === 13) {
        this.renameList();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$context2 = this.context,
          list = _this$context2.list,
          removeList = _this$context2.removeList,
          renameList = _this$context2.renameList,
          translate = _this$context2.translate,
          renameText = _this$context2.renameText,
          SetState = _this$context2.SetState,
          rtl = _this$context2.rtl,
          getValueByField = _this$context2.getValueByField,
          listDataset = _this$context2.listDataset,
          toolbar = _this$context2.toolbar;
      var editItems = [];

      if (renameList) {
        editItems.push({
          text: /*#__PURE__*/_react.default.createElement(DropdownItem, {
            text: translate('RenameList'),
            icon: "rename"
          }),
          onClick: function onClick() {
            return SetState({
              renameText: getValueByField(list, listDataset.name)
            });
          }
        });
      }

      if (removeList) {
        editItems.push({
          text: /*#__PURE__*/_react.default.createElement(DropdownItem, {
            text: translate('RemoveList'),
            icon: "remove"
          }),
          onClick: function onClick() {
            return removeList();
          }
        });
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "r-todo-list-header"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "r-todo-list-header-name"
      }, renameText === false && getValueByField(list, listDataset.name), renameText !== false && /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        className: "r-todo-list-header-name-backdrop",
        onClick: this.renameList.bind(this)
      }), /*#__PURE__*/_react.default.createElement("input", {
        className: "r-todo-list-header-rename-input",
        ref: this.input,
        onKeyDown: this.inputKeyDown.bind(this),
        type: "text",
        style: {
          width: renameText.length * 6 + 'px'
        },
        value: renameText,
        onChange: function onChange(e) {
          return SetState({
            renameText: e.target.value
          });
        }
      }))), editItems.length !== 0 && /*#__PURE__*/_react.default.createElement(_rDropdownButton.default, {
        rtl: rtl,
        className: "r-todo-list-header-options",
        text: "...",
        items: editItems
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-todo-list-header-empty"
      }), toolbar.length !== 0 && /*#__PURE__*/_react.default.createElement("div", {
        className: "r-todo-list-header-toolbar"
      }, toolbar.map(function (t, i) {
        var title = t.title;
        return /*#__PURE__*/_react.default.createElement("div", {
          onClick: t.onClick,
          key: i,
          title: title,
          className: "r-todo-list-header-toolbar-item"
        }, t.icon);
      })));
    }
  }]);

  return RTodoListHeader;
}(_react.Component);

_defineProperty(RTodoListHeader, "contextType", rTodoListContext);

var RTodoListDetails = /*#__PURE__*/function (_Component3) {
  _inherits(RTodoListDetails, _Component3);

  var _super3 = _createSuper(RTodoListDetails);

  function RTodoListDetails() {
    _classCallCheck(this, RTodoListDetails);

    return _super3.apply(this, arguments);
  }

  _createClass(RTodoListDetails, [{
    key: "render",
    value: function render() {
      var _this$context3 = this.context,
          list = _this$context3.list,
          getValueByField = _this$context3.getValueByField,
          listDataset = _this$context3.listDataset;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "r-todo-list-details"
      }, getValueByField(list, listDataset.userName));
    }
  }]);

  return RTodoListDetails;
}(_react.Component);

_defineProperty(RTodoListDetails, "contextType", rTodoListContext);

var RTodoListAdd = /*#__PURE__*/function (_Component4) {
  _inherits(RTodoListAdd, _Component4);

  var _super4 = _createSuper(RTodoListAdd);

  function RTodoListAdd(props) {
    var _this3;

    _classCallCheck(this, RTodoListAdd);

    _this3 = _super4.call(this, props);
    _this3.state = {
      value: ''
    };
    return _this3;
  }

  _createClass(RTodoListAdd, [{
    key: "getIcon",
    value: function getIcon(name) {
      var colors = {
        blue: '#465efc',
        grey: '#888'
      };
      var icons = {
        plus: /*#__PURE__*/_react.default.createElement("svg", {
          style: {
            width: '24px',
            height: '24px',
            transform: 'scale(0.7)'
          },
          width: 24,
          height: 24
        }, /*#__PURE__*/_react.default.createElement("path", {
          fill: "none",
          stroke: colors.blue,
          d: "M12 2 L12 22",
          strokeLinejoin: "miter",
          strokeLinecap: "round",
          strokeWidth: 1
        }), /*#__PURE__*/_react.default.createElement("path", {
          fill: "none",
          stroke: colors.blue,
          d: "M2 12 L22 12",
          strokeLinejoin: "miter",
          strokeLinecap: "round",
          strokeWidth: 1
        }))
      };
      return icons[name];
    }
  }, {
    key: "addTask",
    value: function addTask() {
      var value = this.state.value;

      if (!value) {
        return;
      }

      var addTask = this.context.addTask;
      addTask(value);
      this.setState({
        value: ''
      });
    }
  }, {
    key: "keyDown",
    value: function keyDown(e) {
      var code = e.keyCode;

      if (code === 13) {
        this.addTask();
      } else if (code === 27) {
        this.setState({
          value: ''
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var translate = this.context.translate;
      var value = this.state.value;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "r-todo-list-add",
        onKeyDown: this.keyDown.bind(this)
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "r-todo-list-add-icon",
        onClick: this.addTask.bind(this)
      }, this.getIcon('plus')), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-todo-list-add-name"
      }, /*#__PURE__*/_react.default.createElement("input", {
        type: "text",
        value: value,
        onChange: function onChange(e) {
          return _this4.setState({
            value: e.target.value
          });
        },
        placeholder: translate('AddATask')
      })));
    }
  }]);

  return RTodoListAdd;
}(_react.Component);

_defineProperty(RTodoListAdd, "contextType", rTodoListContext);

var RTodoListTasks = /*#__PURE__*/function (_Component5) {
  _inherits(RTodoListTasks, _Component5);

  var _super5 = _createSuper(RTodoListTasks);

  function RTodoListTasks(props) {
    var _this5;

    _classCallCheck(this, RTodoListTasks);

    _this5 = _super5.call(this, props);
    _this5.state = {
      openCompleted: true
    };
    return _this5;
  }

  _createClass(RTodoListTasks, [{
    key: "getIcon",
    value: function getIcon(name) {
      var colors = {
        blue: '#465efc',
        grey: '#888'
      };
      var icons = {
        collapse: /*#__PURE__*/_react.default.createElement("svg", {
          style: {
            width: '24px',
            height: '24px',
            transform: 'scale(0.6)'
          },
          width: 24,
          height: 24
        }, /*#__PURE__*/_react.default.createElement("path", {
          fill: "none",
          stroke: colors.blue,
          d: "M2 7 L12 17 L22 7",
          strokeLinejoin: "miter",
          strokeLinecap: "round",
          strokeWidth: 1
        }))
      };
      return icons[name];
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var _this$context4 = this.context,
          list = _this$context4.list,
          tasks = _this$context4.tasks,
          translate = _this$context4.translate,
          getValueByField = _this$context4.getValueByField,
          taskDataset = _this$context4.taskDataset,
          listDataset = _this$context4.listDataset;
      var openCompleted = this.state.openCompleted;
      var completedTasks = [],
          notCompletedTasks = [];

      for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        var completed = getValueByField(task, taskDataset.completed, false);

        if (completed === true) {
          completedTasks.push( /*#__PURE__*/_react.default.createElement(RTodoListTask, {
            key: i,
            task: task
          }));
        } else {
          notCompletedTasks.push( /*#__PURE__*/_react.default.createElement(RTodoListTask, {
            key: i,
            task: task
          }));
        }
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "r-todo-list-tasks"
      }, notCompletedTasks, completedTasks.length !== 0 && /*#__PURE__*/_react.default.createElement("div", {
        className: "r-todo-list-tasks-completed"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: 'r-todo-list-tasks-completed-icon' + (openCompleted ? ' opened' : ' closed'),
        onClick: function onClick() {
          return _this6.setState({
            openCompleted: !openCompleted
          });
        }
      }, this.getIcon('collapse')), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-todo-list-tasks-completed-title"
      }, translate('Completed')), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-todo-list-tasks-completed-badge"
      }, "(".concat(completedTasks.length, ")"))), openCompleted === true && completedTasks);
    }
  }]);

  return RTodoListTasks;
}(_react.Component);

_defineProperty(RTodoListTasks, "contextType", rTodoListContext);

var RTodoListTask = /*#__PURE__*/function (_Component6) {
  _inherits(RTodoListTask, _Component6);

  var _super6 = _createSuper(RTodoListTask);

  function RTodoListTask() {
    _classCallCheck(this, RTodoListTask);

    return _super6.apply(this, arguments);
  }

  _createClass(RTodoListTask, [{
    key: "click",
    value: function click(e) {
      var target = (0, _jquery.default)(e.target);

      if (target.hasClass('r-todo-list-task-completed') || target.hasClass('r-todo-list-task-important') || target.parents('.r-todo-list-task-important').length) {
        return;
      }

      var _this$context5 = this.context,
          onTaskClick = _this$context5.onTaskClick,
          getValueByField = _this$context5.getValueByField;
      var task = this.props.task;
      onTaskClick(task);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$context6 = this.context,
          activeTaskId = _this$context6.activeTaskId,
          editTask = _this$context6.editTask,
          getValueByField = _this$context6.getValueByField,
          setValueByField = _this$context6.setValueByField,
          taskDataset = _this$context6.taskDataset;
      var task = this.props.task;
      var completed = getValueByField(task, taskDataset.completed, false);
      var important = getValueByField(task, taskDataset.important, false);
      var name = getValueByField(task, taskDataset.name);
      var id = getValueByField(task, taskDataset.id);
      var active = activeTaskId === id;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: 'r-todo-list-task' + (active ? ' active' : ''),
        onClick: this.click.bind(this)
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: 'r-todo-list-task-completed' + (completed ? ' completed' : ''),
        onClick: function onClick() {
          var newTask = JSON.parse(JSON.stringify(task));
          setValueByField(newTask, taskDataset.completed, !completed);
          editTask(newTask);
        }
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-todo-list-task-empty"
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-todo-list-task-name"
      }, name), false && /*#__PURE__*/_react.default.createElement("div", {
        className: 'r-todo-list-task-important',
        onClick: function onClick() {
          var newTask = JSON.parse(JSON.stringify(task));
          setValueByField(newTask, taskDataset.important, !important);
          editTask(newTask);
        }
      }, getIcon(important ? 'importantFill' : 'important')));
    }
  }]);

  return RTodoListTask;
}(_react.Component);

_defineProperty(RTodoListTask, "contextType", rTodoListContext);

var DropdownItem = /*#__PURE__*/function (_Component7) {
  _inherits(DropdownItem, _Component7);

  var _super7 = _createSuper(DropdownItem);

  function DropdownItem() {
    _classCallCheck(this, DropdownItem);

    return _super7.apply(this, arguments);
  }

  _createClass(DropdownItem, [{
    key: "getIcon",
    value: function getIcon(name) {
      var colors = {
        blue: '#465efc',
        grey: '#888'
      };
      var icons = {
        rename: /*#__PURE__*/_react.default.createElement("svg", {
          style: {
            width: '24px',
            height: '24px',
            transform: 'scale(0.8)'
          },
          width: 24,
          height: 24
        }, /*#__PURE__*/_react.default.createElement("path", {
          fill: "none",
          stroke: colors.grey,
          d: "M14 9 L2 9 L2 15 L14 15",
          strokeLinejoin: "miter",
          strokeLinecap: "round",
          strokeWidth: 1
        }), /*#__PURE__*/_react.default.createElement("path", {
          fill: "none",
          stroke: colors.grey,
          d: "M18 9 L22 9 L22 15 L18 15",
          strokeLinejoin: "miter",
          strokeLinecap: "round",
          strokeWidth: 1
        }), /*#__PURE__*/_react.default.createElement("path", {
          fill: "none",
          stroke: colors.grey,
          d: "M16 17 L16 7",
          strokeLinejoin: "miter",
          strokeLinecap: "round",
          strokeWidth: 1
        }), /*#__PURE__*/_react.default.createElement("path", {
          fill: "none",
          stroke: colors.grey,
          d: "M16 7 q1 -1 2 -1",
          strokeLinejoin: "miter",
          strokeLinecap: "round",
          strokeWidth: 1
        }), /*#__PURE__*/_react.default.createElement("path", {
          fill: "none",
          stroke: colors.grey,
          d: "M16 7 q-1 -1 -2 -1",
          strokeLinejoin: "miter",
          strokeLinecap: "round",
          strokeWidth: 1
        }), /*#__PURE__*/_react.default.createElement("path", {
          fill: "none",
          stroke: colors.grey,
          d: "M16 17 q1 1 2 1",
          strokeLinejoin: "miter",
          strokeLinecap: "round",
          strokeWidth: 1
        }), /*#__PURE__*/_react.default.createElement("path", {
          fill: "none",
          stroke: colors.grey,
          d: "M16 17 q-1 1 -2 1",
          strokeLinejoin: "miter",
          strokeLinecap: "round",
          strokeWidth: 1
        }), /*#__PURE__*/_react.default.createElement("path", {
          fill: colors.grey,
          stroke: "none",
          d: "M3 10 L3 14 L12 14 L12 10 L3 10",
          strokeLinejoin: "miter",
          strokeLinecap: "round",
          strokeWidth: 1
        })),
        remove: /*#__PURE__*/_react.default.createElement("svg", {
          style: {
            width: "24px",
            height: "24px",
            background: "unset"
          },
          width: 24,
          height: 24
        }, /*#__PURE__*/_react.default.createElement("path", {
          fill: "none",
          stroke: "#000000",
          d: "M10 6 L10 4 L14 4 L14 6 L10 6",
          strokeLinejoin: "miter",
          strokeLinecap: "round",
          strokeWidth: 1
        }), /*#__PURE__*/_react.default.createElement("path", {
          fill: "none",
          stroke: colors.grey,
          d: "M5 6 L19 6 L5 6",
          strokeLinejoin: "round",
          strokeLinecap: "round",
          strokeWidth: 1
        }), /*#__PURE__*/_react.default.createElement("path", {
          fill: "none",
          stroke: colors.grey,
          d: "M12 9 L12 17 L12 9",
          strokeLinejoin: "round",
          strokeLinecap: "round",
          strokeWidth: 1
        }), /*#__PURE__*/_react.default.createElement("path", {
          fill: "none",
          stroke: colors.grey,
          d: "M15 9 L15 17 L15 9",
          strokeLinejoin: "round",
          strokeLinecap: "round",
          strokeWidth: 1
        }), /*#__PURE__*/_react.default.createElement("path", {
          fill: "none",
          stroke: colors.grey,
          d: "M9 9 L9 17 L9 9",
          strokeLinejoin: "round",
          strokeLinecap: "round",
          strokeWidth: 1
        }), /*#__PURE__*/_react.default.createElement("path", {
          fill: "none",
          stroke: colors.grey,
          d: "M17 6 L17 20 L7 20 L7 6 L17 6",
          strokeLinejoin: "round",
          strokeLinecap: "round",
          strokeWidth: 1
        }))
      };
      return icons[name];
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          text = _this$props2.text,
          icon = _this$props2.icon;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "dropdown-item"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "dropdown-item-icon"
      }, this.getIcon(icon)), /*#__PURE__*/_react.default.createElement("div", {
        className: "dropdown-item-empty"
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "dropdown-item-title"
      }, text));
    }
  }]);

  return DropdownItem;
}(_react.Component);
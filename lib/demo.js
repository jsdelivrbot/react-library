var AutoSizeComponent, AutoSizeTestComponent, Block, Block2, BlocksComponent, DragDropContext, FillDownwardComponent, HTML5Backend, ModalPopupComponent, ModalPopupSample, ModalWindowComponent, ModalWindowSample, PopoverHelpComponent, PopoverHelpSample, R, React, ReactDOM, ReorderDemo, ReorderDemoWrapped, ReorderableListComponent, ReorderableListItemComponent, SampleComponent, SortableSample, SortableSampleItem, ToggleTestComponent, VerticalTreeLayoutComponent, _, ui, uuid,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

React = require('react');

ReactDOM = require('react-dom');

R = React.createElement;

_ = require('lodash');

uuid = require('uuid');

SampleComponent = require('./SampleComponent');

ModalPopupComponent = require('./ModalPopupComponent');

ModalWindowComponent = require('./ModalWindowComponent');

VerticalTreeLayoutComponent = require('./VerticalTreeLayoutComponent');

ReorderableListComponent = require("./reorderable/ReorderableListComponent");

ReorderableListItemComponent = require("./reorderable/ReorderableListItemComponent");

PopoverHelpComponent = require('./PopoverHelpComponent');

FillDownwardComponent = require('./FillDownwardComponent');

AutoSizeComponent = require('./AutoSizeComponent');

ui = require('./bootstrap');

HTML5Backend = require('react-dnd-html5-backend')["default"];

DragDropContext = require("react-dnd").DragDropContext;

PopoverHelpSample = (function(superClass) {
  extend(PopoverHelpSample, superClass);

  function PopoverHelpSample() {
    return PopoverHelpSample.__super__.constructor.apply(this, arguments);
  }

  PopoverHelpSample.prototype.render = function() {
    return R(PopoverHelpComponent, null, "This is a test");
  };

  return PopoverHelpSample;

})(React.Component);

Block = (function(superClass) {
  extend(Block, superClass);

  function Block() {
    return Block.__super__.constructor.apply(this, arguments);
  }

  Block.prototype.render = function() {
    return R('div', {
      style: {
        height: 200,
        width: 200,
        border: "solid 2px blue"
      }
    }, " ");
  };

  return Block;

})(React.Component);

Block2 = (function(superClass) {
  extend(Block2, superClass);

  function Block2() {
    return Block2.__super__.constructor.apply(this, arguments);
  }

  Block2.prototype.render = function() {
    return R('div', {
      style: {
        height: 300,
        width: 200,
        border: "solid 2px blue"
      }
    }, " ");
  };

  return Block2;

})(React.Component);

ModalWindowSample = (function(superClass) {
  extend(ModalWindowSample, superClass);

  function ModalWindowSample() {
    this.handleModalClose = bind(this.handleModalClose, this);
    this.finishEditing = bind(this.finishEditing, this);
    this.startEditing = bind(this.startEditing, this);
    ModalWindowSample.__super__.constructor.apply(this, arguments);
    this.state = {
      editing: false
    };
  }

  ModalWindowSample.prototype.startEditing = function() {
    return this.setState({
      editing: true
    });
  };

  ModalWindowSample.prototype.finishEditing = function() {
    return this.setState({
      editing: false
    });
  };

  ModalWindowSample.prototype.handleModalClose = function() {
    this.finishEditing();
    return console.log("editing finished");
  };

  ModalWindowSample.prototype.render = function() {
    var sizes;
    sizes = ["large", "small", ""];
    return R('div', null, R('a', {
      onClick: this.startEditing
    }, "Edit me"), this.state.editing ? R(ModalWindowComponent, {
      isOpen: this.state.editing,
      onRequestClose: this.finishEditing
    }, R('div', null, _.map(_.range(1, 100), function(x) {
      return R('div', null, "" + x);
    }))) : void 0);
  };

  return ModalWindowSample;

})(React.Component);

ModalPopupSample = (function(superClass) {
  extend(ModalPopupSample, superClass);

  function ModalPopupSample() {
    this.handleModalClose = bind(this.handleModalClose, this);
    this.finishEditing = bind(this.finishEditing, this);
    this.startEditing = bind(this.startEditing, this);
    ModalPopupSample.__super__.constructor.apply(this, arguments);
    this.state = {
      editing: false
    };
  }

  ModalPopupSample.prototype.startEditing = function() {
    return this.setState({
      editing: true
    });
  };

  ModalPopupSample.prototype.finishEditing = function() {
    return this.setState({
      editing: false
    });
  };

  ModalPopupSample.prototype.handleModalClose = function() {
    this.finishEditing();
    return console.log("editing finished");
  };

  ModalPopupSample.prototype.render = function() {
    return R('div', null, R('a', {
      onClick: this.startEditing
    }, "Edit me"), this.state.editing ? R(ModalPopupComponent, {
      onClose: this.handleModalClose,
      showCloseX: true
    }, R('div', null, _.map(_.range(1, 100), function(x) {
      return R('div', null, "" + x);
    }))) : void 0);
  };

  return ModalPopupSample;

})(React.Component);

SortableSampleItem = (function(superClass) {
  extend(SortableSampleItem, superClass);

  function SortableSampleItem() {
    SortableSampleItem.__super__.constructor.apply(this, arguments);
    this.state = {
      value: Math.floor(Math.random() * 1000) + "!"
    };
  }

  SortableSampleItem.prototype.render = function() {
    var handleStyle, id, itemStyle;
    id = uuid();
    itemStyle = {
      border: "1px solid #aeaeae",
      padding: "8px"
    };
    handleStyle = {
      height: 10,
      width: 10,
      background: "green",
      marginRight: 10,
      display: "inline-block",
      cursor: "move"
    };
    return this.props.connectDragPreview(this.props.connectDropTarget(R('tr', null, R('td', {
      style: itemStyle
    }, this.props.connectDragSource(R('span', {
      style: handleStyle
    })), R('span', null, this.props.item.id, this.state.value), R('div', null, R('table', null, R(ReorderableListComponent, {
      items: this.props.item.children,
      onReorder: this.props.updateOrder,
      getItemId: this.props.getItemId,
      renderItem: this.props.renderItem,
      element: R('tbody', {
        style: {
          background: 'red'
        }
      })
    })))))));
  };

  return SortableSampleItem;

})(React.Component);

SortableSample = (function(superClass) {
  extend(SortableSample, superClass);

  function SortableSample() {
    this.addNewItem = bind(this.addNewItem, this);
    this.updateOrder = bind(this.updateOrder, this);
    this.renderItem = bind(this.renderItem, this);
    SortableSample.__super__.constructor.apply(this, arguments);
    this.state = {
      items: [
        {
          id: "red",
          children: [],
          parent: null
        }, {
          id: "green",
          parent: null,
          children: [
            {
              id: "leaves",
              children: [],
              parent: "green"
            }, {
              id: "plants",
              children: [],
              parent: "green"
            }, {
              id: "hulk",
              children: [
                {
                  id: "hulk-blue",
                  children: [
                    {
                      id: "hulk-blue-white",
                      children: [],
                      parent: "hulk-blue"
                    }, {
                      id: "hulk-blue-black",
                      children: [],
                      parent: "hulk-blue"
                    }
                  ],
                  parent: "hulk"
                }, {
                  id: "hulk-white",
                  children: [],
                  parent: "hulk"
                }
              ],
              parent: "green"
            }
          ]
        }, {
          id: "blue",
          children: [],
          parent: null
        }, {
          id: "white",
          children: [],
          parent: null
        }, {
          id: "black",
          children: [],
          parent: null
        }
      ]
    };
  }

  SortableSample.prototype.renderItem = function(item, index, connectDragSource, connectDragPreview, connectDropTarget) {
    return R(SortableSampleItem, {
      item: item,
      index: index,
      connectDragSource: connectDragSource,
      connectDragPreview: connectDragPreview,
      connectDropTarget: connectDropTarget,
      updateOrder: this.updateOrder,
      renderItem: this.renderItem,
      getItemId: this.getItemId
    });
  };

  SortableSample.prototype.updateOrder = function(reorderedList) {
    var item, items, node;
    item = reorderedList[0];
    if (item.parent === null) {
      return this.setState({
        items: reorderedList
      });
    } else {
      items = this.state.items.splice(0);
      node = this.findNodeById(items, item.parent);
      node.children = reorderedList;
      return this.setState({
        items: items
      });
    }
  };

  SortableSample.prototype.findNodeById = function(items, id) {
    var i, index, len, result, value;
    for (index = i = 0, len = items.length; i < len; index = ++i) {
      value = items[index];
      if (value.id === id) {
        return value;
      }
      if (value.children && value.children.length) {
        result = this.findNodeById(value.children, id);
        if (result) {
          return result;
        }
      }
    }
    return false;
  };

  SortableSample.prototype.getItemId = function(item) {
    return item.id;
  };

  SortableSample.prototype.addNewItem = function() {
    var id, items;
    items = this.state.items.splice(0);
    id = uuid();
    items.push({
      id: id,
      children: [],
      parent: null
    });
    return this.setState({
      items: items
    });
  };

  SortableSample.prototype.render = function() {
    var id, style;
    id = uuid();
    style = {
      padding: 10
    };
    return R('div', {
      style: style
    }, R('button', {
      onClick: this.addNewItem
    }, "Add new item"), R('table', null, R('thead', null, R('tr', null, R('th', null, "Item Name"))), R(ReorderableListComponent, {
      items: this.state.items,
      onReorder: this.updateOrder,
      renderItem: this.renderItem,
      getItemId: this.getItemId,
      element: R('tbody', {
        style: {
          background: '#afafaf'
        }
      })
    })));
  };

  return SortableSample;

})(React.Component);

BlocksComponent = (function(superClass) {
  extend(BlocksComponent, superClass);

  function BlocksComponent(props) {
    BlocksComponent.__super__.constructor.apply(this, arguments);
    this.state = {
      items: [
        {
          id: "1",
          type: "title"
        }, {
          id: "2",
          type: "image"
        }, {
          id: "3",
          type: "text"
        }
      ]
    };
  }

  BlocksComponent.prototype.renderItem = function(item, index, connectDragSource, connectDragPreview, connectDropTarget) {
    var elem, wrapBorder;
    wrapBorder = function(e, inline) {
      if (inline == null) {
        inline = false;
      }
      return R('div', {
        style: {
          margin: 5,
          border: "solid 1px #DDD",
          borderRadius: 5,
          padding: 5,
          position: "relative",
          display: inline ? "inline-block" : void 0
        }
      }, connectDragSource(R('div', {
        style: {
          position: "absolute",
          left: "50%",
          top: -8,
          border: "solid 1px #DDF",
          backgroundColor: "white"
        }
      }, R('span', {
        className: "glyphicon glyphicon-move"
      }))), e);
    };
    switch (item.type) {
      case "title":
        elem = R('h2', null, "Title");
        elem = wrapBorder(elem);
        break;
      case "image":
        elem = R('img', {
          src: "http://image.shutterstock.com/display_pic_with_logo/359716/161613653/stock-photo-orange-fruit-isolated-on-white-161613653.jpg",
          style: {
            width: "33%",
            className: "img-thumbnail",
            border: "solid 1px #DDD",
            float: "right"
          }
        });
        break;
      case "text":
        elem = R('div', null, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
        elem = wrapBorder(elem);
    }
    return connectDragPreview(connectDropTarget(elem));
  };

  BlocksComponent.prototype.render = function() {
    return R('div', null, "Start", R(ReorderableListComponent, {
      items: this.state.items,
      onReorder: (function(_this) {
        return function(items) {
          return _this.setState({
            items: items
          });
        };
      })(this),
      renderItem: this.renderItem,
      getItemId: function(item) {
        return item.id;
      }
    }), "End");
  };

  return BlocksComponent;

})(React.Component);

AutoSizeTestComponent = (function(superClass) {
  extend(AutoSizeTestComponent, superClass);

  function AutoSizeTestComponent() {
    return AutoSizeTestComponent.__super__.constructor.apply(this, arguments);
  }

  AutoSizeTestComponent.prototype.render = function() {
    return R(AutoSizeComponent, {
      injectHeight: true
    }, (function(_this) {
      return function(size) {
        return R('div', {
          style: {
            height: size.height + 1,
            backgroundColor: "#FDF"
          }
        }, JSON.stringify(size));
      };
    })(this));
  };

  return AutoSizeTestComponent;

})(React.Component);

ToggleTestComponent = (function(superClass) {
  extend(ToggleTestComponent, superClass);

  function ToggleTestComponent() {
    ToggleTestComponent.__super__.constructor.call(this);
    this.state = {
      action: 'keep'
    };
  }

  ToggleTestComponent.prototype.render = function() {
    return R(ui.Toggle, {
      value: this.state.action,
      options: [
        {
          value: 'keep',
          label: 'Keep'
        }, {
          value: 'merge',
          label: 'Merge'
        }, {
          value: 'nd',
          label: 'Not duplicate'
        }, {
          value: 'ignore',
          label: 'Ignore'
        }
      ],
      onChange: ((function(_this) {
        return function(action) {
          console.log(action);
          return _this.setState({
            action: action
          });
        };
      })(this)),
      size: 'xs'
    });
  };

  return ToggleTestComponent;

})(React.Component);

ReorderDemo = (function(superClass) {
  extend(ReorderDemo, superClass);

  function ReorderDemo(props) {
    ReorderDemo.__super__.constructor.call(this, props);
    this.state = {
      items: ["red", "green", "blue"]
    };
  }

  ReorderDemo.prototype.render = function() {
    return R(ReorderableListComponent, {
      items: this.state.items,
      onReorder: (function(_this) {
        return function(items) {
          return _this.setState({
            items: items
          });
        };
      })(this),
      renderItem: (function(_this) {
        return function(item, index, connectDragSource, connectDragPreview, connectDropTarget) {
          return connectDragSource(connectDragPreview(connectDropTarget(R("div", null, item))));
        };
      })(this),
      getItemId: (function(_this) {
        return function(item) {
          return item;
        };
      })(this)
    });
  };

  return ReorderDemo;

})(React.Component);

ReorderDemoWrapped = DragDropContext(HTML5Backend)(ReorderDemo);

$(function() {
  var elem;
  elem = R(ui.NumberInput, {
    onChange: console.log,
    min: 0,
    max: 100,
    decimal: false
  });
  return ReactDOM.render(elem, document.getElementById("main"));
});

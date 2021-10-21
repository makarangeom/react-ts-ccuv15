import React, { useState } from 'react';
import './TodoListWrapper.css';
import TodoListing from '../../lists/todo-listing/TodoListing';

const TodoListWrapper = () => {
  const [toDoList, setToDoList] = useState([]);
  const [searchedToDoList, setSearchedToDoList] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [selectedTask, setSelectedTask] = useState({});
  const [isNoRecord, setIsNoRecord] = useState();

  const onInputChange = e => {
    if ('' == e.currentTarget.value) {
      setIsNoRecord(false);
      setSearchedToDoList([]);
    } else {
      let filteredTask = onFilterTasks(toDoList, e.currentTarget.value);
      if (filteredTask.length == 0) {
        setIsNoRecord(true);
      } else {
        setIsNoRecord(false);
      }
      setSearchedToDoList(filteredTask);
    }
    setUserInput(e.currentTarget.value);
  };

  const onFilterTasks = (allTasks, searchTxt) => {
    let filtered = allTasks.filter(task => {
      return task.title
        .trim()
        .toLowerCase()
        .startsWith(searchTxt.trim().toLowerCase());
    });
    return filtered;
  };

  const onHandleKeyDown = event => {
    if (event.key === 'Enter') {
      // check if this action for edit
      if (selectedTask.id) {
        var isExist = isTaskExist(toDoList, userInput);
        if (!isExist) {
          var updateTask = toDoList.map(task => {
            if (task.id == selectedTask.id) {
              task.title = userInput;
            }
            return task;
          });
          setToDoList([...updateTask]);
        }
        setUserInput('');
        setSelectedTask({});
      } else {
        var isExist = isTaskExist(toDoList, userInput);
        if (isExist) {
          alert('Task is already exist');
        } else {
          let copy = [...toDoList];
          copy = [
            ...copy,
            { id: toDoList.length + 1, title: userInput, complete: false }
          ];
          setIsNoRecord(false);
          setSearchedToDoList([]);
          setToDoList(copy);
          setUserInput('');
        }
      }
    }
  };

  const onEdit = task => {
    setSelectedTask(task);
    setUserInput(task.title);
  };

  const onDelete = task => {
    var tasks = toDoList.filter(item => {
      return item.id != task.id;
    });
    setToDoList([...tasks]);
  };

  const isTaskExist = (allTasks, newTask) => {
    let filterTask = allTasks.filter(task => {
      newTask = newTask.trim().toLowerCase();
      task = task.title.trim().toLowerCase();
      return task == newTask;
    });
    if (filterTask.length == 0) {
      return false;
    }
    return true;
  };

  const renderData = () => {
    if (isNoRecord == false) {
      return (
        <TodoListing
          items={searchedToDoList.length > 0 ? searchedToDoList : toDoList}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      );
    } else if (isNoRecord == true) {
      return <span>No record...</span>;
    }
  };

  return (
    <>
      <div className="header">
        <h2>My To Do List</h2>
        <input
          type="text"
          placeholder="To do list..."
          value={userInput}
          onChange={onInputChange}
          onKeyDown={onHandleKeyDown}
        />
      </div>
      {renderData()}
    </>
  );
};

export default TodoListWrapper;

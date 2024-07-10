import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { app } from "../firebase";
import { Draggable } from 'react-beautiful-dnd';
import "./Task.css";

const db = getFirestore(app);

function Task({ todoListId }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = async () => {
    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        todoListId,
        title: taskTitle,
        description: taskDescription,
        dueDate: taskDueDate,
        priority: taskPriority,
      });
      alert("Task created with ID: " + docRef.id);
      setTaskTitle("");
      setTaskDescription("");
      setTaskDueDate("");
      setTaskPriority("");
      fetchTasks();
    } catch (e) {
      console.error("Error adding task: ", e);
    }
  };

  const fetchTasks = async () => {
    const q = query(collection(db, "tasks"), where("todoListId", "==", todoListId));
    const querySnapshot = await getDocs(q);
    const taskList = [];
    querySnapshot.forEach((doc) => {
      taskList.push({ id: doc.id, ...doc.data() });
    });
    setTasks(taskList);
  };

  useEffect(() => {
    fetchTasks();
  }, [todoListId]);

  return (
    <div className='task'>
      <h3>Tasks</h3>
      <input
        type="text"
        placeholder="Task title"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Task description"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
      />
      <input
        type="date"
        value={taskDueDate}
        onChange={(e) => setTaskDueDate(e.target.value)}
      />
      <select value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)}>
        <option value="">Select priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button onClick={addTask}>Add Task</button>
      <div>
        {tasks.map((task, index) => (
          <Draggable draggableId={task.id} index={index} key={task.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="task-item"
              >
                <h4>Task title: {task.title}</h4>
                <p>Task description: {task.description}</p>
                <p>Task due date: {task.dueDate}</p>
                <p>Task priority: {task.priority}</p>
              </div>
            )}
          </Draggable>
        ))}
      </div>
    </div>
  );
}

export default Task;

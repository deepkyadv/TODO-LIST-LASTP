import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, query, getDocs, doc, updateDoc } from 'firebase/firestore';
import { app } from "../firebase";
import Task from './Task';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import "./TodoList.css";

const db = getFirestore(app);

function TodoList() {
  const [todoName, setTodoName] = useState("");
  const [todoLists, setTodoLists] = useState([]);

  const addTodoList = async () => {
    try {
      const docRef = await addDoc(collection(db, "todolists"), {
        name: todoName,
      });
      alert("Todo List created with ID: " + docRef.id);
      setTodoName("");
      fetchTodoLists();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const fetchTodoLists = async () => {
    const q = query(collection(db, "todolists"));
    const querySnapshot = await getDocs(q);
    const lists = [];
    querySnapshot.forEach((doc) => {
      lists.push({ id: doc.id, ...doc.data() });
    });
    setTodoLists(lists);
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // Update the task's todoListId
    const taskDocRef = doc(db, "tasks", draggableId);
    await updateDoc(taskDocRef, { todoListId: destination.droppableId });

    fetchTodoLists();
  };

  useEffect(() => {
    fetchTodoLists();
  }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='todo-list'>
        <h1>Todo Lists</h1>
        <input
          type="text"
          placeholder="Enter todo list name"
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
        /><br/>
        <button onClick={addTodoList}>Create Todo List</button>
        <div className='todo-list-container'>
          {todoLists.map((list, index) => (
            <Droppable droppableId={list.id} key={list.id}>
              {(provided) => (
                <div
                  className='task-container'
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2>{list.name}</h2>
                  <Task todoListId={list.id} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
}

export default TodoList;

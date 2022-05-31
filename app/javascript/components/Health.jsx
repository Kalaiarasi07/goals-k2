import React, { useState,useEffect } from 'react'
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import Popup from './shared/popup';
import './style.css'
import { Button } from 'antd';
import { useLocation } from "react-router-dom";

export default function Health() {
    const [goals, setGoals] = useState([])
    const [task, setTasks] = useState();
    const [id, setId] = useState();
    const [complete_within, setComplete] = useState();
    const [point, setPoints] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const location = useLocation();
 
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!isEdit){
            Axios.post('/api/v1/goal/create-goal', {
                goal_name: task,
                goal_category:"Health and Fitness",
                points: point,
                due_date:complete_within,
                p_uuid:null,
                c_uuid:location.c_uuid,
            }).then(resp => {
                togglePopup();
                setTasks(null);
                setComplete(null);
                setPoints(null);
                fetchData()
            })
        }
        else{
            Axios.post('/api/v1/goal/updatetask', {
                id:id,
                goal_name: task,
                goal_category:"Health and Fitness",
                points: point,
                due_date:complete_within,
                p_uuid:null,
                c_uuid:location.c_uuid,
              }).then(resp => {
                  togglePopup();
                //   setTasks(task);
                //   setComplete(complete_within);
                //   setPoints(point);
                  fetchData();
              })
        }
    }
    const fetchData = () => {
        Axios.post("/api/v1/goal/show-goal",{
            goal_category:"Health and Fitness",
            c_uuid : location.c_uuid
            
        }).then(response => {
              setGoals(response.data)
            }).catch(err => {
              console.log(err)
            })
      }
    
      useEffect(() => {
        fetchData()
      }, [])

    const deleteTask = (e,id) => {
        e.preventDefault();
        Axios.post('/api/v1/goal/deletetask',{
            uuid: id,
        }).then(res=> {
            fetchData();
        }).catch(err => {
          console.log(err)
        })
      }
    const editTask = (e,id) => {
        e.preventDefault();
        setIsEdit(true);
        setId(id);
        // setTasks(task);
        // setComplete(complete_within);
        // setPoints(point);
        togglePopup();
      }

  return (
    <div>
      <h1>Health and Fitness</h1>
      {
        goals.length > 0 &&
        <ul>
          {
            goals.map(goal => (

              <li key={goal.id}> {goal.goal_name}|{goal.points} Points |{goal.completed ? "Completed" : "Pending"} |{goal.due_date} Days|
              <Button onClick={e => editTask(e,goal.id)}>Edit</Button>|
              <Button onClick={e => deleteTask(e,goal.id)}>Delete</Button>
              </li>
            ))
          }
        </ul>
      }
      <input
      type="button"
      value="Add Task"
      onClick={togglePopup}
       />
        <p></p>
        {isOpen && <Popup
        content={<>
             
      <form onSubmit={e => handleSubmit(e)}>
        <label>Task name:</label>
        <input
          type="text"
          name="taskname"
          value={task}
          onChange={e => setTasks(e.target.value)}
        />
        <br />
        <br />
        <br />

        <label>Complete Within:</label>
        <input
          type="text"
          name="complete_within"
          value={complete_within}
          onChange={e => setComplete(e.target.value)}
        />
        <br />
        <br />
        <br />

        <label>Points:</label>
        <input
          type="number"
          name="points"
          value={point}
          onChange={e => setPoints(e.target.value)}
        />
        <br />
        <br />
        <br />
        <button placeholder="submit" type="submit">Add Task</button>
         </form>
        </>}
        handleClose={togglePopup}
        />}
    </div>
  )
}
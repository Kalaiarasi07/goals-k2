import React, { useState,useEffect } from 'react'
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import Popup from './shared/popup';
import './style.css'
// API call to login and renders next page on successful login
export default function Learn() {
    const [goals, setGoals] = useState([])
    const [task, setTasks] = useState();
    const [complete_within, setComplete] = useState();
    const [point, setPoints] = useState();
    const [isOpen, setIsOpen] = useState(false);

 
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post('/api/v1/goal/create-goal', {
            goal_name: task,
            goal_category:"Learn and Create",
            points: point,
            due_date:complete_within,
            p_uuid:null,
            c_uuid:null,
          }).then(resp => {
              togglePopup();
              fetchData();
          })
    }
    const fetchData = () => {
        Axios.post("/api/v1/goal/show-goal",{
            goal_category:"Learn and Create",
        }).then(response => {
              setGoals(response.data)
            }).catch(err => {
              console.log(err)
            })
      }
    
      useEffect(() => {
        fetchData()
      }, [])

  return (
    <div>
      <h1>Learn and Create</h1>
      {
        goals.length > 0 &&
        <ul>
          {
            goals.map(goal => (
              <li key={goal.id}>{goal.goal_name}-{goal.points} Points-{goal.due_date} Days</li>
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
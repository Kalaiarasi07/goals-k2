import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import { useHistory } from "react-router-dom";
import { logout } from './shared/functions';

export default function ChildDashboard() {
  const history = useHistory();
  const checkboxRef = useRef();
  const [goals, setGoals] = useState([]);
  
  useEffect(() => {
    Axios.post("/api/show-goals")
      .then(resp => {
        console.log("cuuid:",resp.data.c_uuid)
        setGoals(resp.data.goals)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const handleCompleted =(uuid) =>{
    let status = checkboxRef.current.checked;
    console.log(status);
    Axios.post("/api/v1/goal/completed_status",{
      uuid: uuid,
      completed: status
    })    
    .then(resp => {
      console.log(resp)
    })
    .catch(error => {
      console.log(error)
    })
  }

  const goals_list = goals.map(item => {
    return (
      <tr key={item.uuid}>
        <td key={item.goal_name} >|{item.goal_name }</td>
        <td key={item.goal_category} >|{item.goal_category }</td>
        <td key={item.points} >|{item.points }</td>
        <td key={item.due_date} >|{item.due_date }</td>
        <td><input ref={checkboxRef} type="checkbox" onChange={()=>{handleCompleted(item.uuid)}}/></td>
        <td key={item.completed} >|{item.completed }</td>
      </tr>
    )
  })

  return (
    <>
      <h1>Child Dashboard</h1>
      <table>
        <tbody>{goals_list}</tbody>
      </table>
      <br /><br />
      
      <div onClick={logout} >Log out</div>
    </>
  )
}

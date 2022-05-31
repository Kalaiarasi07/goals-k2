import React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useHistory } from "react-router-dom";
import { logout } from './shared/functions';



export default function ParentDashboard() {

  const [children, setChildren] = useState([]);
  const history = useHistory();
  useEffect(() => {
    Axios.post("/api/show-children")
      .then(resp => {
        console.log(resp)
        setChildren(resp.data.children)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const handleClickChild = (uuid) => {
    console.log("uuid:",uuid)
    history.push({
      pathname:'/child-info',
      c_uuid: uuid
    })
   
  }

  const handleAddChild = () => {
    history.push('/add-child')
  }

  const children_list = children.map(item => {
    return (
      <tr key={item.uuid}>
        <td key={item.name} onClick={()=>{handleClickChild(item.uuid)}}>|{item.name }</td>
        <td key={item.email}>|{item.email}</td>
      </tr>
    )
  })

  return (
    <>
      <h1>Parent Dashboard</h1>
      <table>
        <tbody>{children_list}</tbody>
      </table>
      <br /><br />
      <div onClick={handleAddChild} >Add child</div> 
      <br /><br />

      

      <div onClick={logout} >Log out</div>
    </>
  )
}

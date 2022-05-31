import React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useHistory } from "react-router-dom";
import { logout } from './shared/functions';
import { useLocation } from "react-router-dom";



export default function ChildInfo() {
  const history = useHistory();
  const location = useLocation();

  const c_uuid = location.c_uuid;
  
  const handleDailyHabits = () => {
    history.push('/dailyhabit')
  }

  const handleHealthFitness = () => {
    history.push({
      pathname: '/healthfitness',
      c_uuid: c_uuid
    }
    )
  }
  const handleLearnCreate = () => {
    history.push('/learncreate')
  }


  return (
    <>
      <h1>Child Info</h1>

      <div onClick={handleDailyHabits} >Daily Habits</div>
      <br /><br />
      <div onClick={handleHealthFitness} >Health and Fitness</div>
      <br /><br />
      <div onClick={handleLearnCreate} >Learn and Create</div>
      <br /><br />

      <div onClick={logout} >Log out</div>
    </>
  )
}

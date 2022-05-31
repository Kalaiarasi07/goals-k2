
import Axios from "axios";

// API call to logout current user and go back to home page
export function logout() {
  Axios.post('/api/logout')
    .then(resp => {
      console.log(resp.data.status)
      window.location.assign('/')
    })
    .catch(err => {
      console.log(err)
    })
}


 

import React, { useState, useEffect, useRef} from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./component/Login";
import Auth from "./component/Auth";
import Signup from "./component/Signup";
import ViewAcademy from "./component/ViewAcademy";
import Enrolledcourse from "./component/Enrolledcourse";
import Adminacademy from "./component/Adminacademy";

const Routess = ()=>{
    return(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/viewAcademy" element={<ViewAcademy/>}/>
            <Route path="/enrolledCourse" element={<Enrolledcourse/>}/>
            <Route path="/adminacademy" element={<Adminacademy/>}/>
            
          </Routes>
        </BrowserRouter>
    )
}

export default Routess

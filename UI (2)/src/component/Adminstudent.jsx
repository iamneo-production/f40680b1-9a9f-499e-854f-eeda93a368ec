import React, { useEffect, useRef, useState } from 'react'
import { Navbar,Container,Nav,Dropdown,Modal,Button,Form,Table,Row,Col,Tr,Th } from 'react-bootstrap';
import axios from 'axios'; 

const AdminStudent = () =>{
    const searchInput = useRef();
    const studentName = useRef();
    const studentAddress = useRef();
    const studentMobile = useRef();
    const studentAge = useRef();
    
    const [showAddPopUp,setShowAddPopUp] = useState(false);
    const [allStudents,setAllStudents] = useState([]);
    const [showEditPopUp,setShowEditPopUp]= useState(false);
    const [editData,setEditData] = useState();

    const getAllStudents = () =>{
        axios.get("http://localhost:8081/admin/viewStudent")
        .then((resp)=>{
            setAllStudents(resp.data);
        })
        .catch((err)=>{
            alert("could not feftch students");
        })
    }
    useEffect(()=>{
        getAllStudents();
    },[1])
    const handleSearch = ()=>{
        axios.get("http://localhost:8081/admin/getStudent?instituteId="+searchInput.current.value)
        .then((resp)=>{
            if(resp.data){
                setAllStudents([resp.data])
            }
            else{
                alert("not found");
            }
        })
        .catch((err)=>{
            
            alert("not found");
        })
    }
    const handleAdd = ()=>{
        const studentNameV = studentName.current.value;
        const studentAddressV = studentAddress.current.value;
        const studentMobileV = studentMobile.current.value;
        const studentAgeV = studentAge.current.value;
        const obj = {
            studentName : studentNameV,
            address : studentAddressV,
            mobile:studentMobileV,
            age:studentAgeV
        }
        axios.post("http://localhost:8081/admin/addStudent",obj)
        .then((res)=>{
            if(res.data=="Student added"){
                getAllStudents();
                alert("Student Added");
            }
        })
        .catch((err)=>{
            alert("Student Couldn't be added");
        })
        setShowAddPopUp(!showAddPopUp) 
    }

    const handleEdit = ()=>{
        
        setShowAddPopUp(false);
        const obj = {
            studentName : studentName.current.values ? studentName.current.values : editData.studentName, 
            address : studentAddress.current.values ? studentAddress.current.values : editData.address, 
            mobile : studentMobile.current.values ?studentMobile .current.values : editData.mobile, 
            age : studentAge.current.values ? studentAge.current.values : editData.age
          }
        axios.put("http://localhost:8081/admin/editStudent/"+editData.studentId,obj)
        .then((resp)=>{
            if(resp.data=="Student edited"){
                alert("updated");
                getAllStudents();
            }
        })
        .catch((err)=>{
            alert("failed to update");
        })

    }

    const handleDelete = (data)=>{
        if (window.confirm('Are you sure you want to delete '+ data.studentName)) {
            axios.delete("http://localhost:8081/admin/deleteStudent?studentId="+data.studentId)
            .then((resp)=>{
                if(resp.data=="Student deleted"){
                    getAllStudents();
                    alert("student deleted");
                }
                else{
                    alert("student not deleted");
                }
            })
            .catch((err)=>{
                    
                alert("student not deleted :: "+err.message);

            })
      }  
    }
    
    return (
        <>
            {
                showAddPopUp?
                <>
                    <div class="container   position-absolute" style={{top:100,left:448}}>
                        <input type="text" id="studentName" ref={studentName} class="col-3 form-control " placeholder=" Student Name"/><br/>
                        <input type="text" id="studentAddress" ref={studentAddress} class="col-3 form-control " placeholder="Student Address" /><br/>
                        <input type="text" id="studentMobile" ref={studentMobile} class="col-3 form-control " placeholder="Student Mobile" /><br/>
                        <input type="text" id="studentAge" ref={studentAge} class="col-3 form-control " placeholder="Student Age" /><br/>
                        <button type="button" id="login_btn" class="btn btn-secondary" onClick={handleAdd}>Add</button>&nbsp;&nbsp;&nbsp;
                        <button type="button" id="close_btn" class="btn btn-secondary" onClick={()=>{setShowAddPopUp(false)}}>close</button><br/>

                    </div>
                </>
                :null
            }
           
           {
                showEditPopUp?
                <>
                    <div class="container   position-absolute" style={{top:100,left:448}}>
                        <input type="text" id="studentName" ref={studentName} class="col-3 form-control " placeholder=" Student Name"/><br/>
                        <input type="text" id="studentAddress" ref={studentAddress} class="col-3 form-control " placeholder="Student Address" /><br/>
                        <input type="text" id="studentMobile" ref={studentMobile} class="col-3 form-control " placeholder="Student Mobile" /><br/>
                        <input type="text" id="studentAge" ref={studentAge} class="col-3 form-control " placeholder="Student Age" /><br/>
                        <button type="button" id="login_btn" class="btn btn-secondary" onClick={handleEdit}>Update</button>&nbsp;&nbsp;&nbsp;
                        <button type="button" id="close_btn" class="btn btn-secondary" onClick={()=>{setShowEditPopUp(false)}}>close</button><br/>
                    </div>
                </>
                :null
            }

            <div class = "container col-3 mt-5 ">
                <input type="text" id="searchInput" ref={searchInput} class="col-3 form-control " placeholder="Type here student id to search" /><br/>
                <button type="button" id="searchStudent" class="btn btn-success" onClick={handleSearch}>Search</button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button type="button" id="addStudent" class="btn btn-secondary" onClick={()=>{setShowAddPopUp(!showAddPopUp)}} >Add</button><br/>
            </div>
            
            <Table>
                <thead>
                    <tr>
                        <th>Student Id</th>
                        <th>Student Name</th>
                        <th>Student Address</th>
                        <th>Student Mobile</th>
                        <th>Student Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allStudents && allStudents.map((val)=>{
                            return(
                                <tr>
                                    <td> {val.studentId}</td>
                                    <td> {val.studentName}</td>
                                    <td> {val.address}</td>
                                    <td> {val.mobile}</td>
                                    <td> {val.age}</td>
                                    <td>
                                        <button type="button" id="login_btn" class="btn btn-success" onClick={()=>{setEditData(val);setShowEditPopUp(true)}}>Edit</button>&nbsp;&nbsp;
                                        
                                        <button type="button" id="login_btn" class="btn btn-danger" onClick={()=>{handleDelete(val)}}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        
        </>
    )
}

export default AdminStudent;
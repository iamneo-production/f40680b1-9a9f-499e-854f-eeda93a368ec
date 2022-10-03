import React, { useEffect, useRef, useState } from 'react'
import { Navbar,Container,Nav,Dropdown,Modal,Button,Form,Table,Row,Col } from 'react-bootstrap';
import axios from 'axios'; 

const Admincourse = () =>{
    const searchInput = useRef();
    const courseName = useRef();
    const courseDuration = useRef();
    const courseDescription = useRef();
    
    const [showAddPopUp,setShowAddPopUp] = useState(false);
    const [allCourses,setAllCourses] = useState([]);
    const [showEditPopUP,setShowEditPopUP] = useState(false);
    const[editDate,setEditData] = useState([]);

    const getAllCourses = () =>{
        axios.get("http://localhost:8081/admin/viewCourse")
        .then((resp)=>{
            setAllCourses(resp.data);
        })
        .catch((err)=>{
            alert("could not feftch courses");
        })
    }
    useEffect(()=>{
        getAllCourses();
    },[1])
    const handleSearch = ()=>{
        axios.get("http://localhost:8081/admin/getCourse?courseId="+searchInput.current.value)
        .then((resp)=>{
                if(resp.data){
                    setAllCourses([resp.data]);
                }
                else{
                    
                    alert("courses not found");
                }
        })
        .catch((err)=>{
            alert("courses not found");
        })
    }
    const handleAdd = ()=>{
        console.log("here")
        const courseNameV = courseName.current.value;
        const courseDurationV = parseInt(courseDuration.current.value);
        const courseDescriptionV = courseDescription.current.value;
        const obj = {
            courseName : courseNameV,
            courseDuration : courseDurationV,
            courseDescription : courseDescriptionV
        }
        axios.post("http://localhost:8081/admin/addCourse",obj)
        .then((res)=>{
            if(res.data=="Course added"){
                getAllCourses();
                alert("Course Added");
            }
        })
        .catch((err)=>{
            alert("Course Couldn't be added");
        })
        setShowAddPopUp(!showAddPopUp) 
    }

    const handleEdit = ()=>{
        setShowEditPopUP(false)
        const obj = {
            courseName : courseName.current.value ? courseName.current.value : editDate. courseName,
            courseDescription : courseDescription.current.value ? courseDescription.current.value : editDate. courseDescription,
            courseDuration : courseDuration.current.value ? courseDuration.current.value : editDate. courseDuration
          }
          axios.put("http://localhost:8081/admin/editCourse/"+editDate.courseId,obj)
          .then((resp)=>{
            if(resp.data=="Course edited"){
                alert("updated");getAllCourses();
            }
            else{
                alert("failed");
            }
          })
          .catch((err)=>{
            
            alert("failed");
          })
    }

    const handleDelete = (data)=>{
        if (window.confirm('Are you sure you want to delete '+ data.courseName)) {
            axios.delete("http://localhost:8081/admin/deleteCourse?courseId="+data.courseId)
            .then((resp)=>{
                if(resp.data=="Course deleted"){
                    getAllCourses();
                    alert("course deleted");
                }
                else{
                    alert("course not deleted");
                }
            })
            .catch((err)=>{
                    
                alert("course not deleted :: "+err.message);

            })
      }  
    }
    
    return (
        <>
            {
                showEditPopUP?
                <>
                    <div class="container col-5 p-5 mt-5 border-dark  bg-warning  position-absolute" style={{top:100,left:448}}>
                        <input type="text" id="courseName" ref={courseName} class="col-3 form-control " placeholder=" Course Name"/><br/>
                        <input type="text" id="courseDuration" ref={courseDuration} class="col-3 form-control " placeholder="Course Duration" /><br/>
                        <input type="text" id="courseDescription" ref={courseDescription} class="col-3 form-control " placeholder="Course Description" /><br/>
                        <button type="button" id="login_btn" class="btn btn-secondary" onClick={()=>{handleEdit()}}>Update</button>&nbsp;&nbsp;&nbsp;
                        <button type="button" id="close_btn" class="btn btn-secondary" onClick={()=>{setShowEditPopUP(false)}}>close</button><br/>

                    </div>
                </>
                :null
            }

            {
                showAddPopUp?
                <>
                    <div class="container col-5 p-5 mt-5 border-dark  bg-warning  position-absolute" style={{top:100,left:448}}>
                        <input type="text" id="courseName" ref={courseName} class="col-3 form-control " placeholder=" Course Name"/><br/>
                        <input type="text" id="courseDuration" ref={courseDuration} class="col-3 form-control " placeholder="Course Duration" /><br/>
                        <input type="text" id="courseDescription" ref={courseDescription} class="col-3 form-control " placeholder="Course Description" /><br/>
                        <button type="button" id="login_btn" class="btn btn-secondary" onClick={handleAdd}>Add</button>&nbsp;&nbsp;&nbsp;
                        <button type="button" id="close_btn" class="btn btn-secondary" onClick={()=>{setShowAddPopUp(false)}}>close</button><br/>

                    </div>
                </>
                :null
            }
           
            <div class = "container col-3 mt-5 ">
               
                <button type="button" id="login_btn" class="btn btn-secondary" onClick={()=>{setShowAddPopUp(!showAddPopUp)}} >Add</button><br/>
            </div>
            
            {/* {
                allCourses && allCourses.map((val)=>{
                   return(
                        <div class = "container  bg-info col-5 mt-5  mb-5 p-3">
                            <Row>
                                <Col><label> CourseId</label></Col>
                                <Col><label> {val.courseId}</label></Col>
                            </Row>
                            <Row>
                                <Col><label> CourseName</label></Col>
                                <Col><label> {val.courseName}</label></Col>
                            </Row>
                            <Row>
                                <Col><label> CourseDuration</label></Col>
                                <Col><label> {val.courseDuration}</label></Col>
                            </Row>
                            <Row>
                                <Col><label> Course Description</label></Col>
                                <Col><label> {val.courseDescription}</label></Col>
                            </Row>

                            <Row>
                                <Col>
                                    <button type="button" class="btn btn-primary" aria-label="Left Align" onClick={()=>{setShowEditPopUP(true);setEditData(val)}}>
                                        edit
                                    </button>
                                </Col>
                                <Col>
                                    <button type="button" class="btn btn-danger" aria-label="Left Align"  onClick={()=>{handleDelete(val)}}>
                                        delete
                                    </button>
                                </Col>
                            </Row>
                        </div>
                   )
                })
            } */}
            <Table>
                <thead>
                    <tr>
                        <th>Course Id</th>
                        <th>Course Name</th>
                        <th>Course Duration</th>
                        <th>Course Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allCourses && allCourses.map((val)=>{
                            return(
                                <tr>
                                    <td> {val.courseId}</td>
                                    <td> {val.courseName}</td>
                                    <td> {val.courseDuration}</td>
                                    <td>  {val.courseDescription}</td>
                                    
                                    <td>
                                    <button type="button" class="btn btn-primary" aria-label="Left Align" onClick={()=>{setShowEditPopUP(true);setEditData(val)}}>
                                        edit
                                    </button>
                                        
                                    <button type="button" class="btn btn-danger" aria-label="Left Align"  onClick={()=>{handleDelete(val)}}>
                                        delete
                                    </button>
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

export default Admincourse;
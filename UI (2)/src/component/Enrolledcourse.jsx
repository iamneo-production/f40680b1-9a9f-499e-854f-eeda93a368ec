import React,{useState,useEffect,useRef} from 'react';
import { Navbar,Container,Nav,Dropdown,Modal,Button,Form,Table,Row,Col } from 'react-bootstrap';
import axios from 'axios';

const Enrolledcourse = ({props}) =>{
    const [isEdit,setEdit] = useState(false);
    const [adminCourses,setAdminCourses]=useState([]);
    const [editDate,setEditDate]=useState([]);
    const joiningDate = useRef();
    const courseId = useRef();

    const handleSave = (data) =>{
        const obj = {
            courseId:courseId.current.value,
            userEmail:localStorage.getItem("userEmail"),
            joiningDate:joiningDate.current.value,
        }
        axios.put("http://localhost:8081/user/editAdmission/{enrolId}?enrolId="+data.admissionId,obj)
        .then((resp)=>{
            if(resp.data="Admission edited"){
                alert("updated");
            }
            else{
                alert("failed editing")
            }
        })
        .catch((err)=>{
            alert("failed"+err)
        })
        setEdit(false);
    }

    const                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     handleEdit = (data)=>{
        console.log(data);
        setEdit(true);
        setEditDate(data);
    }

    const getCourses = () =>{
        
            axios.get("http://localhost:8081/admin/viewCourse")
            .then((resp)=>{
                setAdminCourses(resp.data);
            })
            .catch((err)=>{
                alert("couldnt get all courses");
            })
    }
    useEffect(()=>{
        getCourses();
    },[1])
    

    const handleDelete = (data)=>{
        if (window.confirm('Are you sure you want to delete '+ data.courseModel.courseName)) {
            axios.delete("http://localhost:8081/user/deleteAdmission/"+data.admissionId)
            .then((resp)=>{
                if(resp.data=="Admission Deleted"){
                    //getAllCourses();
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
    return(
        <>
            {
                props && props.map((val)=>{
                    return(
                            <>
                            {
                                    isEdit?
                                    <>
                                        <div class="container col-5 p-5 mt-5 border-dark  bg-warning  position-absolute" style={{top:100,left:448}}>
                                            <select class="form-select" aria-label="Default select example" ref={courseId}>
                                                {
                                                    adminCourses && adminCourses.map((val)=>{
                                                        return(
                                                            <option value={val.courseId}>{val.courseName}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <input type="date" id="joiningDate" ref={joiningDate} class="col-3 form-control " placeholder="Joining Date" /><br/>
                                            <button type="button" id="login_btn" class="btn btn-secondary" onClick={()=>{handleSave(val)}}>Save</button>&nbsp;&nbsp;&nbsp;
                                            <button type="button" id="close_btn" class="btn btn-secondary" onClick={()=>{setEdit(false);}}>close</button><br/>
                                        </div>
                                    </>
                                    :null
                                }
                            <div id="enrolledCourse" class="mh-100  col-3 mt-5 d-inline-block bg-info">
                            <Row>
                                <Col><lable>AdmissionId:</lable></Col>
                                <Col><lable>{val.admissionId}</lable><br/></Col>
                            </Row>
                            <Row>
                                <Col><lable>Admission Date: </lable></Col>
                                <Col><lable>{val.admissionDate}</lable><br/></Col>
                            </Row>
                            <Row>
                                <Col><lable>Course Id:</lable></Col>
                                <Col><lable>{val.courseModel.courseId}</lable><br/></Col>
                            </Row>
                            <Row>
                                <Col><lable>Course Name:</lable></Col>
                                <Col><lable>{val.courseModel.courseName}</lable><br/></Col>
                            </Row>
                            <Row>
                                <Col><lable>Course Description:</lable></Col>
                                <Col><lable>{val.courseModel.courseDescription}</lable><br/></Col>
                            </Row>
                            <Row>
                                <Col><lable>Course Duration:</lable></Col>
                                <Col><lable>{val.courseModel.courseDuration}</lable><br/></Col>
                            </Row>
                            <Row>
                                <Col>
                                    <button type="button" class="btn btn-primary" aria-label="Left Align" onClick={()=>{handleEdit(val)}}>
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
                        <br/></>
                        )
                })
            }

            
        </>
    )
}

export default Enrolledcourse;
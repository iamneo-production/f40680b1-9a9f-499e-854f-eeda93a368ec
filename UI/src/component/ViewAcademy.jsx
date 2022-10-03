import React,{useState, useRef, useEffect} from 'react';
import { Navbar,Container,Nav,Dropdown,Modal,Button,Form,Table,Row,Col } from 'react-bootstrap';
import Enrolledcourse from "./Enrolledcourse";
import  { useNavigate } from 'react-router-dom'
import axios from 'axios';

const ViewAcademy = () =>{
    const [viewCourse,setViewCourse] = useState(false);
    const [allCourses,setAllCourses] = useState([]);
    const [userEmail,setUserEmail] = useState();
    const navigate = useNavigate();
    const [showAddPopUp,setShowAddPopUp] = useState(false);
    const joiningDate = useRef();
    const courseId = useRef();
    const [adminCourses,setAdminCourses] = useState([]);
    
    const getCourses = () =>{
        // if(userEmail){
            
        //     axios.get("http://localhost:8081/user/viewAdmission?email="+userEmail)
        //     .then((resp)=>{
        //         setAllCourses(resp.data);
        //     })
        //     .catch((err)=>{
        //         alert("couldnt get enrolled courses");
        //     })

        //     axios.get("http://localhost:8081/admin/viewCourse")
        //     .then((resp)=>{
        //         setAdminCourses(resp.data);
        //     })
        //     .catch((err)=>{
        //         alert("couldnt get all courses");
        //     })

        // }
    }
    // useEffect(()=>{
    //     setUserEmail(localStorage.getItem("userEmail"));
    // },[1])
    // useEffect(()=>{
    //     getCourses();
    // },userEmail)
    
    // const handleAdd = ()=>{
    //     const obj = {
    //         courseId:courseId.current.value,
    //         userEmail:userEmail,
    //         joiningDate:joiningDate.current.value,
    //     }
    //     axios.post("http://localhost:8081/user/addAdmission",obj)
    //     .then((resp)=>{
    //         alert("course added");
    //     })
    //     .catch((err)=>{
    //         alert("couldn't add course");
    //     })
    //     setShowAddPopUp(!showAddPopUp) 
    // }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container fluid>
                        <Navbar.Brand href="/viewacademy">Abacus academy<a href="/"></a></Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >

                           
                            <Nav.Link id="userEnrolledCourse" onClick={()=>{
                                
                                setViewCourse(!viewCourse);
                            }} style={{ paddingLeft: '250px' }}>Enrolled course</Nav.Link> 
                            <Nav.Link id = "logout" style={{ paddingLeft: '800px' }} onClick={()=>{
                                navigate('/');
                                localStorage.setItem("userEmail","");
                            }}>Logout</Nav.Link> 
                        </Nav>
                         </Navbar.Collapse>
                    </Container>
                </Navbar>
           
        </>
    )
}
export default ViewAcademy;
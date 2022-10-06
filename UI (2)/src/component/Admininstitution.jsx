import React, { useEffect, useRef, useState } from 'react'
import { Navbar,Container,Nav,Dropdown,Modal,Button,Form,Table,Row,Col,Tr,Th } from 'react-bootstrap';
import axios from 'axios'; 


const AdminInstitution = () =>{
    const searchInput = useRef();
    const instituteName = useRef();
    const instituteDescription = useRef();
    const instituteAddress = useRef();
    const mobile = useRef();
    const email = useRef();

    const [showAddPopUp,setShowAddPopUp] = useState(false);
    const [allInstitution,setAllInstitution] = useState([]);
    const [showEdit,setShowEdit] = useState(false);
    const [editData,setEditData] = useState();

    const getAllInstitute = () =>{
        axios.get("http://localhost:8081/admin/viewInstitute")
        .then((resp)=>{
            setAllInstitution(resp.data);
        })
        .catch((err)=>{
            alert("could not feftch institutions");
        })
    }
    useEffect(()=>{
        getAllInstitute();
    },[1])
    const handleSearch = ()=>{
        console.log(searchInput.current.value);
        axios.get("http://localhost:8081/admin/getInstitute?instituteId="+searchInput.current.value)
        .then((resp)=>{
            if(resp.data){
                setAllInstitution([resp.data]);
            }
            else{
                alert("no institutions found")
            }
        })
        .catch((err)=>{
            alert("no institutions found")
        })
    }
    const handleAdd = ()=>{
        const instituteNameV = instituteName.current.value;
        const instituteDescriptionV = instituteDescription.current.value;
        const instituteAddressV = instituteAddress.current.value;
        const mobileV = mobile.current.value;
        const emailV = email.current.value;
        const obj = {
            instituteName : instituteNameV,
            instituteDescription : instituteDescriptionV,
            instituteAddress : instituteAddressV,
            mobile:mobileV,
            email:emailV
        }
        axios.post("http://localhost:8081/admin/addInstitute",obj)
        .then((res)=>{
            if(res.data=="Institue added"){
                getAllInstitute();
                alert("Institute Added");
            }
        })
        .catch((err)=>{
            alert("Institute Couldn't be added");
        })
        setShowAddPopUp(!showAddPopUp) 
    }

    const handleEdit = ()=>{
        console.log(editData);
        setShowEdit(false);
        const obj = {
            instituteName : instituteName.current.value? instituteName.current.value: editData.instituteName  ,
            instituteDescription : instituteDescription.current.value? instituteDescription.current.value: editData.instituteDescription  ,
            instituteAddress : instituteAddress.current.value? instituteAddress.current.value: editData.instituteAddress  ,
            mobile : mobile.current.value? mobile.current.value: editData.mobile  ,
            emai : email.current.value? email.current.value: editData.email  
          }

          axios.put("http://localhost:8081/admin/editInstitute/"+editData.instituteId,obj)
          .then((resp)=>{
            if(resp.data=="Institue edited"){
                alert("updated");
                getAllInstitute();
            }else{
                alert("failed")
            }
          })
          .catch((err)=>{
            alert("failed")                
          })
    }

    const handleDelete = (data)=>{
        if (window.confirm('Are you sure you want to delete '+ data.instituteName)) {
            axios.delete("http://localhost:8081/admin/deleteInstitute?instituteId="+data.instituteId)
            .then((resp)=>{
                if(resp.data=="Institute deleted"){
                    getAllInstitute();
                    alert("Institute deleted");
                }
                else{
                    alert("Institute not deleted");
                }
            })
            .catch((err)=>{
                    
                alert("Institute not deleted : "+err.message);

            })
      }  
    }

    return(
        <>

            {
                showAddPopUp?
                <>
                    <div class="container  position-absolute" style={{top:100,left:448}}>
                        <input type="text" id="instituteName" ref={instituteName} class="col-3 form-control " placeholder=" Institute Name"/><br/>
                        <input type="text" id="instituteDescription" ref={instituteDescription} class="col-3 form-control " placeholder="Institute Description" /><br/>
                        <input type="text" id="instituteAddress" ref={instituteAddress} class="col-3 form-control " placeholder="Institute Addresss" /><br/>
                        <input type="text" id="mobile" ref={mobile} class="col-3 form-control " placeholder="Institute Mobile" /><br/>
                        <input type="text" id="email" ref={email} class="col-3 form-control " placeholder="Institute email" /><br/>
                        <button type="button" id="login_btn" class="btn btn-secondary" onClick={handleAdd}>Add</button>&nbsp;&nbsp;&nbsp;
                        <button type="button" id="close_btn" class="btn btn-secondary" onClick={()=>{setShowAddPopUp(false)}}>close</button><br/>

                    </div>
                </>
                :null
            }

            {
                showEdit?
                <>
                    <div class="container   position-absolute" style={{top:100,left:448}}>
                        <input type="text" id="instituteName" ref={instituteName} class="col-3 form-control " placeholder=" Institute Name"/><br/>
                        <input type="text" id="instituteDescription" ref={instituteDescription} class="col-3 form-control " placeholder="Institute Description" /><br/>
                        <input type="text" id="instituteAddress" ref={instituteAddress} class="col-3 form-control " placeholder="Institute Addresss" /><br/>
                        <input type="text" id="mobile" ref={mobile} class="col-3 form-control " placeholder="Institute Mobile" /><br/>
                        <input type="text" id="email" ref={email} class="col-3 form-control " placeholder="Institute email" /><br/>
                        <button type="button" id="login_btn" class="btn btn-secondary" onClick={handleEdit}>update</button>&nbsp;&nbsp;&nbsp;
                        <button type="button" id="close_btn" class="btn btn-secondary" onClick={()=>{setShowEdit(false)}}>close</button><br/>

                    </div>
                </>
                :null
            }   

            <div class = "container col-3 mt-5 ">
                <input type="text" id="searchInput" ref={searchInput} class="col-3 form-control " placeholder="Type here to search Institution" /><br/>
                <button type="button" id="searchCourse" class="btn btn-success" onClick={handleSearch}>Search</button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button type="button" id="login_btn" class="btn btn-secondary" onClick={()=>{setShowAddPopUp(!showAddPopUp)}} >Add</button><br/>
            </div>

            <Table>
                <thead>
                    <tr>
                        <th>Institute Id</th>
                        <th>Institute Name</th>
                        <th>Institute Description</th>
                        <th>Institute Address</th>
                        <th>Institute mobile</th>
                        <th>Institute email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allInstitution && allInstitution.map((val)=>{
                            return(<tr>
                                <td>{val.instituteId}</td>
                                <td>{val.instituteName}</td>
                                <td>{val.instituteDescription}</td>
                                <td>{val.instituteAddress}</td>
                                <td>{val.mobile}</td>
                                <td>{val.instituteName}</td>
                                <td>
                                    <button type="button" id="login_btn" class="btn btn-success" onClick={()=>{setShowEdit(true);setEditData(val)}}>Edit</button>&nbsp;&nbsp;
                                    
                                    <button type="button" id="login_btn" class="btn btn-danger" onClick={()=>{handleDelete(val)}}>Delete</button>
                                </td>
                            </tr>)
                        })
                    }
                </tbody>
            </Table>
                    
        </>
    )
}

export default  AdminInstitution;
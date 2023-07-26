import React, {useState, useEffect} from 'react'
import {useNavigate, useParams, Link} from 'react-router-dom'
import './AddEdit.css';
import {toast} from 'react-toastify';
import axios from 'axios';

const initialState={
    name: '',
    email: '',
    contact: ''
}
const AddEdit = () => {
const [state, setState]=useState(initialState);
const {name, email, contact}= state;

const navigate = useNavigate();
const handleSubmit = () =>{
   // e.preventdefault();
    if (!name || !email || !contact) {
        toast.error("please provide some values..")
    } else {
        if (!id) {
            axios.post("http://localhost:5000/api/post", {
            name, email, contact
        })
        .then(()=>{ 
             setState({name: "", email: "", contact: ""});
        })
        .catch((err) => toast.error(err.response.data));
        toast.success("data added successfuly")
        } else {
            axios.put(`http://localhost:5000/api/update/${id}`, {
            name, email, contact
        })
        .then(()=>{ 
             setState({name: "", email: "", contact: ""});
        })
        .catch((err) => toast.error(err.response.data));
        toast.success("Data updated successfuly")
        }
        
        setTimeout(()=> navigate("/"), 500);
    }
}

const handleInputChnage=(e)=>{
    const {name, value}= e.target;
    setState({...state, [name]: value});
}

//update edit data
const {id} = useParams();
useEffect(()=>{
axios.get(`http://localhost:5000/api/get/${id}`)
.then((resp)=>setState({ ...resp.data[0] }))
}, [id])


  return (
    <div style={{marginTop: '100px'}}>
<form style={{
    margin: 'auto',
    padding: '15px',
    maxWidth: '400px',
    alignContent: 'center'
}} 
onSubmit={handleSubmit}
>
 <label htmlFor='name'>Name</label>
 <input type='text' id='name' name="name"  value={name || ""} placeholder='name' onChange={handleInputChnage}/>
 
 <label htmlFor='email'>Email</label>
 <input type='email' id='email' name= "email" value={email || ""} placeholder='email' onChange={handleInputChnage}/>

 <label htmlFor='contact'>Contact</label>
 <input type='number' id='contact' name="contact" value={contact || ""} placeholder='contact' onChange={handleInputChnage}/>

<input type='submit' value={id ? "Update" : "Save"}/>
<Link to='/ '>
<input type='button' value='Go Back'/>
</Link>
</form>
    </div>
  )
}

export default AddEdit
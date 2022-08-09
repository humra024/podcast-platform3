import { Formik } from 'formik';
import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import "./style.css";
import img from './su.png';
import Swal from 'sweetalert2';

const Register = () => {

    const navigate = useNavigate();
    //1. Submission Function
    const userSubmit= async (formdata) => {
        console.log(formdata);
      
        //1. request url
        //2. request method
        //3. request body
        //4. data format

        //await will execute this function synchronously. since async and await are used, no need for then and catch
        const response = await fetch('http://localhost:5000/user/add', {
            method: 'POST', //post method defined in backend
            body: JSON.stringify(formdata), //converting form data(js) to json 
            headers:{
                'Content-Type':'application/json' //request is sent and response in recieved in json always
            }
        })
        //AJAX: asynchronous js and xml
        console.log(response.status);
        if(response.status === 200) {
            Swal.fire({
                icon:'success',
                title:'Successfully Registered',
                text:'You are now signed in'
            })

            response.json().then(data => {
                sessionStorage.setItem('user',JSON.stringify(data));
                navigate('/browse');
            })
        }
       
        else if(response.status === 400){
            Swal.fire({
              icon:'error',
              title:'Login Failed',
              text:'Invalid username or password'
            })
           }
          else{
            Swal.fire({
            icon:'error',
            title:'Login Failed',
            text:'Something went wrong'
           })
          }
    
    }


    //2. Use Formik in JSX 
  return (
    <div className="r-body">
    <div className="r-contact p-2">
        <div className="r-contact-left">
    
            <h1 className="r-signup-h form-title float-start mb-5" >Sign Up</h1> 
    

            {/* attritbutes in html = props in Formik */}
            {/* first {} for jsx, second {} for object */}
            <Formik  
            initialValues={{username: '', email:'', password: ''}} 
            onSubmit={userSubmit}
            > 

            {/*  values, handleChange, handleSubmit are keys of FormikValues */}
            { ({values, handleChange, handleSubmit}) => ( 
            <form onSubmit={handleSubmit}>
                
            <input value={values.name} onChange={handleChange} id="username" placeholder='Enter User-Name' className='form-control mt-4'/>
            <input value={values.email} onChange={handleChange} id="email" placeholder='Enter Valid Email' className='form-control mt-4'/>
            <input value={values.password} onChange={handleChange} id="password" placeholder='Enter Secure Password' className='form-control mt-4' type="password"/>
         
            <button type="submit" className='r-btn btn btn-success float-start mt-5'>SUBMIT</button>
            </form>
            ) }
            </Formik>
            <br/><br/>
            <p  className="m-2 text-end">Have an account? <Link to={'/login/'}>Login</Link></p>
   
        </div>

        <div className="r-contact-right">
            <img className="r-img" src={img} alt="">
            </img>
        </div>
    </div>
    </div>
    
    
  )
}

export default Register
import { Formik } from 'formik';
import React, { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import img from './li.png';
import { UserContext } from '../userContext';


const Login = () => {
  
    const navigate = useNavigate();
    const {setLoggedIn, setCurrentUser} = useContext(UserContext);

    const userSubmit = async (formdata) => {
        console.log(formdata);

        //1. url
        //2. request method
        //3. data
        //4. Data format

        const res = await fetch('http://localhost:5000/user/authenticate',{
            method:'POST',
            body:JSON.stringify(formdata),
            headers : {
                'Content-Type':'application/json'
            }
        })

        if(res.status === 200){
            Swal.fire({
                icon:'success',
                title:'Login Successful',
                text:'You are now logged in'
            })

            res.json().then(data => {
                sessionStorage.setItem('user',JSON.stringify(data));
                setCurrentUser(data);
                setLoggedIn(true);
                navigate('/browse');
            })
        }
        else if(res.status === 400){
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
    
    
  
  
  
  
    return (
        <div className="l-body">
       
        <div className="l-contact p-2">
        <div className="l-contact-left">
    
            <h1 className="r-signup-h form-title float-start mb-5">Login</h1> 
    
            {/* attritbutes in html = props in Formik */}
            {/* first {} for jsx, second {} for object */}
            <Formik  
            initialValues={{email : '', password : ''}} 
            onSubmit={userSubmit}
            > 

            {/*  values, handleChange, handleSubmit are keys of FormikValues */}
            { ({values, handleChange, handleSubmit}) => ( 
            <form onSubmit={handleSubmit}>
                
            <input value={values.email} onChange={handleChange} id="email" placeholder='Enter Valid Email' className='form-control mt-4'/>
            <input value={values.password} onChange={handleChange} id="password" placeholder='Enter Secure Password' className='form-control mt-4' type="password"/>
         
            <button type="submit" className='r-btn btn btn-success float-start mt-5'>SUBMIT</button>
            </form>
            ) }
            </Formik>
            <br/><br/>
            <p style={{ textAlign: 'end'}} className="m-2">Don't have an account? <Link to={'/register/'}>Sign-Up</Link></p>
   
        </div>

        <div className="l-contact-right">
        <script src="https://cdn.lordicon.com/xdjxvujz.js"></script>
            

            <img className="l-img" src={img} alt="">
            </img>
        </div>
    </div>
        
    </div>
  )
}

export default Login

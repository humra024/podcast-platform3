import React, { useState } from 'react'
import { Formik } from 'formik';
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

const AddPodcast = () => {
  const navigate = useNavigate()

  const [selFile, setSelFile] = useState("");
  const [audFile, setAudFile] = useState("");
  const url = 'http://localhost:5000';

  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem("user")));


    //1. Submission Function
    const userSubmit= async (formdata) => {
        formdata.thumbnail = selFile;
        formdata.audio = audFile;
        console.log(formdata);
      
        //1. request url
        //2. request method
        //3. request body
        //4. data format

        //await will execute this function synchronously. since async and await are used, no need for then and catch
        const response = await fetch('http://localhost:5000/podcast/pod', {
            method: 'POST', //post method defined in backend
            body: JSON.stringify(formdata), //converting form data(js) to json 
            headers:{
                'Content-Type':'application/json' //request is sent and response in recieved in json always
            }
        })

        console.log(response.status);
        if(response.status === 200){   //third equal for data type checking
            console.log('Success');
            Swal.fire({
              icon: "success",
              title: "well done👍",
              text: "Uploaded succesfully!!",
            })
            navigate("/browse")
        }
        
        else{
            console.log('Failed');
        }

    }
    const uploadThumbnail= (e) => {
        const file = e.target.files[0];
        setSelFile(file.name);
        const fd = new FormData();
        fd.append("myfile", file);
        fetch(url + "/util/uploadfile", {
          method: "POST",
          body: fd,
        }).then((res) => {
          if (res.status === 200) {
            console.log("file uploaded")
          }
        });
      };

      const uploadAudio= (e) => {
        const file = e.target.files[0];
        setAudFile(file.name);
        const fd = new FormData();
        fd.append("myfile", file);
        fetch(url + "/util/uploadfile", {
          method: "POST",
          body: fd,
        }).then((res) => {
          if (res.status === 200) {
            console.log("file uploaded")
          }
        });
      };



  return (
    <div className="u-body">
    <div className="container u-contact">
        
        <h2 className="form-title mt-3 u-h2" style={{ textAlign: 'center'}}>Upload</h2> 
        

        <Formik  
        initialValues={{title:'', description:'', genre:'',  thumbnail:'', file:'', uploadedBy: currentUser._id, createdAt: new Date() }} 
        onSubmit={userSubmit}
        > 
        { ({values, handleChange, handleSubmit}) => ( 
            <form onSubmit={handleSubmit}>
       
            <input value={values.title} onChange={handleChange} id="title" placeholder='Enter Title' className='form-control mt-4'/>
            <input value={values.description} onChange={handleChange} id="description" placeholder='Enter Description' className='form-control mt-4'/>
            <input value={values.genre} onChange={handleChange} id="genre" placeholder='Enter Genre' className='form-control mt-4'/>
            
            <h5 className="u-h5 mt-4 text-start">Thumbnail</h5>
            <input  onChange={uploadThumbnail}  type="file" className='form-control u-i'/>
            
            <h5 className="u-h5 mt-4 text-start">Audio</h5>
            <input onChange={uploadAudio} type="file" placeholder='Enter File' className='form-control u-i'/>
    
            <button type="submit" className='u-btn btn btn-success mt-5'>SUBMIT</button>
           </form>
        ) }

        </Formik>
    </div>
    </div>
    
  )
}

export default AddPodcast
import logo from './logo.svg';
// import './index.css';
import React, { useEffect, useState } from "react";
// import Page from './components/Page';
import CallApi from './components/CallApi';
import $ from 'jquery'; 

import swal from 'sweetalert';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';

import Visual from "./components/Visual";
import Home from "./components/Home";
import Review from "./components/Review"
function App() {


  const [image, setImage] = useState({ preview: '', data: '' })
  const [status, setStatus] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('file', image.data)
    const response = await fetch('http://localhost:5001/image', {
      mode: 'no-cors',
      // headers:{
      //   'Access-Control-Allow-Origin': '*'
      // },
      method: 'POST',
      body: formData,
    })
    if (response) setStatus(response.statusText)


      var fileInput = document.getElementById('fileInput'),
          fileDisplayArea = document.getElementById('fileDisplayArea');
      var file = fileInput.files[0],
            reader = new FileReader();
        
        reader.onload = function(e) {
          console.log('testing loader')
          console.log(typeof(reader.result))
          fileDisplayArea.innerHTML = reader.result;
        };
        
        reader.readAsText(file);	
    // }
  }

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }

    setImage(img)

  }



  
  return (

      <Router>
          <div className="sticky top-0 z-40 w-auto backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 bg-white/95 supports-backdrop-blur:bg-white/60">
              <div className="max-w-8xl mx-auto">
                  <div className=" border-2 border-slate-400/10 lg:border-0 mx-4 lg:mx-0">
                      <div className="relative flex items-center">
                          <img className="h-10 w-10" src="/pic.png"/>
                          <a className="mr-3 flex-none w-[2.0625rem] overflow-hidden md:w-auto" href="/">

                              <span className=" pl-4 text-slate-900 w-auto h-5">CReKG</span>
                          </a>
                          <div className="relative hidden lg:flex items-center ml-auto">
                              <nav className="text-sm leading-6 font-semibold text-slate-700">
                                  <ul className="flex space-x-8 mr-8">
                                      <li>
                                          <Link to='/review' className='hover:text-sky-500'>Contract Review</Link>
                                      </li>
                                      <li>
                                          <Link to='/visual' className='hover:text-sky-500'>Visualization</Link>
                                      </li>
                                      <li>
                                          <Link to='/visual' className='hover:text-sky-500'>Team</Link>
                                      </li>
                                  </ul>
                              </nav>
                          </div>
                      </div>
                  </div>

              </div>
          </div>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/visual' element={<Visual />} />
            <Route path='/review' element={<Review />} />
        </Routes>
      </Router>
  );
}

// const domContainer = document.querySelector('#function zone');
// ReactDOM.render(e(APP), domContainer);

export default App;

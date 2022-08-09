import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddPodcast from './Components/AddPodcast';
import BrowsePodcast from './Components/BrowsePodcast';
import Play from './Components/Play';
import Login from './Components/Login';
import Register from './Components/Register';
import Header from './Components/Header';
import Authorisor from './Components/Auth';
import { useState } from "react";
import { UserProvider } from "./userContext";


function App() {
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem("user")))
  return (
    <div className="App">
       <UserProvider user={currentUser}>
      <BrowserRouter>
      <Header></Header>
        <Routes>
          <Route element={ <Login/> } path="/"/> 
          <Route element={ <AddPodcast/> } path="/upload"/> 
          <Route element={ <BrowsePodcast/> } path="/browse"/>
          <Route element={ <Play/> } path="/play/:id"/>
          <Route element={ <Login/> } path="/login"/>
          <Route element={ <Register/> } path="/register"/>
          <Route element={
        <Authorisor>
          <AddPodcast />
        </Authorisor>}
       path="/addcode"/>
        </Routes>
      </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;

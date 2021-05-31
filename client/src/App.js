import React, { useState, useContext, useEffect } from 'react';
import { EnterAddress } from "./components/EnterAddress/EnterAddress";
import { Confirmation } from './components/Confirmation/Confirmation';
import { SelectDate } from './components/SelectDate/SelectDate';
import { SelectTime } from './components/SelectTime/SelectTime';
import { ClientInfo } from './components/ClientInfo/ClientInfo';
import { ConfirmPackage } from './components/ConfirmPackage/ConfirmPackage';
import { Dashboard } from './screens/Dashboard/Dashboard';
import { Login } from './screens/Login/Login';
import { Signup } from './screens/Signup/Signup';
import { Availability } from './screens/Availability/Availability';
import UserContext from "./utils/UserContext";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Normalize from 'react-normalize';

function App() {
  const [currentUser, setCurrentUser] = useState({
    userEmail: '',
    userId: '',
    isAuthenticated: 'false',
    // openingTime: '08:00',
    // closingTime: '17:00',
    updateUser: (userEmail, userId, isAuthenticated) => {
      setCurrentUser({ ...currentUser, userEmail, userId, isAuthenticated })
    }
  });

  let userIdS = '';

  const [appointmentData, setAppointmentData] = useState({
    street: null,
    city: null,
    state: null,
    zip: null,
    date: null,
    firstName: null,
    lastName: null,
    email: null,
    realtor: false,
    sq_ft: null,
    package: null,
    price: null,
    photographerId: '',
    startTime: null,
    endTime: null,
    status: 'active',
  });

  useEffect(() => {
    userIdS = JSON.parse(localStorage.getItem("userId"));
    const isAuthenticatedS = JSON.parse(localStorage.getItem("isAuthenticated"));
    setCurrentUser(prevState => {
      return {
        ...prevState,
        userId: userIdS,
        isAuthenticated: isAuthenticatedS,
      }
    })

  }, [userIdS])

  return (
    <Router>
      <UserContext.Provider value={currentUser}>
        <Normalize />
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/book/:id">
            <EnterAddress appointmentData={appointmentData} setAppointmentData={setAppointmentData} />
          </Route>
          <Route exact path="/book/confirm-package/:id">
            <ConfirmPackage appointmentData={appointmentData} setAppointmentData={setAppointmentData} />
          </Route>
          <Route exact path="/book/select-date/:id">
            <SelectDate appointmentData={appointmentData} setAppointmentData={setAppointmentData} />
          </Route>
          <Route exact path="/book/select-time/:id">
            <SelectTime appointmentData={appointmentData} setAppointmentData={setAppointmentData} />
          </Route>
          <Route exact path="/book/add-info/:id">
            <ClientInfo appointmentData={appointmentData} setAppointmentData={setAppointmentData} />
          </Route>
          <Route exact path="/book/confirm/:id">
            <Confirmation appointmentData={appointmentData} setAppointmentData={setAppointmentData} />
          </Route>
          <Route exact path="/availability">
            <Availability />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/">
            <Dashboard />
          </Route>
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;

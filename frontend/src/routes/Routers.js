import React from 'react'
import {Routes, Route, Navigate} from "react-router-dom";
import { Home } from '../pages/Home';
import { Tours } from '../pages/Tours';
import { TourDetails } from '../pages/TourDetails';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { SearchResultList } from '../pages/SearchResultList';
import { AdminTour } from '../pages/AdminTour';
import { History } from '../pages/History';
import { GroupTourRequest } from '../pages/GroupTourRequest';

export const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to= "/home" />}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/tours" element={<Tours/>}/>
      <Route path="/tours/:id" element={<TourDetails/>}/>
      <Route path="/tours/search" element={<SearchResultList/>}/>
      <Route path="/history" element={<History/>}/>
      <Route path="/groupTourRequests" element={<GroupTourRequest/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/admin/tours" element={<AdminTour />} />
    </Routes>
  )
}

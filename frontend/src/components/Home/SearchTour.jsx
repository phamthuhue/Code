import {React, useRef} from 'react'

import { useNavigate } from 'react-router-dom'
import {FaLocationArrow} from "react-icons/fa"
import {AiOutlineCalendar} from "react-icons/ai"
import {BsFillPeopleFill, BsSearch} from "react-icons/bs"

import { BASE_URL } from '../../utils/config'

export const SearchTour = () => {
    const locationRef= useRef("");
    const distanceRef= useRef(0);
    const groupSizeRef= useRef(0);
    const navigate = useNavigate()

    const searchHandler = async() =>{
        const location = locationRef.current.value;
        const distance = distanceRef.current.value;
        const groupSize = groupSizeRef.current.value;

        if(location === "" || distance === "" || groupSize === ""){
            return alert("Please, complete all fields")
        }
        const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?city=${location}&distance=${distance}&maxGroupSize=${groupSize}`);
        if(!res.ok) alert("Something went wrong");
        const result = await res.json();
        navigate(`/tours/search?city=${location}&distance=${distance}&maxGroupSize=${groupSize}`, {state:result.data});
    }

  return (
    <div className='px-[30px] py-6 max-w-[1170px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-x-3 bg-white/20 shadow-2xl backdrop-blur rounded-lg text-white'>
        <div className='flex flex-col border rounded'>
            <div className='p-2 px-3 flex gap-3'>
                <FaLocationArrow className='w-[15px] self-center'/>
                <div className='flex flex-col'>
                    <label>Địa điểm</label>
                    <input type="text" placeholder='Bạn muốn tới đâu?' ref={locationRef} className='bg-transparent text-gray' />
                </div>
            </div>
        </div>        
        <div className='flex flex-col rounded border'>
            <div className='p-2 px-3 flex gap-3'>
                <AiOutlineCalendar className='self-center w-[15px]'/>
                <div className='flex flex-col'>
                    <label>Thời gian</label>
                    <input type="date" placeholder='Thời gian bắt đầu' ref={locationRef} className='bg-transparent text-gray' />
                </div>
            </div>
        </div>
        <div className='flex flex-col border  rounded'>
            <div className='p-2 px-3 flex gap-3'>
                <BsFillPeopleFill className='self-center w-[15px]'/>
                <div className='flex flex-col'>
                    <label>Số người</label>
                    <input type="number" placeholder='0' ref={locationRef} className='bg-transparent text-gray' />
                </div>
            </div>
        </div>
        <button className='rounded w-full lg:max-w-[162px] h-10 flex justify-center items-center bg-blue-800' onClick={searchHandler}><BsSearch className='text-white'/></button>
    </div>
  )
}

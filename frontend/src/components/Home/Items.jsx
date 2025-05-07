import React from 'react'
import { Link } from 'react-router-dom'
import {MdLocationPin} from "react-icons/md"

export const Items = ({photo, title, city, price, id}) => {
  return (
    <div className='shadow-lg rounded-lg hover:scale-105 duration-300 bg-white'>
        <img src={photo} alt={title} className='w-full h-[200px] object-cover rounded-t-lg'/>
        <div className='flex flex-col py-4 px-4'>
            <div className='flex items-center'>
                <MdLocationPin className='text-darkGreen mr-1'/>
                <span className='text-gray-500 text-sm'>{city}</span>
            </div>
            <p className='font-bold'>{title}</p>
            <div className='flex justify-between'>
                <div><span className="text-darkGreen font-bold text-right">{price}đ</span></div>
                <button className='rounded border-none bg-darkGreen'><Link to={`/tours/${id}`} className='text-white no-underline'>Đặt ngay</Link></button>
            </div>
        </div>
    </div>
  )
}


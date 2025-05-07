import React from 'react'
import {SearchTour} from "./SearchTour.jsx"
import heroImg from "./../../assets/images/vn.jpeg"

export const Hero = () => {
  return (
    <div className='max-w-[1640px] mx-[20px] pt-2'>
      <div className='max-h-[500px] relative'>
          <div className='heroOverlay'>
              <span className='text-gray'>Du lịch cùng chúng tôi</span>
              <h1>Cùng VietNamTours<br/>Đặt tour và trải nghiệm</h1>
              <div className='pt-16'>
                <SearchTour/>
              </div>
          </div>
          <img className='heroImg' src={heroImg} alt='hero'/>
      </div>   
    </div>
  )
}

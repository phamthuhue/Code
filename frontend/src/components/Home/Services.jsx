import React from 'react'

import { FaHotel, FaPlaneDeparture } from 'react-icons/fa'
import { FaUtensils } from "react-icons/fa6";
import { PiMountainsBold } from 'react-icons/pi';

export const Services = () => {
  return (
    <div className='flex flex-col items-center justify-center py-6 bg-lightGreen'> 
        <div className='sectionTitle'>
            <PiMountainsBold size={20} className='text-darkGreen'/>
            <div>Các đối tác</div>
            <p>Những đối tác uy tín và chất lượng đem lại trải nghiệm tốt nhất cho khách hàng.</p>
        </div>
        <div className='serviceContainer'>
            <div className='service'>
                  <FaHotel size={50} className='text-darkGreen'/>
                  <h5>Khách sạn</h5>
                  <p>Hãy trải nghiệm không gian nghỉ dưỡng tuyệt vời với các khách sạn chất lượng cao, đảm bảo sự thoải mái và tiện nghi cho chuyến đi của bạn.</p>
            </div>
            <div className='service'>
                  <FaPlaneDeparture size={50} className='text-darkGreen'/>
                  <h5>Phương tiện di chuyển</h5>
                  <p>Di chuyển dễ dàng và thuận tiện với các phương tiện di chuyển hiện đại, giúp bạn khám phá mọi địa điểm mà không phải lo lắng về quãng đường.</p>
            </div>
            <div className='service'>
                  <FaUtensils size={50} className='text-darkGreen'/>
                  <h5>Nhà hàng</h5>
                  <p>Khám phá thế giới ẩm thực phong phú tại các nhà hàng nổi bật, nơi bạn sẽ được thưởng thức những món ăn đặc sắc, tươi ngon từ khắp nơi trên thế giới.</p>
            </div>
        </div>
    </div>
  )
}

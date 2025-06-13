import React from 'react'

import img1 from "./../../assets/images/caobang.jpeg"
import img2 from "./../../assets/images/cauvang.jpeg"
import img3 from "./../../assets/images/chuabaidinh.jpeg"

export const UpcomingTours = () => {
  return (
    <div className='max-w-[1686px] mt-[120px] lg:mt-[50px] pt-6 flex flex-col items-center justify-center'>
        <div className='gradient grid grid-cols-1 lg:grid-cols-3 pb-12 place-items-center'>
            <div className='md:col-span-1 p-4 lg:ml-36'>
                <span className='uppercase text-sm'>Khám phá</span>
                <h2 className='tracking-wide font-bold'>Những tour sắp ra mắt</h2>
                <p>Cùng VietnamTours chào đón loạt tour mới, đưa bạn đến những hành trình độc đáo và trải nghiệm tuyệt vời sắp ra mắt!</p>
            </div>
            <div className='flex gap-2 md:col-span-2 justify-center flex-wrap'>
                <div className='promoCard'>
                    <img src={img1} alt="countryside"/>
                    <div className="overlay">
                      <div className="text-start">
                        <h5>Thác Bản Giốc</h5>
                        <p>Khám phá vẻ đẹp hùng vĩ của Thác Bản Giốc, một trong những thác nước lớn và đẹp nhất Đông Nam Á, nơi bạn có thể tận hưởng không khí trong lành và cảnh sắc thiên nhiên hoang sơ.</p>
                      </div>
                    </div>
                </div>            
                <div className='promoCard lg:mt-10'>
                    <img src={img2} alt="city"/>
                    <div className="overlay">
                      <div className="text-start">              
                        <h5>Cầu Vàng Đà Nẵng</h5>
                        <p>Chạm đến mây trời với tour mới khám phá Cầu Vàng Đà Nẵng – kiệt tác giữa thiên nhiên hùng vĩ, hứa hẹn những khoảnh khắc đầy ấn tượng!</p>
                      </div>
                    </div>
                </div>
                <div className='promoCard lg:mt-16'>
                    <img src={img3} alt="mountains"/>
                    <div className="overlay">
                      <div className="text-start">
                        <h5>Chùa Bái Đính</h5>
                        <p>Trải nghiệm tour mới đến Chùa Bái Đính – hành trình tâm linh nơi non nước Ninh Bình, lưu giữ vẻ đẹp cổ kính và yên bình.</p>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

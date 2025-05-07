import React from 'react'

import { FaStar } from 'react-icons/fa'
import { PiMountainsBold } from 'react-icons/pi'
import { RiDoubleQuotesR } from 'react-icons/ri'

import customer1 from "../../assets/images/khach1.jpeg"
import customer2 from "../../assets/images/khach2.jpeg"
import customer3 from "../../assets/images/khach3.jpeg"

export const Comments = () => {
  return (
    <div className='gradient mx-auto pb-6 text-sm'>   
        <div className='sectionTitle'>
            <PiMountainsBold size={20} className='text-darkGreen'/>
            <div>Đánh giá</div>
            <p>Bình luận đánh giá từ khách hàng</p>
        </div>
        <div className='commentSection'>
            <div className='comment'>
                <img src={customer1} alt="customer" className='commentImg'/>
                <div className='flex flex-col items-center gap-3 my-3'>
                    <div className='commentInfo'>
                        <span>Minh Nguyễn</span>
                        <div>
                            <FaStar/>
                            <FaStar/>
                            <FaStar/>
                            <FaStar/>
                        </div>
                    </div>
                    <div className='flex flex-col items-center text-center'>
                        <p>Chuyến đi tuyệt vời! Cảnh đẹp, đặc biệt là Cầu Vàng và phố cổ Hội An. Hướng dẫn viên nhiệt tình, chắc chắn sẽ quay lại!</p>
                        <RiDoubleQuotesR className='text-darkGreen' size={25}/>
                    </div>
                </div>
            </div>
            <div className='comment'>
                <img src={customer2} alt="customer" className='commentImg'/>
                <div className='flex flex-col items-center justify-end my-3 gap-3'>
                    <div className='commentInfo'>
                        <span>Huy Hoàng</span>
                        <div>
                            <FaStar/>
                            <FaStar/>
                            <FaStar/>
                            <FaStar/>
                        </div>
                    </div>
                    <div className='flex flex-col items-center text-center'>
                        <p>Sapa đẹp mê hồn, chuyến chinh phục Fansipan thú vị. Dịch vụ tốt, đội ngũ nhiệt tình. Rất hài lòng!</p>
                        <RiDoubleQuotesR className='text-darkGreen' size={25}/>
                    </div>
                </div>
            </div>
            <div className='comment'>
                <img src={customer3} alt="customer" className='commentImg'/>
                <div className='flex flex-col items-center justify-end my-3 gap-3'>
                    <div className='commentInfo'>
                        <span>Phạm Mai</span>
                        <div>
                            <FaStar/>
                            <FaStar/>
                            <FaStar/>
                            <FaStar/>
                        </div>
                    </div>
                    <div className='flex flex-col items-center text-center'>
                        <p>Phú Quốc đẹp, biển trong xanh và các hoạt động vui chơi hấp dẫn. Dịch vụ tuyệt vời, sẽ quay lại cùng gia đình!</p>
                        <RiDoubleQuotesR className='text-darkGreen' size={25}/>
                    </div>
                </div>
            </div>
        </div>  
    </div>
  )
}

import React, { useContext, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import {BsFillPeopleFill, BsFillStarFill, BsCalendarCheck, BsExclamationCircleFill, BsCheckCircle} from "react-icons/bs"
import {FaMoneyBillWave, FaCalendarAlt} from 'react-icons/fa';
import {FaLocationDot} from "react-icons/fa6";
import {CgProfile} from "react-icons/cg"

import { Checkout } from '../components/Cart/Checkout.jsx';
import { BASE_URL } from '../utils/config'
import {AuthContext} from "../context/AuthContext.js"
import useFetch from '../hooks/useFetch'

export const TourDetails = () => {  
  const params = useParams();
  const { id } = params;
  const reviewsMsgRef = useRef()
  const { user } = useContext(AuthContext)
  
  const {data:tour} = useFetch(`${BASE_URL}/tours/${id}`)
  const { data: itinerary } = useFetch(`${BASE_URL}/itineraries?tourId=${id}`);
  const { data: guide } = useFetch(`${BASE_URL}/guides?tourId=${id}`);

  const { title, photo, desc, price, reviews, city, maxGroupSize, date } = tour
  const options = { day: 'numeric', month: 'long', year: 'numeric' }
  const [tourRating, setTourRating] = useState(0)
      
  const submitHandler = async e => {
        e.preventDefault();
        const reviewText = reviewsMsgRef.current.value;
        if(!user || user === undefined || user===null){
          alert("Bạn chưa đăng nhập.")
        }
        try {
          const reviewObj = {
            username: user?.username,
            reviewText, 
            rating: tourRating
          }
          const res = await fetch(`${BASE_URL}/review/${id}`,{
            method: "post",
            headers:{
              "content-type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(reviewObj)
          })
          const result = await res.json();
          if(!res.ok){
            return alert(result.message);
          } 
          alert("Đánh giá đã được gửi")
        } catch (err) {
          alert(err.message)
        }
  }
  const totalRating = reviews?.reduce((acc,item)=> acc + item.rating, 0)
  
  const avgRating = 
    totalRating === 0
    ? "" 
    : totalRating === 1
    ? totalRating 
    : totalRating / reviews?.length

   //Review in Stars
  // const handleRatingClick = (rating) => {
  //   setTourRating(rating === tourRating ? 0 : rating);
  // }; 
  
  return (
    <section className='max-w-[1640px] mx-auto py-4 bg-gradient-to-b from-lightGreen to-white'>
      <div className="max-w-[1180px] mx-auto grid grid-cols-1 md:grid-cols-[63%_37%] gap-3">
        {/*Tour Details*/}
        <div id='product' className='grid grid-cols w-full'>
            {/*Image*/}
            <img src={photo} alt="tour landscape" className='rounded' />
            {/*Description*/}
            <div id='description' className='detailContainer'>
                <h4>{title}</h4>
                <div className='tourDetail mb-2'>
                    <div>
                      <BsFillStarFill className='text-yellow mr-1'/>
                      <span>{avgRating === 0 ? null : avgRating} ({reviews?.length})</span>
                    </div>
                </div>
                <div className='tourDetail'>
                    <div>
                        <FaLocationDot className='text-darkGreen mr-1'/>
                        <span>{city}</span>
                    </div>
                    <div>
                        <FaMoneyBillWave className='text-darkGreen'/>
                        <span>{price} VNĐ/ 1 người</span>
                    </div>
                    <div>
                        <BsFillPeopleFill className='text-darkGreen mr-1'/>
                        <span>Số chỗ còn: {maxGroupSize} chỗ</span>
                    </div>
                    <div>
                        <FaCalendarAlt className='text-darkGreen mr-1'/>
                        <span>Ngày khởi hành: {date}</span>
                    </div>
                </div>
                <div className='mt-3'>
                    <h5>Mô tả</h5>
                    <p className='text-sm'>{desc}</p>
                </div>
            </div>
            {/*Itinerary Section*/}
            <div id="itinerary" className="detailContainer">
              <h5 className="text-2xl flex items-center gap-2">
                <BsCalendarCheck className="text-darkGreen" />
                Lịch trình tại {itinerary.title}
              </h5>

              {/* Details */}
              <div className="mt-4">
                {itinerary.details.map((detail, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 mb-2 bg-lightGreen p-2 rounded-md shadow-sm"
                  >
                    {/* <BsClockFill className="text-darkGreen text-xl flex-shrink-0" /> */}
                    <div>
                      <p className="text-lg font-semibold text-darkGreen">{detail.time}</p>
                      <p className="text-sm text-darkGray">{detail.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Notes */}
              <div className="itinerary-notes mt-3">
                <h4 className="text-xl font-semibold text-darkGreen flex items-center gap-2">
                  <BsExclamationCircleFill className="text-orange-500 text-2xl" />
                  Lưu ý:
                </h4>
                <ul className="list-none mt-3 pl-4 space-y-2">
                  {itinerary.notes.map((note, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-darkGray bg-lightYellow p-1 rounded-md"
                    >
                      <BsCheckCircle className="text-success text-lg flex-shrink-0" />
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/*TourGuide Section*/}      
            <div id='description' className='detailContainer'>
                <h5>Hướng dẫn viên du lịch</h5>
                <p className=''>{guide.name}</p>
                <div className='tourDetail mb-2'>
                    <div>
                      <BsFillStarFill className='text-yellow mr-1'/>
                      <span>{guide.rating === 0 ? null : guide.rating} ({guide.countRating} đánh giá)</span>
                    </div>
                </div>
                <div className=''>
                    <div>
                        <span>Tuổi: {guide.age}</span>
                    </div>
                    <div>
                        <span>Giới tính: {guide.gender}</span>
                    </div>
                </div>
            </div>

          {/*Review Section*/}            
          <div id='comments' className='detailContainer'>
              <div className='flex items-center gap-2'>
                  <h5>Đánh giá</h5>
                  <span className='text-sm'>({reviews?.length} đánh giá)</span>
              </div>
              {/*Review posting*/}
              {/* <div className='flex gap-3 font-light'>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <div
                      key={rating}
                      className={`flex items-center text-yellow cursor-pointer hover:text-orange-700`}
                      onClick={() => handleRatingClick(rating)}
                    >
                    <span>{rating}</span>
                    <BsFillStarFill className={`ml-1 ${
                          rating <= tourRating ? 'text-orange-700' : 'text-yellow'}`}/>
                    </div>
                  ))}
              </div>
              <div className='w-[85%] border-2 border-gray rounded-full p-1 mx-auto my-3'>
                  <form onSubmit={submitHandler} className='flex justify-between w-full'>
                    <input type="text" placeholder='Share your experience' ref={reviewsMsgRef} className='rounded-full text-sm py-2 px-3 w-full text-darkGray font-light'/>
                    <button className='rounded-full self-end buttonBlue'>Gửi</button>
                  </form>
              </div> */}
              {/*Tour reviews*/}
              <div>
                {reviews && reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <div key={index} className="review-item mt-4">
                      <div className="flex justify-between text-sm">
                        <div className="flex">
                          <CgProfile className="w-[40px] h-auto mr-2" />
                          <div className="flex flex-col">
                            <span className="font-bold">{review.name}</span>
                            <span className="text-gray-400">
                              {new Date(review.createdAt).toLocaleDateString("en-US", options)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center text-yellow">
                          <span>{review.rating}</span>
                          <BsFillStarFill className="ml-2" />
                        </div>
                      </div>
                      <p className="mt-2">{review.reviewText}</p>
                    </div>
                  ))
                ) : (
                  <p>Chưa có đánh giá nào.</p>
                )}
              </div>
            </div>
          </div>

        {/*Checkout*/}
        <Checkout title={title} price={price} reviews={reviews} avgRating={avgRating}/>
      </div>
    </section>
  )
}

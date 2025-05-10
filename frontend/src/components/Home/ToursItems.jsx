import React, { useEffect } from "react";

import { PiMountainsBold } from "react-icons/pi";

import { Items } from './Items'
import { BASE_URL } from '../../utils/config.js'
import useFetch from '../../hooks/useFetch'

export const ToursItems = () => {
  // console.log(`${BASE_URL}/tours`);
  // useEffect(() => {
  //   const fetchTours = async () => {
  //     const res = await axios.get("http://localhost:8000/api/v1/tours");
  //     console.log("1")
  //     console.log(res.data);
  //   };
  //   fetchTours();
  // }, []);
  const {data: tours, loading, error} = useFetch(`${BASE_URL}/tours`)
  
  return (
    <section className='max-w-[1640] px-4 py-12 mx-8 mb-10 text-sm'>
        <div className='sectionTitle'>
            <PiMountainsBold size={20} className='text-darkGreen'/>
            <div>Tour du lịch của chúng tôi</div>
            <p>Tìm kiếm nơi bạn muốn trải nghiệm</p>
        </div>
        <div className='px-4'>
            {loading && <p>Loading...</p>}
            {error && <p>{error}.</p>}
        </div>
        {!loading && !error && <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4'>
            {tours?.map(tour => (
                <Items key={tour._id} photo={tour.photo} title={tour.title} city={tour.city} price={tour.price} id={tour._id} />
            ))}
        </div>}
    </section>
  )
}

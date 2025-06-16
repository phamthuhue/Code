import React, { useRef } from 'react'
import { FaLocationArrow } from 'react-icons/fa'
import { BsFillPeopleFill, BsSearch } from 'react-icons/bs'
import { AiOutlineDollar } from 'react-icons/ai'
import { BASE_URL } from '../../utils/config'

export const SearchTour = ({ setTours, setLoading }) => {
  const locationRef = useRef("")
  const priceRef = useRef("")
  const groupSizeRef = useRef("")

  const searchHandler = async () => {
    const city = locationRef.current.value.trim();
    const price = priceRef.current.value;
    const groupSize = groupSizeRef.current.value;

    const queryParams = new URLSearchParams();
    if (city) queryParams.append("city", city);
    if (price) queryParams.append("price", price);
    if (groupSize) queryParams.append("groupSize", groupSize);

    if ([...queryParams].length === 0) {
      return alert("Vui lòng nhập ít nhất một tiêu chí tìm kiếm.");
    }

    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?${queryParams}`);
      if (!res.ok) throw new Error("Lỗi khi tìm kiếm");
      const result = await res.json();
      setTours(result.data || []);
    } catch (err) {
      alert("Không thể tìm kiếm tour.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='px-[30px] py-6 max-w-[1170px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-4 bg-white/20 shadow-2xl backdrop-blur rounded-lg text-white'>
      <div className='flex flex-col border rounded'>
        <div className='p-2 px-3 flex gap-3'>
          <FaLocationArrow className='w-[15px] self-center' />
          <div className='flex flex-col'>
            <label>Địa điểm</label>
            <input type="text" placeholder='Bạn muốn tới đâu?' ref={locationRef} className='bg-transparent text-white' />
          </div>
        </div>
      </div>

      <div className='flex flex-col border rounded'>
        <div className='p-2 px-3 flex gap-3'>
          <AiOutlineDollar className='self-center w-[15px]' />
          <div className='flex flex-col'>
            <label>Giá tối đa (VNĐ)</label>
            <input type="number" placeholder='0' ref={priceRef} className='bg-transparent text-white' />
          </div>
        </div>
      </div>

      <div className='flex flex-col border rounded'>
        <div className='p-2 px-3 flex gap-3'>
          <BsFillPeopleFill className='self-center w-[15px]' />
          <div className='flex flex-col'>
            <label>Số người</label>
            <input type="number" placeholder='0' ref={groupSizeRef} className='bg-transparent text-white' />
          </div>
        </div>
      </div>

      <button className='rounded w-full lg:max-w-[162px] h-10 flex justify-center items-center bg-blue-800' onClick={searchHandler}>
        <BsSearch className='text-white' />
      </button>
    </div>
  )
}
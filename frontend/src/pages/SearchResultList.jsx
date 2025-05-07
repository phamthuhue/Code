import React, { useState } from 'react'

import { useLocation } from 'react-router-dom'

import { Items } from '../components/Home/Items'


export const SearchResultList = () => {
    const location = useLocation()
    const [data] = useState(location.state)
    
  return (
    <div>
        <h4>Results for your search</h4>
        <section className='max-w-[1640] m-auto px-4 py-12'>
            {data.length === 0 ? <h4>Không có tour bạn tìm kiếm.</h4>:
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
                {data.map((item, index) => (
                    <Items key={index} photo={item.photo} title={item.title} city={item.city} price={item.price} id={item.id} />
                ))}
            </div>}
        </section>
    </div>
  )
}

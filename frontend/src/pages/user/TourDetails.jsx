import React, { useContext, useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "@utils/axiosInstance.js";

import {
    BsFillPeopleFill,
    BsFillStarFill,
    BsCalendarCheck,
    BsExclamationCircleFill,
    BsCheckCircle,
} from "react-icons/bs";

import { FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { Checkout } from "../../components/Cart/Checkout.jsx";

import useFetch from "../../hooks/useFetch.js";
import { BASE_URL } from "../../utils/config.js";
import Pagination from "../../components/Pagination/Pagination.jsx";
export const TourDetails = () => {
    const params = useParams();
    const { id } = params;

    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0); //State quản lý ảnh hiện tại

    const { data: tour } = useFetch(`tours/${id}`);
    const { data: itinerary } = useFetch(`itineraries/tour/${id}`);

    const [guideReviews, setGuideReviews] = useState([]);
    useEffect(() => {
        const fetchGuideReviews = async () => {
            if (tour?.guide?._id) {
                try {
                    const res = await axiosInstance.get(
                        `/reviews/guide/${tour.guide._id}`
                    );
                    console.log("Dữ liệu guide reviews:", res.data.data); // Log dữ liệu ra đây
                    setGuideReviews(
                        Array.isArray(res.data.data) ? res.data.data : []
                    );
                } catch (err) {
                    console.error("Lỗi khi fetch guide reviews:", err);
                }
            }
        };
        fetchGuideReviews();
    }, [tour]);

    const [page, setPage] = useState(1);
    const {
        data: reviews,
        currentPage,
        totalPages,
        loading,
        error,
    } = useFetch(`reviews/tour/${id}?page=${page}&limit=5`);

    const {
        title,
        photos,
        desc,
        price,
        city,
        maxGroupSize,
        startDate,
        endDate,
        avgRating,
        guideId,
    } = tour;
    const options = { day: "numeric", month: "long", year: "numeric" };

    //Hàm next/prev
    const nextPhoto = () => {
        setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    };
    const prevPhoto = () => {
        setCurrentPhotoIndex(
            (prev) => (prev - 1 + photos.length) % photos.length
        );
    };

    return (
        <section className="max-w-[1640px] mx-auto py-4 bg-gradient-to-b from-lightGreen to-white">
            <div className="max-w-[1180px] mx-auto grid grid-cols-1 md:grid-cols-[63%_37%] gap-3">
                {/*Tour Details*/}
                <div id="product" className="grid grid-cols w-full">
                    {/*Image*/}
                    <div className="relative">
                        {photos && photos.length > 0 && (
                            <img
                                src={photos[currentPhotoIndex]}
                                alt="tour landscape"
                                className="rounded w-full h-auto"
                            />
                        )}
                        {photos && photos.length > 1 && (
                            <div className="absolute top-1/2 left-0 right-0 flex justify-between px-2">
                                <button
                                    onClick={prevPhoto}
                                    className="bg-gray bg-opacity-70 p-2 rounded-full shadow hover:bg-opacity-100 transition"
                                >
                                    {/* Mũi tên bên trái */}
                                    <span className="text-xl font-bold select-none">
                                        ◀
                                    </span>
                                </button>
                                <button
                                    onClick={nextPhoto}
                                    className="bg-gray bg-opacity-70 p-2 rounded-full shadow hover:bg-opacity-100 transition"
                                >
                                    {/* Mũi tên bên phải */}
                                    <span className="text-xl font-bold select-none">
                                        ▶
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>
                    {/*Description*/}
                    <div id="description" className="detailContainer">
                        <h4>{title}</h4>
                        <div className="tourDetail mb-2">
                            <div>
                                <BsFillStarFill className="text-yellow mr-1" />
                                <span>
                                    {avgRating === 0 ? null : avgRating} (
                                    {reviews?.length})
                                </span>
                            </div>
                        </div>
                        <div className="tourDetail">
                            <div>
                                <FaLocationDot className="text-darkGreen mr-1" />
                                <span>{city}</span>
                            </div>
                            <div>
                                <FaMoneyBillWave className="text-darkGreen" />
                                <span>{price} VNĐ/ 1 người</span>
                            </div>
                            <div>
                                <BsFillPeopleFill className="text-darkGreen mr-1" />
                                <span>Số chỗ còn: {maxGroupSize} chỗ</span>
                            </div>
                            <div>
                                <FaCalendarAlt className="text-darkGreen mr-1" />
                                <span>
                                    Ngày khởi hành:{" "}
                                    {new Date(startDate).toLocaleDateString(
                                        "vi-VN"
                                    )}
                                </span>
                            </div>
                        </div>
                        <div className="mt-3">
                            <h5>Mô tả</h5>
                            <p className="text-sm">{desc}</p>
                        </div>
                    </div>
                    {/*Itinerary Section*/}
                    <div id="itinerary" className="detailContainer">
                        <h5 className="text-2xl flex items-center gap-2">
                            <BsCalendarCheck className="text-darkGreen" />
                            Lịch trình
                        </h5>

                        {/* Details */}
                        <div className="mt-4">
                            {itinerary?.details?.length > 0 ? (
                                itinerary.details.map((detail, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-2 mb-2 bg-lightGreen p-2 rounded-md shadow-sm"
                                    >
                                        <div>
                                            <p className="text-lg font-semibold text-darkGreen">
                                                {detail.time}
                                            </p>
                                            <p className="text-sm text-darkGray">
                                                {detail.description}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 italic">
                                    Chưa có lịch trình nào được cung cấp.
                                </p>
                            )}
                        </div>

                        {/* Notes */}
                        <div className="itinerary-notes mt-3">
                            <h4 className="text-xl font-semibold text-darkGreen flex items-center gap-2">
                                <BsExclamationCircleFill className="text-orange-500 text-2xl" />
                                Lưu ý:
                            </h4>
                            <ul className="list-none mt-3 pl-4 space-y-2">
                                {itinerary?.notes?.length > 0 ? (
                                    itinerary.notes.map((note, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-2 text-sm text-darkGray bg-lightYellow p-1 rounded-md"
                                        >
                                            <BsCheckCircle className="text-success text-lg flex-shrink-0" />
                                            {note}
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500 italic">
                                        Chưa có ghi chú nào được cung cấp.
                                    </p>
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* TourGuide Section */}
                    <div id="description" className="detailContainer">
                        <h5>Hướng dẫn viên du lịch</h5>
                        {tour?.guideId ? (
                            <>
                                <p className="">{tour.guideId.name}</p>
                                <div className="tourDetail mb-2">
                                    <div className="flex items-center">
                                        <BsFillStarFill className="text-yellow mr-1" />
                                        <span>
                                            {/* {guideReviews.length > 0
                        ? `${tour.guideId.avgRating || 0} (${guideReviews.length} đánh giá)`
                        : "Chưa có đánh giá"} */}
                                            {tour.guideId.avgRating}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <span>
                                        Năm sinh:{" "}
                                        {new Date(
                                            tour.guideId.dob
                                        ).getFullYear()}
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        Giới tính: {tour.guideId.gender}
                                    </span>
                                </div>
                            </>
                        ) : (
                            <p>Chưa có hướng dẫn viên cho tour này.</p>
                        )}
                    </div>

                    {/*Review Section*/}
                    <div id="comments" className="detailContainer">
                        <div className="flex items-center gap-2">
                            <h5>Đánh giá</h5>
                            <span className="text-sm">
                                ({reviews?.length} đánh giá)
                            </span>
                        </div>

                        {/*Tour reviews*/}
                        <div>
                            {reviews.length > 0
                                ? reviews.map((review, index) => (
                                      <div
                                          key={index}
                                          className="review-item mt-4"
                                      >
                                          <div className="flex justify-between text-sm">
                                              <div className="flex">
                                                  <CgProfile className="w-[40px] h-auto mr-2" />
                                                  <div className="flex flex-col">
                                                      <span className="font-bold">
                                                          {
                                                              review.userId
                                                                  .username
                                                          }
                                                      </span>
                                                      <span className="text-gray-400">
                                                          {new Date(
                                                              review.createdAt
                                                          ).toLocaleDateString(
                                                              "en-US",
                                                              options
                                                          )}
                                                      </span>
                                                  </div>
                                              </div>
                                              <div className="flex items-center text-yellow">
                                                  <span>
                                                      {review.ratingTour}
                                                  </span>
                                                  <BsFillStarFill className="ml-2" />
                                              </div>
                                          </div>
                                          <p className="mt-2">
                                              {review.commentTour}
                                          </p>
                                      </div>
                                  ))
                                : !loading && <p>Chưa có đánh giá nào.</p>}

                            {/* Pagination */}
                            <Pagination
                                page={page}
                                totalPages={totalPages}
                                setPage={setPage}
                            />
                        </div>
                    </div>
                </div>

                {/*Checkout*/}
                <Checkout
                    maxGroupSize={maxGroupSize}
                    title={title}
                    price={price}
                    reviews={reviews}
                    avgRating={avgRating}
                    tourId={id}
                />
            </div>
        </section>
    );
};

import Booking from "../models/Booking.js"

export const createBooking = async(req, res)=>{
    const newBooking = new Booking(req.body)
       try {
        const savedBooking = await newBooking.save()
        res.status(200).json({success:true, message:"Your tour has been booked", data:savedBooking})
        
    } catch (err) {
        res.status(500).json({success:false, message:"Internal server error"})
    }
}

//get single Booking
export const getBooking = async(req, res) =>{
    const id = req.params.id
    try {
        const book = await Booking.findById(id)
        res
        .status(200)
        .json({
            success:true,
            message:"successful",
            data:book
        })
    } catch (err) {
        res.status(404).json({success:false, message:"not found"})   
    }
}

//get all bookings
export const getAllBookings = async(req, res) =>{
    try {
        const bookings = await Booking.find()
        res
        .status(200)
        .json({
            success:true,
            message:"successful",
            data:bookings
        })
    } catch (err) {
        res.status(500).json({success:false, message:"internal server error"})   
    }
}
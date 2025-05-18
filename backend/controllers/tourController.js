import Tour from "../models/Tour.js";

//create new tour
export const createTour = async (req, res) => {
    const newTour = new Tour(req.body);

    try {
        const savedTour = await newTour.save();
        res.status(200).json({
            success: true,
            message: "Succesfully created",
            data: savedTour,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create. Try again",
        });
    }
};

//update tour
export const updateTour = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedTour = await Tour.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Succesfully updated",
            data: updatedTour,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update. Try again",
        });
    }
};

//delete tour
export const deleteTour = async (req, res) => {
    const id = req.params.id;

    try {
        await Tour.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Succesfully deleted",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete. Try again",
        });
    }
};

//get single tour
export const getSingleTour = async (req, res) => {
    const id = req.params.id;

    try {
        const tour = await Tour.findById(id);
        res.status(200).json({
            success: true,
            message: "Succesfully found",
            data: tour,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Tour not found",
        });
    }
};

//get all tours
export const getAllTours = async (req, res) => {
    try {
        const tours = await Tour.find({});
        res.status(200).json({
            success: true,
            message: "Thành công",
            data: tours,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Không tìm thấy tour nào",
        });
    }
};

//get tour by search
export const getTourBySearch = async (req, res) => {
    const city = new RegExp(req.query.city, "i");
    const maxGroupSize = parseInt(req.query.maxGroupSize);

    try {
        const tours = await Tour.find({
            city,
            maxGroupSize: { $gte: maxGroupSize },
        });
        res.status(200).json({
            success: true,
            message: "Succesfully found",
            data: tours,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Not found",
        });
    }
};

//get tour counts
export const getTourCount = async (req, res) => {
    try {
        const tourCount = await Tour.estimatedDocumentCount();
        res.status(200).json({
            success: true,
            message: "Succesfully found",
            data: tourCount,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Not found",
        });
    }
};

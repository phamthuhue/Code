import User from "../models/User.js";

//create new user
export const createUser = async (req, res) => {
    const newUser = new User(req.body);

    try {
        const savedUser = await newUser.save();
        res.status(200).json({
            success: true,
            message: "Succesfully created",
            data: savedUser,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create. Try again",
        });
    }
};

//update user
export const updateUser = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Succesfully updated",
            data: updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update. Try again",
        });
    }
};

//delete user
export const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        await User.findByIdAndDelete(id);
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

//get single user
export const getSingleUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);
        res.status(200).json({
            success: true,
            message: "Succesfully found",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User not found",
        });
    }
};

//get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({
            success: true,
            message: "Thành công",
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Không tìm thấy người dùng",
        });
    }
};

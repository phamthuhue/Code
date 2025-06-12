import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        yearob: { type: String },                          // NgaySinh
        address: { type: String },                    // DiaChi
        phone: { type: String },                      // SDT
        gender: { type: String, enum: ['Nam', 'Nữ', 'Khác'] }, // GioiTinh
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
        },
        resetPasswordToken: {
            type: String,
            default: null,
        },
        resetPasswordExpires: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

// ✅ Method: generate token reset password
userSchema.methods.createPasswordResetToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "10m",
    });
    this.resetPasswordToken = token;
    this.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
    return token;
};

export default mongoose.model("User", userSchema);

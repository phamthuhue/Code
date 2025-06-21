import Partner from '../models/Partner.js'
import Service from "../models/Service.js";

// Lấy danh sách tất cả đối tác
export const getPartners = async (req, res) => {
    try {
        const partners = await Partner.find()
            .populate("partnerTypeId", "name") // populate tên loại đối tác
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: partners });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi khi lấy danh sách đối tác",
            error,
        });
    }
};

// Lấy 1 đối tác theo ID
export const getPartnerById = async (req, res) => {
    try {
        const partner = await Partner.findById(req.params.id).populate(
            "partnerTypeId",
            "name"
        );
        if (!partner) {
            return res
                .status(404)
                .json({ success: false, message: "Không tìm thấy đối tác" });
        }
        res.status(200).json({ success: true, data: partner });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi khi lấy đối tác",
            error,
        });
    }
};

// Tạo mới đối tác
export const createPartner = async (req, res) => {
    try {
        const { name, address, phone, partnerTypeId } = req.body;
        const newPartner = await Partner.create({
            name,
            address,
            phone,
            partnerTypeId,
        });
        res.status(201).json(newPartner);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi khi tạo mới đối tác",
            error,
        });
    }
};

// Cập nhật đối tác
export const updatePartner = async (req, res) => {
    try {
        const { name, address, phone, partnerTypeId } = req.body;
        const updated = await Partner.findByIdAndUpdate(
            req.params.id,
            { name, address, phone, partnerTypeId },
            { new: true }
        ).populate("partnerTypeId", "name");

        if (!updated) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Không tìm thấy đối tác để cập nhật",
                });
        }
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi khi cập nhật đối tác",
            error,
        });
    }
};

// Xoá đối tác
export const deletePartner = async (req, res) => {
    const partnerId = req.params.id;

    try {
        // 1. Xoá tất cả dịch vụ của partner này
        await Service.deleteMany({ partnerId: partnerId });

        // 2. Xoá chính partner
        const deletedPartner = await Partner.findByIdAndDelete(partnerId);

        if (!deletedPartner) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy đối tác để xoá",
            });
        }

        res.status(200).json({
            success: true,
            message: "Xoá đối tác và tất cả dịch vụ liên quan thành công",
        });
    } catch (error) {
        console.error("Lỗi khi xoá đối tác:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi khi xoá đối tác và dịch vụ liên quan",
            error,
        });
    }
};
import PartnerType from '../models/PartnerType.js'

// Lấy tất cả loại đối tác
export const getPartnerTypes = async (req, res) => {
    try {
        const partnerTypes = await PartnerType.find();
        res.status(200).json({ success: true, data: partnerTypes });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi khi lấy danh sách loại đối tác",
            error,
        });
    }
};

// Lấy 1 loại đối tác theo ID
export const getPartnerTypeById = async (req, res) => {
    try {
        const partnerType = await PartnerType.findById(req.params.id);
        if (!partnerType) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Không tìm thấy loại đối tác",
                });
        }
        res.status(200).json({ success: true, data: partnerType });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi khi lấy loại đối tác",
            error,
        });
    }
};

// Thêm mới loại đối tác
export const createPartnerType = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newType = await PartnerType.create({ name, description });
        res.status(201).json(newType);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi khi thêm mới loại đối tác",
            error,
        });
    }
};

// Cập nhật loại đối tác
export const updatePartnerType = async (req, res) => {
    try {
        const { name, description } = req.body;
        const updated = await PartnerType.findByIdAndUpdate(
            req.params.id,
            { name, description },
            { new: true }
        );
        if (!updated) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Không tìm thấy loại đối tác để cập nhật",
                });
        }
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi khi cập nhật loại đối tác",
            error,
        });
    }
};

// Xóa loại đối tác
export const deletePartnerType = async (req, res) => {
    try {
        const deleted = await PartnerType.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Không tìm thấy loại đối tác để xóa",
                });
        }
        res.status(200).json({ success: true, message: "Xóa thành công" });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi khi xóa loại đối tác",
            error,
        });
    }
};

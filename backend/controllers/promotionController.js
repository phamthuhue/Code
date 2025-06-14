import Promotion from '../models/Promotion.js'

// [POST] Tạo khuyến mãi mới
export const createPromotion = async (req, res) => {
  try {
    const newPromo = new Promotion(req.body)
    const savedPromo = await newPromo.save()

    res.status(201).json({
      success: true,
      message: 'Tạo khuyến mãi thành công',
      data: savedPromo,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi tạo khuyến mãi',
      error: err.message,
    })
  }
}

// [GET] Lấy danh sách tất cả khuyến mãi
export const getAllPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find()
    res.status(200).json({
      success: true,
      data: promotions,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách khuyến mãi',
      error: err.message,
    })
  }
}

// [GET] Lấy thông tin khuyến mãi theo ID
export const getPromotionById = async (req, res) => {
  try {
    const promo = await Promotion.findById(req.params.id)
    if (!promo) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy khuyến mãi',
      })
    }

    res.status(200).json({
      success: true,
      data: promo,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy khuyến mãi',
      error: err.message,
    })
  }
}

// [PUT] Cập nhật khuyến mãi theo ID
export const updatePromotion = async (req, res) => {
  try {
    const updated = await Promotion.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy khuyến mãi để cập nhật',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Cập nhật thành công',
      data: updated,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật khuyến mãi',
      error: err.message,
    })
  }
}

// [DELETE] Xóa khuyến mãi theo ID
export const deletePromotion = async (req, res) => {
  try {
    const deleted = await Promotion.findByIdAndDelete(req.params.id)

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy khuyến mãi để xóa',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Xóa khuyến mãi thành công',
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa khuyến mãi',
      error: err.message,
    })
  }
}
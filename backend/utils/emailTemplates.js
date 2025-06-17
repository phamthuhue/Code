export const resetPasswordEmail = (resetUrl) => {
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #0d6efd;">Yêu cầu đặt lại mật khẩu</h2>
      <p>Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.</p>
      <p>Vui lòng nhấn vào nút bên dưới để thiết lập lại mật khẩu. Liên kết này sẽ <strong>hết hạn sau 3 phút</strong>.</p>
      <p style="text-align: center; margin: 20px 0;">
        <a href="${resetUrl}" style="background-color: #0d6efd; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          Đặt lại mật khẩu
        </a>
      </p>
      <p>Nếu bạn không yêu cầu hành động này, vui lòng bỏ qua email này.</p>
      <p>Trân trọng,<br/>Đội ngũ hỗ trợ Tour Booking</p>
    </div>
  `;

  const text = `Bạn vừa yêu cầu đặt lại mật khẩu.
Truy cập liên kết sau để tiếp tục (hết hạn sau 3 phút): ${resetUrl}`;

  return { html, text };
};

export const generateEmailHtml = (username, password) => {
  const html = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; padding: 20px; background-color: #f9f9f9; border-radius: 8px; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4CAF50; text-align: center;">Chào ${username},</h2>

      <p style="font-size: 16px;">Tài khoản của bạn đã được tạo thành công. Dưới đây là thông tin đăng nhập:</p>

      <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; background-color: #f2f2f2; font-weight: bold;">Tên đăng nhập:</td>
          <td style="padding: 8px;">${username}</td>
        </tr>
        <tr>
          <td style="padding: 8px; background-color: #f2f2f2; font-weight: bold;">Mật khẩu:</td>
          <td style="padding: 8px;">${password} <span style="color: #777;">(Lưu ý: Bạn có thể thay đổi mật khẩu sau lần đăng nhập đầu tiên.)</span></td>
        </tr>
      </table>

      <p style="font-size: 16px; margin-top: 20px;">Chúc bạn một ngày tuyệt vời và đừng ngần ngại liên hệ nếu có bất kỳ câu hỏi nào!</p>

      <p style="font-size: 16px;">Trân trọng,</p>
      <p style="font-size: 16px;">Đội ngũ Tour Booking</p>

      <div style="border-top: 1px solid #ccc; margin-top: 20px; padding-top: 20px; font-size: 14px; text-align: center; color: #777;">
        <p>Không muốn nhận email này? <a href="#" style="color: #4CAF50; text-decoration: none;">Hủy đăng ký</a></p>
      </div>
    </div>
  `;

  const text = `
    Chào ${username},

    Tài khoản của bạn đã được tạo thành công. Dưới đây là thông tin đăng nhập:
    
    Tên đăng nhập: ${username}
    Mật khẩu: ${password} (Lưu ý: Bạn có thể thay đổi mật khẩu sau lần đăng nhập đầu tiên.)
    
    Chúc bạn một ngày tuyệt vời và đừng ngần ngại liên hệ nếu có bất kỳ câu hỏi nào!

    Trân trọng,
    Đội ngũ Tour Booking
  `;

  return { html, text };
};

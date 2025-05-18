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

import { Alert } from "antd";

const ErrorMessage = () => {
  return (
    <Alert
      message="Đã xảy ra lỗi"
      description="Có lỗi xảy ra trong quá trình xử lý dữ liệu, vui lòng thử lại sau"
      type="error"
      showIcon
      className="w-full mt-3"
      closable
    />
  );
};

export default ErrorMessage;

import React, { useState } from "react";
import { Form, Input, DatePicker, Button, Row, Col, Select } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import BasePageContainer from "@/components/layout/pageContainer";
import { BreadcrumbProps, Space } from "antd";
import { webRoutes } from "@/routes/web";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import http from "@/lib/http";
import { fetchDrivers } from "@/store/slices/driverSlice";
import dayjs from "dayjs";
import ErrorMessage from "@/components/Alert/Error";
import { fetchContractors } from "@/store/slices/contractorSlice";

const { TextArea } = Input;
const { Option } = Select;

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Trang chủ</Link>,
    },
    {
      key: webRoutes.drivers,
      title: <Link to={webRoutes.drivers}>Tài xế</Link>,
    },
    {
      key: webRoutes.addNewDrivers,
      title: <Link to={webRoutes.addNewDrivers}>Thêm tài xế</Link>,
    },
  ],
};

const AddDriverForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const appDispatch = useDispatch<AppDispatch>();
  const [isError, setIsError] = useState(false);

  const contractors = useSelector(
    (state: RootState) => state.contractor.contractors
  );

  const handleSubmit = async (values: any) => {
    try {
      const payload = {
        ...values,
        issue_date: dayjs(values.issue_date),
        date_of_birth: dayjs(values.date_of_birth),
        license_expiry: dayjs(values.license_expiry),
      };
      setIsLoading(true);
      setIsError(false);
      const res = await http.post("/drivers", payload);
      if (res && res.data) {
        appDispatch(fetchDrivers());
        appDispatch(fetchContractors());
        navigate(webRoutes.drivers);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxWidth: 800, margin: "0 auto" }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Họ và tên"
              name="full_name"
              rules={[{ required: true, message: "Hãy nhập họ và tên!" }]}
            >
              <Input size="large" placeholder="Nhập họ và tên" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Số Điện Thoại"
              name="phone"
              rules={[
                { required: true, message: "Hãy nhập số điện thoại!" },
                { pattern: /^\d+$/, message: "Số điện thoại không hợp lệ!" },
              ]}
            >
              <Input size="large" placeholder="Nhập số điện thoại" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Căn cước công dân"
              name="cccd"
              rules={[{ required: true, message: "Hãy nhập CCCD!" }]}
            >
              <Input size="large" placeholder="Nhập số CCCD" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Ngày Cấp Căn Cước" name="issue_date">
              <DatePicker
                size="large"
                placeholder="Chọn ngày cấp"
                className="w-full"
                format="DD-MM-YYYY"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Ngày Sinh" name="date_of_birth">
              <DatePicker
                size="large"
                placeholder="Chọn ngày sinh"
                className="w-full"
                format="DD-MM-YYYY"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Quê Quán" name="address">
              <Input size="large" placeholder="Nhập quê quán" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Số Bằng Lái Xe"
              name="license_number"
              rules={[{ required: true, message: "Hãy nhập số bằng lái xe!" }]}
            >
              <Input size="large" placeholder="Nhập số bằng lái xe" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Ngày Hết Hạn Bằng Lái"
              name="license_expiry"
              rules={[{ required: true, message: "Hãy chọn ngày hết hạn!" }]}
            >
              <DatePicker
                size="large"
                placeholder="Chọn ngày hết hạn"
                className="w-full"
                format="DD-MM-YYYY"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Lương cứng (Nếu có)"
              name="fixed_salary"
              normalize={(value) => (value ? Number(value) : value)}
            >
              <Input
                size="large"
                type="number"
                placeholder="Nhập lương cứng nếu có"
                defaultValue={0}
                min={0}
                onWheel={(e) => e.currentTarget.blur()}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Nhà Thầu"
              name="contractor_id"
              rules={[{ required: true, message: "Hãy chọn nhà thầu!" }]}
            >
              <Select size="large" placeholder="Chọn nhà thầu">
                {contractors.map((contractor) => (
                  <Option key={contractor.id} value={contractor.id}>
                    {contractor.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item label="Ghi Chú" name="note">
              <TextArea
                size="large"
                placeholder="Nhập ghi chú (nếu có)"
                rows={2}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<PlusOutlined />}
                  loading={isLoading}
                  disabled={isLoading}
                >
                  Thêm tài xế
                </Button>
                <Button
                  type="default"
                  icon={<CloseOutlined />}
                  onClick={handleCancel}
                >
                  Thoát
                </Button>
              </Space>
              {isError && <ErrorMessage />}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </BasePageContainer>
  );
};

export default AddDriverForm;

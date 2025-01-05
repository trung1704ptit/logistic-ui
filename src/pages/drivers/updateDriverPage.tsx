import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Form, Input, DatePicker, Button, Row, Col, Select } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import BasePageContainer from "@/components/layout/pageContainer";
import { BreadcrumbProps, Space } from "antd";
import { webRoutes } from "@/routes/web";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import http from "@/lib/http";
import { fetchDrivers } from "@/store/slices/driverSlice";
import moment from "moment";
import ErrorMessage from "@/components/Alert/Error";
import { IDriver } from "@/interfaces/driver";
import { fetchContractors } from "@/store/slices/contractorSlice";
import { fetchTrucks } from "@/store/slices/truckSlice";

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
      title: <Link to={webRoutes.addNewDrivers}>Sửa tài xế</Link>,
    },
  ],
};

const EditDriverForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const driverId = params.get("id");

  const [isLoading, setIsLoading] = useState(false);
  const appDispatch = useDispatch<AppDispatch>();
  const [isError, setIsError] = useState(false);
  const [editingDriver, setEditingDriver] = useState<IDriver>();
  const contractors = useSelector(
    (state: RootState) => state.contractor.contractors
  );
  const drivers = useSelector((state: RootState) => state.driver.drivers);

  // Set form values once the driver data is available
  useEffect(() => {
    const driver = drivers?.find((driver) => driver.id === driverId);
    if (driver) {
      setEditingDriver(driver);
      form.setFieldsValue({
        full_name: driver.full_name,
        phone: driver.phone,
        cccd: driver.cccd,
        issue_date: dayjs(driver.issue_date),
        date_of_birth: dayjs(driver.date_of_birth),
        address: driver.address,
        license_number: driver.license_number,
        license_expiry: dayjs(driver.license_expiry),
        contractor_id: driver.contractor_id,
        note: driver.note,
      });
    } else {
      setIsError(true);
    }
  }, [driverId, drivers, form]);

  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await http.put(`/drivers/${driverId}`, values); // PUT request for update
      if (res && res.data) {
        appDispatch(fetchDrivers());
        appDispatch(fetchContractors());
        navigate(webRoutes.drivers);
      }
    } catch (error) {
      console.log(error)
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
              rules={[{ required: true, message: "Hãy nhập số điện thoại!" }]}
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
                defaultValue={moment(editingDriver?.issue_date)}
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
                rows={4}
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
                  Sửa tài xế
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

export default EditDriverForm;

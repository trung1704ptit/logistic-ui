import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Select } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import BasePageContainer from "@/components/layout/pageContainer";
import { BreadcrumbProps, Space } from "antd";
import { webRoutes } from "@/routes/web";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import http from "@/lib/http";
import ErrorMessage from "@/components/Alert/Error";
import { fetchTrucks } from "@/store/slices/truckSlice";
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
      key: webRoutes.trucks,
      title: <Link to={webRoutes.trucks}>Xe tải</Link>,
    },
    {
      key: webRoutes.addNewTruck,
      title: <Link to={webRoutes.addNewTruck}>Thêm xe tải</Link>,
    },
  ],
};

const AddTruckForm: React.FC = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const appDispatch = useDispatch<AppDispatch>();
  const [isError, setIsError] = useState(false);

  const contractorState = useSelector((state: RootState) => state.contractor);
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    try {
      const payload = {
        ...values,
        height: parseFloat(values.height),
        width: parseFloat(values.width),
        length: parseFloat(values.length),
        capacity: parseFloat(values.capacity),
        volume: parseFloat(values.volume),
      };
      setIsLoading(true);
      setIsError(false);
      const res = await http.post("/trucks", payload);
      if (res && res.data) {
        appDispatch(fetchTrucks());
        appDispatch(fetchContractors());
        navigate(webRoutes.trucks);
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
          <Col xs={24} sm={8}>
            <Form.Item
              label="Biển kiểm soát"
              name="license_plate"
              rules={[{ required: true, message: "Hãy nhập biển kiểm soát!" }]}
            >
              <Input size="large" placeholder="Nhập biển kiểm soát" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Tải trọng xe (T)"
              name="capacity"
              rules={[{ required: true, message: "Hãy nhập tải trọng xe!" }]}
            >
              <Input size="large" placeholder="Ví dụ 2.5" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={8}>
            <Form.Item
              label="Mét khối (m³)"
              name="volume"
              rules={[{ required: true, message: "Hãy nhập số khối!" }]}
            >
              <Input size="large" placeholder="Nhập thể tích" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={8}>
            <Form.Item
              label="Dài (m)"
              name="length"
            >
              <Input size="large" placeholder="Nhập chiều dài" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Rộng (m)"
              name="width"
            >
              <Input size="large" placeholder="Nhập chiều rộng" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Cao (m)"
              name="height"
            >
              <Input size="large" placeholder="Nhập chiều cao" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Thương hiệu xe"
              name="brand"
            >
              <Input size="large" placeholder="Ví dụ Huyndai" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Nhà thầu"
              name="contractor_id"
              rules={[{ required: true, message: "Hãy chọn nhà thầu!" }]}
            >
              <Select size="large" placeholder="Chọn nhà thầu">
                {contractorState.contractors.map((contractor) => (
                  <Option value={contractor.id} key={contractor.id}>
                    {contractor.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label="Ghi chú" name="note">
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
                  className="shadow-none"
                  icon={<PlusOutlined />}
                  loading={isLoading}
                  disabled={isLoading}
                >
                  Thêm xe tải
                </Button>
                <Button
                  type="default"
                  className="shadow-none"
                  icon={<CloseOutlined />}
                  onClick={handleCancel}
                >
                  Thoát
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

export default AddTruckForm;

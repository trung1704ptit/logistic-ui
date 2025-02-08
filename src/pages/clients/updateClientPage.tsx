import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, Select } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import BasePageContainer from "@/components/layout/pageContainer";
import { BreadcrumbProps, Space } from "antd";
import { webRoutes } from "@/routes/web";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import http from "@/lib/http";
import ErrorMessage from "@/components/Alert/Error";
import { fetchClients } from "@/store/slices/clientSlice";
import { fetchContractors } from "@/store/slices/contractorSlice";
import { apiRoutes } from "@/routes/api";

const { TextArea } = Input;
const { Option } = Select;

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Trang chủ</Link>,
    },
    {
      key: webRoutes.clients,
      title: <Link to={webRoutes.clients}>Nhãn hàng</Link>,
    },
    {
      key: webRoutes.addNewTruck,
      title: <Link to={webRoutes.addNewTruck}>Cập nhật nhãn hàng</Link>,
    },
  ],
};

const UpdateTruckForm: React.FC = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const appDispatch = useDispatch<AppDispatch>();
  const [isError, setIsError] = useState(false);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const clientId = params.get("id");
  const contractors = useSelector(
    (state: RootState) => state.contractor.contractors
  );
  const clients = useSelector((state: RootState) => state.client.clients);
  const navigate = useNavigate();

  useEffect(() => {
    const client = clients?.find((item) => item.id === clientId);
    if (client) {
      form.setFieldsValue(client);
    } else {
      setIsError(true);
    }
  }, [clientId, clients, form]);

  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await http.put(`${apiRoutes.clients}/${clientId}`, values); // Use PUT for update
      if (res && res.data) {
        appDispatch(fetchContractors());
        appDispatch(fetchClients());
        navigate(webRoutes.clients);
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
              label="Tên nhãn hàng"
              name="name"
              rules={[{ required: true, message: "Hãy nhập tên nhãn hàng!" }]}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Địa chỉ" name="address">
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Số điện thoại" name="height">
              <Input size="large" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Nhà thầu"
              name="contractor_id"
              rules={[{ required: true, message: "Hãy chọn nhà thầu!" }]}
            >
              <Select size="large" placeholder="Chọn nhà thầu">
                {contractors.map((contractor) => (
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
                  Cập nhật xe tải
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

export default UpdateTruckForm;

import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import BasePageContainer from "@/components/layout/pageContainer";
import { BreadcrumbProps, Space, Modal, Card } from "antd";
import { webRoutes } from "@/routes/web";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";

import { ProTable, ProColumns, RequestData } from "@ant-design/pro-components";
import { removeVietnameseTones } from "@/lib/utils";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { IContractor } from "@/interfaces/contractor";
import http from "@/lib/http";
import { ITruck } from "@/interfaces/truck";
import ErrorMessage from "@/components/Alert/Error";
import { fetchContractors } from "@/store/slices/contractorSlice";

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
      key: webRoutes.updateContractors,
      title: <Link to={webRoutes.updateContractors}>Cập nhật nhãn hàng</Link>,
    },
  ],
};

const ContractorForm: React.FC = () => {
  const [form] = Form.useForm();
  const [editingContractor, setEditingClient] = useState<IContractor>();
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const clients = useSelector((state: RootState) => state.client.clients);
  const trucks = useSelector((state: RootState) => state.truck.trucks);

  const [searchTruckTerm, setSearchTruckTerm] = useState("");
  const [filteredTruckList, setFilteredTruckList] = useState<ITruck[]>([]);

  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isUpdateError, setIsUpdateError] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (clients) {
      const contractorId = params.get("id");
      const contractor: IContractor | undefined = clients.find(
        (item) => item.id === contractorId
      );
      if (contractor && contractor.id !== editingContractor?.id) {
        setEditingClient(contractor);
        form.setFieldsValue(contractor);
      }
    }
  }, [clients, params]);

  const handleSearchTruck = (searchTerm: string) => {
    const normalizedSearchTerm = removeVietnameseTones(
      searchTruckTerm.toLowerCase()
    );

    const filtered = trucks.filter((truck: any) =>
      Object.keys(truck).some((key) =>
        removeVietnameseTones(String(truck[key]))
          .toLowerCase()
          .includes(normalizedSearchTerm)
      )
    );

    setFilteredTruckList(filtered);
  };

  const handleSubmit = async (contractor: IContractor) => {
    if (editingContractor) {
      try {
        setIsUpdateLoading(true);
        setIsUpdateError(false);
        const res = await http.put(
          `/clients/${editingContractor.id}`,
          contractor
        );
        if (res && res.data) {
          dispatch(fetchContractors());
          navigate(webRoutes.clients);
        }
      } catch (error) {
        setIsUpdateError(true);
      } finally {
        setIsUpdateLoading(false);
      }
    }
  };

  const handleCancel = () => {
    navigate(webRoutes.clients);
  };

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ maxWidth: 800, margin: "0 auto" }}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Tên nhãn hàng"
                name="name"
                rules={[{ required: true, message: "Hãy nhập tên nhãn hàng!" }]}
              >
                <Input placeholder="Nhập tên nhãn hàng" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  { required: true, message: "Hãy nhập số điện thoại!" },
                  { pattern: /^\d+$/, message: "Số điện thoại không hợp lệ!" },
                ]}
              >
                <Input placeholder="Nhập số điện thoại" size="large" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: "Hãy nhập địa chỉ!" }]}
              >
                <Input.TextArea placeholder="Nhập địa chỉ" rows={2} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Ghi chú" name="note">
                <Input.TextArea placeholder="Nhập ghi chú (nếu có)" rows={2} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Cập nhật nhãn hàng
              </Button>
              <Button
                type="default"
                icon={<CloseOutlined />}
                onClick={handleCancel}
                loading={isUpdateLoading}
                disabled={isUpdateLoading}
              >
                Thoát
              </Button>
            </Space>
            {isUpdateError && <ErrorMessage />}
          </Form.Item>
        </Form>
      </Card>
    </BasePageContainer>
  );
};

export default ContractorForm;

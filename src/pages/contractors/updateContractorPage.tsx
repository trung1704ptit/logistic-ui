import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, Upload, Divider } from "antd";
import BasePageContainer from "@/components/layout/pageContainer";
import { BreadcrumbProps, Space, Card } from "antd";
import { webRoutes } from "@/routes/web";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import { handleUploadDriverAndTruck } from "@/lib/utils";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { IContractor } from "@/interfaces/contractor";
import http from "@/lib/http";
import { ITruck } from "@/interfaces/truck";
import { IDriver } from "@/interfaces/driver";
import ErrorMessage from "@/components/Alert/Error";
import { fetchContractors } from "@/store/slices/contractorSlice";
import { BsFileEarmarkExcel } from "react-icons/bs";
import DriverList from "@/components/driverList";
import TruckList from "@/components/truckList";

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Trang chủ</Link>,
    },
    {
      key: webRoutes.contractors,
      title: <Link to={webRoutes.contractors}>Nhà thầu</Link>,
    },
    {
      key: webRoutes.updateContractors,
      title: <Link to={webRoutes.updateContractors}>Cập nhật nhà thầu</Link>,
    },
  ],
};

const ContractorForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [selectedContractor, setSelectedContractor] = useState<IContractor>();
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const contractors = useSelector(
    (state: RootState) => state.contractor.contractors
  );
  const contractorId = params.get("id");
  const [filteredDriverList, setFilteredDriverList] = useState<IDriver[]>([]);

  const [filteredTruckList, setFilteredTruckList] = useState<ITruck[]>([]);

  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isUpdateError, setIsUpdateError] = useState(false);
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    if (contractors) {
      const contractor: IContractor | undefined = contractors.find(
        (item) => item.id === contractorId
      );
      if (contractor) {
        setLoading(false);
        setSelectedContractor(contractor);
        setFilteredDriverList(contractor?.drivers || []);
        setFilteredTruckList(contractor?.trucks || []);
        form.setFieldsValue(contractor);
      }
    }
  }, [contractorId, contractors]);

  const handleSubmit = async (payload: IContractor) => {
    if (selectedContractor) {
      try {
        setIsUpdateLoading(true);
        setIsUpdateError(false);
        const res = await http.put(
          `/contractors/${selectedContractor.id}`,
          payload
        );
        if (res && res.data) {
          dispatch(fetchContractors());
          navigate(webRoutes.contractors);
        }
      } catch (error) {
        setIsUpdateError(true);
      } finally {
        setIsUpdateLoading(false);
      }
    }
  };

  const handleCancel = () => {
    navigate(webRoutes.contractors);
  };

  return (
    <BasePageContainer breadcrumb={breadcrumb} loading={loading}>
      <Card>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col xs={24} sm={12} lg={8} xl={6}>
              <Form.Item
                label="Tên nhà thầu"
                name="name"
                rules={[{ required: true, message: "Hãy nhập tên nhà thầu!" }]}
              >
                <Input placeholder="Nhập tên nhà thầu" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={8} xl={6}>
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
            <Col xs={24} sm={12} lg={8} xl={6}>
              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: "Hãy nhập địa chỉ!" }]}
              >
                <Input.TextArea placeholder="Nhập địa chỉ" rows={2} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} lg={8} xl={6}>
              <Form.Item label="Ghi chú" name="note">
                <Input.TextArea placeholder="Nhập ghi chú (nếu có)" rows={2} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Cập nhật nhà thầu
              </Button>
              <Upload
                name="avatar"
                className="avatar-uploader m-3 cursor-pointer"
                customRequest={({ file }: any) => {
                  setLoading(true);
                  handleUploadDriverAndTruck(
                    file,
                    selectedContractor?.id as string
                  ).then(() => {
                    setLoading(false);
                  });
                }}
                showUploadList={false}
                accept=".xlsx,.xls"
              >
                <Button type="default" icon={<BsFileEarmarkExcel />}>
                  Tải lên xe tải & tài xế
                </Button>
              </Upload>

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

      <div className="mt-6"></div>
      <DriverList drivers={filteredDriverList} contractorId={contractorId} />

      <Divider />

      <TruckList trucks={filteredTruckList} contractorId={contractorId} />
    </BasePageContainer>
  );
};

export default ContractorForm;

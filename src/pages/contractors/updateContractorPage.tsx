import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, Upload, message } from "antd";
import BasePageContainer from "@/components/layout/pageContainer";
import { BreadcrumbProps, Space, Modal, Card } from "antd";
import { webRoutes } from "@/routes/web";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import dayjs from "dayjs";
import { ProTable, ProColumns, RequestData } from "@ant-design/pro-components";
import { PlusOutlined } from "@ant-design/icons";
import {
  findSheetByName,
  handleUploadDriverAndTruck,
  parseExcelFileMultipleSheets,
  removeVietnameseTones,
} from "@/lib/utils";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { IContractor } from "@/interfaces/contractor";
import http from "@/lib/http";
import { ITruck } from "@/interfaces/truck";
import { IDriver } from "@/interfaces/driver";
import moment from "moment";
import ErrorMessage from "@/components/Alert/Error";
import { fetchContractors } from "@/store/slices/contractorSlice";
import { BsFileEarmarkExcel } from "react-icons/bs";
import { apiRoutes } from "@/routes/api";
import { fetchTrucks } from "@/store/slices/truckSlice";
import { fetchDrivers } from "@/store/slices/driverSlice";

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
  const drivers = useSelector((state: RootState) => state.driver.drivers);
  const trucks = useSelector((state: RootState) => state.truck.trucks);
  const contractorId = params.get("id");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDriverList, setFilteredDriverList] = useState<IDriver[]>([]);

  const [searchTruckTerm, setSearchTruckTerm] = useState("");
  const [filteredTruckList, setFilteredTruckList] = useState<ITruck[]>([]);

  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isUpdateError, setIsUpdateError] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const handleEditTruck = (truck: any) => {
    navigate(`${webRoutes.updateTruck}?id=${truck.id}`);
  };

  const handleDeleteTruck = (truck: any) => {
    Modal.confirm({
      title: "Xác nhận xóa xe tải",
      content: `Bạn có chắc muốn xóa xe tải ${truck.plateNumber}?`,
      onOk: () => {
        console.log("Deleted truck:", truck);
      },
    });
  };

  const truckColumns: ProColumns[] = [
    {
      title: "Biển Kiểm Soát",
      dataIndex: "license_plate",
      sorter: false,
      align: "center",
      ellipsis: true,
    },
    {
      title: "Tải Trọng",
      dataIndex: "capacity",
      sorter: false,
      align: "center",
      ellipsis: true,
      render: (_, row) => `${row.capacity} T`,
    },
    {
      title: "Dài",
      dataIndex: "length",
      sorter: false,
      align: "center",
      render: (_, row) => `${row.length} m`,
    },
    {
      title: "Rộng",
      dataIndex: "width",
      sorter: false,
      align: "center",
      render: (_, row) => `${row.width} m`,
    },
    {
      title: "Cao",
      dataIndex: "height",
      sorter: false,
      align: "center",
      render: (_, row) => `${row.height} m`,
    },
    {
      title: "Thể Tích",
      dataIndex: "volume",
      sorter: false,
      align: "center",
      render: (_, row) => `${row.volume} m³`,
    },
    {
      title: "Thương hiệu",
      dataIndex: "brand",
      sorter: false,
      align: "center",
    },
    {
      title: "Nhà Thầu",
      dataIndex: "contractor_id",
      sorter: false,
      align: "center",
      render: (_, row) => {
        const contractor = contractors?.find(
          (contractor) => contractor.id === row.contractor_id
        );
        return contractor ? contractor.name : undefined;
      },
    },
    {
      title: "Ghi Chú",
      dataIndex: "note",
      sorter: false,
      align: "center",
    },
    {
      title: "Hành động",
      align: "center",
      key: "actions",
      render: (_, row) => (
        <Space>
          <Button type="dashed" onClick={() => handleEditTruck(row)}>
            Xem Chi Tiết
          </Button>
          <Button danger onClick={() => handleDeleteTruck(row)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    if (contractors) {
      const contractor: IContractor | undefined = contractors.find(
        (item) => item.id === contractorId
      );
      if (contractor && contractor.id !== selectedContractor?.id) {
        setLoading(false);
        setSelectedContractor(contractor);
        setFilteredDriverList(contractor?.drivers || []);
        setFilteredTruckList(contractor?.trucks || []);
        form.setFieldsValue(contractor);
      }
    }
  }, [contractors, contractorId]);

  const handleSearchTruck = (_: string) => {
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
    if (selectedContractor) {
      try {
        setIsUpdateLoading(true);
        setIsUpdateError(false);
        const res = await http.put(
          `/contractors/${selectedContractor.id}`,
          contractor
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

  // Handle driver edit
  const handleEditDriver = (driver: IDriver) => {
    navigate(`${webRoutes.updateDrivers}?id=${driver.id}`);
  };

  // Handle driver deletion
  const handleDeleteDriver = (driver: IDriver) => {
    Modal.confirm({
      title: "Xác nhận xóa tài xế",
      content: `Bạn có chắc muốn xóa tài xế ${driver.full_name}?`,
      onOk: () => {
        console.log("Deleted driver:", driver.full_name);
      },
    });
  };

  const driverColumns: ProColumns[] = [
    {
      title: "Họ và Tên",
      dataIndex: "full_name",
      sorter: false,
      align: "center",
      ellipsis: true,
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phone",
      sorter: false,
      align: "center",
      ellipsis: true,
    },
    {
      title: "Căn Cước Công Dân",
      dataIndex: "cccd",
      sorter: false,
      align: "center",
    },
    {
      title: "Ngày Cấp",
      dataIndex: "issue_date", // Date string 'YYYY-MM-DD'
      sorter: true,
      align: "center",
      render: (_, row) => moment(row.issue_date).format("DD-MM-YYYY"), // Render the string directly
    },
    {
      title: "Ngày Sinh",
      dataIndex: "date_of_birth", // Date string 'YYYY-MM-DD'
      sorter: false,
      align: "center",
      render: (_, row) => moment(row.date_of_birth).format("DD-MM-YYYY"), // Render the string directly
    },
    {
      title: "Địa Chỉ",
      dataIndex: "address",
      sorter: false,
      align: "center",
    },
    {
      title: "Số Bằng Lái",
      dataIndex: "license_number",
      sorter: false,
      align: "center",
    },
    {
      title: "Ngày Hết Hạn Bằng Lái",
      dataIndex: "license_expiry", // Date string 'YYYY-MM-DD'
      sorter: false,
      align: "center",
      render: (_, row) => moment(row.license_expiry).format("DD-MM-YYYY"), // Render the string directly
    },
    {
      title: "Loại Tài Xế",
      dataIndex: "contractor_id",
      align: "center",
      render: (_, row) => {
        const contractor = contractors?.find(
          (contractor) => contractor.id === row.contractor_id
        );
        return contractor ? contractor.name : undefined;
      },
    },
    {
      title: "Ghi Chú",
      dataIndex: "note",
      align: "center",
    },
    {
      title: "Hành động",
      align: "center",
      key: "actions",
      render: (_, row) => (
        <Space>
          <Button type="dashed" onClick={() => handleEditDriver(row)}>
            Sửa
          </Button>
          <Button danger onClick={() => handleDeleteDriver(row)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  // Example search function
  const handleSearchDriver = (searchTerm: string) => {
    const normalizedSearchTerm = removeVietnameseTones(
      searchTerm.toLowerCase()
    );

    const filtered = drivers.filter((driver: any) =>
      Object.keys(driver).some((key) =>
        removeVietnameseTones(String(driver[key]))
          .toLowerCase()
          .includes(normalizedSearchTerm)
      )
    );

    setFilteredDriverList(filtered);
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
                  setLoading(true)
                  handleUploadDriverAndTruck(
                    file,
                    selectedContractor?.id as string
                  ).then(() => {
                    setLoading(false)
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

      <ProTable
        columns={truckColumns}
        cardBordered={true}
        cardProps={{
          title: <Title level={5}>Danh sách xe tải</Title>,
          extra: (
            <Space>
              <Input
                placeholder="Tìm kiếm xe tải..."
                value={searchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchTruckTerm(value);
                  handleSearchTruck(value);
                }}
                style={{ minWidth: "10%" }}
              />
              <Link to={webRoutes.addNewTruck}>
                <Button type="primary" icon={<PlusOutlined />}>
                  Thêm xe tải
                </Button>
              </Link>
            </Space>
          ),
        }}
        bordered={true}
        showSorterTooltip={false}
        scroll={{ x: true }}
        tableLayout={"fixed"}
        rowSelection={false}
        pagination={{
          showQuickJumper: true,
          pageSize: 200,
        }}
        request={async (params) => {
          const data = filteredTruckList.slice(
            ((params?.current ?? 1) - 1) * (params?.pageSize ?? 10),
            (params?.current ?? 1) * (params?.pageSize ?? 10)
          );
          return {
            data,
            success: true,
            total: filteredTruckList.length,
          } as RequestData<(typeof trucks)[0]>;
        }}
        dataSource={filteredTruckList}
        dateFormatter="string"
        rowKey="id"
        search={false}
        size="small"
      />

      <div className="mt-6"></div>

      <ProTable
        columns={driverColumns}
        cardBordered={true}
        cardProps={{
          title: <Title level={5}>Danh sách tài xế</Title>,
          extra: (
            <Space>
              <Input
                placeholder="Tìm kiếm tài xế..."
                value={searchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchTerm(value);
                  handleSearchDriver(value);
                }}
                style={{ minWidth: "15%" }}
              />
              <Link to={webRoutes.addNewDrivers}>
                <Button type="primary" icon={<PlusOutlined />}>
                  Thêm tài xế
                </Button>
              </Link>
            </Space>
          ),
        }}
        bordered={true}
        showSorterTooltip={false}
        scroll={{ x: true }}
        tableLayout={"fixed"}
        pagination={{
          showQuickJumper: true,
          pageSize: 200,
        }}
        dataSource={filteredDriverList}
        dateFormatter="string"
        rowKey="id"
        search={false}
        size="small"
      />
    </BasePageContainer>
  );
};

export default ContractorForm;

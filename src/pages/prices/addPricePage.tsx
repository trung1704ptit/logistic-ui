import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Select, Space, Divider } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import BasePageContainer from "@/components/layout/pageContainer";
import { webRoutes } from "@/routes/web";
import { Link, useNavigate } from "react-router-dom";
import { contractors } from "@/__mocks__";
import {  District, provinceList } from "@/lib/provinces";
import { searchByLabel } from "@/lib/utils";

const { Option } = Select;
const { TextArea } = Input;

const AddDriverForm: React.FC = () => {
  const [form] = Form.useForm();
  const [pickupDistricts, setPickupDistricts] = useState<District[]>([]);
  const [deliveryDistricts, setDeliveryDistricts] = useState<District[]>([]);
  const [priceType, setPriceType] = useState<string>("");
  const navigate = useNavigate();

  const truckWeights = [
    { value: "1.25T", label: "1.25T" },
    { value: "1.5T", label: "1.5T" },
    { value: "2.5T", label: "2.5T" },
    { value: "3.5T", label: "3.5T" },
    { value: "5T", label: "5T" },
    { value: "8T", label: "8T" },
    { value: "10T", label: "10T" },
    { value: "13T", label: "13T" },
    { value: "15T", label: "15T" },
  ];

  const breadcrumb = {
    items: [
      {
        key: webRoutes.dashboard,
        title: <Link to={webRoutes.dashboard}>Trang chủ</Link>,
      },
      {
        key: webRoutes.drivers,
        title: <Link to={webRoutes.drivers}>Bảng giá</Link>,
      },
      {
        key: webRoutes.addNewDrivers,
        title: <Link to={webRoutes.addNewDrivers}>Thêm giá</Link>,
      },
    ],
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleFormChange = (changedValues: any) => {
    if (changedValues.priceType) {
      setPriceType(changedValues.priceType);
      if (changedValues.priceType === "internal") {
        form.setFieldsValue({ contractor: undefined });
      }
    }
  };

  const handleProvinceChange = (value: string, field: string) => {
    const selectedProvince = provinceList.find(
      (province) => province.Code === value
    );
    if (selectedProvince) {
      const districts = selectedProvince.District;
      if (field === "pickupProvince") {
        setPickupDistricts(districts);
      } else {
        setDeliveryDistricts(districts);
      }
      form.setFieldsValue({
        [field === "pickupProvince" ? "pickupDistrict" : "deliveryDistrict"]:
          undefined,
      });
    }
  };

  const handleSubmit = (values: any) => {
    console.log("Submitted values:", values);
  };

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        onValuesChange={handleFormChange}
        style={{ maxWidth: 1024, margin: "0 auto" }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Loại Giá"
              name="priceType"
              rules={[{ required: true, message: "Hãy chọn loại giá!" }]}
            >
              <Select size="large" placeholder="Chọn loại giá">
                <Option value="internal">Nội bộ</Option>
                <Option value="contractor">Nhà thầu</Option>
              </Select>
            </Form.Item>
          </Col>

          {priceType === "contractor" && (
            <Col xs={24} sm={12}>
              <Form.Item
                label="Nhà Thầu"
                name="contractor"
                rules={[{ required: true, message: "Hãy chọn nhà thầu!" }]}
              >
                <Select
                  size="large"
                  placeholder="Chọn nhà thầu"
                  showSearch
                  filterOption={searchByLabel}
                >
                  {contractors.map((contractor) => (
                    <Option key={contractor.id} value={contractor.id}>
                      {contractor.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          )}

          <Divider />

          <Col xs={24} sm={12}>
            <Form.Item
              label="Điểm đóng hàng"
              name="pickupProvince"
              rules={[{ required: true, message: "Hãy chọn tỉnh/thành phố!" }]}
            >
              <Select
                size="large"
                placeholder="Chọn tỉnh/thành phố"
                filterOption={searchByLabel}
                showSearch
                onChange={(value) =>
                  handleProvinceChange(value, "pickupProvince")
                }
              >
                {provinceList.map((province) => (
                  <Option key={province.Code} value={province.Code}>
                    {province.FullName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="pickupDistrict">
              <Select
                size="large"
                placeholder="Chọn quận/huyện"
                showSearch
                filterOption={searchByLabel}
              >
                {pickupDistricts.map((district) => (
                  <Option key={district.Code} value={district.Code}>
                    {district.FullName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Điểm trả hàng"
              name="deliveryProvince"
              rules={[{ required: true, message: "Hãy chọn tỉnh/thành phố!" }]}
            >
              <Select
                size="large"
                showSearch
                placeholder="Chọn tỉnh/thành phố"
                filterOption={searchByLabel}
                onChange={(value) =>
                  handleProvinceChange(value, "deliveryProvince")
                }
              >
                {provinceList.map((province) => (
                  <Option key={province.Code} value={province.Code}>
                    {province.FullName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="deliveryDistrict">
              <Select
                size="large"
                placeholder="Chọn quận/huyện"
                showSearch
                filterOption={searchByLabel}
              >
                {deliveryDistricts.map((district) => (
                  <Option key={district.Code} value={district.Code}>
                    {district.FullName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Trọng tải động */}
          <Col xs={24}>
            <Form.Item required>
              <Form.List name="truckWeights" initialValue={truckWeights}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Row
                        key={key}
                        gutter={[8, 8]}
                        align="middle"
                        style={{
                          marginBottom: "10px",
                          borderBottom: "1px solid #f1f1f1",
                        }}
                      >
                        {/* Trọng tải */}
                        <Col xs={24} md={6}>
                          <Form.Item
                            {...restField}
                            label="Tải trọng"
                            name={[name, "value"]}
                            initialValue={
                              truckWeights.find(
                                (weight) => weight.value === restField?.value
                              )?.value
                            }
                            rules={[
                              {
                                required: true,
                                message: "Hãy nhập trọng tải!",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Trọng tải (VD: 1.25T)"
                              size="large"
                            />
                          </Form.Item>
                        </Col>

                        {/* Theo tấn */}
                        <Col xs={24} md={6}>
                          <Form.Item
                            {...restField}
                            label="Giá Theo tấn"
                            name={[name, "price_tons"]}
                            rules={[
                              {
                                required: true,
                                message: "Hãy nhập giá theo tấn!",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Theo tấn (VD: 1000000)"
                              size="large"
                            />
                          </Form.Item>
                        </Col>

                        {/* Theo khối */}
                        <Col xs={24} md={6}>
                          <Form.Item
                            {...restField}
                            label="Giá Theo khối"
                            name={[name, "price_volume"]}
                            rules={[
                              {
                                required: true,
                                message: "Hãy nhập giá theo khối!",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Theo khối (VD: 1000000)"
                              size="large"
                            />
                          </Form.Item>
                        </Col>

                        {/* Ghi chú */}
                        <Col xs={24} md={4}>
                          <Form.Item
                            {...restField}
                            label="Ghi chú"
                            name={[name, "note"]}
                          >
                            <Input.TextArea
                              placeholder="Nhập ghi chú"
                              rows={1}
                              size="large"
                            />
                          </Form.Item>
                        </Col>

                        {/* Nút xóa */}
                        <Col xs={24} md={2}>
                          <Button
                            onClick={() => remove(name)}
                            size="large"
                            type="dashed"
                          >
                            Xóa
                          </Button>
                        </Col>
                      </Row>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                        block
                      >
                        Thêm giá khác
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form.Item>
          </Col>

          {/* Các trường ghi chú */}
          <Col xs={24}>
            <Form.Item label="Ghi chú" name="note">
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
                >
                  Lưu thông tin
                </Button>
                <Button
                  type="default"
                  icon={<CloseOutlined />}
                  onClick={handleCancel}
                >
                  Thoát
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </BasePageContainer>
  );
};

export default AddDriverForm;

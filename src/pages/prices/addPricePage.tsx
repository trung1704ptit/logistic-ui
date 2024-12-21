import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, Select, Space } from "antd";
import {
  PlusOutlined,
  CloseOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import BasePageContainer from "@/components/layout/pageContainer";
import { BreadcrumbProps } from "antd";
import { webRoutes } from "@/routes/web";
import { Link, useNavigate } from "react-router-dom";
import { District, provinceList } from "@/lib/provinces";

const { TextArea } = Input;
const { Option } = Select;

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

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Trang chủ</Link>,
    },
    {
      key: webRoutes.drivers,
      title: <Link to={webRoutes.drivers}>Tài xế</Link>,
    },
    {
      key: webRoutes.addNewDrivers,
      title: <Link to={webRoutes.addNewDrivers}>Thêm tài xế</Link>,
    },
  ],
};

const AddDriverForm: React.FC = () => {
  const [form] = Form.useForm();
  const [pickupDistricts, setPickupDistricts] = useState<District[]>([]);
  const [deliveryDistricts, setDeliveryDistricts] = useState<District[]>([]);
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  const handleProvinceChange = (value: string, field: string) => {
    const selectedProvince = provinceList.find((province) => province.Code === value);
    if (selectedProvince) {
      const districts = selectedProvince.District;
      if (field === "pickupProvince") {
        setPickupDistricts(districts);
      } else {
        setDeliveryDistricts(districts);
      }
      form.setFieldsValue({ [field === "pickupProvince" ? "pickupDistrict" : "deliveryDistrict"]: undefined });
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
        style={{ maxWidth: 800, margin: "0 auto" }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Điểm đóng hàng"
              name="pickupProvince"
              rules={[{ required: true, message: "Hãy chọn tỉnh/thành phố!" }]}
            >
              <Select
                size="large"
                placeholder="Chọn tỉnh/thành phố"
                filterOption={(input, option) => {
                  if (option && option.children) {
                    return `${option.children}`.toLowerCase().includes(input.toLowerCase());
                  }
                  return false;
                }}
                showSearch
                onChange={(value) => handleProvinceChange(value, "pickupProvince")}
              >
                {provinceList.map((province) => (
                  <Option key={province.Code} value={province.Code}>
                    {province.FullName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            
            <Form.Item
              name="pickupDistrict"
            >
              <Select size="large" placeholder="Chọn quận/huyện" showSearch>
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
                onChange={(value) => handleProvinceChange(value, "deliveryProvince")}
              >
                {provinceList.map((province) => (
                  <Option key={province.Code} value={province.Code}>
                    {province.FullName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="deliveryDistrict"
            >
              <Select size="large" placeholder="Chọn quận/huyện" showSearch>
                {deliveryDistricts.map((district) => (
                  <Option key={district.Code} value={district.Code}>
                    {district.FullName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item label="Trọng tải" required>
              {truckWeights.map((weight) => (
                <Form.Item
                  key={weight.value}
                  name={`price_${weight.value}`}
                  label={weight.label}
                  style={{
                    display: "inline-block",
                    width: "calc(25% - 8px)",
                    marginRight: 8,
                  }}
                >
                  <Input size="large" placeholder="Nhập giá" />
                </Form.Item>
              ))}
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.List name="truckWeights">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Space
                      key={name} // Use 'name' as the key instead of 'key'
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "weight"]}
                        // fieldKey is removed, use name as the key
                        rules={[
                          { required: true, message: "Hãy nhập trọng tải!" },
                        ]}
                      >
                        <Input placeholder="Trọng tải (VD: 1.25T)" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "price"]}
                        // fieldKey is removed, use name as the key
                        rules={[{ required: true, message: "Hãy nhập giá!" }]}
                      >
                        <Input placeholder="Giá (VD: 1000000)" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
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
          </Col>

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
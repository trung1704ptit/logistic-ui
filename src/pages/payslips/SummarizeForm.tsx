import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Space,
  Typography,
} from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const { Text } = Typography;

const SummarizeForm = (props: any) => {
  const [total, setTotal] = useState(0);

  try {
    const [form] = Form.useForm();
    const handleSubmit = () => {};
    if (!props.data) {
      return null;
    }

    const onFieldsChange = (_: any, allFields: any) => {
      const sum = allFields.reduce((acc: number, current: any) => acc + (current.value || 0), 0);
      const totalSalary = props.data.total_salary + sum + props.data.driver.fixed_salary;
      setTotal(totalSalary)
    };

    useEffect(() => {
      const allFields = form.getFieldsValue();
      const sum = Object.values(allFields).reduce((acc: number, current: any) => acc + (current || 0), 0);
      const totalSalary = props.data.total_salary + sum + props.data.driver.fixed_salary;
      setTotal(totalSalary)
    }, [props.data])

    return (
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        onFieldsChange={onFieldsChange}
        initialValues={{
          take_care_truck_salary: 0,
          allowance_sunday_salary: 0,
          allowance_daily_salary: 0,
          allowance_phone_salary: 0,
          kpi_salary: props.data.total_trips >= 45 ? 500000 : 0,
          deposit_salary: 0,
        }}
      >
        <Row gutter={[32, 16]}>
          <Col xs={12} sm={6}>
            <label className="font-medium">Tài xế:</label>
            <br />
            <Text>{props.data.driver.full_name}</Text>
          </Col>

          <Col xs={12} sm={6}>
            <label className="font-medium">Nhà thầu:</label>
            <br />
            <Text>{props.data.contractor.name}</Text>
          </Col>

          <Col xs={12} sm={6}>
            <label className="font-medium">Tổng số chuyến:</label>
            <br />

            <Text>{props.data.total_trips.toLocaleString()}</Text>
          </Col>

          <Col xs={12} sm={6}>
            <label className="font-medium">Lương cứng:</label>
            <br />
            <Text>{props.data.driver.fixed_salary.toLocaleString()}</Text>
          </Col>

          <Col xs={12} sm={6}>
            <Form.Item
              label="Lương trách nhiệm xe:"
              name="take_care_truck_salary"
              className="mb-0 font-medium"
              normalize={(value) => (value ? Number(value) : value)}
            >
              <Input
                type="number"
                min={0}
                placeholder="Nhập lương"
                className="md:w-[50%] w-[100%]"
                onWheel={(e) => e.currentTarget.blur()}
              />
            </Form.Item>
          </Col>

          <Col xs={12} sm={6}>
            <Form.Item
              label="Phụ cấp làm ngày CN:"
              name="allowance_sunday_salary"
              className="mb-0 font-medium"
              normalize={(value) => (value ? Number(value) : value)}
            >
              <Input
                type="number"
                min={0}
                placeholder="Nhập lương"
                className="md:w-[50%] w-[100%]"
                onWheel={(e) => e.currentTarget.blur()}
              />
            </Form.Item>
          </Col>

          <Col xs={12} sm={6}>
            <Form.Item
              label="Phụ cấp ngày:"
              name="allowance_daily_salary"
              className="mb-0 font-medium"
              normalize={(value) => (value ? Number(value) : value)}
            >
              <Input
                type="number"
                min={0}
                placeholder="Nhập lương"
                className="md:w-[50%] w-[100%]"
                onWheel={(e) => e.currentTarget.blur()}
              />
            </Form.Item>
          </Col>

          <Col xs={12} sm={6}>
            <Form.Item
              label="Phụ cấp điện thoại:"
              name="allowance_phone_salary"
              className="mb-0 font-medium"
              normalize={(value) => (value ? Number(value) : value)}
            >
              <Input
                type="number"
                min={0}
                placeholder="Nhập lương"
                className="md:w-[50%] w-[100%]"
                onWheel={(e) => e.currentTarget.blur()}
              />
            </Form.Item>
          </Col>

          <Col xs={12} sm={6}>
            <label className="font-medium">Lương điểm:</label>
            <br />
            <Text>{props.data.point_salary}</Text>
          </Col>

          <Col xs={12} sm={6}>
            <label className="font-medium">Lương chuyến:</label>
            <br />
            <Text>{props.data.trip_salary.toLocaleString()}</Text>
          </Col>

          <Col xs={12} sm={6}>
            <label className="font-medium">Tiền ăn:</label>
            <br />
            <Text>{props.data.meal_fee.toLocaleString()}</Text>
          </Col>

          <Col xs={12} sm={6}>
            <label className="font-medium">Lương theo ngày:</label>
            <br />
            <Text>{props.data.daily_salary.toLocaleString()}</Text>
          </Col>

          <Col xs={12} sm={6}>
            <Form.Item
              label="Thưởng KPI 45c/tháng:"
              name="kpi_salary"
              className="mb-0 font-medium"
              normalize={(value) => (value ? Number(value) : value)}
            >
              <Input
                type="number"
                min={0}
                placeholder="Nhập lương"
                className="md:w-[50%] w-[100%]"
                onWheel={(e) => e.currentTarget.blur()}
              />
            </Form.Item>
          </Col>

          <Col xs={12} sm={6}>
            <label className="font-medium">Lương bốc xếp:</label>
            <br />
            <Text>{props.data.loading_salary.toLocaleString()}</Text>
          </Col>

          <Col xs={12} sm={6}>
            <label className="font-medium">Vé bãi:</label>
            <br />
            <Text>{props.data.parking_fee.toLocaleString()}</Text>
          </Col>

          <Col xs={12} sm={6}>
            <label className="font-medium">Lưu ca:</label>
            <br />
            <Text>{props.data.standby_fee.toLocaleString()}</Text>
          </Col>

          <Col xs={12} sm={6}>
            <label className="font-medium">Chi khác:</label>
            <br />
            <Text>{props.data.other_salary.toLocaleString()}</Text>
          </Col>

          <Col xs={12} sm={6}>
            <label className="font-medium">Đổ dầu ngoài:</label>
            <br />
            <Text>{props.data.outside_oil_fee.toLocaleString()}</Text>
          </Col>

          <Col xs={12} sm={6}>
            <Form.Item
              label="Ứng trong tháng"
              name="deposit_salary"
              className="mb-0 font-medium"
              normalize={(value) => (value ? Number(value) : value)}
            >
              <Input
                type="number"
                min={0}
                className="md:w-[50%] w-[100%]"
                placeholder="Nhập lương"
                onWheel={(e) => e.currentTarget.blur()}
              />
            </Form.Item>
          </Col>

          <Col xs={12} sm={6}>
            <label className="font-medium">Thu cước ngoài:</label>
            <br />
            <Text>{props.data.charge_fee.toLocaleString()}</Text>
          </Col>

          <Divider className="m-0" />

          <Col xs={24}>
            <Space size="large">
              <strong className="text-lg">
                <label className="font-medium">Thực lĩnh: </label>
                <Text className="text-red-600 text-lg">
                  {total.toLocaleString()}
                </Text>
              </strong>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Lưu lại
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    );
  } catch (error) {
    return null;
  }
};

export default SummarizeForm;

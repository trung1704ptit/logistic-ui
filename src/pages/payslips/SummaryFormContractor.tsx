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
  import http from "@/lib/http";
  import { apiRoutes } from "@/routes/api";
  import { message } from "antd/lib";
import InputNumber from "@/components/InputNumber";
  
  const { Text } = Typography;
  const { TextArea } = Input;
  
  const SummaryFormContractor = (props: any) => {
    const [finalSalary, setFinalSalary] = useState(0);
    const [loading, setLoading] = useState(false);
  
    try {
      const [form] = Form.useForm();
      const handleSubmit = async () => {
        try {
          setLoading(true);
          const allFields = form.getFieldsValue();
          const {
            take_care_truck_salary,
            allowance_sunday_salary,
            allowance_daily_salary,
            allowance_phone_salary,
            kpi_salary,
            deposit_salary,
            other_salary,
            notes,
          } = allFields;
          const payload = {
            driver_id: props.data.driver_id,
            contractor_id: props.data.contractor_id,
            total_trips: props.data.total_trips,
            take_care_truck_salary,
            point_salary: props.data.point_salary,
            trip_salary: props.data.trip_salary,
            daily_salary: props.data.daily_salary,
            meal_fee: props.data.meal_fee,
            charge_fee: props.data.charge_fee,
            loading_salary: props.data.loading_salary,
            allowance_sunday_salary,
            allowance_daily_salary,
            allowance_phone_salary,
            price_for_contractor: props.data.price_for_contractor,
            price_from_client: props.data.price_from_client,
            kpi_salary,
            oil_fee: props.data.oil_fee,
            other_salary,
            outside_oil_fee: props.data.outside_oil_fee,
            parking_fee: props.data.parking_fee,
            recovery_fee: props.data.recovery_fee,
            deposit_salary,
            standby_fee: props.data.standby_fee,
            total_salary: props.data.total_salary,
            final_salary: finalSalary,
            year: props.year,
            month: props.month,
            notes,
          };
  
          if (props?.data?.existPayslip) {
            await http.put(
              `${apiRoutes.payslips}/${props.data?.existPayslip?.id}`,
              payload
            );
          } else {
            await http.post(apiRoutes.payslips, payload);
          }
  
          message.success('Đã lưu dữ liệu cước');
          props.fetchPayslips();
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } catch (error) {
          message.error("Đã có lỗi xảy ra, vui lòng thử lại sau");
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
  
      if (!props.data) {
        return null;
      }
  
      const calculateFinalSalary = () => {
        const allFields = form.getFieldsValue();
        const {
          take_care_truck_salary = 0,
          allowance_sunday_salary = 0,
          allowance_daily_salary = 0,
          allowance_phone_salary = 0,
          kpi_salary = 0,
          deposit_salary = 0,
          other_salary = 0,
        } = allFields;
        const finalSalary =
          (props.data.total_salary || 0) +
          (props.data?.driver?.fixed_salary || 0) +
          take_care_truck_salary +
          allowance_sunday_salary +
          allowance_daily_salary +
          allowance_phone_salary +
          other_salary +
          kpi_salary -
          deposit_salary;
        setFinalSalary(finalSalary);
      };
  
      const onFieldsChange = (_: any) => {
        calculateFinalSalary();
      };
  
      useEffect(() => {
        calculateFinalSalary();
      }, [props.data]);
  
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
            other_salary: props.data.other_salary,
            notes: "",
          }}
        >
          <Row gutter={[32, 16]}>
            <Col xs={12} sm={6}>
              <label className="font-medium">Tài xế:</label>
              <br />
              <Text>{props?.data?.driver?.full_name}</Text>
            </Col>
  
            <Col xs={12} sm={6}>
              <label className="font-medium">Nhà thầu:</label>
              <br />
              <Text>{props.data?.contractor?.name}</Text>
            </Col>
  
            <Col xs={12} sm={6}>
              <label className="font-medium">Tổng số chuyến:</label>
              <br />
  
              <Text>{props.data.total_trips.toLocaleString()}</Text>
            </Col>
  
            <Col xs={12} sm={6}>
              <label className="font-medium">Lương cứng:</label>
              <br />
              <Text>{props.data?.driver?.fixed_salary?.toLocaleString()}</Text>
            </Col>
  
            <Col xs={12} sm={6}>
              <Form.Item
                label="Lương trách nhiệm xe:"
                name="take_care_truck_salary"
                className="mb-0 font-medium"
                normalize={(value) => (value ? Number(value) : value)}
              >
                <InputNumber
                  min={0}
                  placeholder="Nhập lương"
                  className="md:w-[50%] w-[100%]"
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
                <InputNumber
                  min={0}
                  placeholder="Nhập lương"
                  className="md:w-[50%] w-[100%]"
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
                <InputNumber
                  min={0}
                  placeholder="Nhập lương"
                  className="md:w-[50%] w-[100%]"
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
                <InputNumber
                  min={0}
                  placeholder="Nhập lương"
                  className="md:w-[50%] w-[100%]"
                />
              </Form.Item>
            </Col>
  
            <Col xs={12} sm={6}>
              <label className="font-medium">Lương điểm:</label>
              <br />
              <Text>{props.data.point_salary}</Text>
            </Col>
  
            <Col xs={12} sm={6}>
              <label className="font-medium">Tổng cước:</label>
              <br />
              <Text>{props.data.price_for_contractor.toLocaleString()}</Text>
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
                <InputNumber
                  min={0}
                  placeholder="Nhập lương"
                  className="md:w-[50%] w-[100%]"
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
              <Form.Item
                label="Chi khác:"
                name="other_salary"
                className="mb-0 font-medium"
                normalize={(value) => (value ? Number(value) : value)}
              >
                <InputNumber
                  min={0}
                  className="md:w-[50%] w-[100%]"
                />
              </Form.Item>
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
                <InputNumber
                  min={0}
                  className="md:w-[50%] w-[100%]"
                  placeholder="Nhập lương"
                />
              </Form.Item>
            </Col>
  
            <Col xs={12} sm={6}>
              <label className="font-medium">Thu cước ngoài:</label>
              <br />
              <Text>{props.data.charge_fee.toLocaleString()}</Text>
            </Col>
  
            <Col xs={24} md={6}>
              <Form.Item
                label="Ghi chú"
                name="notes"
                className="mb-0 font-medium"
              >
                <TextArea size="large" placeholder="Nhập ghi chú" rows={2} />
              </Form.Item>
            </Col>
  
            <Divider className="m-0" />
  
            <Col xs={24}>
              <Space size="middle">
                <strong className="text-lg">
                  <label className="font-medium">Thực lĩnh: </label>
                  <Text className="text-red-600 text-lg">
                    {finalSalary.toLocaleString()}
                  </Text>
                </strong>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                  disabled={loading}
                >
                  Lưu lại
                </Button>
                <Button
                  type="dashed"
                  onClick={() =>
                    props.hanleViewOrderList(props.data.contractor_id)
                  }
                >
                  Chi tiết
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  
  export default SummaryFormContractor;
  
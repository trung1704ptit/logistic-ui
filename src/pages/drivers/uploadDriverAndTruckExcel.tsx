import { useState } from "react";
import { Button, message, Modal, Select, Space, Upload } from "antd";
import { IContractor } from "@/interfaces/contractor";
import { handleUploadDriverAndTruck } from "@/lib/utils";
import { BsFileEarmarkExcel } from "react-icons/bs";

const UploadDriverAndTruckExcel = ({
  contractors,
  handleCancel,
  openModal,
}: {
  contractors: IContractor[];
  handleCancel: () => void;
  openModal: boolean;
}) => {
  const [contractorId, setContractorId] = useState("");

  const handleChangeContractor = (id: string) => {
    setContractorId(id);
  };

  return (
    <Modal
      title="Tải lên danh sách"
      open={openModal}
      footer={false}
      onClose={handleCancel}
      onCancel={handleCancel}
    >
      <div className="mb-7 mt-7">
        <label>Vui lòng chọn Nhà thầu:</label>
        <Select
          placeholder="Nhà thầu"
          className="w-[200px] ml-2"
          onChange={handleChangeContractor}
        >
          {contractors.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </div>

      <Space>
        <Upload
          name="avatar"
          className="avatar-uploader cursor-pointer"
          customRequest={({ file }: any) => {
            handleUploadDriverAndTruck(file, contractorId)
              .then(() => {
                message.success("Tải lên thành công!");
              })
              .catch(() => {
                message.error("Có lỗi xảy ra trong quá trình tải lên.");
              });
          }}
          showUploadList={false}
          accept=".xlsx,.xls"
        >
          <Button
            type="primary"
            icon={<BsFileEarmarkExcel />}
            disabled={!contractorId}
          >
            Tải lên Excel
          </Button>
        </Upload>
        <Button type="dashed" onClick={handleCancel}>
          Hủy
        </Button>
      </Space>
    </Modal>
  );
};

export default UploadDriverAndTruckExcel;

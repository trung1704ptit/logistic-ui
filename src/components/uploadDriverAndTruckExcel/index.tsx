import { useState } from "react";
import { Button, message, Modal, Select, Space, Upload } from "antd";
import { IContractor } from "@/interfaces/contractor";
import { handleUploadDriverAndTruck } from "@/lib/utils";
import { BsFileEarmarkExcel } from "react-icons/bs";

const UploadDriverAndTruckExcel = ({
  contractors,
  handleCancel,
  openModal,
  contractorId,
}: {
  contractors: IContractor[];
  handleCancel: () => void;
  openModal: boolean;
  contractorId?: string | null;
}) => {
  const [id, setId] = useState(contractorId || undefined);

  const handleChangeContractor = (i: string) => {
    setId(i);
  };

  let list = contractors;
  if (contractorId) {
    list = contractors.filter((item) => item.id === contractorId);
  }

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
          value={id}
        >
          {list.map((item) => (
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
            handleUploadDriverAndTruck(file, id as string)
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
          <Button type="primary" icon={<BsFileEarmarkExcel />} disabled={!id}>
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

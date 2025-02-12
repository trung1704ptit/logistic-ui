import { useEffect, useState } from "react";
import { ProTable, ProColumns, RequestData } from "@ant-design/pro-components";
import { Button, Input, Space, Modal, message, Upload } from "antd";
import { useLocation } from "react-router-dom";
import BasePageContainer from "@/components/layout/pageContainer";
import { PlusOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import http from "@/lib/http";
import * as XLSX from "xlsx";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { IContractor } from "@/interfaces/contractor";
import { priceKeys, priceKeysBlackList } from "@/constants";
import { omit } from "lodash";
import moment from "moment";
import { apiRoutes } from "@/routes/api";
import { IPrice } from "@/interfaces/price";

const breadcrumb = {
  items: [
    {
      key: "dashboard",
      title: <a href="/">Trang chủ</a>,
    },
    {
      key: "contractors",
      title: <a href="/contractors">Nhà thầu</a>,
    },
    {
      key: "pricings",
      title: "Bảng giá",
    },
  ],
};

const PricingListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pricings, setPricings] = useState<IPrice[]>([]);
  const [filteredPricingList, setFilteredPricingList] = useState<IPrice[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const ownerId = params.get("owner_id");
  const ownerType = params.get("owner_type");

  const contractors = useSelector(
    (state: RootState) => state.contractor.contractors
  );
  const clients = useSelector(
    (state: RootState) => state.client.clients
  );
  const [owner, setOwner] = useState<IContractor>();

  useEffect(() => {
    if (ownerId && ownerType && contractors && clients) {
      let filteredOwnerData: any;
      if (ownerType === "contractor") {
        filteredOwnerData = contractors.find((c) => c.id === ownerId);
      } else {
        filteredOwnerData = clients.find((c) => c.id === ownerId);
      }
      if (filteredOwnerData) {
        setOwner(filteredOwnerData);
      }
    }
  }, [ownerId, ownerType, contractors, clients]);

  const handleFileUpload = async (file: any) => {
    try {
      const filterFileName = pricings.filter(item => item.file_name.includes(file.name))
      let filename = file.name;
      if (filterFileName.length > 0) {
        filename = `${filterFileName.length}-${file.name}`
      }

      const renamedFile = new File([file], filename, { type: file.type });
      const jsonData = await parseExcelFile(renamedFile);

      // Step 1: Prepare the file for upload
      const formData = new FormData();
      formData.append("file", renamedFile);

      // Step 3: Upload the file
      try {
        await http.post(`${apiRoutes.files}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error("Error uploading file:", error);
        message.error("Có lỗi xảy ra trong quá trình tải file");
      }

      const prices = jsonData.map((item: any) => ({
        from_city: item[priceKeys.fromCity],
        from_district: item[priceKeys.fromDistrict],
        to_city: item[priceKeys.toCity],
        to_district: item[priceKeys.toDistrcit],
        weight_prices: {
          ...omit(item, priceKeysBlackList),
        },
        notes: item[priceKeys.notes],
      }));

      const data = {
        owner_id: ownerId,
        owner_type: ownerType,
        file_name: filename,
        prices,
      };

      // Step 4: Send parsed data to the API
      await http.post(`${apiRoutes.prices}/${ownerId}`, data, {
        headers: {
          "Content-Type": "application/json", // Ensure this header is set for JSON data
        },
      });

      fetchPricings();

      message.success(`Đã tải lên bảng giá excel ${renamedFile.name}`);
    } catch (error) {
      message.error("Có lỗi xảy ra trong quá trình tải file");
    }
  };

  // Utility function to parse Excel file locally
  const parseExcelFile = (file: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        try {
          const ab = e.target.result;
          const wb = XLSX.read(ab, { type: "array" });
          const ws = wb.Sheets[wb.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(ws);
          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  const fetchPricings = async () => {
    try {
      setIsLoading(true);
      setTimeout(async () => {
        const response = await http.get(`/prices/${ownerId}?ownerType=${ownerType}`);
        if (response.status === 200) {
          setPricings(response.data.data);
          setFilteredPricingList(response.data.data);
          setIsLoading(false);
        }
      }, 1000);
    } catch (error) {
      console.error("Error fetching pricings:", error);
      messageApi.open({
        type: "error",
        content: "Không thể tải dữ liệu bảng giá",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPricings();
  }, [ownerId]);

  const handleDeletePricing = (pricing: any) => {
    Modal.confirm({
      title: "Xác nhận xóa bảng giá",
      content: `Bạn có chắc muốn xóa bảng giá ${pricing.file_name}?`,
      onOk: async () => {
        try {
          const res = await http.delete(
            `/prices/${owner?.id}/${pricing.id}`
          );
          if (res.status === 204) {
            messageApi.open({
              type: "success",
              content: "Xóa thành công",
            });
            fetchPricings();
          }
        } catch (error) {
          console.error("Error deleting pricing:", error);
          messageApi.open({
            type: "error",
            content: "Có lỗi xảy ra, vui lòng thử lại sau",
          });
        }
      },
    });
  };

  const downloadFile = async (fileName: string) => {
    try {
      const response = await http.get(
        `${apiRoutes.files}/download/${fileName}`,
        {
          responseType: "blob",
        }
      );

      // Create a Blob from the response
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const downloadUrl = window.URL.createObjectURL(blob);

      // Create a temporary link and click it
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName.split("/").pop() || "file"; // Extract filename from path
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
      message.success(`Đã tải xuống bảng giá excel ${fileName}`);
    } catch (error) {
      console.error("Error downloading file:", error);
      message.error(
        "Có lỗi xảy ra trong quá trình tải file, vui lòng thử lại sau."
      );
    }
  };

  const handleSearch = (searchTerm: string) => {
    const filtered = pricings.filter((pricing: any) =>
      pricing.file_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPricingList(filtered);
  };

  const columns: ProColumns[] = [
    {
      title: "Tên File",
      align: "center",
      dataIndex: "file_name",
      ellipsis: true,
      render: (_, row, index) => (
        <>
          <a target="_blank" onClick={() => downloadFile(row.file_name)}>
            {row.file_name}
          </a>
          {index === 0 ? " (Mới nhất)" : ""}
        </>
      ),
    },
    {
      title: "Ngày tạo",
      align: "center",
      dataIndex: "created_at",
      ellipsis: true,
      render: (_, row) => moment(row.created_at).format("DD-MM-YYYY"),
    },

    {
      title: "Nhà thầu",
      align: "center",
      dataIndex: "contractor",
      ellipsis: true,
      render: (_, row) => <span>{owner?.name}</span>,
    },
    {
      title: "Hành động",
      align: "center",
      key: "actions",
      render: (_, row) => (
        <Space>
          <Button type="dashed" onClick={() => downloadFile(row.file_name)}>
            Tải xuống
          </Button>
          <Button danger onClick={() => handleDeletePricing(row)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      {contextHolder}
      <ProTable
        columns={columns}
        cardBordered={false}
        loading={isLoading}
        options={{
          reload: false,
          density: false,
          setting: false,
        }}
        cardProps={{
          title: <Title level={5}>Bảng giá {owner?.name}</Title>,
          extra: (
            <Space>
              <Input
                placeholder="Tìm kiếm bảng giá..."
                value={searchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchTerm(value);
                  handleSearch(value);
                }}
                style={{ minWidth: "10%" }}
              />

              <Upload
                name="avatar"
                className="avatar-uploader m-3 cursor-pointer"
                customRequest={({ file, onSuccess, onError }: any) => {
                  handleFileUpload(file)
                    .then(() => onSuccess?.(null, file)) // Indicate success to antd Upload
                    .catch((err) => onError?.(err)); // Handle errors
                }}
                showUploadList={false}
                accept=".xlsx,.xls"
              >
                <Button type="primary" icon={<PlusOutlined />}>
                  Tải lên Excel
                </Button>
              </Upload>
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
          pageSize: 20,
        }}
        request={async (params) => {
          const data = filteredPricingList?.slice(
            ((params?.current ?? 1) - 1) * (params?.pageSize ?? 10),
            (params?.current ?? 1) * (params?.pageSize ?? 10)
          );
          return {
            data,
            success: true,
            total: filteredPricingList?.length || 0,
          } as RequestData<(typeof pricings)[0]>;
        }}
        dataSource={filteredPricingList}
        dateFormatter="string"
        rowKey="id"
        search={false}
        size="small"
      />
    </BasePageContainer>
  );
};

export default PricingListPage;

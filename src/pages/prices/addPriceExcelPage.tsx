import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import BasePageContainer from "@/components/layout/pageContainer";
import { webRoutes } from "@/routes/web";

import { Upload, Button, message, Row, Col, Space, Input } from "antd";
import { Link } from "react-router-dom";
import { ProTable, ProColumns } from "@ant-design/pro-components";
// Assuming file data is stored as an array of objects
interface FileData {
  key: string;
  file_name: string;
  created_date: string;
  fileUrl: string;
}

interface DataType {
  key: string;
  [key: string]: any;
}

// Mock data to simulate file list
const fakeFileList = [
  {
    key: "1",
    file_name: "file1.xlsx",
    created_date: "2025-01-01",
    fileUrl: "https://example.com/file1.xlsx",
  },
  {
    key: "2",
    file_name: "file2.csv",
    created_date: "2025-01-02",
    fileUrl: "https://example.com/file2.csv",
  },
  {
    key: "3",
    file_name: "file3.txt",
    created_date: "2025-01-03",
    fileUrl: "https://example.com/file3.txt",
  },
  {
    key: "4",
    file_name: "file4.pdf",
    created_date: "2025-01-04",
    fileUrl: "https://example.com/file4.pdf",
  },
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

const ExcelUpload: React.FC = () => {
  const [fileLink, setFileLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (file: any) => {
    // Step 1: Prepare FormData for uploading the Excel file
    const formData = new FormData();
    formData.append("file", file);

    // Step 2: Start uploading the Excel file and parsing the Excel data in parallel
    try {
      const uploadFilePromise = fetch("/upload", {
        method: "POST",
        body: formData,
      });

      const parseFilePromise = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e: any) => {
          const ab = e.target.result;
          const wb = XLSX.read(ab, { type: "array" });
          const ws = wb.Sheets[wb.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(ws);
          console.log("jsonData:", jsonData);

          resolve(jsonData);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
      });

      // Wait for both the upload and the parsing to finish
      const [uploadResponse, jsonData] = await Promise.all([
        uploadFilePromise,
        parseFilePromise,
      ]);

      if (uploadResponse.ok) {
        const data = await uploadResponse.json();
        const fileUrl = data.fileUrl; // Adjust based on your server's response
        setFileLink(fileUrl);

        // Step 3: Send parsed JSON data to another API
        try {
          const jsonResponse = await fetch("/parse-data", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: jsonData }),
          });

          if (jsonResponse.ok) {
            message.success(
              `File uploaded and data parsed successfully! Link: ${fileUrl}`
            );
          } else {
            message.error("Failed to parse the Excel data");
          }
        } catch (error) {
          message.error("An error occurred while parsing the file data");
        }
      } else {
        message.error("Upload failed");
      }
    } catch (error) {
      message.error("An error occurred while uploading the file");
    }
  };

  // Simulate the "View" action (open the file in a new tab)
  const handleViewFile = (fileUrl: string) => {
    window.open(fileUrl, "_blank");
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Tải lên Excel</div>
    </button>
  );

  const columns: ProColumns<FileData>[] = [
    {
      title: "File Name",
      dataIndex: "file_name",
      sorter: true,
      ellipsis: true,
      render: (text, record) => (
        <a onClick={() => handleViewFile(record.fileUrl)}>{text}</a>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "created_date",
      sorter: true,
      align: "center",
    },
    {
      title: "Actions",
      align: "center",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="dashed" onClick={() => handleViewFile(record.fileUrl)}>
            Xem
          </Button>
          <Button danger onClick={() => handleDeleteFile(record.key)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  // Simulate the "Delete" action (remove from the list)
  const handleDeleteFile = (fileKey: string) => {
    message.success("File deleted successfully");
  };

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader m-3"
        customRequest={({ file, onSuccess, onError }: any) => {
          handleFileUpload(file)
            .then(() => onSuccess?.(null, file)) // Indicate success to antd Upload
            .catch((err) => onError?.(err)); // Handle errors
        }}
        showUploadList={false}
        accept=".xlsx,.xls"
      >
        {uploadButton}
      </Upload>

      {fileLink && (
        <div>
          <p>File uploaded successfully!</p>
          <a href={fileLink} target="_blank" rel="noopener noreferrer">
            Click here to view the file
          </a>
        </div>
      )}

      <ProTable<FileData>
        columns={columns}
        dataSource={fakeFileList}
        rowKey="key"
        search={false}
        pagination={false}
        tableLayout="fixed"
        bordered
        scroll={{ x: true }}
        size="small"
      />
    </BasePageContainer>
  );
};

export default ExcelUpload;

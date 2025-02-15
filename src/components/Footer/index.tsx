"use client";

import React from "react";
import { Layout } from "antd";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <div className="  p-6 md:py-11">
      <div className="container mx-auto">
        <Row justify="center" className="mt-5">
          <Col>
            <div className="flex items-center text-gray-400 text-sm justify-center mb-3">
              <Link to="" className="border-l border-gray-400 pl-3">
                Thông tin đội xe
              </Link>
              <Link to="/" className="border-l border-gray-400 px-3">
                Bảng giá cước
              </Link>
              <Link to="/" className="pr-3">
                Tuyển dụng
              </Link>
            </div>
            <div className="text-center">
              &copy; 2025 Bản quền thuộc về Vận Tải T&T.
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Footer;

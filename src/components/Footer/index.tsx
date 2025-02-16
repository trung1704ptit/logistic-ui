"use client";

import React from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <div className="  p-6 md:py-11">
      <div className="container mx-auto">
        <Row justify="center" className="mt-5">
          <Col>
            <div className="flex items-center text-gray-400 text-sm justify-center mb-3">
              <Link to="" className="border-l pl-3">
                Thông tin đội xe
              </Link>
              <Link to="/" className="border-l px-3">
                Bảng giá cước
              </Link>
              <Link to="/" className="pr-3">
                Tuyển dụng
              </Link>
            </div>
            <div className="text-center">
              &copy; {new Date().getFullYear()} Bản quyền thuộc về Vận Tải T&T.
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Footer;

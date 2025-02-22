import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Select, Space } from "antd";
import type { InputRef } from "antd";

const SelectWithInput = (props: any) => {
  const { options, ...rest } = props;
  const [items, setItems] = useState<string[]>([]);
  const [name, setName] = useState("");
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  useEffect(() => {
    setItems((prevItems) => [...new Set([...options, ...prevItems])]);
  }, [options]);

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setItems([...items, name]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <Select
      className="w-full"
      {...rest}
      showSearch
      optionFilterProp="label"
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }}/>
          <Space style={{ padding: "0 8px 4px" }}>
            <Input
              placeholder="Thêm địa điểm"
              ref={inputRef}
              value={name}
              onChange={onNameChange}
              onKeyDown={(e) => e.stopPropagation()}
              size="small"
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={addItem}
              size="small"
              disabled={!name}
            >
              Thêm mới
            </Button>
          </Space>
        </>
      )}
      options={items.map((item: string) => ({ label: item, value: item }))}
    />
  );
};

export default SelectWithInput;

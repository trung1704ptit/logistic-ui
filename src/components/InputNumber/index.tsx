import { InputNumber as InputN } from "antd";

const InputNumber = (props: any) => {
  return (
    <InputN
      size="large"
      className="w-full"
      formatter={(value: any) =>
        value !== null
          ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : ""
      }
      parser={(value) => (value ? value.replace(/,/g, "") : "")}
      {...props}
      min={0}
    />
  );
};

export default InputNumber;

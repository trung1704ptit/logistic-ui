import { ConfigProviderProps } from "antd/es/config-provider";
import enUSIntl from "antd/locale/en_US";

export const antdConfig: ConfigProviderProps = {
  theme: {
    token: {
      colorPrimary: CONFIG.theme.accentColor,
    },
  },
  locale: enUSIntl,
};

export const priceKeys = {
  notes: "Ghi chú",
  fromCity: "Tỉnh đóng hàng",
  fromDistrict:  "Huyện đóng hàng",
  toCity: "Tỉnh trả hàng",
  toDistrcit: "Huyện trả hàng",
  numOfOrder: "STT",
}

export const priceKeysBlackList = [
  priceKeys.notes,
  priceKeys.fromCity,
  priceKeys.fromDistrict,
  priceKeys.toCity,
  priceKeys.toDistrcit,
  priceKeys.numOfOrder
];

export interface District {
  Type: string;
  Code: string;
  FullName: string;
  CodeName: string;
}

export interface Province {
  Type: string;
  Code: string;
  FullName: string;
  CodeName: string;
  District: District[];
}

export const provinceList: Province[] = [
  {
    "Type": "province",
    "Code": "01",
    "FullName": "Thành phố Hà Nội",
    "CodeName": "ha_noi",
    "District": [
      {
        "Type": "district",
        "Code": "001",
        "FullName": "Quận Ba Đình",
        "CodeName": "ba_dinh"
      },
      {
        "Type": "district",
        "Code": "002",
        "FullName": "Quận Hoàn Kiếm",
        "CodeName": "hoan_kiem"
      },
      {
        "Type": "district",
        "Code": "003",
        "FullName": "Quận Tây Hồ",
        "CodeName": "tay_ho"
      },
      {
        "Type": "district",
        "Code": "004",
        "FullName": "Quận Long Biên",
        "CodeName": "long_bien"
      },
      {
        "Type": "district",
        "Code": "005",
        "FullName": "Quận Cầu Giấy",
        "CodeName": "cau_giay"
      },
      {
        "Type": "district",
        "Code": "006",
        "FullName": "Quận Đống Đa",
        "CodeName": "dong_da"
      },
      {
        "Type": "district",
        "Code": "007",
        "FullName": "Quận Hai Bà Trưng",
        "CodeName": "hai_ba_trung"
      },
      {
        "Type": "district",
        "Code": "008",
        "FullName": "Quận Hoàng Mai",
        "CodeName": "hoang_mai"
      },
      {
        "Type": "district",
        "Code": "009",
        "FullName": "Quận Thanh Xuân",
        "CodeName": "thanh_xuan"
      },
      {
        "Type": "district",
        "Code": "016",
        "FullName": "Huyện Sóc Sơn",
        "CodeName": "soc_son"
      },
      {
        "Type": "district",
        "Code": "017",
        "FullName": "Huyện Đông Anh",
        "CodeName": "dong_anh"
      },
      {
        "Type": "district",
        "Code": "018",
        "FullName": "Huyện Gia Lâm",
        "CodeName": "gia_lam"
      },
      {
        "Type": "district",
        "Code": "019",
        "FullName": "Quận Nam Từ Liêm",
        "CodeName": "nam_tu_liem"
      },
      {
        "Type": "district",
        "Code": "020",
        "FullName": "Huyện Thanh Trì",
        "CodeName": "thanh_tri"
      },
      {
        "Type": "district",
        "Code": "021",
        "FullName": "Quận Bắc Từ Liêm",
        "CodeName": "bac_tu_liem"
      },
      {
        "Type": "district",
        "Code": "250",
        "FullName": "Huyện Mê Linh",
        "CodeName": "me_linh"
      },
      {
        "Type": "district",
        "Code": "268",
        "FullName": "Quận Hà Đông",
        "CodeName": "ha_dong"
      },
      {
        "Type": "district",
        "Code": "269",
        "FullName": "Thị xã Sơn Tây",
        "CodeName": "son_tay"
      },
      {
        "Type": "district",
        "Code": "271",
        "FullName": "Huyện Ba Vì",
        "CodeName": "ba_vi"
      },
      {
        "Type": "district",
        "Code": "272",
        "FullName": "Huyện Phúc Thọ",
        "CodeName": "phuc_tho"
      },
      {
        "Type": "district",
        "Code": "273",
        "FullName": "Huyện Đan Phượng",
        "CodeName": "dan_phuong"
      },
      {
        "Type": "district",
        "Code": "274",
        "FullName": "Huyện Hoài Đức",
        "CodeName": "hoai_duc"
      },
      {
        "Type": "district",
        "Code": "275",
        "FullName": "Huyện Quốc Oai",
        "CodeName": "quoc_oai"
      },
      {
        "Type": "district",
        "Code": "276",
        "FullName": "Huyện Thạch Thất",
        "CodeName": "thach_that"
      },
      {
        "Type": "district",
        "Code": "277",
        "FullName": "Huyện Chương Mỹ",
        "CodeName": "chuong_my"
      },
      {
        "Type": "district",
        "Code": "278",
        "FullName": "Huyện Thanh Oai",
        "CodeName": "thanh_oai"
      },
      {
        "Type": "district",
        "Code": "279",
        "FullName": "Huyện Thường Tín",
        "CodeName": "thuong_tin"
      },
      {
        "Type": "district",
        "Code": "280",
        "FullName": "Huyện Phú Xuyên",
        "CodeName": "phu_xuyen"
      },
      {
        "Type": "district",
        "Code": "281",
        "FullName": "Huyện Ứng Hòa",
        "CodeName": "ung_hoa"
      },
      {
        "Type": "district",
        "Code": "282",
        "FullName": "Huyện Mỹ Đức",
        "CodeName": "my_duc"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "02",
    "FullName": "Tỉnh Hà Giang",
    "CodeName": "ha_giang",
    "District": [
      {
        "Type": "district",
        "Code": "024",
        "FullName": "Thành phố Hà Giang",
        "CodeName": "ha_giang"
      },
      {
        "Type": "district",
        "Code": "026",
        "FullName": "Huyện Đồng Văn",
        "CodeName": "dong_van"
      },
      {
        "Type": "district",
        "Code": "027",
        "FullName": "Huyện Mèo Vạc",
        "CodeName": "meo_vac"
      },
      {
        "Type": "district",
        "Code": "028",
        "FullName": "Huyện Yên Minh",
        "CodeName": "yen_minh"
      },
      {
        "Type": "district",
        "Code": "029",
        "FullName": "Huyện Quản Bạ",
        "CodeName": "quan_ba"
      },
      {
        "Type": "district",
        "Code": "030",
        "FullName": "Huyện Vị Xuyên",
        "CodeName": "vi_xuyen"
      },
      {
        "Type": "district",
        "Code": "031",
        "FullName": "Huyện Bắc Mê",
        "CodeName": "bac_me"
      },
      {
        "Type": "district",
        "Code": "032",
        "FullName": "Huyện Hoàng Su Phì",
        "CodeName": "hoang_su_phi"
      },
      {
        "Type": "district",
        "Code": "033",
        "FullName": "Huyện Xín Mần",
        "CodeName": "xin_man"
      },
      {
        "Type": "district",
        "Code": "034",
        "FullName": "Huyện Bắc Quang",
        "CodeName": "bac_quang"
      },
      {
        "Type": "district",
        "Code": "035",
        "FullName": "Huyện Quang Bình",
        "CodeName": "quang_binh"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "04",
    "FullName": "Tỉnh Cao Bằng",
    "CodeName": "cao_bang",
    "District": [
      {
        "Type": "district",
        "Code": "040",
        "FullName": "Thành phố Cao Bằng",
        "CodeName": "cao_bang"
      },
      {
        "Type": "district",
        "Code": "042",
        "FullName": "Huyện Bảo Lâm",
        "CodeName": "bao_lam"
      },
      {
        "Type": "district",
        "Code": "043",
        "FullName": "Huyện Bảo Lạc",
        "CodeName": "bao_lac"
      },
      {
        "Type": "district",
        "Code": "045",
        "FullName": "Huyện Hà Quảng",
        "CodeName": "ha_quang"
      },
      {
        "Type": "district",
        "Code": "047",
        "FullName": "Huyện Trùng Khánh",
        "CodeName": "trung_khanh"
      },
      {
        "Type": "district",
        "Code": "048",
        "FullName": "Huyện Hạ Lang",
        "CodeName": "ha_lang"
      },
      {
        "Type": "district",
        "Code": "049",
        "FullName": "Huyện Quảng Hòa",
        "CodeName": "quang_hoa"
      },
      {
        "Type": "district",
        "Code": "051",
        "FullName": "Huyện Hoà An",
        "CodeName": "hoa_an"
      },
      {
        "Type": "district",
        "Code": "052",
        "FullName": "Huyện Nguyên Bình",
        "CodeName": "nguyen_binh"
      },
      {
        "Type": "district",
        "Code": "053",
        "FullName": "Huyện Thạch An",
        "CodeName": "thach_an"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "06",
    "FullName": "Tỉnh Bắc Kạn",
    "CodeName": "bac_kan",
    "District": [
      {
        "Type": "district",
        "Code": "058",
        "FullName": "Thành phố Bắc Kạn",
        "CodeName": "bac_kan"
      },
      {
        "Type": "district",
        "Code": "060",
        "FullName": "Huyện Pác Nặm",
        "CodeName": "pac_nam"
      },
      {
        "Type": "district",
        "Code": "061",
        "FullName": "Huyện Ba Bể",
        "CodeName": "ba_be"
      },
      {
        "Type": "district",
        "Code": "062",
        "FullName": "Huyện Ngân Sơn",
        "CodeName": "ngan_son"
      },
      {
        "Type": "district",
        "Code": "063",
        "FullName": "Huyện Bạch Thông",
        "CodeName": "bach_thong"
      },
      {
        "Type": "district",
        "Code": "064",
        "FullName": "Huyện Chợ Đồn",
        "CodeName": "cho_don"
      },
      {
        "Type": "district",
        "Code": "065",
        "FullName": "Huyện Chợ Mới",
        "CodeName": "cho_moi"
      },
      {
        "Type": "district",
        "Code": "066",
        "FullName": "Huyện Na Rì",
        "CodeName": "na_ri"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "08",
    "FullName": "Tỉnh Tuyên Quang",
    "CodeName": "tuyen_quang",
    "District": [
      {
        "Type": "district",
        "Code": "070",
        "FullName": "Thành phố Tuyên Quang",
        "CodeName": "tuyen_quang"
      },
      {
        "Type": "district",
        "Code": "071",
        "FullName": "Huyện Lâm Bình",
        "CodeName": "lam_binh"
      },
      {
        "Type": "district",
        "Code": "072",
        "FullName": "Huyện Na Hang",
        "CodeName": "na_hang"
      },
      {
        "Type": "district",
        "Code": "073",
        "FullName": "Huyện Chiêm Hóa",
        "CodeName": "chiem_hoa"
      },
      {
        "Type": "district",
        "Code": "074",
        "FullName": "Huyện Hàm Yên",
        "CodeName": "ham_yen"
      },
      {
        "Type": "district",
        "Code": "075",
        "FullName": "Huyện Yên Sơn",
        "CodeName": "yen_son"
      },
      {
        "Type": "district",
        "Code": "076",
        "FullName": "Huyện Sơn Dương",
        "CodeName": "son_duong"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "10",
    "FullName": "Tỉnh Lào Cai",
    "CodeName": "lao_cai",
    "District": [
      {
        "Type": "district",
        "Code": "080",
        "FullName": "Thành phố Lào Cai",
        "CodeName": "lao_cai"
      },
      {
        "Type": "district",
        "Code": "082",
        "FullName": "Huyện Bát Xát",
        "CodeName": "bat_xat"
      },
      {
        "Type": "district",
        "Code": "083",
        "FullName": "Huyện Mường Khương",
        "CodeName": "muong_khuong"
      },
      {
        "Type": "district",
        "Code": "084",
        "FullName": "Huyện Si Ma Cai",
        "CodeName": "si_ma_cai"
      },
      {
        "Type": "district",
        "Code": "085",
        "FullName": "Huyện Bắc Hà",
        "CodeName": "bac_ha"
      },
      {
        "Type": "district",
        "Code": "086",
        "FullName": "Huyện Bảo Thắng",
        "CodeName": "bao_thang"
      },
      {
        "Type": "district",
        "Code": "087",
        "FullName": "Huyện Bảo Yên",
        "CodeName": "bao_yen"
      },
      {
        "Type": "district",
        "Code": "088",
        "FullName": "Thị xã Sa Pa",
        "CodeName": "sa_pa"
      },
      {
        "Type": "district",
        "Code": "089",
        "FullName": "Huyện Văn Bàn",
        "CodeName": "van_ban"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "11",
    "FullName": "Tỉnh Điện Biên",
    "CodeName": "dien_bien",
    "District": [
      {
        "Type": "district",
        "Code": "094",
        "FullName": "Thành phố Điện Biên Phủ",
        "CodeName": "dien_bien_phu"
      },
      {
        "Type": "district",
        "Code": "095",
        "FullName": "Thị xã Mường Lay",
        "CodeName": "muong_lay"
      },
      {
        "Type": "district",
        "Code": "096",
        "FullName": "Huyện Mường Nhé",
        "CodeName": "muong_nhe"
      },
      {
        "Type": "district",
        "Code": "097",
        "FullName": "Huyện Mường Chà",
        "CodeName": "muong_cha"
      },
      {
        "Type": "district",
        "Code": "098",
        "FullName": "Huyện Tủa Chùa",
        "CodeName": "tua_chua"
      },
      {
        "Type": "district",
        "Code": "099",
        "FullName": "Huyện Tuần Giáo",
        "CodeName": "tuan_giao"
      },
      {
        "Type": "district",
        "Code": "100",
        "FullName": "Huyện Điện Biên",
        "CodeName": "dien_bien"
      },
      {
        "Type": "district",
        "Code": "101",
        "FullName": "Huyện Điện Biên Đông",
        "CodeName": "dien_bien_dong"
      },
      {
        "Type": "district",
        "Code": "102",
        "FullName": "Huyện Mường Ảng",
        "CodeName": "muong_ang"
      },
      {
        "Type": "district",
        "Code": "103",
        "FullName": "Huyện Nậm Pồ",
        "CodeName": "nam_po"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "12",
    "FullName": "Tỉnh Lai Châu",
    "CodeName": "lai_chau",
    "District": [
      {
        "Type": "district",
        "Code": "105",
        "FullName": "Thành phố Lai Châu",
        "CodeName": "lai_chau"
      },
      {
        "Type": "district",
        "Code": "106",
        "FullName": "Huyện Tam Đường",
        "CodeName": "tam_duong"
      },
      {
        "Type": "district",
        "Code": "107",
        "FullName": "Huyện Mường Tè",
        "CodeName": "muong_te"
      },
      {
        "Type": "district",
        "Code": "108",
        "FullName": "Huyện Sìn Hồ",
        "CodeName": "sin_ho"
      },
      {
        "Type": "district",
        "Code": "109",
        "FullName": "Huyện Phong Thổ",
        "CodeName": "phong_tho"
      },
      {
        "Type": "district",
        "Code": "110",
        "FullName": "Huyện Than Uyên",
        "CodeName": "than_uyen"
      },
      {
        "Type": "district",
        "Code": "111",
        "FullName": "Huyện Tân Uyên",
        "CodeName": "tan_uyen"
      },
      {
        "Type": "district",
        "Code": "112",
        "FullName": "Huyện Nậm Nhùn",
        "CodeName": "nam_nhun"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "14",
    "FullName": "Tỉnh Sơn La",
    "CodeName": "son_la",
    "District": [
      {
        "Type": "district",
        "Code": "116",
        "FullName": "Thành phố Sơn La",
        "CodeName": "son_la"
      },
      {
        "Type": "district",
        "Code": "118",
        "FullName": "Huyện Quỳnh Nhai",
        "CodeName": "quynh_nhai"
      },
      {
        "Type": "district",
        "Code": "119",
        "FullName": "Huyện Thuận Châu",
        "CodeName": "thuan_chau"
      },
      {
        "Type": "district",
        "Code": "120",
        "FullName": "Huyện Mường La",
        "CodeName": "muong_la"
      },
      {
        "Type": "district",
        "Code": "121",
        "FullName": "Huyện Bắc Yên",
        "CodeName": "bac_yen"
      },
      {
        "Type": "district",
        "Code": "122",
        "FullName": "Huyện Phù Yên",
        "CodeName": "phu_yen"
      },
      {
        "Type": "district",
        "Code": "123",
        "FullName": "Huyện Mộc Châu",
        "CodeName": "moc_chau"
      },
      {
        "Type": "district",
        "Code": "124",
        "FullName": "Huyện Yên Châu",
        "CodeName": "yen_chau"
      },
      {
        "Type": "district",
        "Code": "125",
        "FullName": "Huyện Mai Sơn",
        "CodeName": "mai_son"
      },
      {
        "Type": "district",
        "Code": "126",
        "FullName": "Huyện Sông Mã",
        "CodeName": "song_ma"
      },
      {
        "Type": "district",
        "Code": "127",
        "FullName": "Huyện Sốp Cộp",
        "CodeName": "sop_cop"
      },
      {
        "Type": "district",
        "Code": "128",
        "FullName": "Huyện Vân Hồ",
        "CodeName": "van_ho"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "15",
    "FullName": "Tỉnh Yên Bái",
    "CodeName": "yen_bai",
    "District": [
      {
        "Type": "district",
        "Code": "132",
        "FullName": "Thành phố Yên Bái",
        "CodeName": "yen_bai"
      },
      {
        "Type": "district",
        "Code": "133",
        "FullName": "Thị xã Nghĩa Lộ",
        "CodeName": "nghia_lo"
      },
      {
        "Type": "district",
        "Code": "135",
        "FullName": "Huyện Lục Yên",
        "CodeName": "luc_yen"
      },
      {
        "Type": "district",
        "Code": "136",
        "FullName": "Huyện Văn Yên",
        "CodeName": "van_yen"
      },
      {
        "Type": "district",
        "Code": "137",
        "FullName": "Huyện Mù Căng Chải",
        "CodeName": "mu_cang_chai"
      },
      {
        "Type": "district",
        "Code": "138",
        "FullName": "Huyện Trấn Yên",
        "CodeName": "tran_yen"
      },
      {
        "Type": "district",
        "Code": "139",
        "FullName": "Huyện Trạm Tấu",
        "CodeName": "tram_tau"
      },
      {
        "Type": "district",
        "Code": "140",
        "FullName": "Huyện Văn Chấn",
        "CodeName": "van_chan"
      },
      {
        "Type": "district",
        "Code": "141",
        "FullName": "Huyện Yên Bình",
        "CodeName": "yen_binh"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "17",
    "FullName": "Tỉnh Hoà Bình",
    "CodeName": "hoa_binh",
    "District": [
      {
        "Type": "district",
        "Code": "148",
        "FullName": "Thành phố Hòa Bình",
        "CodeName": "hoa_binh"
      },
      {
        "Type": "district",
        "Code": "150",
        "FullName": "Huyện Đà Bắc",
        "CodeName": "da_bac"
      },
      {
        "Type": "district",
        "Code": "152",
        "FullName": "Huyện Lương Sơn",
        "CodeName": "luong_son"
      },
      {
        "Type": "district",
        "Code": "153",
        "FullName": "Huyện Kim Bôi",
        "CodeName": "kim_boi"
      },
      {
        "Type": "district",
        "Code": "154",
        "FullName": "Huyện Cao Phong",
        "CodeName": "cao_phong"
      },
      {
        "Type": "district",
        "Code": "155",
        "FullName": "Huyện Tân Lạc",
        "CodeName": "tan_lac"
      },
      {
        "Type": "district",
        "Code": "156",
        "FullName": "Huyện Mai Châu",
        "CodeName": "mai_chau"
      },
      {
        "Type": "district",
        "Code": "157",
        "FullName": "Huyện Lạc Sơn",
        "CodeName": "lac_son"
      },
      {
        "Type": "district",
        "Code": "158",
        "FullName": "Huyện Yên Thủy",
        "CodeName": "yen_thuy"
      },
      {
        "Type": "district",
        "Code": "159",
        "FullName": "Huyện Lạc Thủy",
        "CodeName": "lac_thuy"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "19",
    "FullName": "Tỉnh Thái Nguyên",
    "CodeName": "thai_nguyen",
    "District": [
      {
        "Type": "district",
        "Code": "164",
        "FullName": "Thành phố Thái Nguyên",
        "CodeName": "thai_nguyen"
      },
      {
        "Type": "district",
        "Code": "165",
        "FullName": "Thành phố Sông Công",
        "CodeName": "song_cong"
      },
      {
        "Type": "district",
        "Code": "167",
        "FullName": "Huyện Định Hóa",
        "CodeName": "dinh_hoa"
      },
      {
        "Type": "district",
        "Code": "168",
        "FullName": "Huyện Phú Lương",
        "CodeName": "phu_luong"
      },
      {
        "Type": "district",
        "Code": "169",
        "FullName": "Huyện Đồng Hỷ",
        "CodeName": "dong_hy"
      },
      {
        "Type": "district",
        "Code": "170",
        "FullName": "Huyện Võ Nhai",
        "CodeName": "vo_nhai"
      },
      {
        "Type": "district",
        "Code": "171",
        "FullName": "Huyện Đại Từ",
        "CodeName": "dai_tu"
      },
      {
        "Type": "district",
        "Code": "172",
        "FullName": "Thành phố Phổ Yên",
        "CodeName": "pho_yen"
      },
      {
        "Type": "district",
        "Code": "173",
        "FullName": "Huyện Phú Bình",
        "CodeName": "phu_binh"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "20",
    "FullName": "Tỉnh Lạng Sơn",
    "CodeName": "lang_son",
    "District": [
      {
        "Type": "district",
        "Code": "178",
        "FullName": "Thành phố Lạng Sơn",
        "CodeName": "lang_son"
      },
      {
        "Type": "district",
        "Code": "180",
        "FullName": "Huyện Tràng Định",
        "CodeName": "trang_dinh"
      },
      {
        "Type": "district",
        "Code": "181",
        "FullName": "Huyện Bình Gia",
        "CodeName": "binh_gia"
      },
      {
        "Type": "district",
        "Code": "182",
        "FullName": "Huyện Văn Lãng",
        "CodeName": "van_lang"
      },
      {
        "Type": "district",
        "Code": "183",
        "FullName": "Huyện Cao Lộc",
        "CodeName": "cao_loc"
      },
      {
        "Type": "district",
        "Code": "184",
        "FullName": "Huyện Văn Quan",
        "CodeName": "van_quan"
      },
      {
        "Type": "district",
        "Code": "185",
        "FullName": "Huyện Bắc Sơn",
        "CodeName": "bac_son"
      },
      {
        "Type": "district",
        "Code": "186",
        "FullName": "Huyện Hữu Lũng",
        "CodeName": "huu_lung"
      },
      {
        "Type": "district",
        "Code": "187",
        "FullName": "Huyện Chi Lăng",
        "CodeName": "chi_lang"
      },
      {
        "Type": "district",
        "Code": "188",
        "FullName": "Huyện Lộc Bình",
        "CodeName": "loc_binh"
      },
      {
        "Type": "district",
        "Code": "189",
        "FullName": "Huyện Đình Lập",
        "CodeName": "dinh_lap"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "22",
    "FullName": "Tỉnh Quảng Ninh",
    "CodeName": "quang_ninh",
    "District": [
      {
        "Type": "district",
        "Code": "193",
        "FullName": "Thành phố Hạ Long",
        "CodeName": "ha_long"
      },
      {
        "Type": "district",
        "Code": "194",
        "FullName": "Thành phố Móng Cái",
        "CodeName": "mong_cai"
      },
      {
        "Type": "district",
        "Code": "195",
        "FullName": "Thành phố Cẩm Phả",
        "CodeName": "cam_pha"
      },
      {
        "Type": "district",
        "Code": "196",
        "FullName": "Thành phố Uông Bí",
        "CodeName": "uong_bi"
      },
      {
        "Type": "district",
        "Code": "198",
        "FullName": "Huyện Bình Liêu",
        "CodeName": "binh_lieu"
      },
      {
        "Type": "district",
        "Code": "199",
        "FullName": "Huyện Tiên Yên",
        "CodeName": "tien_yen"
      },
      {
        "Type": "district",
        "Code": "200",
        "FullName": "Huyện Đầm Hà",
        "CodeName": "dam_ha"
      },
      {
        "Type": "district",
        "Code": "201",
        "FullName": "Huyện Hải Hà",
        "CodeName": "hai_ha"
      },
      {
        "Type": "district",
        "Code": "202",
        "FullName": "Huyện Ba Chẽ",
        "CodeName": "ba_che"
      },
      {
        "Type": "district",
        "Code": "203",
        "FullName": "Huyện Vân Đồn",
        "CodeName": "van_don"
      },
      {
        "Type": "district",
        "Code": "205",
        "FullName": "Thành phố Đông Triều",
        "CodeName": "dong_trieu"
      },
      {
        "Type": "district",
        "Code": "206",
        "FullName": "Thị xã Quảng Yên",
        "CodeName": "quang_yen"
      },
      {
        "Type": "district",
        "Code": "207",
        "FullName": "Huyện Cô Tô",
        "CodeName": "co_to"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "24",
    "FullName": "Tỉnh Bắc Giang",
    "CodeName": "bac_giang",
    "District": [
      {
        "Type": "district",
        "Code": "213",
        "FullName": "Thành phố Bắc Giang",
        "CodeName": "bac_giang"
      },
      {
        "Type": "district",
        "Code": "215",
        "FullName": "Huyện Yên Thế",
        "CodeName": "yen_the"
      },
      {
        "Type": "district",
        "Code": "216",
        "FullName": "Huyện Tân Yên",
        "CodeName": "tan_yen"
      },
      {
        "Type": "district",
        "Code": "217",
        "FullName": "Huyện Lạng Giang",
        "CodeName": "lang_giang"
      },
      {
        "Type": "district",
        "Code": "218",
        "FullName": "Huyện Lục Nam",
        "CodeName": "luc_nam"
      },
      {
        "Type": "district",
        "Code": "219",
        "FullName": "Huyện Lục Ngạn",
        "CodeName": "luc_ngan"
      },
      {
        "Type": "district",
        "Code": "220",
        "FullName": "Huyện Sơn Động",
        "CodeName": "son_dong"
      },
      {
        "Type": "district",
        "Code": "221",
        "FullName": "Huyện Yên Dũng",
        "CodeName": "yen_dung"
      },
      {
        "Type": "district",
        "Code": "222",
        "FullName": "Thị xã Việt Yên",
        "CodeName": "viet_yen"
      },
      {
        "Type": "district",
        "Code": "223",
        "FullName": "Huyện Hiệp Hòa",
        "CodeName": "hiep_hoa"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "25",
    "FullName": "Tỉnh Phú Thọ",
    "CodeName": "phu_tho",
    "District": [
      {
        "Type": "district",
        "Code": "227",
        "FullName": "Thành phố Việt Trì",
        "CodeName": "viet_tri"
      },
      {
        "Type": "district",
        "Code": "228",
        "FullName": "Thị xã Phú Thọ",
        "CodeName": "phu_tho"
      },
      {
        "Type": "district",
        "Code": "230",
        "FullName": "Huyện Đoan Hùng",
        "CodeName": "doan_hung"
      },
      {
        "Type": "district",
        "Code": "231",
        "FullName": "Huyện Hạ Hoà",
        "CodeName": "ha_hoa"
      },
      {
        "Type": "district",
        "Code": "232",
        "FullName": "Huyện Thanh Ba",
        "CodeName": "thanh_ba"
      },
      {
        "Type": "district",
        "Code": "233",
        "FullName": "Huyện Phù Ninh",
        "CodeName": "phu_ninh"
      },
      {
        "Type": "district",
        "Code": "234",
        "FullName": "Huyện Yên Lập",
        "CodeName": "yen_lap"
      },
      {
        "Type": "district",
        "Code": "235",
        "FullName": "Huyện Cẩm Khê",
        "CodeName": "cam_khe"
      },
      {
        "Type": "district",
        "Code": "236",
        "FullName": "Huyện Tam Nông",
        "CodeName": "tam_nong"
      },
      {
        "Type": "district",
        "Code": "237",
        "FullName": "Huyện Lâm Thao",
        "CodeName": "lam_thao"
      },
      {
        "Type": "district",
        "Code": "238",
        "FullName": "Huyện Thanh Sơn",
        "CodeName": "thanh_son"
      },
      {
        "Type": "district",
        "Code": "239",
        "FullName": "Huyện Thanh Thuỷ",
        "CodeName": "thanh_thuy"
      },
      {
        "Type": "district",
        "Code": "240",
        "FullName": "Huyện Tân Sơn",
        "CodeName": "tan_son"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "26",
    "FullName": "Tỉnh Vĩnh Phúc",
    "CodeName": "vinh_phuc",
    "District": [
      {
        "Type": "district",
        "Code": "243",
        "FullName": "Thành phố Vĩnh Yên",
        "CodeName": "vinh_yen"
      },
      {
        "Type": "district",
        "Code": "244",
        "FullName": "Thành phố Phúc Yên",
        "CodeName": "phuc_yen"
      },
      {
        "Type": "district",
        "Code": "246",
        "FullName": "Huyện Lập Thạch",
        "CodeName": "lap_thach"
      },
      {
        "Type": "district",
        "Code": "247",
        "FullName": "Huyện Tam Dương",
        "CodeName": "tam_duong"
      },
      {
        "Type": "district",
        "Code": "248",
        "FullName": "Huyện Tam Đảo",
        "CodeName": "tam_dao"
      },
      {
        "Type": "district",
        "Code": "249",
        "FullName": "Huyện Bình Xuyên",
        "CodeName": "binh_xuyen"
      },
      {
        "Type": "district",
        "Code": "251",
        "FullName": "Huyện Yên Lạc",
        "CodeName": "yen_lac"
      },
      {
        "Type": "district",
        "Code": "252",
        "FullName": "Huyện Vĩnh Tường",
        "CodeName": "vinh_tuong"
      },
      {
        "Type": "district",
        "Code": "253",
        "FullName": "Huyện Sông Lô",
        "CodeName": "song_lo"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "27",
    "FullName": "Tỉnh Bắc Ninh",
    "CodeName": "bac_ninh",
    "District": [
      {
        "Type": "district",
        "Code": "256",
        "FullName": "Thành phố Bắc Ninh",
        "CodeName": "bac_ninh"
      },
      {
        "Type": "district",
        "Code": "258",
        "FullName": "Huyện Yên Phong",
        "CodeName": "yen_phong"
      },
      {
        "Type": "district",
        "Code": "259",
        "FullName": "Thị xã Quế Võ",
        "CodeName": "que_vo"
      },
      {
        "Type": "district",
        "Code": "260",
        "FullName": "Huyện Tiên Du",
        "CodeName": "tien_du"
      },
      {
        "Type": "district",
        "Code": "261",
        "FullName": "Thành phố Từ Sơn",
        "CodeName": "tu_son"
      },
      {
        "Type": "district",
        "Code": "262",
        "FullName": "Thị xã Thuận Thành",
        "CodeName": "thuan_thanh"
      },
      {
        "Type": "district",
        "Code": "263",
        "FullName": "Huyện Gia Bình",
        "CodeName": "gia_binh"
      },
      {
        "Type": "district",
        "Code": "264",
        "FullName": "Huyện Lương Tài",
        "CodeName": "luong_tai"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "30",
    "FullName": "Tỉnh Hải Dương",
    "CodeName": "hai_duong",
    "District": [
      {
        "Type": "district",
        "Code": "288",
        "FullName": "Thành phố Hải Dương",
        "CodeName": "hai_duong"
      },
      {
        "Type": "district",
        "Code": "290",
        "FullName": "Thành phố Chí Linh",
        "CodeName": "chi_linh"
      },
      {
        "Type": "district",
        "Code": "291",
        "FullName": "Huyện Nam Sách",
        "CodeName": "nam_sach"
      },
      {
        "Type": "district",
        "Code": "292",
        "FullName": "Thị xã Kinh Môn",
        "CodeName": "kinh_mon"
      },
      {
        "Type": "district",
        "Code": "293",
        "FullName": "Huyện Kim Thành",
        "CodeName": "kim_thanh"
      },
      {
        "Type": "district",
        "Code": "294",
        "FullName": "Huyện Thanh Hà",
        "CodeName": "thanh_ha"
      },
      {
        "Type": "district",
        "Code": "295",
        "FullName": "Huyện Cẩm Giàng",
        "CodeName": "cam_giang"
      },
      {
        "Type": "district",
        "Code": "296",
        "FullName": "Huyện Bình Giang",
        "CodeName": "binh_giang"
      },
      {
        "Type": "district",
        "Code": "297",
        "FullName": "Huyện Gia Lộc",
        "CodeName": "gia_loc"
      },
      {
        "Type": "district",
        "Code": "298",
        "FullName": "Huyện Tứ Kỳ",
        "CodeName": "tu_ky"
      },
      {
        "Type": "district",
        "Code": "299",
        "FullName": "Huyện Ninh Giang",
        "CodeName": "ninh_giang"
      },
      {
        "Type": "district",
        "Code": "300",
        "FullName": "Huyện Thanh Miện",
        "CodeName": "thanh_mien"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "31",
    "FullName": "Thành phố Hải Phòng",
    "CodeName": "hai_phong",
    "District": [
      {
        "Type": "district",
        "Code": "303",
        "FullName": "Quận Hồng Bàng",
        "CodeName": "hong_bang"
      },
      {
        "Type": "district",
        "Code": "304",
        "FullName": "Quận Ngô Quyền",
        "CodeName": "ngo_quyen"
      },
      {
        "Type": "district",
        "Code": "305",
        "FullName": "Quận Lê Chân",
        "CodeName": "le_chan"
      },
      {
        "Type": "district",
        "Code": "306",
        "FullName": "Quận Hải An",
        "CodeName": "hai_an"
      },
      {
        "Type": "district",
        "Code": "307",
        "FullName": "Quận Kiến An",
        "CodeName": "kien_an"
      },
      {
        "Type": "district",
        "Code": "308",
        "FullName": "Quận Đồ Sơn",
        "CodeName": "do_son"
      },
      {
        "Type": "district",
        "Code": "309",
        "FullName": "Quận Dương Kinh",
        "CodeName": "duong_kinh"
      },
      {
        "Type": "district",
        "Code": "311",
        "FullName": "Huyện Thuỷ Nguyên",
        "CodeName": "thuy_nguyen"
      },
      {
        "Type": "district",
        "Code": "312",
        "FullName": "Huyện An Dương",
        "CodeName": "an_duong"
      },
      {
        "Type": "district",
        "Code": "313",
        "FullName": "Huyện An Lão",
        "CodeName": "an_lao"
      },
      {
        "Type": "district",
        "Code": "314",
        "FullName": "Huyện Kiến Thuỵ",
        "CodeName": "kien_thuy"
      },
      {
        "Type": "district",
        "Code": "315",
        "FullName": "Huyện Tiên Lãng",
        "CodeName": "tien_lang"
      },
      {
        "Type": "district",
        "Code": "316",
        "FullName": "Huyện Vĩnh Bảo",
        "CodeName": "vinh_bao"
      },
      {
        "Type": "district",
        "Code": "317",
        "FullName": "Huyện Cát Hải",
        "CodeName": "cat_hai"
      },
      {
        "Type": "district",
        "Code": "318",
        "FullName": "Huyện Bạch Long Vĩ",
        "CodeName": "bach_long_vi"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "33",
    "FullName": "Tỉnh Hưng Yên",
    "CodeName": "hung_yen",
    "District": [
      {
        "Type": "district",
        "Code": "323",
        "FullName": "Thành phố Hưng Yên",
        "CodeName": "hung_yen"
      },
      {
        "Type": "district",
        "Code": "325",
        "FullName": "Huyện Văn Lâm",
        "CodeName": "van_lam"
      },
      {
        "Type": "district",
        "Code": "326",
        "FullName": "Huyện Văn Giang",
        "CodeName": "van_giang"
      },
      {
        "Type": "district",
        "Code": "327",
        "FullName": "Huyện Yên Mỹ",
        "CodeName": "yen_my"
      },
      {
        "Type": "district",
        "Code": "328",
        "FullName": "Thị xã Mỹ Hào",
        "CodeName": "my_hao"
      },
      {
        "Type": "district",
        "Code": "329",
        "FullName": "Huyện Ân Thi",
        "CodeName": "an_thi"
      },
      {
        "Type": "district",
        "Code": "330",
        "FullName": "Huyện Khoái Châu",
        "CodeName": "khoai_chau"
      },
      {
        "Type": "district",
        "Code": "331",
        "FullName": "Huyện Kim Động",
        "CodeName": "kim_dong"
      },
      {
        "Type": "district",
        "Code": "332",
        "FullName": "Huyện Tiên Lữ",
        "CodeName": "tien_lu"
      },
      {
        "Type": "district",
        "Code": "333",
        "FullName": "Huyện Phù Cừ",
        "CodeName": "phu_cu"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "34",
    "FullName": "Tỉnh Thái Bình",
    "CodeName": "thai_binh",
    "District": [
      {
        "Type": "district",
        "Code": "336",
        "FullName": "Thành phố Thái Bình",
        "CodeName": "thai_binh"
      },
      {
        "Type": "district",
        "Code": "338",
        "FullName": "Huyện Quỳnh Phụ",
        "CodeName": "quynh_phu"
      },
      {
        "Type": "district",
        "Code": "339",
        "FullName": "Huyện Hưng Hà",
        "CodeName": "hung_ha"
      },
      {
        "Type": "district",
        "Code": "340",
        "FullName": "Huyện Đông Hưng",
        "CodeName": "dong_hung"
      },
      {
        "Type": "district",
        "Code": "341",
        "FullName": "Huyện Thái Thụy",
        "CodeName": "thai_thuy"
      },
      {
        "Type": "district",
        "Code": "342",
        "FullName": "Huyện Tiền Hải",
        "CodeName": "tien_hai"
      },
      {
        "Type": "district",
        "Code": "343",
        "FullName": "Huyện Kiến Xương",
        "CodeName": "kien_xuong"
      },
      {
        "Type": "district",
        "Code": "344",
        "FullName": "Huyện Vũ Thư",
        "CodeName": "vu_thu"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "35",
    "FullName": "Tỉnh Hà Nam",
    "CodeName": "ha_nam",
    "District": [
      {
        "Type": "district",
        "Code": "347",
        "FullName": "Thành phố Phủ Lý",
        "CodeName": "phu_ly"
      },
      {
        "Type": "district",
        "Code": "349",
        "FullName": "Thị xã Duy Tiên",
        "CodeName": "duy_tien"
      },
      {
        "Type": "district",
        "Code": "350",
        "FullName": "Huyện Kim Bảng",
        "CodeName": "kim_bang"
      },
      {
        "Type": "district",
        "Code": "351",
        "FullName": "Huyện Thanh Liêm",
        "CodeName": "thanh_liem"
      },
      {
        "Type": "district",
        "Code": "352",
        "FullName": "Huyện Bình Lục",
        "CodeName": "binh_luc"
      },
      {
        "Type": "district",
        "Code": "353",
        "FullName": "Huyện Lý Nhân",
        "CodeName": "ly_nhan"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "36",
    "FullName": "Tỉnh Nam Định",
    "CodeName": "nam_dinh",
    "District": [
      {
        "Type": "district",
        "Code": "356",
        "FullName": "Thành phố Nam Định",
        "CodeName": "nam_dinh"
      },
      {
        "Type": "district",
        "Code": "359",
        "FullName": "Huyện Vụ Bản",
        "CodeName": "vu_ban"
      },
      {
        "Type": "district",
        "Code": "360",
        "FullName": "Huyện Ý Yên",
        "CodeName": "y_yen"
      },
      {
        "Type": "district",
        "Code": "361",
        "FullName": "Huyện Nghĩa Hưng",
        "CodeName": "nghia_hung"
      },
      {
        "Type": "district",
        "Code": "362",
        "FullName": "Huyện Nam Trực",
        "CodeName": "nam_truc"
      },
      {
        "Type": "district",
        "Code": "363",
        "FullName": "Huyện Trực Ninh",
        "CodeName": "truc_ninh"
      },
      {
        "Type": "district",
        "Code": "364",
        "FullName": "Huyện Xuân Trường",
        "CodeName": "xuan_truong"
      },
      {
        "Type": "district",
        "Code": "365",
        "FullName": "Huyện Giao Thủy",
        "CodeName": "giao_thuy"
      },
      {
        "Type": "district",
        "Code": "366",
        "FullName": "Huyện Hải Hậu",
        "CodeName": "hai_hau"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "37",
    "FullName": "Tỉnh Ninh Bình",
    "CodeName": "ninh_binh",
    "District": [
      {
        "Type": "district",
        "Code": "369",
        "FullName": "Thành phố Ninh Bình",
        "CodeName": "ninh_binh"
      },
      {
        "Type": "district",
        "Code": "370",
        "FullName": "Thành phố Tam Điệp",
        "CodeName": "tam_diep"
      },
      {
        "Type": "district",
        "Code": "372",
        "FullName": "Huyện Nho Quan",
        "CodeName": "nho_quan"
      },
      {
        "Type": "district",
        "Code": "373",
        "FullName": "Huyện Gia Viễn",
        "CodeName": "gia_vien"
      },
      {
        "Type": "district",
        "Code": "374",
        "FullName": "Huyện Hoa Lư",
        "CodeName": "hoa_lu"
      },
      {
        "Type": "district",
        "Code": "375",
        "FullName": "Huyện Yên Khánh",
        "CodeName": "yen_khanh"
      },
      {
        "Type": "district",
        "Code": "376",
        "FullName": "Huyện Kim Sơn",
        "CodeName": "kim_son"
      },
      {
        "Type": "district",
        "Code": "377",
        "FullName": "Huyện Yên Mô",
        "CodeName": "yen_mo"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "38",
    "FullName": "Tỉnh Thanh Hóa",
    "CodeName": "thanh_hoa",
    "District": [
      {
        "Type": "district",
        "Code": "380",
        "FullName": "Thành phố Thanh Hóa",
        "CodeName": "thanh_hoa"
      },
      {
        "Type": "district",
        "Code": "381",
        "FullName": "Thị xã Bỉm Sơn",
        "CodeName": "bim_son"
      },
      {
        "Type": "district",
        "Code": "382",
        "FullName": "Thành phố Sầm Sơn",
        "CodeName": "sam_son"
      },
      {
        "Type": "district",
        "Code": "384",
        "FullName": "Huyện Mường Lát",
        "CodeName": "muong_lat"
      },
      {
        "Type": "district",
        "Code": "385",
        "FullName": "Huyện Quan Hóa",
        "CodeName": "quan_hoa"
      },
      {
        "Type": "district",
        "Code": "386",
        "FullName": "Huyện Bá Thước",
        "CodeName": "ba_thuoc"
      },
      {
        "Type": "district",
        "Code": "387",
        "FullName": "Huyện Quan Sơn",
        "CodeName": "quan_son"
      },
      {
        "Type": "district",
        "Code": "388",
        "FullName": "Huyện Lang Chánh",
        "CodeName": "lang_chanh"
      },
      {
        "Type": "district",
        "Code": "389",
        "FullName": "Huyện Ngọc Lặc",
        "CodeName": "ngoc_lac"
      },
      {
        "Type": "district",
        "Code": "390",
        "FullName": "Huyện Cẩm Thủy",
        "CodeName": "cam_thuy"
      },
      {
        "Type": "district",
        "Code": "391",
        "FullName": "Huyện Thạch Thành",
        "CodeName": "thach_thanh"
      },
      {
        "Type": "district",
        "Code": "392",
        "FullName": "Huyện Hà Trung",
        "CodeName": "ha_trung"
      },
      {
        "Type": "district",
        "Code": "393",
        "FullName": "Huyện Vĩnh Lộc",
        "CodeName": "vinh_loc"
      },
      {
        "Type": "district",
        "Code": "394",
        "FullName": "Huyện Yên Định",
        "CodeName": "yen_dinh"
      },
      {
        "Type": "district",
        "Code": "395",
        "FullName": "Huyện Thọ Xuân",
        "CodeName": "tho_xuan"
      },
      {
        "Type": "district",
        "Code": "396",
        "FullName": "Huyện Thường Xuân",
        "CodeName": "thuong_xuan"
      },
      {
        "Type": "district",
        "Code": "397",
        "FullName": "Huyện Triệu Sơn",
        "CodeName": "trieu_son"
      },
      {
        "Type": "district",
        "Code": "398",
        "FullName": "Huyện Thiệu Hóa",
        "CodeName": "thieu_hoa"
      },
      {
        "Type": "district",
        "Code": "399",
        "FullName": "Huyện Hoằng Hóa",
        "CodeName": "hoang_hoa"
      },
      {
        "Type": "district",
        "Code": "400",
        "FullName": "Huyện Hậu Lộc",
        "CodeName": "hau_loc"
      },
      {
        "Type": "district",
        "Code": "401",
        "FullName": "Huyện Nga Sơn",
        "CodeName": "nga_son"
      },
      {
        "Type": "district",
        "Code": "402",
        "FullName": "Huyện Như Xuân",
        "CodeName": "nhu_xuan"
      },
      {
        "Type": "district",
        "Code": "403",
        "FullName": "Huyện Như Thanh",
        "CodeName": "nhu_thanh"
      },
      {
        "Type": "district",
        "Code": "404",
        "FullName": "Huyện Nông Cống",
        "CodeName": "nong_cong"
      },
      {
        "Type": "district",
        "Code": "405",
        "FullName": "Huyện Đông Sơn",
        "CodeName": "dong_son"
      },
      {
        "Type": "district",
        "Code": "406",
        "FullName": "Huyện Quảng Xương",
        "CodeName": "quang_xuong"
      },
      {
        "Type": "district",
        "Code": "407",
        "FullName": "Thị xã Nghi Sơn",
        "CodeName": "nghi_son"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "40",
    "FullName": "Tỉnh Nghệ An",
    "CodeName": "nghe_an",
    "District": [
      {
        "Type": "district",
        "Code": "412",
        "FullName": "Thành phố Vinh",
        "CodeName": "vinh"
      },
      {
        "Type": "district",
        "Code": "413",
        "FullName": "Thị xã Cửa Lò",
        "CodeName": "cua_lo"
      },
      {
        "Type": "district",
        "Code": "414",
        "FullName": "Thị xã Thái Hoà",
        "CodeName": "thai_hoa"
      },
      {
        "Type": "district",
        "Code": "415",
        "FullName": "Huyện Quế Phong",
        "CodeName": "que_phong"
      },
      {
        "Type": "district",
        "Code": "416",
        "FullName": "Huyện Quỳ Châu",
        "CodeName": "quy_chau"
      },
      {
        "Type": "district",
        "Code": "417",
        "FullName": "Huyện Kỳ Sơn",
        "CodeName": "ky_son"
      },
      {
        "Type": "district",
        "Code": "418",
        "FullName": "Huyện Tương Dương",
        "CodeName": "tuong_duong"
      },
      {
        "Type": "district",
        "Code": "419",
        "FullName": "Huyện Nghĩa Đàn",
        "CodeName": "nghia_dan"
      },
      {
        "Type": "district",
        "Code": "420",
        "FullName": "Huyện Quỳ Hợp",
        "CodeName": "quy_hop"
      },
      {
        "Type": "district",
        "Code": "421",
        "FullName": "Huyện Quỳnh Lưu",
        "CodeName": "quynh_luu"
      },
      {
        "Type": "district",
        "Code": "422",
        "FullName": "Huyện Con Cuông",
        "CodeName": "con_cuong"
      },
      {
        "Type": "district",
        "Code": "423",
        "FullName": "Huyện Tân Kỳ",
        "CodeName": "tan_ky"
      },
      {
        "Type": "district",
        "Code": "424",
        "FullName": "Huyện Anh Sơn",
        "CodeName": "anh_son"
      },
      {
        "Type": "district",
        "Code": "425",
        "FullName": "Huyện Diễn Châu",
        "CodeName": "dien_chau"
      },
      {
        "Type": "district",
        "Code": "426",
        "FullName": "Huyện Yên Thành",
        "CodeName": "yen_thanh"
      },
      {
        "Type": "district",
        "Code": "427",
        "FullName": "Huyện Đô Lương",
        "CodeName": "do_luong"
      },
      {
        "Type": "district",
        "Code": "428",
        "FullName": "Huyện Thanh Chương",
        "CodeName": "thanh_chuong"
      },
      {
        "Type": "district",
        "Code": "429",
        "FullName": "Huyện Nghi Lộc",
        "CodeName": "nghi_loc"
      },
      {
        "Type": "district",
        "Code": "430",
        "FullName": "Huyện Nam Đàn",
        "CodeName": "nam_dan"
      },
      {
        "Type": "district",
        "Code": "431",
        "FullName": "Huyện Hưng Nguyên",
        "CodeName": "hung_nguyen"
      },
      {
        "Type": "district",
        "Code": "432",
        "FullName": "Thị xã Hoàng Mai",
        "CodeName": "hoang_mai"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "42",
    "FullName": "Tỉnh Hà Tĩnh",
    "CodeName": "ha_tinh",
    "District": [
      {
        "Type": "district",
        "Code": "436",
        "FullName": "Thành phố Hà Tĩnh",
        "CodeName": "ha_tinh"
      },
      {
        "Type": "district",
        "Code": "437",
        "FullName": "Thị xã Hồng Lĩnh",
        "CodeName": "hong_linh"
      },
      {
        "Type": "district",
        "Code": "439",
        "FullName": "Huyện Hương Sơn",
        "CodeName": "huong_son"
      },
      {
        "Type": "district",
        "Code": "440",
        "FullName": "Huyện Đức Thọ",
        "CodeName": "duc_tho"
      },
      {
        "Type": "district",
        "Code": "441",
        "FullName": "Huyện Vũ Quang",
        "CodeName": "vu_quang"
      },
      {
        "Type": "district",
        "Code": "442",
        "FullName": "Huyện Nghi Xuân",
        "CodeName": "nghi_xuan"
      },
      {
        "Type": "district",
        "Code": "443",
        "FullName": "Huyện Can Lộc",
        "CodeName": "can_loc"
      },
      {
        "Type": "district",
        "Code": "444",
        "FullName": "Huyện Hương Khê",
        "CodeName": "huong_khe"
      },
      {
        "Type": "district",
        "Code": "445",
        "FullName": "Huyện Thạch Hà",
        "CodeName": "thach_ha"
      },
      {
        "Type": "district",
        "Code": "446",
        "FullName": "Huyện Cẩm Xuyên",
        "CodeName": "cam_xuyen"
      },
      {
        "Type": "district",
        "Code": "447",
        "FullName": "Huyện Kỳ Anh",
        "CodeName": "ky_anh"
      },
      {
        "Type": "district",
        "Code": "448",
        "FullName": "Huyện Lộc Hà",
        "CodeName": "loc_ha"
      },
      {
        "Type": "district",
        "Code": "449",
        "FullName": "Thị xã Kỳ Anh",
        "CodeName": "ky_anh"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "44",
    "FullName": "Tỉnh Quảng Bình",
    "CodeName": "quang_binh",
    "District": [
      {
        "Type": "district",
        "Code": "450",
        "FullName": "Thành phố Đồng Hới",
        "CodeName": "dong_hoi"
      },
      {
        "Type": "district",
        "Code": "452",
        "FullName": "Huyện Minh Hóa",
        "CodeName": "minh_hoa"
      },
      {
        "Type": "district",
        "Code": "453",
        "FullName": "Huyện Tuyên Hóa",
        "CodeName": "tuyen_hoa"
      },
      {
        "Type": "district",
        "Code": "454",
        "FullName": "Huyện Quảng Trạch",
        "CodeName": "quang_trach"
      },
      {
        "Type": "district",
        "Code": "455",
        "FullName": "Huyện Bố Trạch",
        "CodeName": "bo_trach"
      },
      {
        "Type": "district",
        "Code": "456",
        "FullName": "Huyện Quảng Ninh",
        "CodeName": "quang_ninh"
      },
      {
        "Type": "district",
        "Code": "457",
        "FullName": "Huyện Lệ Thủy",
        "CodeName": "le_thuy"
      },
      {
        "Type": "district",
        "Code": "458",
        "FullName": "Thị xã Ba Đồn",
        "CodeName": "ba_don"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "45",
    "FullName": "Tỉnh Quảng Trị",
    "CodeName": "quang_tri",
    "District": [
      {
        "Type": "district",
        "Code": "461",
        "FullName": "Thành phố Đông Hà",
        "CodeName": "dong_ha"
      },
      {
        "Type": "district",
        "Code": "462",
        "FullName": "Thị xã Quảng Trị",
        "CodeName": "quang_tri"
      },
      {
        "Type": "district",
        "Code": "464",
        "FullName": "Huyện Vĩnh Linh",
        "CodeName": "vinh_linh"
      },
      {
        "Type": "district",
        "Code": "465",
        "FullName": "Huyện Hướng Hóa",
        "CodeName": "huong_hoa"
      },
      {
        "Type": "district",
        "Code": "466",
        "FullName": "Huyện Gio Linh",
        "CodeName": "gio_linh"
      },
      {
        "Type": "district",
        "Code": "467",
        "FullName": "Huyện Đa Krông",
        "CodeName": "da_krong"
      },
      {
        "Type": "district",
        "Code": "468",
        "FullName": "Huyện Cam Lộ",
        "CodeName": "cam_lo"
      },
      {
        "Type": "district",
        "Code": "469",
        "FullName": "Huyện Triệu Phong",
        "CodeName": "trieu_phong"
      },
      {
        "Type": "district",
        "Code": "470",
        "FullName": "Huyện Hải Lăng",
        "CodeName": "hai_lang"
      },
      {
        "Type": "district",
        "Code": "471",
        "FullName": "Huyện Cồn Cỏ",
        "CodeName": "con_co"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "46",
    "FullName": "Tỉnh Thừa Thiên Huế",
    "CodeName": "thua_thien_hue",
    "District": [
      {
        "Type": "district",
        "Code": "474",
        "FullName": "Thành phố Huế",
        "CodeName": "hue"
      },
      {
        "Type": "district",
        "Code": "476",
        "FullName": "Huyện Phong Điền",
        "CodeName": "phong_dien"
      },
      {
        "Type": "district",
        "Code": "477",
        "FullName": "Huyện Quảng Điền",
        "CodeName": "quang_dien"
      },
      {
        "Type": "district",
        "Code": "478",
        "FullName": "Huyện Phú Vang",
        "CodeName": "phu_vang"
      },
      {
        "Type": "district",
        "Code": "479",
        "FullName": "Thị xã Hương Thủy",
        "CodeName": "huong_thuy"
      },
      {
        "Type": "district",
        "Code": "480",
        "FullName": "Thị xã Hương Trà",
        "CodeName": "huong_tra"
      },
      {
        "Type": "district",
        "Code": "481",
        "FullName": "Huyện A Lưới",
        "CodeName": "a_luoi"
      },
      {
        "Type": "district",
        "Code": "482",
        "FullName": "Huyện Phú Lộc",
        "CodeName": "phu_loc"
      },
      {
        "Type": "district",
        "Code": "483",
        "FullName": "Huyện Nam Đông",
        "CodeName": "nam_dong"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "48",
    "FullName": "Thành phố Đà Nẵng",
    "CodeName": "da_nang",
    "District": [
      {
        "Type": "district",
        "Code": "490",
        "FullName": "Quận Liên Chiểu",
        "CodeName": "lien_chieu"
      },
      {
        "Type": "district",
        "Code": "491",
        "FullName": "Quận Thanh Khê",
        "CodeName": "thanh_khe"
      },
      {
        "Type": "district",
        "Code": "492",
        "FullName": "Quận Hải Châu",
        "CodeName": "hai_chau"
      },
      {
        "Type": "district",
        "Code": "493",
        "FullName": "Quận Sơn Trà",
        "CodeName": "son_tra"
      },
      {
        "Type": "district",
        "Code": "494",
        "FullName": "Quận Ngũ Hành Sơn",
        "CodeName": "ngu_hanh_son"
      },
      {
        "Type": "district",
        "Code": "495",
        "FullName": "Quận Cẩm Lệ",
        "CodeName": "cam_le"
      },
      {
        "Type": "district",
        "Code": "497",
        "FullName": "Huyện Hòa Vang",
        "CodeName": "hoa_vang"
      },
      {
        "Type": "district",
        "Code": "498",
        "FullName": "Huyện Hoàng Sa",
        "CodeName": "hoang_sa"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "49",
    "FullName": "Tỉnh Quảng Nam",
    "CodeName": "quang_nam",
    "District": [
      {
        "Type": "district",
        "Code": "502",
        "FullName": "Thành phố Tam Kỳ",
        "CodeName": "tam_ky"
      },
      {
        "Type": "district",
        "Code": "503",
        "FullName": "Thành phố Hội An",
        "CodeName": "hoi_an"
      },
      {
        "Type": "district",
        "Code": "504",
        "FullName": "Huyện Tây Giang",
        "CodeName": "tay_giang"
      },
      {
        "Type": "district",
        "Code": "505",
        "FullName": "Huyện Đông Giang",
        "CodeName": "dong_giang"
      },
      {
        "Type": "district",
        "Code": "506",
        "FullName": "Huyện Đại Lộc",
        "CodeName": "dai_loc"
      },
      {
        "Type": "district",
        "Code": "507",
        "FullName": "Thị xã Điện Bàn",
        "CodeName": "dien_ban"
      },
      {
        "Type": "district",
        "Code": "508",
        "FullName": "Huyện Duy Xuyên",
        "CodeName": "duy_xuyen"
      },
      {
        "Type": "district",
        "Code": "509",
        "FullName": "Huyện Quế Sơn",
        "CodeName": "que_son"
      },
      {
        "Type": "district",
        "Code": "510",
        "FullName": "Huyện Nam Giang",
        "CodeName": "nam_giang"
      },
      {
        "Type": "district",
        "Code": "511",
        "FullName": "Huyện Phước Sơn",
        "CodeName": "phuoc_son"
      },
      {
        "Type": "district",
        "Code": "512",
        "FullName": "Huyện Hiệp Đức",
        "CodeName": "hiep_duc"
      },
      {
        "Type": "district",
        "Code": "513",
        "FullName": "Huyện Thăng Bình",
        "CodeName": "thang_binh"
      },
      {
        "Type": "district",
        "Code": "514",
        "FullName": "Huyện Tiên Phước",
        "CodeName": "tien_phuoc"
      },
      {
        "Type": "district",
        "Code": "515",
        "FullName": "Huyện Bắc Trà My",
        "CodeName": "bac_tra_my"
      },
      {
        "Type": "district",
        "Code": "516",
        "FullName": "Huyện Nam Trà My",
        "CodeName": "nam_tra_my"
      },
      {
        "Type": "district",
        "Code": "517",
        "FullName": "Huyện Núi Thành",
        "CodeName": "nui_thanh"
      },
      {
        "Type": "district",
        "Code": "518",
        "FullName": "Huyện Phú Ninh",
        "CodeName": "phu_ninh"
      },
      {
        "Type": "district",
        "Code": "519",
        "FullName": "Huyện Nông Sơn",
        "CodeName": "nong_son"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "51",
    "FullName": "Tỉnh Quảng Ngãi",
    "CodeName": "quang_ngai",
    "District": [
      {
        "Type": "district",
        "Code": "522",
        "FullName": "Thành phố Quảng Ngãi",
        "CodeName": "quang_ngai"
      },
      {
        "Type": "district",
        "Code": "524",
        "FullName": "Huyện Bình Sơn",
        "CodeName": "binh_son"
      },
      {
        "Type": "district",
        "Code": "525",
        "FullName": "Huyện Trà Bồng",
        "CodeName": "tra_bong"
      },
      {
        "Type": "district",
        "Code": "527",
        "FullName": "Huyện Sơn Tịnh",
        "CodeName": "son_tinh"
      },
      {
        "Type": "district",
        "Code": "528",
        "FullName": "Huyện Tư Nghĩa",
        "CodeName": "tu_nghia"
      },
      {
        "Type": "district",
        "Code": "529",
        "FullName": "Huyện Sơn Hà",
        "CodeName": "son_ha"
      },
      {
        "Type": "district",
        "Code": "530",
        "FullName": "Huyện Sơn Tây",
        "CodeName": "son_tay"
      },
      {
        "Type": "district",
        "Code": "531",
        "FullName": "Huyện Minh Long",
        "CodeName": "minh_long"
      },
      {
        "Type": "district",
        "Code": "532",
        "FullName": "Huyện Nghĩa Hành",
        "CodeName": "nghia_hanh"
      },
      {
        "Type": "district",
        "Code": "533",
        "FullName": "Huyện Mộ Đức",
        "CodeName": "mo_duc"
      },
      {
        "Type": "district",
        "Code": "534",
        "FullName": "Thị xã Đức Phổ",
        "CodeName": "duc_pho"
      },
      {
        "Type": "district",
        "Code": "535",
        "FullName": "Huyện Ba Tơ",
        "CodeName": "ba_to"
      },
      {
        "Type": "district",
        "Code": "536",
        "FullName": "Huyện Lý Sơn",
        "CodeName": "ly_son"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "52",
    "FullName": "Tỉnh Bình Định",
    "CodeName": "binh_dinh",
    "District": [
      {
        "Type": "district",
        "Code": "540",
        "FullName": "Thành phố Quy Nhơn",
        "CodeName": "quy_nhon"
      },
      {
        "Type": "district",
        "Code": "542",
        "FullName": "Huyện An Lão",
        "CodeName": "an_lao"
      },
      {
        "Type": "district",
        "Code": "543",
        "FullName": "Thị xã Hoài Nhơn",
        "CodeName": "hoai_nhon"
      },
      {
        "Type": "district",
        "Code": "544",
        "FullName": "Huyện Hoài Ân",
        "CodeName": "hoai_an"
      },
      {
        "Type": "district",
        "Code": "545",
        "FullName": "Huyện Phù Mỹ",
        "CodeName": "phu_my"
      },
      {
        "Type": "district",
        "Code": "546",
        "FullName": "Huyện Vĩnh Thạnh",
        "CodeName": "vinh_thanh"
      },
      {
        "Type": "district",
        "Code": "547",
        "FullName": "Huyện Tây Sơn",
        "CodeName": "tay_son"
      },
      {
        "Type": "district",
        "Code": "548",
        "FullName": "Huyện Phù Cát",
        "CodeName": "phu_cat"
      },
      {
        "Type": "district",
        "Code": "549",
        "FullName": "Thị xã An Nhơn",
        "CodeName": "an_nhon"
      },
      {
        "Type": "district",
        "Code": "550",
        "FullName": "Huyện Tuy Phước",
        "CodeName": "tuy_phuoc"
      },
      {
        "Type": "district",
        "Code": "551",
        "FullName": "Huyện Vân Canh",
        "CodeName": "van_canh"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "54",
    "FullName": "Tỉnh Phú Yên",
    "CodeName": "phu_yen",
    "District": [
      {
        "Type": "district",
        "Code": "555",
        "FullName": "Thành phố Tuy Hoà",
        "CodeName": "tuy_hoa"
      },
      {
        "Type": "district",
        "Code": "557",
        "FullName": "Thị xã Sông Cầu",
        "CodeName": "song_cau"
      },
      {
        "Type": "district",
        "Code": "558",
        "FullName": "Huyện Đồng Xuân",
        "CodeName": "dong_xuan"
      },
      {
        "Type": "district",
        "Code": "559",
        "FullName": "Huyện Tuy An",
        "CodeName": "tuy_an"
      },
      {
        "Type": "district",
        "Code": "560",
        "FullName": "Huyện Sơn Hòa",
        "CodeName": "son_hoa"
      },
      {
        "Type": "district",
        "Code": "561",
        "FullName": "Huyện Sông Hinh",
        "CodeName": "song_hinh"
      },
      {
        "Type": "district",
        "Code": "562",
        "FullName": "Huyện Tây Hoà",
        "CodeName": "tay_hoa"
      },
      {
        "Type": "district",
        "Code": "563",
        "FullName": "Huyện Phú Hoà",
        "CodeName": "phu_hoa"
      },
      {
        "Type": "district",
        "Code": "564",
        "FullName": "Thị xã Đông Hòa",
        "CodeName": "dong_hoa"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "56",
    "FullName": "Tỉnh Khánh Hòa",
    "CodeName": "khanh_hoa",
    "District": [
      {
        "Type": "district",
        "Code": "568",
        "FullName": "Thành phố Nha Trang",
        "CodeName": "nha_trang"
      },
      {
        "Type": "district",
        "Code": "569",
        "FullName": "Thành phố Cam Ranh",
        "CodeName": "cam_ranh"
      },
      {
        "Type": "district",
        "Code": "570",
        "FullName": "Huyện Cam Lâm",
        "CodeName": "cam_lam"
      },
      {
        "Type": "district",
        "Code": "571",
        "FullName": "Huyện Vạn Ninh",
        "CodeName": "van_ninh"
      },
      {
        "Type": "district",
        "Code": "572",
        "FullName": "Thị xã Ninh Hòa",
        "CodeName": "ninh_hoa"
      },
      {
        "Type": "district",
        "Code": "573",
        "FullName": "Huyện Khánh Vĩnh",
        "CodeName": "khanh_vinh"
      },
      {
        "Type": "district",
        "Code": "574",
        "FullName": "Huyện Diên Khánh",
        "CodeName": "dien_khanh"
      },
      {
        "Type": "district",
        "Code": "575",
        "FullName": "Huyện Khánh Sơn",
        "CodeName": "khanh_son"
      },
      {
        "Type": "district",
        "Code": "576",
        "FullName": "Huyện Trường Sa",
        "CodeName": "truong_sa"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "58",
    "FullName": "Tỉnh Ninh Thuận",
    "CodeName": "ninh_thuan",
    "District": [
      {
        "Type": "district",
        "Code": "582",
        "FullName": "Thành phố Phan Rang-Tháp Chàm",
        "CodeName": "phan_rang-thap_cham"
      },
      {
        "Type": "district",
        "Code": "584",
        "FullName": "Huyện Bác Ái",
        "CodeName": "bac_ai"
      },
      {
        "Type": "district",
        "Code": "585",
        "FullName": "Huyện Ninh Sơn",
        "CodeName": "ninh_son"
      },
      {
        "Type": "district",
        "Code": "586",
        "FullName": "Huyện Ninh Hải",
        "CodeName": "ninh_hai"
      },
      {
        "Type": "district",
        "Code": "587",
        "FullName": "Huyện Ninh Phước",
        "CodeName": "ninh_phuoc"
      },
      {
        "Type": "district",
        "Code": "588",
        "FullName": "Huyện Thuận Bắc",
        "CodeName": "thuan_bac"
      },
      {
        "Type": "district",
        "Code": "589",
        "FullName": "Huyện Thuận Nam",
        "CodeName": "thuan_nam"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "60",
    "FullName": "Tỉnh Bình Thuận",
    "CodeName": "binh_thuan",
    "District": [
      {
        "Type": "district",
        "Code": "593",
        "FullName": "Thành phố Phan Thiết",
        "CodeName": "phan_thiet"
      },
      {
        "Type": "district",
        "Code": "594",
        "FullName": "Thị xã La Gi",
        "CodeName": "la_gi"
      },
      {
        "Type": "district",
        "Code": "595",
        "FullName": "Huyện Tuy Phong",
        "CodeName": "tuy_phong"
      },
      {
        "Type": "district",
        "Code": "596",
        "FullName": "Huyện Bắc Bình",
        "CodeName": "bac_binh"
      },
      {
        "Type": "district",
        "Code": "597",
        "FullName": "Huyện Hàm Thuận Bắc",
        "CodeName": "ham_thuan_bac"
      },
      {
        "Type": "district",
        "Code": "598",
        "FullName": "Huyện Hàm Thuận Nam",
        "CodeName": "ham_thuan_nam"
      },
      {
        "Type": "district",
        "Code": "599",
        "FullName": "Huyện Tánh Linh",
        "CodeName": "tanh_linh"
      },
      {
        "Type": "district",
        "Code": "600",
        "FullName": "Huyện Đức Linh",
        "CodeName": "duc_linh"
      },
      {
        "Type": "district",
        "Code": "601",
        "FullName": "Huyện Hàm Tân",
        "CodeName": "ham_tan"
      },
      {
        "Type": "district",
        "Code": "602",
        "FullName": "Huyện Phú Quí",
        "CodeName": "phu_qui"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "62",
    "FullName": "Tỉnh Kon Tum",
    "CodeName": "kon_tum",
    "District": [
      {
        "Type": "district",
        "Code": "615",
        "FullName": "Huyện Đắk Hà",
        "CodeName": "dak_ha"
      },
      {
        "Type": "district",
        "Code": "608",
        "FullName": "Thành phố Kon Tum",
        "CodeName": "kon_tum"
      },
      {
        "Type": "district",
        "Code": "610",
        "FullName": "Huyện Đắk Glei",
        "CodeName": "dak_glei"
      },
      {
        "Type": "district",
        "Code": "611",
        "FullName": "Huyện Ngọc Hồi",
        "CodeName": "ngoc_hoi"
      },
      {
        "Type": "district",
        "Code": "612",
        "FullName": "Huyện Đắk Tô",
        "CodeName": "dak_to"
      },
      {
        "Type": "district",
        "Code": "613",
        "FullName": "Huyện Kon Plông",
        "CodeName": "kon_plong"
      },
      {
        "Type": "district",
        "Code": "614",
        "FullName": "Huyện Kon Rẫy",
        "CodeName": "kon_ray"
      },
      {
        "Type": "district",
        "Code": "616",
        "FullName": "Huyện Sa Thầy",
        "CodeName": "sa_thay"
      },
      {
        "Type": "district",
        "Code": "617",
        "FullName": "Huyện Tu Mơ Rông",
        "CodeName": "tu_mo_rong"
      },
      {
        "Type": "district",
        "Code": "618",
        "FullName": "Huyện Ia H' Drai",
        "CodeName": "ia_h_drai"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "64",
    "FullName": "Tỉnh Gia Lai",
    "CodeName": "gia_lai",
    "District": [
      {
        "Type": "district",
        "Code": "622",
        "FullName": "Thành phố Pleiku",
        "CodeName": "pleiku"
      },
      {
        "Type": "district",
        "Code": "623",
        "FullName": "Thị xã An Khê",
        "CodeName": "an_khe"
      },
      {
        "Type": "district",
        "Code": "624",
        "FullName": "Thị xã Ayun Pa",
        "CodeName": "ayun_pa"
      },
      {
        "Type": "district",
        "Code": "625",
        "FullName": "Huyện KBang",
        "CodeName": "kbang"
      },
      {
        "Type": "district",
        "Code": "626",
        "FullName": "Huyện Đăk Đoa",
        "CodeName": "dak_doa"
      },
      {
        "Type": "district",
        "Code": "627",
        "FullName": "Huyện Chư Păh",
        "CodeName": "chu_pah"
      },
      {
        "Type": "district",
        "Code": "628",
        "FullName": "Huyện Ia Grai",
        "CodeName": "ia_grai"
      },
      {
        "Type": "district",
        "Code": "629",
        "FullName": "Huyện Mang Yang",
        "CodeName": "mang_yang"
      },
      {
        "Type": "district",
        "Code": "630",
        "FullName": "Huyện Kông Chro",
        "CodeName": "kong_chro"
      },
      {
        "Type": "district",
        "Code": "631",
        "FullName": "Huyện Đức Cơ",
        "CodeName": "duc_co"
      },
      {
        "Type": "district",
        "Code": "632",
        "FullName": "Huyện Chư Prông",
        "CodeName": "chu_prong"
      },
      {
        "Type": "district",
        "Code": "633",
        "FullName": "Huyện Chư Sê",
        "CodeName": "chu_se"
      },
      {
        "Type": "district",
        "Code": "634",
        "FullName": "Huyện Đăk Pơ",
        "CodeName": "dak_po"
      },
      {
        "Type": "district",
        "Code": "635",
        "FullName": "Huyện Ia Pa",
        "CodeName": "ia_pa"
      },
      {
        "Type": "district",
        "Code": "637",
        "FullName": "Huyện Krông Pa",
        "CodeName": "krong_pa"
      },
      {
        "Type": "district",
        "Code": "638",
        "FullName": "Huyện Phú Thiện",
        "CodeName": "phu_thien"
      },
      {
        "Type": "district",
        "Code": "639",
        "FullName": "Huyện Chư Pưh",
        "CodeName": "chu_puh"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "66",
    "FullName": "Tỉnh Đắk Lắk",
    "CodeName": "dak_lak",
    "District": [
      {
        "Type": "district",
        "Code": "643",
        "FullName": "Thành phố Buôn Ma Thuột",
        "CodeName": "buon_ma_thuot"
      },
      {
        "Type": "district",
        "Code": "644",
        "FullName": "Thị xã Buôn Hồ",
        "CodeName": "buon_ho"
      },
      {
        "Type": "district",
        "Code": "645",
        "FullName": "Huyện Ea H'leo",
        "CodeName": "ea_hleo"
      },
      {
        "Type": "district",
        "Code": "646",
        "FullName": "Huyện Ea Súp",
        "CodeName": "ea_sup"
      },
      {
        "Type": "district",
        "Code": "647",
        "FullName": "Huyện Buôn Đôn",
        "CodeName": "buon_don"
      },
      {
        "Type": "district",
        "Code": "648",
        "FullName": "Huyện Cư M'gar",
        "CodeName": "cu_mgar"
      },
      {
        "Type": "district",
        "Code": "649",
        "FullName": "Huyện Krông Búk",
        "CodeName": "krong_buk"
      },
      {
        "Type": "district",
        "Code": "650",
        "FullName": "Huyện Krông Năng",
        "CodeName": "krong_nang"
      },
      {
        "Type": "district",
        "Code": "651",
        "FullName": "Huyện Ea Kar",
        "CodeName": "ea_kar"
      },
      {
        "Type": "district",
        "Code": "652",
        "FullName": "Huyện M'Đrắk",
        "CodeName": "mdrak"
      },
      {
        "Type": "district",
        "Code": "653",
        "FullName": "Huyện Krông Bông",
        "CodeName": "krong_bong"
      },
      {
        "Type": "district",
        "Code": "654",
        "FullName": "Huyện Krông Pắc",
        "CodeName": "krong_pac"
      },
      {
        "Type": "district",
        "Code": "655",
        "FullName": "Huyện Krông A Na",
        "CodeName": "krong_a_na"
      },
      {
        "Type": "district",
        "Code": "656",
        "FullName": "Huyện Lắk",
        "CodeName": "lak"
      },
      {
        "Type": "district",
        "Code": "657",
        "FullName": "Huyện Cư Kuin",
        "CodeName": "cu_kuin"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "67",
    "FullName": "Tỉnh Đắk Nông",
    "CodeName": "dak_nong",
    "District": [
      {
        "Type": "district",
        "Code": "660",
        "FullName": "Thành phố Gia Nghĩa",
        "CodeName": "gia_nghia"
      },
      {
        "Type": "district",
        "Code": "661",
        "FullName": "Huyện Đăk Glong",
        "CodeName": "dak_glong"
      },
      {
        "Type": "district",
        "Code": "662",
        "FullName": "Huyện Cư Jút",
        "CodeName": "cu_jut"
      },
      {
        "Type": "district",
        "Code": "663",
        "FullName": "Huyện Đắk Mil",
        "CodeName": "dak_mil"
      },
      {
        "Type": "district",
        "Code": "664",
        "FullName": "Huyện Krông Nô",
        "CodeName": "krong_no"
      },
      {
        "Type": "district",
        "Code": "665",
        "FullName": "Huyện Đắk Song",
        "CodeName": "dak_song"
      },
      {
        "Type": "district",
        "Code": "666",
        "FullName": "Huyện Đắk R'Lấp",
        "CodeName": "dak_rlap"
      },
      {
        "Type": "district",
        "Code": "667",
        "FullName": "Huyện Tuy Đức",
        "CodeName": "tuy_duc"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "68",
    "FullName": "Tỉnh Lâm Đồng",
    "CodeName": "lam_dong",
    "District": [
      {
        "Type": "district",
        "Code": "672",
        "FullName": "Thành phố Đà Lạt",
        "CodeName": "da_lat"
      },
      {
        "Type": "district",
        "Code": "673",
        "FullName": "Thành phố Bảo Lộc",
        "CodeName": "bao_loc"
      },
      {
        "Type": "district",
        "Code": "674",
        "FullName": "Huyện Đam Rông",
        "CodeName": "dam_rong"
      },
      {
        "Type": "district",
        "Code": "675",
        "FullName": "Huyện Lạc Dương",
        "CodeName": "lac_duong"
      },
      {
        "Type": "district",
        "Code": "676",
        "FullName": "Huyện Lâm Hà",
        "CodeName": "lam_ha"
      },
      {
        "Type": "district",
        "Code": "677",
        "FullName": "Huyện Đơn Dương",
        "CodeName": "don_duong"
      },
      {
        "Type": "district",
        "Code": "678",
        "FullName": "Huyện Đức Trọng",
        "CodeName": "duc_trong"
      },
      {
        "Type": "district",
        "Code": "679",
        "FullName": "Huyện Di Linh",
        "CodeName": "di_linh"
      },
      {
        "Type": "district",
        "Code": "680",
        "FullName": "Huyện Bảo Lâm",
        "CodeName": "bao_lam"
      },
      {
        "Type": "district",
        "Code": "681",
        "FullName": "Huyện Đạ Huoai",
        "CodeName": "da_huoai"
      },
      {
        "Type": "district",
        "Code": "682",
        "FullName": "Huyện Đạ Tẻh",
        "CodeName": "da_teh"
      },
      {
        "Type": "district",
        "Code": "683",
        "FullName": "Huyện Cát Tiên",
        "CodeName": "cat_tien"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "70",
    "FullName": "Tỉnh Bình Phước",
    "CodeName": "binh_phuoc",
    "District": [
      {
        "Type": "district",
        "Code": "688",
        "FullName": "Thị xã Phước Long",
        "CodeName": "phuoc_long"
      },
      {
        "Type": "district",
        "Code": "689",
        "FullName": "Thành phố Đồng Xoài",
        "CodeName": "dong_xoai"
      },
      {
        "Type": "district",
        "Code": "690",
        "FullName": "Thị xã Bình Long",
        "CodeName": "binh_long"
      },
      {
        "Type": "district",
        "Code": "691",
        "FullName": "Huyện Bù Gia Mập",
        "CodeName": "bu_gia_map"
      },
      {
        "Type": "district",
        "Code": "692",
        "FullName": "Huyện Lộc Ninh",
        "CodeName": "loc_ninh"
      },
      {
        "Type": "district",
        "Code": "693",
        "FullName": "Huyện Bù Đốp",
        "CodeName": "bu_dop"
      },
      {
        "Type": "district",
        "Code": "694",
        "FullName": "Huyện Hớn Quản",
        "CodeName": "hon_quan"
      },
      {
        "Type": "district",
        "Code": "695",
        "FullName": "Huyện Đồng Phú",
        "CodeName": "dong_phu"
      },
      {
        "Type": "district",
        "Code": "696",
        "FullName": "Huyện Bù Đăng",
        "CodeName": "bu_dang"
      },
      {
        "Type": "district",
        "Code": "697",
        "FullName": "Thị xã Chơn Thành",
        "CodeName": "chon_thanh"
      },
      {
        "Type": "district",
        "Code": "698",
        "FullName": "Huyện Phú Riềng",
        "CodeName": "phu_rieng"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "72",
    "FullName": "Tỉnh Tây Ninh",
    "CodeName": "tay_ninh",
    "District": [
      {
        "Type": "district",
        "Code": "703",
        "FullName": "Thành phố Tây Ninh",
        "CodeName": "tay_ninh"
      },
      {
        "Type": "district",
        "Code": "705",
        "FullName": "Huyện Tân Biên",
        "CodeName": "tan_bien"
      },
      {
        "Type": "district",
        "Code": "706",
        "FullName": "Huyện Tân Châu",
        "CodeName": "tan_chau"
      },
      {
        "Type": "district",
        "Code": "707",
        "FullName": "Huyện Dương Minh Châu",
        "CodeName": "duong_minh_chau"
      },
      {
        "Type": "district",
        "Code": "708",
        "FullName": "Huyện Châu Thành",
        "CodeName": "chau_thanh"
      },
      {
        "Type": "district",
        "Code": "709",
        "FullName": "Thị xã Hòa Thành",
        "CodeName": "hoa_thanh"
      },
      {
        "Type": "district",
        "Code": "710",
        "FullName": "Huyện Gò Dầu",
        "CodeName": "go_dau"
      },
      {
        "Type": "district",
        "Code": "711",
        "FullName": "Huyện Bến Cầu",
        "CodeName": "ben_cau"
      },
      {
        "Type": "district",
        "Code": "712",
        "FullName": "Thị xã Trảng Bàng",
        "CodeName": "trang_bang"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "74",
    "FullName": "Tỉnh Bình Dương",
    "CodeName": "binh_duong",
    "District": [
      {
        "Type": "district",
        "Code": "718",
        "FullName": "Thành phố Thủ Dầu Một",
        "CodeName": "thu_dau_mot"
      },
      {
        "Type": "district",
        "Code": "719",
        "FullName": "Huyện Bàu Bàng",
        "CodeName": "bau_bang"
      },
      {
        "Type": "district",
        "Code": "720",
        "FullName": "Huyện Dầu Tiếng",
        "CodeName": "dau_tieng"
      },
      {
        "Type": "district",
        "Code": "721",
        "FullName": "Thành phố Bến Cát",
        "CodeName": "ben_cat"
      },
      {
        "Type": "district",
        "Code": "722",
        "FullName": "Huyện Phú Giáo",
        "CodeName": "phu_giao"
      },
      {
        "Type": "district",
        "Code": "723",
        "FullName": "Thành phố Tân Uyên",
        "CodeName": "tan_uyen"
      },
      {
        "Type": "district",
        "Code": "724",
        "FullName": "Thành phố Dĩ An",
        "CodeName": "di_an"
      },
      {
        "Type": "district",
        "Code": "725",
        "FullName": "Thành phố Thuận An",
        "CodeName": "thuan_an"
      },
      {
        "Type": "district",
        "Code": "726",
        "FullName": "Huyện Bắc Tân Uyên",
        "CodeName": "bac_tan_uyen"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "75",
    "FullName": "Tỉnh Đồng Nai",
    "CodeName": "dong_nai",
    "District": [
      {
        "Type": "district",
        "Code": "731",
        "FullName": "Thành phố Biên Hòa",
        "CodeName": "bien_hoa"
      },
      {
        "Type": "district",
        "Code": "732",
        "FullName": "Thành phố Long Khánh",
        "CodeName": "long_khanh"
      },
      {
        "Type": "district",
        "Code": "734",
        "FullName": "Huyện Tân Phú",
        "CodeName": "tan_phu"
      },
      {
        "Type": "district",
        "Code": "735",
        "FullName": "Huyện Vĩnh Cửu",
        "CodeName": "vinh_cuu"
      },
      {
        "Type": "district",
        "Code": "736",
        "FullName": "Huyện Định Quán",
        "CodeName": "dinh_quan"
      },
      {
        "Type": "district",
        "Code": "737",
        "FullName": "Huyện Trảng Bom",
        "CodeName": "trang_bom"
      },
      {
        "Type": "district",
        "Code": "738",
        "FullName": "Huyện Thống Nhất",
        "CodeName": "thong_nhat"
      },
      {
        "Type": "district",
        "Code": "739",
        "FullName": "Huyện Cẩm Mỹ",
        "CodeName": "cam_my"
      },
      {
        "Type": "district",
        "Code": "740",
        "FullName": "Huyện Long Thành",
        "CodeName": "long_thanh"
      },
      {
        "Type": "district",
        "Code": "741",
        "FullName": "Huyện Xuân Lộc",
        "CodeName": "xuan_loc"
      },
      {
        "Type": "district",
        "Code": "742",
        "FullName": "Huyện Nhơn Trạch",
        "CodeName": "nhon_trach"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "77",
    "FullName": "Tỉnh Bà Rịa - Vũng Tàu",
    "CodeName": "ba_ria_vung_tau",
    "District": [
      {
        "Type": "district",
        "Code": "747",
        "FullName": "Thành phố Vũng Tàu",
        "CodeName": "vung_tau"
      },
      {
        "Type": "district",
        "Code": "748",
        "FullName": "Thành phố Bà Rịa",
        "CodeName": "ba_ria"
      },
      {
        "Type": "district",
        "Code": "750",
        "FullName": "Huyện Châu Đức",
        "CodeName": "chau_duc"
      },
      {
        "Type": "district",
        "Code": "751",
        "FullName": "Huyện Xuyên Mộc",
        "CodeName": "xuyen_moc"
      },
      {
        "Type": "district",
        "Code": "752",
        "FullName": "Huyện Long Điền",
        "CodeName": "long_dien"
      },
      {
        "Type": "district",
        "Code": "753",
        "FullName": "Huyện Đất Đỏ",
        "CodeName": "dat_do"
      },
      {
        "Type": "district",
        "Code": "754",
        "FullName": "Thị xã Phú Mỹ",
        "CodeName": "phu_my"
      },
      {
        "Type": "district",
        "Code": "755",
        "FullName": "Huyện Côn Đảo",
        "CodeName": "con_dao"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "79",
    "FullName": "Thành phố Hồ Chí Minh",
    "CodeName": "ho_chi_minh",
    "District": [
      {
        "Type": "district",
        "Code": "760",
        "FullName": "Quận 1",
        "CodeName": "1"
      },
      {
        "Type": "district",
        "Code": "761",
        "FullName": "Quận 12",
        "CodeName": "12"
      },
      {
        "Type": "district",
        "Code": "764",
        "FullName": "Quận Gò Vấp",
        "CodeName": "go_vap"
      },
      {
        "Type": "district",
        "Code": "765",
        "FullName": "Quận Bình Thạnh",
        "CodeName": "binh_thanh"
      },
      {
        "Type": "district",
        "Code": "766",
        "FullName": "Quận Tân Bình",
        "CodeName": "tan_binh"
      },
      {
        "Type": "district",
        "Code": "767",
        "FullName": "Quận Tân Phú",
        "CodeName": "tan_phu"
      },
      {
        "Type": "district",
        "Code": "768",
        "FullName": "Quận Phú Nhuận",
        "CodeName": "phu_nhuan"
      },
      {
        "Type": "district",
        "Code": "769",
        "FullName": "Thành phố Thủ Đức",
        "CodeName": "thu_duc"
      },
      {
        "Type": "district",
        "Code": "770",
        "FullName": "Quận 3",
        "CodeName": "3"
      },
      {
        "Type": "district",
        "Code": "771",
        "FullName": "Quận 10",
        "CodeName": "10"
      },
      {
        "Type": "district",
        "Code": "772",
        "FullName": "Quận 11",
        "CodeName": "11"
      },
      {
        "Type": "district",
        "Code": "773",
        "FullName": "Quận 4",
        "CodeName": "4"
      },
      {
        "Type": "district",
        "Code": "774",
        "FullName": "Quận 5",
        "CodeName": "5"
      },
      {
        "Type": "district",
        "Code": "775",
        "FullName": "Quận 6",
        "CodeName": "6"
      },
      {
        "Type": "district",
        "Code": "776",
        "FullName": "Quận 8",
        "CodeName": "8"
      },
      {
        "Type": "district",
        "Code": "777",
        "FullName": "Quận Bình Tân",
        "CodeName": "binh_tan"
      },
      {
        "Type": "district",
        "Code": "778",
        "FullName": "Quận 7",
        "CodeName": "7"
      },
      {
        "Type": "district",
        "Code": "783",
        "FullName": "Huyện Củ Chi",
        "CodeName": "cu_chi"
      },
      {
        "Type": "district",
        "Code": "784",
        "FullName": "Huyện Hóc Môn",
        "CodeName": "hoc_mon"
      },
      {
        "Type": "district",
        "Code": "785",
        "FullName": "Huyện Bình Chánh",
        "CodeName": "binh_chanh"
      },
      {
        "Type": "district",
        "Code": "786",
        "FullName": "Huyện Nhà Bè",
        "CodeName": "nha_be"
      },
      {
        "Type": "district",
        "Code": "787",
        "FullName": "Huyện Cần Giờ",
        "CodeName": "can_gio"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "80",
    "FullName": "Tỉnh Long An",
    "CodeName": "long_an",
    "District": [
      {
        "Type": "district",
        "Code": "794",
        "FullName": "Thành phố Tân An",
        "CodeName": "tan_an"
      },
      {
        "Type": "district",
        "Code": "795",
        "FullName": "Thị xã Kiến Tường",
        "CodeName": "kien_tuong"
      },
      {
        "Type": "district",
        "Code": "796",
        "FullName": "Huyện Tân Hưng",
        "CodeName": "tan_hung"
      },
      {
        "Type": "district",
        "Code": "797",
        "FullName": "Huyện Vĩnh Hưng",
        "CodeName": "vinh_hung"
      },
      {
        "Type": "district",
        "Code": "798",
        "FullName": "Huyện Mộc Hóa",
        "CodeName": "moc_hoa"
      },
      {
        "Type": "district",
        "Code": "799",
        "FullName": "Huyện Tân Thạnh",
        "CodeName": "tan_thanh"
      },
      {
        "Type": "district",
        "Code": "800",
        "FullName": "Huyện Thạnh Hóa",
        "CodeName": "thanh_hoa"
      },
      {
        "Type": "district",
        "Code": "801",
        "FullName": "Huyện Đức Huệ",
        "CodeName": "duc_hue"
      },
      {
        "Type": "district",
        "Code": "802",
        "FullName": "Huyện Đức Hòa",
        "CodeName": "duc_hoa"
      },
      {
        "Type": "district",
        "Code": "803",
        "FullName": "Huyện Bến Lức",
        "CodeName": "ben_luc"
      },
      {
        "Type": "district",
        "Code": "804",
        "FullName": "Huyện Thủ Thừa",
        "CodeName": "thu_thua"
      },
      {
        "Type": "district",
        "Code": "805",
        "FullName": "Huyện Tân Trụ",
        "CodeName": "tan_tru"
      },
      {
        "Type": "district",
        "Code": "806",
        "FullName": "Huyện Cần Đước",
        "CodeName": "can_duoc"
      },
      {
        "Type": "district",
        "Code": "807",
        "FullName": "Huyện Cần Giuộc",
        "CodeName": "can_giuoc"
      },
      {
        "Type": "district",
        "Code": "808",
        "FullName": "Huyện Châu Thành",
        "CodeName": "chau_thanh"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "82",
    "FullName": "Tỉnh Tiền Giang",
    "CodeName": "tien_giang",
    "District": [
      {
        "Type": "district",
        "Code": "815",
        "FullName": "Thành phố Mỹ Tho",
        "CodeName": "my_tho"
      },
      {
        "Type": "district",
        "Code": "816",
        "FullName": "Thành phố Gò Công",
        "CodeName": "go_cong"
      },
      {
        "Type": "district",
        "Code": "817",
        "FullName": "Thị xã Cai Lậy",
        "CodeName": "cai_lay"
      },
      {
        "Type": "district",
        "Code": "818",
        "FullName": "Huyện Tân Phước",
        "CodeName": "tan_phuoc"
      },
      {
        "Type": "district",
        "Code": "819",
        "FullName": "Huyện Cái Bè",
        "CodeName": "cai_be"
      },
      {
        "Type": "district",
        "Code": "820",
        "FullName": "Huyện Cai Lậy",
        "CodeName": "cai_lay"
      },
      {
        "Type": "district",
        "Code": "821",
        "FullName": "Huyện Châu Thành",
        "CodeName": "chau_thanh"
      },
      {
        "Type": "district",
        "Code": "822",
        "FullName": "Huyện Chợ Gạo",
        "CodeName": "cho_gao"
      },
      {
        "Type": "district",
        "Code": "823",
        "FullName": "Huyện Gò Công Tây",
        "CodeName": "go_cong_tay"
      },
      {
        "Type": "district",
        "Code": "824",
        "FullName": "Huyện Gò Công Đông",
        "CodeName": "go_cong_dong"
      },
      {
        "Type": "district",
        "Code": "825",
        "FullName": "Huyện Tân Phú Đông",
        "CodeName": "tan_phu_dong"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "83",
    "FullName": "Tỉnh Bến Tre",
    "CodeName": "ben_tre",
    "District": [
      {
        "Type": "district",
        "Code": "829",
        "FullName": "Thành phố Bến Tre",
        "CodeName": "ben_tre"
      },
      {
        "Type": "district",
        "Code": "831",
        "FullName": "Huyện Châu Thành",
        "CodeName": "chau_thanh"
      },
      {
        "Type": "district",
        "Code": "832",
        "FullName": "Huyện Chợ Lách",
        "CodeName": "cho_lach"
      },
      {
        "Type": "district",
        "Code": "833",
        "FullName": "Huyện Mỏ Cày Nam",
        "CodeName": "mo_cay_nam"
      },
      {
        "Type": "district",
        "Code": "834",
        "FullName": "Huyện Giồng Trôm",
        "CodeName": "giong_trom"
      },
      {
        "Type": "district",
        "Code": "835",
        "FullName": "Huyện Bình Đại",
        "CodeName": "binh_dai"
      },
      {
        "Type": "district",
        "Code": "836",
        "FullName": "Huyện Ba Tri",
        "CodeName": "ba_tri"
      },
      {
        "Type": "district",
        "Code": "837",
        "FullName": "Huyện Thạnh Phú",
        "CodeName": "thanh_phu"
      },
      {
        "Type": "district",
        "Code": "838",
        "FullName": "Huyện Mỏ Cày Bắc",
        "CodeName": "mo_cay_bac"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "84",
    "FullName": "Tỉnh Trà Vinh",
    "CodeName": "tra_vinh",
    "District": [
      {
        "Type": "district",
        "Code": "842",
        "FullName": "Thành phố Trà Vinh",
        "CodeName": "tra_vinh"
      },
      {
        "Type": "district",
        "Code": "844",
        "FullName": "Huyện Càng Long",
        "CodeName": "cang_long"
      },
      {
        "Type": "district",
        "Code": "845",
        "FullName": "Huyện Cầu Kè",
        "CodeName": "cau_ke"
      },
      {
        "Type": "district",
        "Code": "846",
        "FullName": "Huyện Tiểu Cần",
        "CodeName": "tieu_can"
      },
      {
        "Type": "district",
        "Code": "847",
        "FullName": "Huyện Châu Thành",
        "CodeName": "chau_thanh"
      },
      {
        "Type": "district",
        "Code": "848",
        "FullName": "Huyện Cầu Ngang",
        "CodeName": "cau_ngang"
      },
      {
        "Type": "district",
        "Code": "849",
        "FullName": "Huyện Trà Cú",
        "CodeName": "tra_cu"
      },
      {
        "Type": "district",
        "Code": "850",
        "FullName": "Huyện Duyên Hải",
        "CodeName": "duyen_hai"
      },
      {
        "Type": "district",
        "Code": "851",
        "FullName": "Thị xã Duyên Hải",
        "CodeName": "duyen_hai"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "86",
    "FullName": "Tỉnh Vĩnh Long",
    "CodeName": "vinh_long",
    "District": [
      {
        "Type": "district",
        "Code": "855",
        "FullName": "Thành phố Vĩnh Long",
        "CodeName": "vinh_long"
      },
      {
        "Type": "district",
        "Code": "857",
        "FullName": "Huyện Long Hồ",
        "CodeName": "long_ho"
      },
      {
        "Type": "district",
        "Code": "858",
        "FullName": "Huyện Mang Thít",
        "CodeName": "mang_thit"
      },
      {
        "Type": "district",
        "Code": "859",
        "FullName": "Huyện Vũng Liêm",
        "CodeName": "vung_liem"
      },
      {
        "Type": "district",
        "Code": "860",
        "FullName": "Huyện Tam Bình",
        "CodeName": "tam_binh"
      },
      {
        "Type": "district",
        "Code": "861",
        "FullName": "Thị xã Bình Minh",
        "CodeName": "binh_minh"
      },
      {
        "Type": "district",
        "Code": "862",
        "FullName": "Huyện Trà Ôn",
        "CodeName": "tra_on"
      },
      {
        "Type": "district",
        "Code": "863",
        "FullName": "Huyện Bình Tân",
        "CodeName": "binh_tan"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "87",
    "FullName": "Tỉnh Đồng Tháp",
    "CodeName": "dong_thap",
    "District": [
      {
        "Type": "district",
        "Code": "866",
        "FullName": "Thành phố Cao Lãnh",
        "CodeName": "cao_lanh"
      },
      {
        "Type": "district",
        "Code": "867",
        "FullName": "Thành phố Sa Đéc",
        "CodeName": "sa_dec"
      },
      {
        "Type": "district",
        "Code": "868",
        "FullName": "Thành phố Hồng Ngự",
        "CodeName": "hong_ngu"
      },
      {
        "Type": "district",
        "Code": "869",
        "FullName": "Huyện Tân Hồng",
        "CodeName": "tan_hong"
      },
      {
        "Type": "district",
        "Code": "870",
        "FullName": "Huyện Hồng Ngự",
        "CodeName": "hong_ngu"
      },
      {
        "Type": "district",
        "Code": "871",
        "FullName": "Huyện Tam Nông",
        "CodeName": "tam_nong"
      },
      {
        "Type": "district",
        "Code": "872",
        "FullName": "Huyện Tháp Mười",
        "CodeName": "thap_muoi"
      },
      {
        "Type": "district",
        "Code": "873",
        "FullName": "Huyện Cao Lãnh",
        "CodeName": "cao_lanh"
      },
      {
        "Type": "district",
        "Code": "874",
        "FullName": "Huyện Thanh Bình",
        "CodeName": "thanh_binh"
      },
      {
        "Type": "district",
        "Code": "875",
        "FullName": "Huyện Lấp Vò",
        "CodeName": "lap_vo"
      },
      {
        "Type": "district",
        "Code": "876",
        "FullName": "Huyện Lai Vung",
        "CodeName": "lai_vung"
      },
      {
        "Type": "district",
        "Code": "877",
        "FullName": "Huyện Châu Thành",
        "CodeName": "chau_thanh"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "89",
    "FullName": "Tỉnh An Giang",
    "CodeName": "an_giang",
    "District": [
      {
        "Type": "district",
        "Code": "883",
        "FullName": "Thành phố Long Xuyên",
        "CodeName": "long_xuyen"
      },
      {
        "Type": "district",
        "Code": "884",
        "FullName": "Thành phố Châu Đốc",
        "CodeName": "chau_doc"
      },
      {
        "Type": "district",
        "Code": "886",
        "FullName": "Huyện An Phú",
        "CodeName": "an_phu"
      },
      {
        "Type": "district",
        "Code": "887",
        "FullName": "Thị xã Tân Châu",
        "CodeName": "tan_chau"
      },
      {
        "Type": "district",
        "Code": "888",
        "FullName": "Huyện Phú Tân",
        "CodeName": "phu_tan"
      },
      {
        "Type": "district",
        "Code": "889",
        "FullName": "Huyện Châu Phú",
        "CodeName": "chau_phu"
      },
      {
        "Type": "district",
        "Code": "890",
        "FullName": "Thị xã Tịnh Biên",
        "CodeName": "tinh_bien"
      },
      {
        "Type": "district",
        "Code": "891",
        "FullName": "Huyện Tri Tôn",
        "CodeName": "tri_ton"
      },
      {
        "Type": "district",
        "Code": "892",
        "FullName": "Huyện Châu Thành",
        "CodeName": "chau_thanh"
      },
      {
        "Type": "district",
        "Code": "893",
        "FullName": "Huyện Chợ Mới",
        "CodeName": "cho_moi"
      },
      {
        "Type": "district",
        "Code": "894",
        "FullName": "Huyện Thoại Sơn",
        "CodeName": "thoai_son"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "91",
    "FullName": "Tỉnh Kiên Giang",
    "CodeName": "kien_giang",
    "District": [
      {
        "Type": "district",
        "Code": "899",
        "FullName": "Thành phố Rạch Giá",
        "CodeName": "rach_gia"
      },
      {
        "Type": "district",
        "Code": "900",
        "FullName": "Thành phố Hà Tiên",
        "CodeName": "ha_tien"
      },
      {
        "Type": "district",
        "Code": "902",
        "FullName": "Huyện Kiên Lương",
        "CodeName": "kien_luong"
      },
      {
        "Type": "district",
        "Code": "903",
        "FullName": "Huyện Hòn Đất",
        "CodeName": "hon_dat"
      },
      {
        "Type": "district",
        "Code": "904",
        "FullName": "Huyện Tân Hiệp",
        "CodeName": "tan_hiep"
      },
      {
        "Type": "district",
        "Code": "905",
        "FullName": "Huyện Châu Thành",
        "CodeName": "chau_thanh"
      },
      {
        "Type": "district",
        "Code": "906",
        "FullName": "Huyện Giồng Riềng",
        "CodeName": "giong_rieng"
      },
      {
        "Type": "district",
        "Code": "907",
        "FullName": "Huyện Gò Quao",
        "CodeName": "go_quao"
      },
      {
        "Type": "district",
        "Code": "908",
        "FullName": "Huyện An Biên",
        "CodeName": "an_bien"
      },
      {
        "Type": "district",
        "Code": "909",
        "FullName": "Huyện An Minh",
        "CodeName": "an_minh"
      },
      {
        "Type": "district",
        "Code": "910",
        "FullName": "Huyện Vĩnh Thuận",
        "CodeName": "vinh_thuan"
      },
      {
        "Type": "district",
        "Code": "911",
        "FullName": "Thành phố Phú Quốc",
        "CodeName": "phu_quoc"
      },
      {
        "Type": "district",
        "Code": "912",
        "FullName": "Huyện Kiên Hải",
        "CodeName": "kien_hai"
      },
      {
        "Type": "district",
        "Code": "913",
        "FullName": "Huyện U Minh Thượng",
        "CodeName": "u_minh_thuong"
      },
      {
        "Type": "district",
        "Code": "914",
        "FullName": "Huyện Giang Thành",
        "CodeName": "giang_thanh"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "92",
    "FullName": "Thành phố Cần Thơ",
    "CodeName": "can_tho",
    "District": [
      {
        "Type": "district",
        "Code": "916",
        "FullName": "Quận Ninh Kiều",
        "CodeName": "ninh_kieu"
      },
      {
        "Type": "district",
        "Code": "917",
        "FullName": "Quận Ô Môn",
        "CodeName": "o_mon"
      },
      {
        "Type": "district",
        "Code": "918",
        "FullName": "Quận Bình Thuỷ",
        "CodeName": "binh_thuy"
      },
      {
        "Type": "district",
        "Code": "919",
        "FullName": "Quận Cái Răng",
        "CodeName": "cai_rang"
      },
      {
        "Type": "district",
        "Code": "923",
        "FullName": "Quận Thốt Nốt",
        "CodeName": "thot_not"
      },
      {
        "Type": "district",
        "Code": "924",
        "FullName": "Huyện Vĩnh Thạnh",
        "CodeName": "vinh_thanh"
      },
      {
        "Type": "district",
        "Code": "925",
        "FullName": "Huyện Cờ Đỏ",
        "CodeName": "co_do"
      },
      {
        "Type": "district",
        "Code": "926",
        "FullName": "Huyện Phong Điền",
        "CodeName": "phong_dien"
      },
      {
        "Type": "district",
        "Code": "927",
        "FullName": "Huyện Thới Lai",
        "CodeName": "thoi_lai"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "93",
    "FullName": "Tỉnh Hậu Giang",
    "CodeName": "hau_giang",
    "District": [
      {
        "Type": "district",
        "Code": "930",
        "FullName": "Thành phố Vị Thanh",
        "CodeName": "vi_thanh"
      },
      {
        "Type": "district",
        "Code": "931",
        "FullName": "Thành phố Ngã Bảy",
        "CodeName": "nga_bay"
      },
      {
        "Type": "district",
        "Code": "932",
        "FullName": "Huyện Châu Thành A",
        "CodeName": "chau_thanh_a"
      },
      {
        "Type": "district",
        "Code": "933",
        "FullName": "Huyện Châu Thành",
        "CodeName": "chau_thanh"
      },
      {
        "Type": "district",
        "Code": "934",
        "FullName": "Huyện Phụng Hiệp",
        "CodeName": "phung_hiep"
      },
      {
        "Type": "district",
        "Code": "935",
        "FullName": "Huyện Vị Thuỷ",
        "CodeName": "vi_thuy"
      },
      {
        "Type": "district",
        "Code": "936",
        "FullName": "Huyện Long Mỹ",
        "CodeName": "long_my"
      },
      {
        "Type": "district",
        "Code": "937",
        "FullName": "Thị xã Long Mỹ",
        "CodeName": "long_my"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "94",
    "FullName": "Tỉnh Sóc Trăng",
    "CodeName": "soc_trang",
    "District": [
      {
        "Type": "district",
        "Code": "941",
        "FullName": "Thành phố Sóc Trăng",
        "CodeName": "soc_trang"
      },
      {
        "Type": "district",
        "Code": "942",
        "FullName": "Huyện Châu Thành",
        "CodeName": "chau_thanh"
      },
      {
        "Type": "district",
        "Code": "943",
        "FullName": "Huyện Kế Sách",
        "CodeName": "ke_sach"
      },
      {
        "Type": "district",
        "Code": "944",
        "FullName": "Huyện Mỹ Tú",
        "CodeName": "my_tu"
      },
      {
        "Type": "district",
        "Code": "945",
        "FullName": "Huyện Cù Lao Dung",
        "CodeName": "cu_lao_dung"
      },
      {
        "Type": "district",
        "Code": "946",
        "FullName": "Huyện Long Phú",
        "CodeName": "long_phu"
      },
      {
        "Type": "district",
        "Code": "947",
        "FullName": "Huyện Mỹ Xuyên",
        "CodeName": "my_xuyen"
      },
      {
        "Type": "district",
        "Code": "948",
        "FullName": "Thị xã Ngã Năm",
        "CodeName": "nga_nam"
      },
      {
        "Type": "district",
        "Code": "949",
        "FullName": "Huyện Thạnh Trị",
        "CodeName": "thanh_tri"
      },
      {
        "Type": "district",
        "Code": "950",
        "FullName": "Thị xã Vĩnh Châu",
        "CodeName": "vinh_chau"
      },
      {
        "Type": "district",
        "Code": "951",
        "FullName": "Huyện Trần Đề",
        "CodeName": "tran_de"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "95",
    "FullName": "Tỉnh Bạc Liêu",
    "CodeName": "bac_lieu",
    "District": [
      {
        "Type": "district",
        "Code": "954",
        "FullName": "Thành phố Bạc Liêu",
        "CodeName": "bac_lieu"
      },
      {
        "Type": "district",
        "Code": "956",
        "FullName": "Huyện Hồng Dân",
        "CodeName": "hong_dan"
      },
      {
        "Type": "district",
        "Code": "957",
        "FullName": "Huyện Phước Long",
        "CodeName": "phuoc_long"
      },
      {
        "Type": "district",
        "Code": "958",
        "FullName": "Huyện Vĩnh Lợi",
        "CodeName": "vinh_loi"
      },
      {
        "Type": "district",
        "Code": "959",
        "FullName": "Thị xã Giá Rai",
        "CodeName": "gia_rai"
      },
      {
        "Type": "district",
        "Code": "960",
        "FullName": "Huyện Đông Hải",
        "CodeName": "dong_hai"
      },
      {
        "Type": "district",
        "Code": "961",
        "FullName": "Huyện Hoà Bình",
        "CodeName": "hoa_binh"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "96",
    "FullName": "Tỉnh Cà Mau",
    "CodeName": "ca_mau",
    "District": [
      {
        "Type": "district",
        "Code": "964",
        "FullName": "Thành phố Cà Mau",
        "CodeName": "ca_mau"
      },
      {
        "Type": "district",
        "Code": "966",
        "FullName": "Huyện U Minh",
        "CodeName": "u_minh"
      },
      {
        "Type": "district",
        "Code": "967",
        "FullName": "Huyện Thới Bình",
        "CodeName": "thoi_binh"
      },
      {
        "Type": "district",
        "Code": "968",
        "FullName": "Huyện Trần Văn Thời",
        "CodeName": "tran_van_thoi"
      },
      {
        "Type": "district",
        "Code": "969",
        "FullName": "Huyện Cái Nước",
        "CodeName": "cai_nuoc"
      },
      {
        "Type": "district",
        "Code": "970",
        "FullName": "Huyện Đầm Dơi",
        "CodeName": "dam_doi"
      },
      {
        "Type": "district",
        "Code": "971",
        "FullName": "Huyện Năm Căn",
        "CodeName": "nam_can"
      },
      {
        "Type": "district",
        "Code": "972",
        "FullName": "Huyện Phú Tân",
        "CodeName": "phu_tan"
      },
      {
        "Type": "district",
        "Code": "973",
        "FullName": "Huyện Ngọc Hiển",
        "CodeName": "ngoc_hien"
      }
    ]
  }
]
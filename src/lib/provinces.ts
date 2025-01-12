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
    "FullName": "Hà Nội",
    "CodeName": "ha_noi",
    "District": [
      {
        "Type": "district",
        "Code": "001",
        "FullName": "Ba Đình",
        "CodeName": "ba_dinh"
      },
      {
        "Type": "district",
        "Code": "002",
        "FullName": "Hoàn Kiếm",
        "CodeName": "hoan_kiem"
      },
      {
        "Type": "district",
        "Code": "003",
        "FullName": "Tây Hồ",
        "CodeName": "tay_ho"
      },
      {
        "Type": "district",
        "Code": "004",
        "FullName": "Long Biên",
        "CodeName": "long_bien"
      },
      {
        "Type": "district",
        "Code": "005",
        "FullName": "Cầu Giấy",
        "CodeName": "cau_giay"
      },
      {
        "Type": "district",
        "Code": "006",
        "FullName": "Đống Đa",
        "CodeName": "dong_da"
      },
      {
        "Type": "district",
        "Code": "007",
        "FullName": "Hai Bà Trưng",
        "CodeName": "hai_ba_trung"
      },
      {
        "Type": "district",
        "Code": "008",
        "FullName": "Hoàng Mai",
        "CodeName": "hoang_mai"
      },
      {
        "Type": "district",
        "Code": "009",
        "FullName": "Thanh Xuân",
        "CodeName": "thanh_xuan"
      },
      {
        "Type": "district",
        "Code": "016",
        "FullName": "Sóc Sơn",
        "CodeName": "soc_son"
      },
      {
        "Type": "district",
        "Code": "017",
        "FullName": "Đông Anh",
        "CodeName": "dong_anh"
      },
      {
        "Type": "district",
        "Code": "018",
        "FullName": "Gia Lâm",
        "CodeName": "gia_lam"
      },
      {
        "Type": "district",
        "Code": "019",
        "FullName": "Nam Từ Liêm",
        "CodeName": "nam_tu_liem"
      },
      {
        "Type": "district",
        "Code": "020",
        "FullName": "Thanh Trì",
        "CodeName": "thanh_tri"
      },
      {
        "Type": "district",
        "Code": "021",
        "FullName": "Bắc Từ Liêm",
        "CodeName": "bac_tu_liem"
      },
      {
        "Type": "district",
        "Code": "250",
        "FullName": "Mê Linh",
        "CodeName": "me_linh"
      },
      {
        "Type": "district",
        "Code": "268",
        "FullName": "Hà Đông",
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
        "FullName": "Ba Vì",
        "CodeName": "ba_vi"
      },
      {
        "Type": "district",
        "Code": "272",
        "FullName": "Phúc Thọ",
        "CodeName": "phuc_tho"
      },
      {
        "Type": "district",
        "Code": "273",
        "FullName": "Đan Phượng",
        "CodeName": "dan_phuong"
      },
      {
        "Type": "district",
        "Code": "274",
        "FullName": "Hoài Đức",
        "CodeName": "hoai_duc"
      },
      {
        "Type": "district",
        "Code": "275",
        "FullName": "Quốc Oai",
        "CodeName": "quoc_oai"
      },
      {
        "Type": "district",
        "Code": "276",
        "FullName": "Thạch Thất",
        "CodeName": "thach_that"
      },
      {
        "Type": "district",
        "Code": "277",
        "FullName": "Chương Mỹ",
        "CodeName": "chuong_my"
      },
      {
        "Type": "district",
        "Code": "278",
        "FullName": "Thanh Oai",
        "CodeName": "thanh_oai"
      },
      {
        "Type": "district",
        "Code": "279",
        "FullName": "Thường Tín",
        "CodeName": "thuong_tin"
      },
      {
        "Type": "district",
        "Code": "280",
        "FullName": "Phú Xuyên",
        "CodeName": "phu_xuyen"
      },
      {
        "Type": "district",
        "Code": "281",
        "FullName": "Ứng Hòa",
        "CodeName": "ung_hoa"
      },
      {
        "Type": "district",
        "Code": "282",
        "FullName": "Mỹ Đức",
        "CodeName": "my_duc"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "02",
    "FullName": "Hà Giang",
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
        "FullName": "Đồng Văn",
        "CodeName": "dong_van"
      },
      {
        "Type": "district",
        "Code": "027",
        "FullName": "Mèo Vạc",
        "CodeName": "meo_vac"
      },
      {
        "Type": "district",
        "Code": "028",
        "FullName": "Yên Minh",
        "CodeName": "yen_minh"
      },
      {
        "Type": "district",
        "Code": "029",
        "FullName": "Quản Bạ",
        "CodeName": "quan_ba"
      },
      {
        "Type": "district",
        "Code": "030",
        "FullName": "Vị Xuyên",
        "CodeName": "vi_xuyen"
      },
      {
        "Type": "district",
        "Code": "031",
        "FullName": "Bắc Mê",
        "CodeName": "bac_me"
      },
      {
        "Type": "district",
        "Code": "032",
        "FullName": "Hoàng Su Phì",
        "CodeName": "hoang_su_phi"
      },
      {
        "Type": "district",
        "Code": "033",
        "FullName": "Xín Mần",
        "CodeName": "xin_man"
      },
      {
        "Type": "district",
        "Code": "034",
        "FullName": "Bắc Quang",
        "CodeName": "bac_quang"
      },
      {
        "Type": "district",
        "Code": "035",
        "FullName": "Quang Bình",
        "CodeName": "quang_binh"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "04",
    "FullName": "Cao Bằng",
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
        "FullName": "Bảo Lâm",
        "CodeName": "bao_lam"
      },
      {
        "Type": "district",
        "Code": "043",
        "FullName": "Bảo Lạc",
        "CodeName": "bao_lac"
      },
      {
        "Type": "district",
        "Code": "045",
        "FullName": "Hà Quảng",
        "CodeName": "ha_quang"
      },
      {
        "Type": "district",
        "Code": "047",
        "FullName": "Trùng Khánh",
        "CodeName": "trung_khanh"
      },
      {
        "Type": "district",
        "Code": "048",
        "FullName": "Hạ Lang",
        "CodeName": "ha_lang"
      },
      {
        "Type": "district",
        "Code": "049",
        "FullName": "Quảng Hòa",
        "CodeName": "quang_hoa"
      },
      {
        "Type": "district",
        "Code": "051",
        "FullName": "Hoà An",
        "CodeName": "hoa_an"
      },
      {
        "Type": "district",
        "Code": "052",
        "FullName": "Nguyên Bình",
        "CodeName": "nguyen_binh"
      },
      {
        "Type": "district",
        "Code": "053",
        "FullName": "Thạch An",
        "CodeName": "thach_an"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "06",
    "FullName": "Bắc Kạn",
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
        "FullName": "Pác Nặm",
        "CodeName": "pac_nam"
      },
      {
        "Type": "district",
        "Code": "061",
        "FullName": "Ba Bể",
        "CodeName": "ba_be"
      },
      {
        "Type": "district",
        "Code": "062",
        "FullName": "Ngân Sơn",
        "CodeName": "ngan_son"
      },
      {
        "Type": "district",
        "Code": "063",
        "FullName": "Bạch Thông",
        "CodeName": "bach_thong"
      },
      {
        "Type": "district",
        "Code": "064",
        "FullName": "Chợ Đồn",
        "CodeName": "cho_don"
      },
      {
        "Type": "district",
        "Code": "065",
        "FullName": "Chợ Mới",
        "CodeName": "cho_moi"
      },
      {
        "Type": "district",
        "Code": "066",
        "FullName": "Na Rì",
        "CodeName": "na_ri"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "08",
    "FullName": "Tuyên Quang",
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
        "FullName": "Lâm Bình",
        "CodeName": "lam_binh"
      },
      {
        "Type": "district",
        "Code": "072",
        "FullName": "Na Hang",
        "CodeName": "na_hang"
      },
      {
        "Type": "district",
        "Code": "073",
        "FullName": "Chiêm Hóa",
        "CodeName": "chiem_hoa"
      },
      {
        "Type": "district",
        "Code": "074",
        "FullName": "Hàm Yên",
        "CodeName": "ham_yen"
      },
      {
        "Type": "district",
        "Code": "075",
        "FullName": "Yên Sơn",
        "CodeName": "yen_son"
      },
      {
        "Type": "district",
        "Code": "076",
        "FullName": "Sơn Dương",
        "CodeName": "son_duong"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "10",
    "FullName": "Lào Cai",
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
        "FullName": "Bát Xát",
        "CodeName": "bat_xat"
      },
      {
        "Type": "district",
        "Code": "083",
        "FullName": "Mường Khương",
        "CodeName": "muong_khuong"
      },
      {
        "Type": "district",
        "Code": "084",
        "FullName": "Si Ma Cai",
        "CodeName": "si_ma_cai"
      },
      {
        "Type": "district",
        "Code": "085",
        "FullName": "Bắc Hà",
        "CodeName": "bac_ha"
      },
      {
        "Type": "district",
        "Code": "086",
        "FullName": "Bảo Thắng",
        "CodeName": "bao_thang"
      },
      {
        "Type": "district",
        "Code": "087",
        "FullName": "Bảo Yên",
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
        "FullName": "Văn Bàn",
        "CodeName": "van_ban"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "11",
    "FullName": "Điện Biên",
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
        "FullName": "Mường Nhé",
        "CodeName": "muong_nhe"
      },
      {
        "Type": "district",
        "Code": "097",
        "FullName": "Mường Chà",
        "CodeName": "muong_cha"
      },
      {
        "Type": "district",
        "Code": "098",
        "FullName": "Tủa Chùa",
        "CodeName": "tua_chua"
      },
      {
        "Type": "district",
        "Code": "099",
        "FullName": "Tuần Giáo",
        "CodeName": "tuan_giao"
      },
      {
        "Type": "district",
        "Code": "100",
        "FullName": "Điện Biên",
        "CodeName": "dien_bien"
      },
      {
        "Type": "district",
        "Code": "101",
        "FullName": "Điện Biên Đông",
        "CodeName": "dien_bien_dong"
      },
      {
        "Type": "district",
        "Code": "102",
        "FullName": "Mường Ảng",
        "CodeName": "muong_ang"
      },
      {
        "Type": "district",
        "Code": "103",
        "FullName": "Nậm Pồ",
        "CodeName": "nam_po"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "12",
    "FullName": "Lai Châu",
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
        "FullName": "Tam Đường",
        "CodeName": "tam_duong"
      },
      {
        "Type": "district",
        "Code": "107",
        "FullName": "Mường Tè",
        "CodeName": "muong_te"
      },
      {
        "Type": "district",
        "Code": "108",
        "FullName": "Sìn Hồ",
        "CodeName": "sin_ho"
      },
      {
        "Type": "district",
        "Code": "109",
        "FullName": "Phong Thổ",
        "CodeName": "phong_tho"
      },
      {
        "Type": "district",
        "Code": "110",
        "FullName": "Than Uyên",
        "CodeName": "than_uyen"
      },
      {
        "Type": "district",
        "Code": "111",
        "FullName": "Tân Uyên",
        "CodeName": "tan_uyen"
      },
      {
        "Type": "district",
        "Code": "112",
        "FullName": "Nậm Nhùn",
        "CodeName": "nam_nhun"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "14",
    "FullName": "Sơn La",
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
        "FullName": "Quỳnh Nhai",
        "CodeName": "quynh_nhai"
      },
      {
        "Type": "district",
        "Code": "119",
        "FullName": "Thuận Châu",
        "CodeName": "thuan_chau"
      },
      {
        "Type": "district",
        "Code": "120",
        "FullName": "Mường La",
        "CodeName": "muong_la"
      },
      {
        "Type": "district",
        "Code": "121",
        "FullName": "Bắc Yên",
        "CodeName": "bac_yen"
      },
      {
        "Type": "district",
        "Code": "122",
        "FullName": "Phù Yên",
        "CodeName": "phu_yen"
      },
      {
        "Type": "district",
        "Code": "123",
        "FullName": "Mộc Châu",
        "CodeName": "moc_chau"
      },
      {
        "Type": "district",
        "Code": "124",
        "FullName": "Yên Châu",
        "CodeName": "yen_chau"
      },
      {
        "Type": "district",
        "Code": "125",
        "FullName": "Mai Sơn",
        "CodeName": "mai_son"
      },
      {
        "Type": "district",
        "Code": "126",
        "FullName": "Sông Mã",
        "CodeName": "song_ma"
      },
      {
        "Type": "district",
        "Code": "127",
        "FullName": "Sốp Cộp",
        "CodeName": "sop_cop"
      },
      {
        "Type": "district",
        "Code": "128",
        "FullName": "Vân Hồ",
        "CodeName": "van_ho"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "15",
    "FullName": "Yên Bái",
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
        "FullName": "Lục Yên",
        "CodeName": "luc_yen"
      },
      {
        "Type": "district",
        "Code": "136",
        "FullName": "Văn Yên",
        "CodeName": "van_yen"
      },
      {
        "Type": "district",
        "Code": "137",
        "FullName": "Mù Căng Chải",
        "CodeName": "mu_cang_chai"
      },
      {
        "Type": "district",
        "Code": "138",
        "FullName": "Trấn Yên",
        "CodeName": "tran_yen"
      },
      {
        "Type": "district",
        "Code": "139",
        "FullName": "Trạm Tấu",
        "CodeName": "tram_tau"
      },
      {
        "Type": "district",
        "Code": "140",
        "FullName": "Văn Chấn",
        "CodeName": "van_chan"
      },
      {
        "Type": "district",
        "Code": "141",
        "FullName": "Yên Bình",
        "CodeName": "yen_binh"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "17",
    "FullName": "Hoà Bình",
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
        "FullName": "Đà Bắc",
        "CodeName": "da_bac"
      },
      {
        "Type": "district",
        "Code": "152",
        "FullName": "Lương Sơn",
        "CodeName": "luong_son"
      },
      {
        "Type": "district",
        "Code": "153",
        "FullName": "Kim Bôi",
        "CodeName": "kim_boi"
      },
      {
        "Type": "district",
        "Code": "154",
        "FullName": "Cao Phong",
        "CodeName": "cao_phong"
      },
      {
        "Type": "district",
        "Code": "155",
        "FullName": "Tân Lạc",
        "CodeName": "tan_lac"
      },
      {
        "Type": "district",
        "Code": "156",
        "FullName": "Mai Châu",
        "CodeName": "mai_chau"
      },
      {
        "Type": "district",
        "Code": "157",
        "FullName": "Lạc Sơn",
        "CodeName": "lac_son"
      },
      {
        "Type": "district",
        "Code": "158",
        "FullName": "Yên Thủy",
        "CodeName": "yen_thuy"
      },
      {
        "Type": "district",
        "Code": "159",
        "FullName": "Lạc Thủy",
        "CodeName": "lac_thuy"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "19",
    "FullName": "Thái Nguyên",
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
        "FullName": "Định Hóa",
        "CodeName": "dinh_hoa"
      },
      {
        "Type": "district",
        "Code": "168",
        "FullName": "Phú Lương",
        "CodeName": "phu_luong"
      },
      {
        "Type": "district",
        "Code": "169",
        "FullName": "Đồng Hỷ",
        "CodeName": "dong_hy"
      },
      {
        "Type": "district",
        "Code": "170",
        "FullName": "Võ Nhai",
        "CodeName": "vo_nhai"
      },
      {
        "Type": "district",
        "Code": "171",
        "FullName": "Đại Từ",
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
        "FullName": "Phú Bình",
        "CodeName": "phu_binh"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "20",
    "FullName": "Lạng Sơn",
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
        "FullName": "Tràng Định",
        "CodeName": "trang_dinh"
      },
      {
        "Type": "district",
        "Code": "181",
        "FullName": "Bình Gia",
        "CodeName": "binh_gia"
      },
      {
        "Type": "district",
        "Code": "182",
        "FullName": "Văn Lãng",
        "CodeName": "van_lang"
      },
      {
        "Type": "district",
        "Code": "183",
        "FullName": "Cao Lộc",
        "CodeName": "cao_loc"
      },
      {
        "Type": "district",
        "Code": "184",
        "FullName": "Văn Quan",
        "CodeName": "van_quan"
      },
      {
        "Type": "district",
        "Code": "185",
        "FullName": "Bắc Sơn",
        "CodeName": "bac_son"
      },
      {
        "Type": "district",
        "Code": "186",
        "FullName": "Hữu Lũng",
        "CodeName": "huu_lung"
      },
      {
        "Type": "district",
        "Code": "187",
        "FullName": "Chi Lăng",
        "CodeName": "chi_lang"
      },
      {
        "Type": "district",
        "Code": "188",
        "FullName": "Lộc Bình",
        "CodeName": "loc_binh"
      },
      {
        "Type": "district",
        "Code": "189",
        "FullName": "Đình Lập",
        "CodeName": "dinh_lap"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "22",
    "FullName": "Quảng Ninh",
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
        "FullName": "Bình Liêu",
        "CodeName": "binh_lieu"
      },
      {
        "Type": "district",
        "Code": "199",
        "FullName": "Tiên Yên",
        "CodeName": "tien_yen"
      },
      {
        "Type": "district",
        "Code": "200",
        "FullName": "Đầm Hà",
        "CodeName": "dam_ha"
      },
      {
        "Type": "district",
        "Code": "201",
        "FullName": "Hải Hà",
        "CodeName": "hai_ha"
      },
      {
        "Type": "district",
        "Code": "202",
        "FullName": "Ba Chẽ",
        "CodeName": "ba_che"
      },
      {
        "Type": "district",
        "Code": "203",
        "FullName": "Vân Đồn",
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
        "FullName": "Cô Tô",
        "CodeName": "co_to"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "24",
    "FullName": "Bắc Giang",
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
        "FullName": "Yên Thế",
        "CodeName": "yen_the"
      },
      {
        "Type": "district",
        "Code": "216",
        "FullName": "Tân Yên",
        "CodeName": "tan_yen"
      },
      {
        "Type": "district",
        "Code": "217",
        "FullName": "Lạng Giang",
        "CodeName": "lang_giang"
      },
      {
        "Type": "district",
        "Code": "218",
        "FullName": "Lục Nam",
        "CodeName": "luc_nam"
      },
      {
        "Type": "district",
        "Code": "219",
        "FullName": "Lục Ngạn",
        "CodeName": "luc_ngan"
      },
      {
        "Type": "district",
        "Code": "220",
        "FullName": "Sơn Động",
        "CodeName": "son_dong"
      },
      {
        "Type": "district",
        "Code": "221",
        "FullName": "Yên Dũng",
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
        "FullName": "Hiệp Hòa",
        "CodeName": "hiep_hoa"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "25",
    "FullName": "Phú Thọ",
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
        "FullName": "Đoan Hùng",
        "CodeName": "doan_hung"
      },
      {
        "Type": "district",
        "Code": "231",
        "FullName": "Hạ Hoà",
        "CodeName": "ha_hoa"
      },
      {
        "Type": "district",
        "Code": "232",
        "FullName": "Thanh Ba",
        "CodeName": "thanh_ba"
      },
      {
        "Type": "district",
        "Code": "233",
        "FullName": "Phù Ninh",
        "CodeName": "phu_ninh"
      },
      {
        "Type": "district",
        "Code": "234",
        "FullName": "Yên Lập",
        "CodeName": "yen_lap"
      },
      {
        "Type": "district",
        "Code": "235",
        "FullName": "Cẩm Khê",
        "CodeName": "cam_khe"
      },
      {
        "Type": "district",
        "Code": "236",
        "FullName": "Tam Nông",
        "CodeName": "tam_nong"
      },
      {
        "Type": "district",
        "Code": "237",
        "FullName": "Lâm Thao",
        "CodeName": "lam_thao"
      },
      {
        "Type": "district",
        "Code": "238",
        "FullName": "Thanh Sơn",
        "CodeName": "thanh_son"
      },
      {
        "Type": "district",
        "Code": "239",
        "FullName": "Thanh Thuỷ",
        "CodeName": "thanh_thuy"
      },
      {
        "Type": "district",
        "Code": "240",
        "FullName": "Tân Sơn",
        "CodeName": "tan_son"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "26",
    "FullName": "Vĩnh Phúc",
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
        "FullName": "Lập Thạch",
        "CodeName": "lap_thach"
      },
      {
        "Type": "district",
        "Code": "247",
        "FullName": "Tam Dương",
        "CodeName": "tam_duong"
      },
      {
        "Type": "district",
        "Code": "248",
        "FullName": "Tam Đảo",
        "CodeName": "tam_dao"
      },
      {
        "Type": "district",
        "Code": "249",
        "FullName": "Bình Xuyên",
        "CodeName": "binh_xuyen"
      },
      {
        "Type": "district",
        "Code": "251",
        "FullName": "Yên Lạc",
        "CodeName": "yen_lac"
      },
      {
        "Type": "district",
        "Code": "252",
        "FullName": "Vĩnh Tường",
        "CodeName": "vinh_tuong"
      },
      {
        "Type": "district",
        "Code": "253",
        "FullName": "Sông Lô",
        "CodeName": "song_lo"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "27",
    "FullName": "Bắc Ninh",
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
        "FullName": "Yên Phong",
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
        "FullName": "Tiên Du",
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
        "FullName": "Gia Bình",
        "CodeName": "gia_binh"
      },
      {
        "Type": "district",
        "Code": "264",
        "FullName": "Lương Tài",
        "CodeName": "luong_tai"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "30",
    "FullName": "Hải Dương",
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
        "FullName": "Nam Sách",
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
        "FullName": "Kim Thành",
        "CodeName": "kim_thanh"
      },
      {
        "Type": "district",
        "Code": "294",
        "FullName": "Thanh Hà",
        "CodeName": "thanh_ha"
      },
      {
        "Type": "district",
        "Code": "295",
        "FullName": "Cẩm Giàng",
        "CodeName": "cam_giang"
      },
      {
        "Type": "district",
        "Code": "296",
        "FullName": "Bình Giang",
        "CodeName": "binh_giang"
      },
      {
        "Type": "district",
        "Code": "297",
        "FullName": "Gia Lộc",
        "CodeName": "gia_loc"
      },
      {
        "Type": "district",
        "Code": "298",
        "FullName": "Tứ Kỳ",
        "CodeName": "tu_ky"
      },
      {
        "Type": "district",
        "Code": "299",
        "FullName": "Ninh Giang",
        "CodeName": "ninh_giang"
      },
      {
        "Type": "district",
        "Code": "300",
        "FullName": "Thanh Miện",
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
        "FullName": "Hồng Bàng",
        "CodeName": "hong_bang"
      },
      {
        "Type": "district",
        "Code": "304",
        "FullName": "Ngô Quyền",
        "CodeName": "ngo_quyen"
      },
      {
        "Type": "district",
        "Code": "305",
        "FullName": "Lê Chân",
        "CodeName": "le_chan"
      },
      {
        "Type": "district",
        "Code": "306",
        "FullName": "Hải An",
        "CodeName": "hai_an"
      },
      {
        "Type": "district",
        "Code": "307",
        "FullName": "Kiến An",
        "CodeName": "kien_an"
      },
      {
        "Type": "district",
        "Code": "308",
        "FullName": "Đồ Sơn",
        "CodeName": "do_son"
      },
      {
        "Type": "district",
        "Code": "309",
        "FullName": "Dương Kinh",
        "CodeName": "duong_kinh"
      },
      {
        "Type": "district",
        "Code": "311",
        "FullName": "Thuỷ Nguyên",
        "CodeName": "thuy_nguyen"
      },
      {
        "Type": "district",
        "Code": "312",
        "FullName": "An Dương",
        "CodeName": "an_duong"
      },
      {
        "Type": "district",
        "Code": "313",
        "FullName": "An Lão",
        "CodeName": "an_lao"
      },
      {
        "Type": "district",
        "Code": "314",
        "FullName": "Kiến Thuỵ",
        "CodeName": "kien_thuy"
      },
      {
        "Type": "district",
        "Code": "315",
        "FullName": "Tiên Lãng",
        "CodeName": "tien_lang"
      },
      {
        "Type": "district",
        "Code": "316",
        "FullName": "Vĩnh Bảo",
        "CodeName": "vinh_bao"
      },
      {
        "Type": "district",
        "Code": "317",
        "FullName": "Cát Hải",
        "CodeName": "cat_hai"
      },
      {
        "Type": "district",
        "Code": "318",
        "FullName": "Bạch Long Vĩ",
        "CodeName": "bach_long_vi"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "33",
    "FullName": "Hưng Yên",
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
        "FullName": "Văn Lâm",
        "CodeName": "van_lam"
      },
      {
        "Type": "district",
        "Code": "326",
        "FullName": "Văn Giang",
        "CodeName": "van_giang"
      },
      {
        "Type": "district",
        "Code": "327",
        "FullName": "Yên Mỹ",
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
        "FullName": "Ân Thi",
        "CodeName": "an_thi"
      },
      {
        "Type": "district",
        "Code": "330",
        "FullName": "Khoái Châu",
        "CodeName": "khoai_chau"
      },
      {
        "Type": "district",
        "Code": "331",
        "FullName": "Kim Động",
        "CodeName": "kim_dong"
      },
      {
        "Type": "district",
        "Code": "332",
        "FullName": "Tiên Lữ",
        "CodeName": "tien_lu"
      },
      {
        "Type": "district",
        "Code": "333",
        "FullName": "Phù Cừ",
        "CodeName": "phu_cu"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "34",
    "FullName": "Thái Bình",
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
        "FullName": "Quỳnh Phụ",
        "CodeName": "quynh_phu"
      },
      {
        "Type": "district",
        "Code": "339",
        "FullName": "Hưng Hà",
        "CodeName": "hung_ha"
      },
      {
        "Type": "district",
        "Code": "340",
        "FullName": "Đông Hưng",
        "CodeName": "dong_hung"
      },
      {
        "Type": "district",
        "Code": "341",
        "FullName": "Thái Thụy",
        "CodeName": "thai_thuy"
      },
      {
        "Type": "district",
        "Code": "342",
        "FullName": "Tiền Hải",
        "CodeName": "tien_hai"
      },
      {
        "Type": "district",
        "Code": "343",
        "FullName": "Kiến Xương",
        "CodeName": "kien_xuong"
      },
      {
        "Type": "district",
        "Code": "344",
        "FullName": "Vũ Thư",
        "CodeName": "vu_thu"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "35",
    "FullName": "Hà Nam",
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
        "FullName": "Kim Bảng",
        "CodeName": "kim_bang"
      },
      {
        "Type": "district",
        "Code": "351",
        "FullName": "Thanh Liêm",
        "CodeName": "thanh_liem"
      },
      {
        "Type": "district",
        "Code": "352",
        "FullName": "Bình Lục",
        "CodeName": "binh_luc"
      },
      {
        "Type": "district",
        "Code": "353",
        "FullName": "Lý Nhân",
        "CodeName": "ly_nhan"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "36",
    "FullName": "Nam Định",
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
        "FullName": "Vụ Bản",
        "CodeName": "vu_ban"
      },
      {
        "Type": "district",
        "Code": "360",
        "FullName": "Ý Yên",
        "CodeName": "y_yen"
      },
      {
        "Type": "district",
        "Code": "361",
        "FullName": "Nghĩa Hưng",
        "CodeName": "nghia_hung"
      },
      {
        "Type": "district",
        "Code": "362",
        "FullName": "Nam Trực",
        "CodeName": "nam_truc"
      },
      {
        "Type": "district",
        "Code": "363",
        "FullName": "Trực Ninh",
        "CodeName": "truc_ninh"
      },
      {
        "Type": "district",
        "Code": "364",
        "FullName": "Xuân Trường",
        "CodeName": "xuan_truong"
      },
      {
        "Type": "district",
        "Code": "365",
        "FullName": "Giao Thủy",
        "CodeName": "giao_thuy"
      },
      {
        "Type": "district",
        "Code": "366",
        "FullName": "Hải Hậu",
        "CodeName": "hai_hau"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "37",
    "FullName": "Ninh Bình",
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
        "FullName": "Nho Quan",
        "CodeName": "nho_quan"
      },
      {
        "Type": "district",
        "Code": "373",
        "FullName": "Gia Viễn",
        "CodeName": "gia_vien"
      },
      {
        "Type": "district",
        "Code": "374",
        "FullName": "Hoa Lư",
        "CodeName": "hoa_lu"
      },
      {
        "Type": "district",
        "Code": "375",
        "FullName": "Yên Khánh",
        "CodeName": "yen_khanh"
      },
      {
        "Type": "district",
        "Code": "376",
        "FullName": "Kim Sơn",
        "CodeName": "kim_son"
      },
      {
        "Type": "district",
        "Code": "377",
        "FullName": "Yên Mô",
        "CodeName": "yen_mo"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "38",
    "FullName": "Thanh Hóa",
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
        "FullName": "Mường Lát",
        "CodeName": "muong_lat"
      },
      {
        "Type": "district",
        "Code": "385",
        "FullName": "Quan Hóa",
        "CodeName": "quan_hoa"
      },
      {
        "Type": "district",
        "Code": "386",
        "FullName": "Bá Thước",
        "CodeName": "ba_thuoc"
      },
      {
        "Type": "district",
        "Code": "387",
        "FullName": "Quan Sơn",
        "CodeName": "quan_son"
      },
      {
        "Type": "district",
        "Code": "388",
        "FullName": "Lang Chánh",
        "CodeName": "lang_chanh"
      },
      {
        "Type": "district",
        "Code": "389",
        "FullName": "Ngọc Lặc",
        "CodeName": "ngoc_lac"
      },
      {
        "Type": "district",
        "Code": "390",
        "FullName": "Cẩm Thủy",
        "CodeName": "cam_thuy"
      },
      {
        "Type": "district",
        "Code": "391",
        "FullName": "Thạch Thành",
        "CodeName": "thach_thanh"
      },
      {
        "Type": "district",
        "Code": "392",
        "FullName": "Hà Trung",
        "CodeName": "ha_trung"
      },
      {
        "Type": "district",
        "Code": "393",
        "FullName": "Vĩnh Lộc",
        "CodeName": "vinh_loc"
      },
      {
        "Type": "district",
        "Code": "394",
        "FullName": "Yên Định",
        "CodeName": "yen_dinh"
      },
      {
        "Type": "district",
        "Code": "395",
        "FullName": "Thọ Xuân",
        "CodeName": "tho_xuan"
      },
      {
        "Type": "district",
        "Code": "396",
        "FullName": "Thường Xuân",
        "CodeName": "thuong_xuan"
      },
      {
        "Type": "district",
        "Code": "397",
        "FullName": "Triệu Sơn",
        "CodeName": "trieu_son"
      },
      {
        "Type": "district",
        "Code": "398",
        "FullName": "Thiệu Hóa",
        "CodeName": "thieu_hoa"
      },
      {
        "Type": "district",
        "Code": "399",
        "FullName": "Hoằng Hóa",
        "CodeName": "hoang_hoa"
      },
      {
        "Type": "district",
        "Code": "400",
        "FullName": "Hậu Lộc",
        "CodeName": "hau_loc"
      },
      {
        "Type": "district",
        "Code": "401",
        "FullName": "Nga Sơn",
        "CodeName": "nga_son"
      },
      {
        "Type": "district",
        "Code": "402",
        "FullName": "Như Xuân",
        "CodeName": "nhu_xuan"
      },
      {
        "Type": "district",
        "Code": "403",
        "FullName": "Như Thanh",
        "CodeName": "nhu_thanh"
      },
      {
        "Type": "district",
        "Code": "404",
        "FullName": "Nông Cống",
        "CodeName": "nong_cong"
      },
      {
        "Type": "district",
        "Code": "405",
        "FullName": "Đông Sơn",
        "CodeName": "dong_son"
      },
      {
        "Type": "district",
        "Code": "406",
        "FullName": "Quảng Xương",
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
    "FullName": "Nghệ An",
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
        "FullName": "Quế Phong",
        "CodeName": "que_phong"
      },
      {
        "Type": "district",
        "Code": "416",
        "FullName": "Quỳ Châu",
        "CodeName": "quy_chau"
      },
      {
        "Type": "district",
        "Code": "417",
        "FullName": "Kỳ Sơn",
        "CodeName": "ky_son"
      },
      {
        "Type": "district",
        "Code": "418",
        "FullName": "Tương Dương",
        "CodeName": "tuong_duong"
      },
      {
        "Type": "district",
        "Code": "419",
        "FullName": "Nghĩa Đàn",
        "CodeName": "nghia_dan"
      },
      {
        "Type": "district",
        "Code": "420",
        "FullName": "Quỳ Hợp",
        "CodeName": "quy_hop"
      },
      {
        "Type": "district",
        "Code": "421",
        "FullName": "Quỳnh Lưu",
        "CodeName": "quynh_luu"
      },
      {
        "Type": "district",
        "Code": "422",
        "FullName": "Con Cuông",
        "CodeName": "con_cuong"
      },
      {
        "Type": "district",
        "Code": "423",
        "FullName": "Tân Kỳ",
        "CodeName": "tan_ky"
      },
      {
        "Type": "district",
        "Code": "424",
        "FullName": "Anh Sơn",
        "CodeName": "anh_son"
      },
      {
        "Type": "district",
        "Code": "425",
        "FullName": "Diễn Châu",
        "CodeName": "dien_chau"
      },
      {
        "Type": "district",
        "Code": "426",
        "FullName": "Yên Thành",
        "CodeName": "yen_thanh"
      },
      {
        "Type": "district",
        "Code": "427",
        "FullName": "Đô Lương",
        "CodeName": "do_luong"
      },
      {
        "Type": "district",
        "Code": "428",
        "FullName": "Thanh Chương",
        "CodeName": "thanh_chuong"
      },
      {
        "Type": "district",
        "Code": "429",
        "FullName": "Nghi Lộc",
        "CodeName": "nghi_loc"
      },
      {
        "Type": "district",
        "Code": "430",
        "FullName": "Nam Đàn",
        "CodeName": "nam_dan"
      },
      {
        "Type": "district",
        "Code": "431",
        "FullName": "Hưng Nguyên",
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
    "FullName": "Hà Tĩnh",
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
        "FullName": "Hương Sơn",
        "CodeName": "huong_son"
      },
      {
        "Type": "district",
        "Code": "440",
        "FullName": "Đức Thọ",
        "CodeName": "duc_tho"
      },
      {
        "Type": "district",
        "Code": "441",
        "FullName": "Vũ Quang",
        "CodeName": "vu_quang"
      },
      {
        "Type": "district",
        "Code": "442",
        "FullName": "Nghi Xuân",
        "CodeName": "nghi_xuan"
      },
      {
        "Type": "district",
        "Code": "443",
        "FullName": "Can Lộc",
        "CodeName": "can_loc"
      },
      {
        "Type": "district",
        "Code": "444",
        "FullName": "Hương Khê",
        "CodeName": "huong_khe"
      },
      {
        "Type": "district",
        "Code": "445",
        "FullName": "Thạch Hà",
        "CodeName": "thach_ha"
      },
      {
        "Type": "district",
        "Code": "446",
        "FullName": "Cẩm Xuyên",
        "CodeName": "cam_xuyen"
      },
      {
        "Type": "district",
        "Code": "447",
        "FullName": "Kỳ Anh",
        "CodeName": "ky_anh"
      },
      {
        "Type": "district",
        "Code": "448",
        "FullName": "Lộc Hà",
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
    "FullName": "Quảng Bình",
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
        "FullName": "Minh Hóa",
        "CodeName": "minh_hoa"
      },
      {
        "Type": "district",
        "Code": "453",
        "FullName": "Tuyên Hóa",
        "CodeName": "tuyen_hoa"
      },
      {
        "Type": "district",
        "Code": "454",
        "FullName": "Quảng Trạch",
        "CodeName": "quang_trach"
      },
      {
        "Type": "district",
        "Code": "455",
        "FullName": "Bố Trạch",
        "CodeName": "bo_trach"
      },
      {
        "Type": "district",
        "Code": "456",
        "FullName": "Quảng Ninh",
        "CodeName": "quang_ninh"
      },
      {
        "Type": "district",
        "Code": "457",
        "FullName": "Lệ Thủy",
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
    "FullName": "Quảng Trị",
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
        "FullName": "Vĩnh Linh",
        "CodeName": "vinh_linh"
      },
      {
        "Type": "district",
        "Code": "465",
        "FullName": "Hướng Hóa",
        "CodeName": "huong_hoa"
      },
      {
        "Type": "district",
        "Code": "466",
        "FullName": "Gio Linh",
        "CodeName": "gio_linh"
      },
      {
        "Type": "district",
        "Code": "467",
        "FullName": "Đa Krông",
        "CodeName": "da_krong"
      },
      {
        "Type": "district",
        "Code": "468",
        "FullName": "Cam Lộ",
        "CodeName": "cam_lo"
      },
      {
        "Type": "district",
        "Code": "469",
        "FullName": "Triệu Phong",
        "CodeName": "trieu_phong"
      },
      {
        "Type": "district",
        "Code": "470",
        "FullName": "Hải Lăng",
        "CodeName": "hai_lang"
      },
      {
        "Type": "district",
        "Code": "471",
        "FullName": "Cồn Cỏ",
        "CodeName": "con_co"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "46",
    "FullName": "Thừa Thiên Huế",
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
        "FullName": "Phong Điền",
        "CodeName": "phong_dien"
      },
      {
        "Type": "district",
        "Code": "477",
        "FullName": "Quảng Điền",
        "CodeName": "quang_dien"
      },
      {
        "Type": "district",
        "Code": "478",
        "FullName": "Phú Vang",
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
        "FullName": "A Lưới",
        "CodeName": "a_luoi"
      },
      {
        "Type": "district",
        "Code": "482",
        "FullName": "Phú Lộc",
        "CodeName": "phu_loc"
      },
      {
        "Type": "district",
        "Code": "483",
        "FullName": "Nam Đông",
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
        "FullName": "Liên Chiểu",
        "CodeName": "lien_chieu"
      },
      {
        "Type": "district",
        "Code": "491",
        "FullName": "Thanh Khê",
        "CodeName": "thanh_khe"
      },
      {
        "Type": "district",
        "Code": "492",
        "FullName": "Hải Châu",
        "CodeName": "hai_chau"
      },
      {
        "Type": "district",
        "Code": "493",
        "FullName": "Sơn Trà",
        "CodeName": "son_tra"
      },
      {
        "Type": "district",
        "Code": "494",
        "FullName": "Ngũ Hành Sơn",
        "CodeName": "ngu_hanh_son"
      },
      {
        "Type": "district",
        "Code": "495",
        "FullName": "Cẩm Lệ",
        "CodeName": "cam_le"
      },
      {
        "Type": "district",
        "Code": "497",
        "FullName": "Hòa Vang",
        "CodeName": "hoa_vang"
      },
      {
        "Type": "district",
        "Code": "498",
        "FullName": "Hoàng Sa",
        "CodeName": "hoang_sa"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "49",
    "FullName": "Quảng Nam",
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
        "FullName": "Tây Giang",
        "CodeName": "tay_giang"
      },
      {
        "Type": "district",
        "Code": "505",
        "FullName": "Đông Giang",
        "CodeName": "dong_giang"
      },
      {
        "Type": "district",
        "Code": "506",
        "FullName": "Đại Lộc",
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
        "FullName": "Duy Xuyên",
        "CodeName": "duy_xuyen"
      },
      {
        "Type": "district",
        "Code": "509",
        "FullName": "Quế Sơn",
        "CodeName": "que_son"
      },
      {
        "Type": "district",
        "Code": "510",
        "FullName": "Nam Giang",
        "CodeName": "nam_giang"
      },
      {
        "Type": "district",
        "Code": "511",
        "FullName": "Phước Sơn",
        "CodeName": "phuoc_son"
      },
      {
        "Type": "district",
        "Code": "512",
        "FullName": "Hiệp Đức",
        "CodeName": "hiep_duc"
      },
      {
        "Type": "district",
        "Code": "513",
        "FullName": "Thăng Bình",
        "CodeName": "thang_binh"
      },
      {
        "Type": "district",
        "Code": "514",
        "FullName": "Tiên Phước",
        "CodeName": "tien_phuoc"
      },
      {
        "Type": "district",
        "Code": "515",
        "FullName": "Bắc Trà My",
        "CodeName": "bac_tra_my"
      },
      {
        "Type": "district",
        "Code": "516",
        "FullName": "Nam Trà My",
        "CodeName": "nam_tra_my"
      },
      {
        "Type": "district",
        "Code": "517",
        "FullName": "Núi Thành",
        "CodeName": "nui_thanh"
      },
      {
        "Type": "district",
        "Code": "518",
        "FullName": "Phú Ninh",
        "CodeName": "phu_ninh"
      },
      {
        "Type": "district",
        "Code": "519",
        "FullName": "Nông Sơn",
        "CodeName": "nong_son"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "51",
    "FullName": "Quảng Ngãi",
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
        "FullName": "Bình Sơn",
        "CodeName": "binh_son"
      },
      {
        "Type": "district",
        "Code": "525",
        "FullName": "Trà Bồng",
        "CodeName": "tra_bong"
      },
      {
        "Type": "district",
        "Code": "527",
        "FullName": "Sơn Tịnh",
        "CodeName": "son_tinh"
      },
      {
        "Type": "district",
        "Code": "528",
        "FullName": "Tư Nghĩa",
        "CodeName": "tu_nghia"
      },
      {
        "Type": "district",
        "Code": "529",
        "FullName": "Sơn Hà",
        "CodeName": "son_ha"
      },
      {
        "Type": "district",
        "Code": "530",
        "FullName": "Sơn Tây",
        "CodeName": "son_tay"
      },
      {
        "Type": "district",
        "Code": "531",
        "FullName": "Minh Long",
        "CodeName": "minh_long"
      },
      {
        "Type": "district",
        "Code": "532",
        "FullName": "Nghĩa Hành",
        "CodeName": "nghia_hanh"
      },
      {
        "Type": "district",
        "Code": "533",
        "FullName": "Mộ Đức",
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
        "FullName": "Ba Tơ",
        "CodeName": "ba_to"
      },
      {
        "Type": "district",
        "Code": "536",
        "FullName": "Lý Sơn",
        "CodeName": "ly_son"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "52",
    "FullName": "Bình Định",
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
        "FullName": "An Lão",
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
        "FullName": "Hoài Ân",
        "CodeName": "hoai_an"
      },
      {
        "Type": "district",
        "Code": "545",
        "FullName": "Phù Mỹ",
        "CodeName": "phu_my"
      },
      {
        "Type": "district",
        "Code": "546",
        "FullName": "Vĩnh Thạnh",
        "CodeName": "vinh_thanh"
      },
      {
        "Type": "district",
        "Code": "547",
        "FullName": "Tây Sơn",
        "CodeName": "tay_son"
      },
      {
        "Type": "district",
        "Code": "548",
        "FullName": "Phù Cát",
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
        "FullName": "Tuy Phước",
        "CodeName": "tuy_phuoc"
      },
      {
        "Type": "district",
        "Code": "551",
        "FullName": "Vân Canh",
        "CodeName": "van_canh"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "54",
    "FullName": "Phú Yên",
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
        "FullName": "Đồng Xuân",
        "CodeName": "dong_xuan"
      },
      {
        "Type": "district",
        "Code": "559",
        "FullName": "Tuy An",
        "CodeName": "tuy_an"
      },
      {
        "Type": "district",
        "Code": "560",
        "FullName": "Sơn Hòa",
        "CodeName": "son_hoa"
      },
      {
        "Type": "district",
        "Code": "561",
        "FullName": "Sông Hinh",
        "CodeName": "song_hinh"
      },
      {
        "Type": "district",
        "Code": "562",
        "FullName": "Tây Hoà",
        "CodeName": "tay_hoa"
      },
      {
        "Type": "district",
        "Code": "563",
        "FullName": "Phú Hoà",
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
    "FullName": "Khánh Hòa",
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
        "FullName": "Cam Lâm",
        "CodeName": "cam_lam"
      },
      {
        "Type": "district",
        "Code": "571",
        "FullName": "Vạn Ninh",
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
        "FullName": "Khánh Vĩnh",
        "CodeName": "khanh_vinh"
      },
      {
        "Type": "district",
        "Code": "574",
        "FullName": "Diên Khánh",
        "CodeName": "dien_khanh"
      },
      {
        "Type": "district",
        "Code": "575",
        "FullName": "Khánh Sơn",
        "CodeName": "khanh_son"
      },
      {
        "Type": "district",
        "Code": "576",
        "FullName": "Trường Sa",
        "CodeName": "truong_sa"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "58",
    "FullName": "Ninh Thuận",
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
        "FullName": "Bác Ái",
        "CodeName": "bac_ai"
      },
      {
        "Type": "district",
        "Code": "585",
        "FullName": "Ninh Sơn",
        "CodeName": "ninh_son"
      },
      {
        "Type": "district",
        "Code": "586",
        "FullName": "Ninh Hải",
        "CodeName": "ninh_hai"
      },
      {
        "Type": "district",
        "Code": "587",
        "FullName": "Ninh Phước",
        "CodeName": "ninh_phuoc"
      },
      {
        "Type": "district",
        "Code": "588",
        "FullName": "Thuận Bắc",
        "CodeName": "thuan_bac"
      },
      {
        "Type": "district",
        "Code": "589",
        "FullName": "Thuận Nam",
        "CodeName": "thuan_nam"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "60",
    "FullName": "Bình Thuận",
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
        "FullName": "Tuy Phong",
        "CodeName": "tuy_phong"
      },
      {
        "Type": "district",
        "Code": "596",
        "FullName": "Bắc Bình",
        "CodeName": "bac_binh"
      },
      {
        "Type": "district",
        "Code": "597",
        "FullName": "Hàm Thuận Bắc",
        "CodeName": "ham_thuan_bac"
      },
      {
        "Type": "district",
        "Code": "598",
        "FullName": "Hàm Thuận Nam",
        "CodeName": "ham_thuan_nam"
      },
      {
        "Type": "district",
        "Code": "599",
        "FullName": "Tánh Linh",
        "CodeName": "tanh_linh"
      },
      {
        "Type": "district",
        "Code": "600",
        "FullName": "Đức Linh",
        "CodeName": "duc_linh"
      },
      {
        "Type": "district",
        "Code": "601",
        "FullName": "Hàm Tân",
        "CodeName": "ham_tan"
      },
      {
        "Type": "district",
        "Code": "602",
        "FullName": "Phú Quí",
        "CodeName": "phu_qui"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "62",
    "FullName": "Kon Tum",
    "CodeName": "kon_tum",
    "District": [
      {
        "Type": "district",
        "Code": "615",
        "FullName": "Đắk Hà",
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
        "FullName": "Đắk Glei",
        "CodeName": "dak_glei"
      },
      {
        "Type": "district",
        "Code": "611",
        "FullName": "Ngọc Hồi",
        "CodeName": "ngoc_hoi"
      },
      {
        "Type": "district",
        "Code": "612",
        "FullName": "Đắk Tô",
        "CodeName": "dak_to"
      },
      {
        "Type": "district",
        "Code": "613",
        "FullName": "Kon Plông",
        "CodeName": "kon_plong"
      },
      {
        "Type": "district",
        "Code": "614",
        "FullName": "Kon Rẫy",
        "CodeName": "kon_ray"
      },
      {
        "Type": "district",
        "Code": "616",
        "FullName": "Sa Thầy",
        "CodeName": "sa_thay"
      },
      {
        "Type": "district",
        "Code": "617",
        "FullName": "Tu Mơ Rông",
        "CodeName": "tu_mo_rong"
      },
      {
        "Type": "district",
        "Code": "618",
        "FullName": "Ia H' Drai",
        "CodeName": "ia_h_drai"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "64",
    "FullName": "Gia Lai",
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
        "FullName": "KBang",
        "CodeName": "kbang"
      },
      {
        "Type": "district",
        "Code": "626",
        "FullName": "Đăk Đoa",
        "CodeName": "dak_doa"
      },
      {
        "Type": "district",
        "Code": "627",
        "FullName": "Chư Păh",
        "CodeName": "chu_pah"
      },
      {
        "Type": "district",
        "Code": "628",
        "FullName": "Ia Grai",
        "CodeName": "ia_grai"
      },
      {
        "Type": "district",
        "Code": "629",
        "FullName": "Mang Yang",
        "CodeName": "mang_yang"
      },
      {
        "Type": "district",
        "Code": "630",
        "FullName": "Kông Chro",
        "CodeName": "kong_chro"
      },
      {
        "Type": "district",
        "Code": "631",
        "FullName": "Đức Cơ",
        "CodeName": "duc_co"
      },
      {
        "Type": "district",
        "Code": "632",
        "FullName": "Chư Prông",
        "CodeName": "chu_prong"
      },
      {
        "Type": "district",
        "Code": "633",
        "FullName": "Chư Sê",
        "CodeName": "chu_se"
      },
      {
        "Type": "district",
        "Code": "634",
        "FullName": "Đăk Pơ",
        "CodeName": "dak_po"
      },
      {
        "Type": "district",
        "Code": "635",
        "FullName": "Ia Pa",
        "CodeName": "ia_pa"
      },
      {
        "Type": "district",
        "Code": "637",
        "FullName": "Krông Pa",
        "CodeName": "krong_pa"
      },
      {
        "Type": "district",
        "Code": "638",
        "FullName": "Phú Thiện",
        "CodeName": "phu_thien"
      },
      {
        "Type": "district",
        "Code": "639",
        "FullName": "Chư Pưh",
        "CodeName": "chu_puh"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "66",
    "FullName": "Đắk Lắk",
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
        "FullName": "Ea H'leo",
        "CodeName": "ea_hleo"
      },
      {
        "Type": "district",
        "Code": "646",
        "FullName": "Ea Súp",
        "CodeName": "ea_sup"
      },
      {
        "Type": "district",
        "Code": "647",
        "FullName": "Buôn Đôn",
        "CodeName": "buon_don"
      },
      {
        "Type": "district",
        "Code": "648",
        "FullName": "Cư M'gar",
        "CodeName": "cu_mgar"
      },
      {
        "Type": "district",
        "Code": "649",
        "FullName": "Krông Búk",
        "CodeName": "krong_buk"
      },
      {
        "Type": "district",
        "Code": "650",
        "FullName": "Krông Năng",
        "CodeName": "krong_nang"
      },
      {
        "Type": "district",
        "Code": "651",
        "FullName": "Ea Kar",
        "CodeName": "ea_kar"
      },
      {
        "Type": "district",
        "Code": "652",
        "FullName": "M'Đrắk",
        "CodeName": "mdrak"
      },
      {
        "Type": "district",
        "Code": "653",
        "FullName": "Krông Bông",
        "CodeName": "krong_bong"
      },
      {
        "Type": "district",
        "Code": "654",
        "FullName": "Krông Pắc",
        "CodeName": "krong_pac"
      },
      {
        "Type": "district",
        "Code": "655",
        "FullName": "Krông A Na",
        "CodeName": "krong_a_na"
      },
      {
        "Type": "district",
        "Code": "656",
        "FullName": "Lắk",
        "CodeName": "lak"
      },
      {
        "Type": "district",
        "Code": "657",
        "FullName": "Cư Kuin",
        "CodeName": "cu_kuin"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "67",
    "FullName": "Đắk Nông",
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
        "FullName": "Đăk Glong",
        "CodeName": "dak_glong"
      },
      {
        "Type": "district",
        "Code": "662",
        "FullName": "Cư Jút",
        "CodeName": "cu_jut"
      },
      {
        "Type": "district",
        "Code": "663",
        "FullName": "Đắk Mil",
        "CodeName": "dak_mil"
      },
      {
        "Type": "district",
        "Code": "664",
        "FullName": "Krông Nô",
        "CodeName": "krong_no"
      },
      {
        "Type": "district",
        "Code": "665",
        "FullName": "Đắk Song",
        "CodeName": "dak_song"
      },
      {
        "Type": "district",
        "Code": "666",
        "FullName": "Đắk R'Lấp",
        "CodeName": "dak_rlap"
      },
      {
        "Type": "district",
        "Code": "667",
        "FullName": "Tuy Đức",
        "CodeName": "tuy_duc"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "68",
    "FullName": "Lâm Đồng",
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
        "FullName": "Đam Rông",
        "CodeName": "dam_rong"
      },
      {
        "Type": "district",
        "Code": "675",
        "FullName": "Lạc Dương",
        "CodeName": "lac_duong"
      },
      {
        "Type": "district",
        "Code": "676",
        "FullName": "Lâm Hà",
        "CodeName": "lam_ha"
      },
      {
        "Type": "district",
        "Code": "677",
        "FullName": "Đơn Dương",
        "CodeName": "don_duong"
      },
      {
        "Type": "district",
        "Code": "678",
        "FullName": "Đức Trọng",
        "CodeName": "duc_trong"
      },
      {
        "Type": "district",
        "Code": "679",
        "FullName": "Di Linh",
        "CodeName": "di_linh"
      },
      {
        "Type": "district",
        "Code": "680",
        "FullName": "Bảo Lâm",
        "CodeName": "bao_lam"
      },
      {
        "Type": "district",
        "Code": "681",
        "FullName": "Đạ Huoai",
        "CodeName": "da_huoai"
      },
      {
        "Type": "district",
        "Code": "682",
        "FullName": "Đạ Tẻh",
        "CodeName": "da_teh"
      },
      {
        "Type": "district",
        "Code": "683",
        "FullName": "Cát Tiên",
        "CodeName": "cat_tien"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "70",
    "FullName": "Bình Phước",
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
        "FullName": "Bù Gia Mập",
        "CodeName": "bu_gia_map"
      },
      {
        "Type": "district",
        "Code": "692",
        "FullName": "Lộc Ninh",
        "CodeName": "loc_ninh"
      },
      {
        "Type": "district",
        "Code": "693",
        "FullName": "Bù Đốp",
        "CodeName": "bu_dop"
      },
      {
        "Type": "district",
        "Code": "694",
        "FullName": "Hớn Quản",
        "CodeName": "hon_quan"
      },
      {
        "Type": "district",
        "Code": "695",
        "FullName": "Đồng Phú",
        "CodeName": "dong_phu"
      },
      {
        "Type": "district",
        "Code": "696",
        "FullName": "Bù Đăng",
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
        "FullName": "Phú Riềng",
        "CodeName": "phu_rieng"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "72",
    "FullName": "Tây Ninh",
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
        "FullName": "Tân Biên",
        "CodeName": "tan_bien"
      },
      {
        "Type": "district",
        "Code": "706",
        "FullName": "Tân Châu",
        "CodeName": "tan_chau"
      },
      {
        "Type": "district",
        "Code": "707",
        "FullName": "Dương Minh Châu",
        "CodeName": "duong_minh_chau"
      },
      {
        "Type": "district",
        "Code": "708",
        "FullName": "Châu Thành",
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
        "FullName": "Gò Dầu",
        "CodeName": "go_dau"
      },
      {
        "Type": "district",
        "Code": "711",
        "FullName": "Bến Cầu",
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
    "FullName": "Bình Dương",
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
        "FullName": "Bàu Bàng",
        "CodeName": "bau_bang"
      },
      {
        "Type": "district",
        "Code": "720",
        "FullName": "Dầu Tiếng",
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
        "FullName": "Phú Giáo",
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
        "FullName": "Bắc Tân Uyên",
        "CodeName": "bac_tan_uyen"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "75",
    "FullName": "Đồng Nai",
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
        "FullName": "Tân Phú",
        "CodeName": "tan_phu"
      },
      {
        "Type": "district",
        "Code": "735",
        "FullName": "Vĩnh Cửu",
        "CodeName": "vinh_cuu"
      },
      {
        "Type": "district",
        "Code": "736",
        "FullName": "Định Quán",
        "CodeName": "dinh_quan"
      },
      {
        "Type": "district",
        "Code": "737",
        "FullName": "Trảng Bom",
        "CodeName": "trang_bom"
      },
      {
        "Type": "district",
        "Code": "738",
        "FullName": "Thống Nhất",
        "CodeName": "thong_nhat"
      },
      {
        "Type": "district",
        "Code": "739",
        "FullName": "Cẩm Mỹ",
        "CodeName": "cam_my"
      },
      {
        "Type": "district",
        "Code": "740",
        "FullName": "Long Thành",
        "CodeName": "long_thanh"
      },
      {
        "Type": "district",
        "Code": "741",
        "FullName": "Xuân Lộc",
        "CodeName": "xuan_loc"
      },
      {
        "Type": "district",
        "Code": "742",
        "FullName": "Nhơn Trạch",
        "CodeName": "nhon_trach"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "77",
    "FullName": "Bà Rịa - Vũng Tàu",
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
        "FullName": "Châu Đức",
        "CodeName": "chau_duc"
      },
      {
        "Type": "district",
        "Code": "751",
        "FullName": "Xuyên Mộc",
        "CodeName": "xuyen_moc"
      },
      {
        "Type": "district",
        "Code": "752",
        "FullName": "Long Điền",
        "CodeName": "long_dien"
      },
      {
        "Type": "district",
        "Code": "753",
        "FullName": "Đất Đỏ",
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
        "FullName": "Côn Đảo",
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
        "FullName": "1",
        "CodeName": "1"
      },
      {
        "Type": "district",
        "Code": "761",
        "FullName": "12",
        "CodeName": "12"
      },
      {
        "Type": "district",
        "Code": "764",
        "FullName": "Gò Vấp",
        "CodeName": "go_vap"
      },
      {
        "Type": "district",
        "Code": "765",
        "FullName": "Bình Thạnh",
        "CodeName": "binh_thanh"
      },
      {
        "Type": "district",
        "Code": "766",
        "FullName": "Tân Bình",
        "CodeName": "tan_binh"
      },
      {
        "Type": "district",
        "Code": "767",
        "FullName": "Tân Phú",
        "CodeName": "tan_phu"
      },
      {
        "Type": "district",
        "Code": "768",
        "FullName": "Phú Nhuận",
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
        "FullName": "3",
        "CodeName": "3"
      },
      {
        "Type": "district",
        "Code": "771",
        "FullName": "10",
        "CodeName": "10"
      },
      {
        "Type": "district",
        "Code": "772",
        "FullName": "11",
        "CodeName": "11"
      },
      {
        "Type": "district",
        "Code": "773",
        "FullName": "4",
        "CodeName": "4"
      },
      {
        "Type": "district",
        "Code": "774",
        "FullName": "5",
        "CodeName": "5"
      },
      {
        "Type": "district",
        "Code": "775",
        "FullName": "6",
        "CodeName": "6"
      },
      {
        "Type": "district",
        "Code": "776",
        "FullName": "8",
        "CodeName": "8"
      },
      {
        "Type": "district",
        "Code": "777",
        "FullName": "Bình Tân",
        "CodeName": "binh_tan"
      },
      {
        "Type": "district",
        "Code": "778",
        "FullName": "7",
        "CodeName": "7"
      },
      {
        "Type": "district",
        "Code": "783",
        "FullName": "Củ Chi",
        "CodeName": "cu_chi"
      },
      {
        "Type": "district",
        "Code": "784",
        "FullName": "Hóc Môn",
        "CodeName": "hoc_mon"
      },
      {
        "Type": "district",
        "Code": "785",
        "FullName": "Bình Chánh",
        "CodeName": "binh_chanh"
      },
      {
        "Type": "district",
        "Code": "786",
        "FullName": "Nhà Bè",
        "CodeName": "nha_be"
      },
      {
        "Type": "district",
        "Code": "787",
        "FullName": "Cần Giờ",
        "CodeName": "can_gio"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "80",
    "FullName": "Long An",
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
        "FullName": "Tân Hưng",
        "CodeName": "tan_hung"
      },
      {
        "Type": "district",
        "Code": "797",
        "FullName": "Vĩnh Hưng",
        "CodeName": "vinh_hung"
      },
      {
        "Type": "district",
        "Code": "798",
        "FullName": "Mộc Hóa",
        "CodeName": "moc_hoa"
      },
      {
        "Type": "district",
        "Code": "799",
        "FullName": "Tân Thạnh",
        "CodeName": "tan_thanh"
      },
      {
        "Type": "district",
        "Code": "800",
        "FullName": "Thạnh Hóa",
        "CodeName": "thanh_hoa"
      },
      {
        "Type": "district",
        "Code": "801",
        "FullName": "Đức Huệ",
        "CodeName": "duc_hue"
      },
      {
        "Type": "district",
        "Code": "802",
        "FullName": "Đức Hòa",
        "CodeName": "duc_hoa"
      },
      {
        "Type": "district",
        "Code": "803",
        "FullName": "Bến Lức",
        "CodeName": "ben_luc"
      },
      {
        "Type": "district",
        "Code": "804",
        "FullName": "Thủ Thừa",
        "CodeName": "thu_thua"
      },
      {
        "Type": "district",
        "Code": "805",
        "FullName": "Tân Trụ",
        "CodeName": "tan_tru"
      },
      {
        "Type": "district",
        "Code": "806",
        "FullName": "Cần Đước",
        "CodeName": "can_duoc"
      },
      {
        "Type": "district",
        "Code": "807",
        "FullName": "Cần Giuộc",
        "CodeName": "can_giuoc"
      },
      {
        "Type": "district",
        "Code": "808",
        "FullName": "Châu Thành",
        "CodeName": "chau_thanh"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "82",
    "FullName": "Tiền Giang",
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
        "FullName": "Tân Phước",
        "CodeName": "tan_phuoc"
      },
      {
        "Type": "district",
        "Code": "819",
        "FullName": "Cái Bè",
        "CodeName": "cai_be"
      },
      {
        "Type": "district",
        "Code": "820",
        "FullName": "Cai Lậy",
        "CodeName": "cai_lay"
      },
      {
        "Type": "district",
        "Code": "821",
        "FullName": "Châu Thành",
        "CodeName": "chau_thanh"
      },
      {
        "Type": "district",
        "Code": "822",
        "FullName": "Chợ Gạo",
        "CodeName": "cho_gao"
      },
      {
        "Type": "district",
        "Code": "823",
        "FullName": "Gò Công Tây",
        "CodeName": "go_cong_tay"
      },
      {
        "Type": "district",
        "Code": "824",
        "FullName": "Gò Công Đông",
        "CodeName": "go_cong_dong"
      },
      {
        "Type": "district",
        "Code": "825",
        "FullName": "Tân Phú Đông",
        "CodeName": "tan_phu_dong"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "83",
    "FullName": "Bến Tre",
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
        "FullName": "Châu Thành",
        "CodeName": "chau_thanh"
      },
      {
        "Type": "district",
        "Code": "832",
        "FullName": "Chợ Lách",
        "CodeName": "cho_lach"
      },
      {
        "Type": "district",
        "Code": "833",
        "FullName": "Mỏ Cày Nam",
        "CodeName": "mo_cay_nam"
      },
      {
        "Type": "district",
        "Code": "834",
        "FullName": "Giồng Trôm",
        "CodeName": "giong_trom"
      },
      {
        "Type": "district",
        "Code": "835",
        "FullName": "Bình Đại",
        "CodeName": "binh_dai"
      },
      {
        "Type": "district",
        "Code": "836",
        "FullName": "Ba Tri",
        "CodeName": "ba_tri"
      },
      {
        "Type": "district",
        "Code": "837",
        "FullName": "Thạnh Phú",
        "CodeName": "thanh_phu"
      },
      {
        "Type": "district",
        "Code": "838",
        "FullName": "Mỏ Cày Bắc",
        "CodeName": "mo_cay_bac"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "84",
    "FullName": "Trà Vinh",
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
        "FullName": "Càng Long",
        "CodeName": "cang_long"
      },
      {
        "Type": "district",
        "Code": "845",
        "FullName": "Cầu Kè",
        "CodeName": "cau_ke"
      },
      {
        "Type": "district",
        "Code": "846",
        "FullName": "Tiểu Cần",
        "CodeName": "tieu_can"
      },
      {
        "Type": "district",
        "Code": "847",
        "FullName": "Châu Thành",
        "CodeName": "chau_thanh"
      },
      {
        "Type": "district",
        "Code": "848",
        "FullName": "Cầu Ngang",
        "CodeName": "cau_ngang"
      },
      {
        "Type": "district",
        "Code": "849",
        "FullName": "Trà Cú",
        "CodeName": "tra_cu"
      },
      {
        "Type": "district",
        "Code": "850",
        "FullName": "Duyên Hải",
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
    "FullName": "Vĩnh Long",
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
        "FullName": "Long Hồ",
        "CodeName": "long_ho"
      },
      {
        "Type": "district",
        "Code": "858",
        "FullName": "Mang Thít",
        "CodeName": "mang_thit"
      },
      {
        "Type": "district",
        "Code": "859",
        "FullName": "Vũng Liêm",
        "CodeName": "vung_liem"
      },
      {
        "Type": "district",
        "Code": "860",
        "FullName": "Tam Bình",
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
        "FullName": "Trà Ôn",
        "CodeName": "tra_on"
      },
      {
        "Type": "district",
        "Code": "863",
        "FullName": "Bình Tân",
        "CodeName": "binh_tan"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "87",
    "FullName": "Đồng Tháp",
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
        "FullName": "Tân Hồng",
        "CodeName": "tan_hong"
      },
      {
        "Type": "district",
        "Code": "870",
        "FullName": "Hồng Ngự",
        "CodeName": "hong_ngu"
      },
      {
        "Type": "district",
        "Code": "871",
        "FullName": "Tam Nông",
        "CodeName": "tam_nong"
      },
      {
        "Type": "district",
        "Code": "872",
        "FullName": "Tháp Mười",
        "CodeName": "thap_muoi"
      },
      {
        "Type": "district",
        "Code": "873",
        "FullName": "Cao Lãnh",
        "CodeName": "cao_lanh"
      },
      {
        "Type": "district",
        "Code": "874",
        "FullName": "Thanh Bình",
        "CodeName": "thanh_binh"
      },
      {
        "Type": "district",
        "Code": "875",
        "FullName": "Lấp Vò",
        "CodeName": "lap_vo"
      },
      {
        "Type": "district",
        "Code": "876",
        "FullName": "Lai Vung",
        "CodeName": "lai_vung"
      },
      {
        "Type": "district",
        "Code": "877",
        "FullName": "Châu Thành",
        "CodeName": "chau_thanh"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "89",
    "FullName": "An Giang",
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
        "FullName": "An Phú",
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
        "FullName": "Phú Tân",
        "CodeName": "phu_tan"
      },
      {
        "Type": "district",
        "Code": "889",
        "FullName": "Châu Phú",
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
        "FullName": "Tri Tôn",
        "CodeName": "tri_ton"
      },
      {
        "Type": "district",
        "Code": "892",
        "FullName": "Châu Thành",
        "CodeName": "chau_thanh"
      },
      {
        "Type": "district",
        "Code": "893",
        "FullName": "Chợ Mới",
        "CodeName": "cho_moi"
      },
      {
        "Type": "district",
        "Code": "894",
        "FullName": "Thoại Sơn",
        "CodeName": "thoai_son"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "91",
    "FullName": "Kiên Giang",
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
        "FullName": "Kiên Lương",
        "CodeName": "kien_luong"
      },
      {
        "Type": "district",
        "Code": "903",
        "FullName": "Hòn Đất",
        "CodeName": "hon_dat"
      },
      {
        "Type": "district",
        "Code": "904",
        "FullName": "Tân Hiệp",
        "CodeName": "tan_hiep"
      },
      {
        "Type": "district",
        "Code": "905",
        "FullName": "Châu Thành",
        "CodeName": "chau_thanh"
      },
      {
        "Type": "district",
        "Code": "906",
        "FullName": "Giồng Riềng",
        "CodeName": "giong_rieng"
      },
      {
        "Type": "district",
        "Code": "907",
        "FullName": "Gò Quao",
        "CodeName": "go_quao"
      },
      {
        "Type": "district",
        "Code": "908",
        "FullName": "An Biên",
        "CodeName": "an_bien"
      },
      {
        "Type": "district",
        "Code": "909",
        "FullName": "An Minh",
        "CodeName": "an_minh"
      },
      {
        "Type": "district",
        "Code": "910",
        "FullName": "Vĩnh Thuận",
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
        "FullName": "Kiên Hải",
        "CodeName": "kien_hai"
      },
      {
        "Type": "district",
        "Code": "913",
        "FullName": "U Minh Thượng",
        "CodeName": "u_minh_thuong"
      },
      {
        "Type": "district",
        "Code": "914",
        "FullName": "Giang Thành",
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
        "FullName": "Ninh Kiều",
        "CodeName": "ninh_kieu"
      },
      {
        "Type": "district",
        "Code": "917",
        "FullName": "Ô Môn",
        "CodeName": "o_mon"
      },
      {
        "Type": "district",
        "Code": "918",
        "FullName": "Bình Thuỷ",
        "CodeName": "binh_thuy"
      },
      {
        "Type": "district",
        "Code": "919",
        "FullName": "Cái Răng",
        "CodeName": "cai_rang"
      },
      {
        "Type": "district",
        "Code": "923",
        "FullName": "Thốt Nốt",
        "CodeName": "thot_not"
      },
      {
        "Type": "district",
        "Code": "924",
        "FullName": "Vĩnh Thạnh",
        "CodeName": "vinh_thanh"
      },
      {
        "Type": "district",
        "Code": "925",
        "FullName": "Cờ Đỏ",
        "CodeName": "co_do"
      },
      {
        "Type": "district",
        "Code": "926",
        "FullName": "Phong Điền",
        "CodeName": "phong_dien"
      },
      {
        "Type": "district",
        "Code": "927",
        "FullName": "Thới Lai",
        "CodeName": "thoi_lai"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "93",
    "FullName": "Hậu Giang",
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
        "FullName": "Châu Thành A",
        "CodeName": "chau_thanh_a"
      },
      {
        "Type": "district",
        "Code": "933",
        "FullName": "Châu Thành",
        "CodeName": "chau_thanh"
      },
      {
        "Type": "district",
        "Code": "934",
        "FullName": "Phụng Hiệp",
        "CodeName": "phung_hiep"
      },
      {
        "Type": "district",
        "Code": "935",
        "FullName": "Vị Thuỷ",
        "CodeName": "vi_thuy"
      },
      {
        "Type": "district",
        "Code": "936",
        "FullName": "Long Mỹ",
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
    "FullName": "Sóc Trăng",
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
        "FullName": "Châu Thành",
        "CodeName": "chau_thanh"
      },
      {
        "Type": "district",
        "Code": "943",
        "FullName": "Kế Sách",
        "CodeName": "ke_sach"
      },
      {
        "Type": "district",
        "Code": "944",
        "FullName": "Mỹ Tú",
        "CodeName": "my_tu"
      },
      {
        "Type": "district",
        "Code": "945",
        "FullName": "Cù Lao Dung",
        "CodeName": "cu_lao_dung"
      },
      {
        "Type": "district",
        "Code": "946",
        "FullName": "Long Phú",
        "CodeName": "long_phu"
      },
      {
        "Type": "district",
        "Code": "947",
        "FullName": "Mỹ Xuyên",
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
        "FullName": "Thạnh Trị",
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
        "FullName": "Trần Đề",
        "CodeName": "tran_de"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "95",
    "FullName": "Bạc Liêu",
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
        "FullName": "Hồng Dân",
        "CodeName": "hong_dan"
      },
      {
        "Type": "district",
        "Code": "957",
        "FullName": "Phước Long",
        "CodeName": "phuoc_long"
      },
      {
        "Type": "district",
        "Code": "958",
        "FullName": "Vĩnh Lợi",
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
        "FullName": "Đông Hải",
        "CodeName": "dong_hai"
      },
      {
        "Type": "district",
        "Code": "961",
        "FullName": "Hoà Bình",
        "CodeName": "hoa_binh"
      }
    ]
  },
  {
    "Type": "province",
    "Code": "96",
    "FullName": "Cà Mau",
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
        "FullName": "U Minh",
        "CodeName": "u_minh"
      },
      {
        "Type": "district",
        "Code": "967",
        "FullName": "Thới Bình",
        "CodeName": "thoi_binh"
      },
      {
        "Type": "district",
        "Code": "968",
        "FullName": "Trần Văn Thời",
        "CodeName": "tran_van_thoi"
      },
      {
        "Type": "district",
        "Code": "969",
        "FullName": "Cái Nước",
        "CodeName": "cai_nuoc"
      },
      {
        "Type": "district",
        "Code": "970",
        "FullName": "Đầm Dơi",
        "CodeName": "dam_doi"
      },
      {
        "Type": "district",
        "Code": "971",
        "FullName": "Năm Căn",
        "CodeName": "nam_can"
      },
      {
        "Type": "district",
        "Code": "972",
        "FullName": "Phú Tân",
        "CodeName": "phu_tan"
      },
      {
        "Type": "district",
        "Code": "973",
        "FullName": "Ngọc Hiển",
        "CodeName": "ngoc_hien"
      }
    ]
  }
]
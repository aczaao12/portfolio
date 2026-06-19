export interface ProjectDetail {
  id: string;
  tagline: string;
  badge: string;
  version: string;
  problem: string;
  problemPoints: string[];
  solutionPoints: string[];
  features: { icon: string; title: string; desc: string }[];
  guideSteps: { num: number; title: string; desc: string }[];
  guideButtons: { label: string; desc: string }[];
  links: { label: string; url: string }[];
}

export const projectDetails: Record<string, ProjectDetail> = {
  awing: {
    id: "awing",
    tagline: "Tự động đăng nhập WiFi Awing",
    badge: "v0.0.15 · Windows",
    version: "0.0.15",
    problem: "Mạng WiFi Awing thường xuyên bị ngắt, yêu cầu đăng nhập lại qua Captive Portal. Mỗi lần mất mạng phải mở browser, tìm cửa sổ đăng nhập, nhập thông tin — công việc bị gián đoạn, mất 3-5 phút mỗi lần kết nối lại.",
    problemPoints: [
      "Mạng WiFi Awing thường xuyên bị ngắt, yêu cầu đăng nhập lại qua Captive Portal",
      "Mỗi lần mất mạng phải mở browser, tìm cửa sổ đăng nhập, nhập thông tin",
      "Công việc bị gián đoạn, mất 3-5 phút mỗi lần kết nối lại",
      "Không có cách tự động hóa quy trình này trên Windows",
    ],
    solutionPoints: [
      "Tự động kiểm tra Internet mỗi 5 giây — phát hiện ngay khi mất mạng",
      "Tự động tìm portal Awing và thực hiện xác thực CHAP",
      "Reset mạng thông minh: DHCP Release/Renew, Flush DNS & ARP",
      "Phục hồi Internet chỉ trong 15–30 giây",
    ],
    features: [
      {
        icon: "📈",
        title: "Giám sát realtime",
        desc: "Kiểm tra kết nối Internet định kỳ (mặc định 5 giây). Phát hiện chính xác trạng thái mạng.",
      },
      {
        icon: "🔒",
        title: "Tự động xác thực CHAP",
        desc: "Giao tiếp với Cloud Awing qua 4 bước: VerifyUrl → GetCustomer → GetCampaignHtml → Login. Hỗ trợ mã hóa CHAP MD5.",
      },
      {
        icon: "💡",
        title: "Reset mạng thông minh",
        desc: "Tự động release/renew DHCP, flush DNS cache và ARP cache khi phát hiện mất kết nối. Ép hệ thống nhận IP mới ngay lập tức.",
      },
      {
        icon: "👁",
        title: "Giao diện trực quan",
        desc: "Chế độ tối/sáng, cửa sổ log realtime, icon khay hệ thống. Click đôi vào tray icon để mở lại cửa sổ chính.",
      },
      {
        icon: "🔄",
        title: "Tự động cập nhật",
        desc: "Kiểm tra phiên bản mới khi khởi động. Thông báo trực tiếp trong app, tải về và cập nhật dễ dàng.",
      },
    ],
    guideSteps: [
      { num: 1, title: "Tải file", desc: "Tải file .zip từ bản phát hành mới nhất. Giải nén vào thư mục bất kỳ (ví dụ C:\\Program Files\\AWING)." },
      { num: 2, title: "Chạy ứng dụng", desc: "Mở awing-cpp.exe." },
      { num: 3, title: "Nhấn Bắt đầu", desc: "Cửa sổ chính hiện ra, nhấn nút Bắt đầu (màu xanh). App lập tức kiểm tra Internet và bắt đầu giám sát." },
      { num: 4, title: "Thu nhỏ xuống khay hệ thống", desc: "Nhấn nút X trên cửa sổ để thu nhỏ xuống tray (cạnh đồng hồ). App chạy ngầm, không làm phiền bạn." },
    ],
    guideButtons: [
      { label: "Bắt đầu / Dừng", desc: "Bật hoặc tắt dịch vụ giám sát" },
      { label: "Xóa log", desc: "Xóa nhật ký hiển thị trên màn hình" },
      { label: "Tạm dừng", desc: "Tạm dừng cập nhật log (không ảnh hưởng dịch vụ)" },
      { label: "Tối / Sáng", desc: "Chuyển đổi giao diện sáng & tối" },
      { label: "Cập nhật", desc: "Kiểm tra phiên bản mới" },
      { label: "Đổi nền", desc: "Thay đổi ảnh nền cho cửa sổ app" },
    ],
    links: [
      { label: "GitHub", url: "https://github.com/anomalyco/auto-login-awifi" },
      { label: "Telegram", url: "https://t.me/your_telegram" },
      { label: "Facebook", url: "https://facebook.com/your_page" },
    ],
  },
};

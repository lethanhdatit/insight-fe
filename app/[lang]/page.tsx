import MysticalForm from "@/components/mystical-form"
import AncientClock from "@/components/ancient-clock"

// Static dictionary for Vietnamese with ancient theme
const dictionary = {
  title: "Khám Phá Số Mệnh",
  subtitle: "Hành trình khám phá bí ẩn tâm linh qua trí tuệ cổ xưa",
  form: {
    title: "Thông Tin Cá Nhân",
    firstName: "Tên",
    middleName: "Tên đệm",
    lastName: "Họ",
    dateOfBirth: "Ngày sinh",
    gender: "Giới tính",
    genderPlaceholder: "Chọn giới tính",
    religion: "Tôn giáo",
    religionPlaceholder: "Chọn tôn giáo",
    location: "Địa điểm hiện tại",
    locationExample: "Ví dụ: Quận 1, TP.HCM",
    dreamDescription: "Mô tả giấc mơ",
    dreamPlaceholder: "Hãy thuật lại những giấc mơ huyền bí của bạn...",
    submitButton: "Khởi Mệnh",    
    loading: "Đang tham vấn thiên cơ...",
    loadingSub: "Thiên cơ đang được tham vấn...",    
  },
  results: {
    yourNumbers: "Những Con Số Định Mệnh",
    detail: "Chi Tiết Giải Mã",
    warning: "Cảnh Báo Thiên Cơ",
    advice: "Lời Khuyên Tâm Linh",
    summary: "Tổng Kết Vận Mệnh",
    skipDraw: "Bỏ qua hiệu ứng",
    numberTitle: "Những con số định mệnh của bạn",
    numberSubTitle: "Giải Mã Vận Mệnh",
    reSubmitButton: "Khám phá lại",
    onLoading: "Đang tải kết quả...",
    onError: "Có lỗi xảy ra khi tham vấn thiên cơ. Vui lòng thử lại."
  },
  clock: {
    morning: "Sáng",
    afternoon: "Trưa",
    evening: "Chiều",
    night: "Đêm",
  },
  genders: [
    { value: 1, label: "Nam" },
    { value: 2, label: "Nữ" },
    { value: 3, label: "Phi nhị nguyên" },
    { value: 4, label: "Nam chuyển giới" },
    { value: 5, label: "Nữ chuyển giới" },
    { value: 6, label: "Biến đổi giới tính" },
    { value: 7, label: "Vô giới" },
    { value: 8, label: "Hai linh hồn" },
    { value: 9, label: "Intersex" },
    { value: 10, label: "Khác" },
  ],
  religions: [
    { value: 1, label: "Phật giáo" },
    { value: 2, label: "Công giáo" },
    { value: 3, label: "Tin Lành" },
    { value: 4, label: "Hồi giáo" },
    { value: 5, label: "Do Thái giáo" },
    { value: 6, label: "Ấn Độ giáo" },
    { value: 7, label: "Khổng giáo" },
    { value: 8, label: "Tao giáo" },
    { value: 9, label: "Vô thần" },
    { value: 10, label: "Tôn giáo khác" },
  ],
  common: {
    morning: "Sáng",
    afternoon: "Trưa",
    evening: "Chiều",
    night: "Tối",
  }
}

export default function HomePage({
  params,
}: {
  params: { lang: string }
}) {
  // Spread factor to control how close icons are to the edges
  const spreadFactor = 0.85; // Larger value means icons are closer to the edges

  // Function to generate random positions within the screen near the edges
  const generateRandomPosition = () => {
    // Top and Left values are randomized within the range of 10% to 90% of the screen size
    const top = Math.random() * (90 - spreadFactor * 20) + spreadFactor * 10; // Random top position near edges
    const left = Math.random() * (90 - spreadFactor * 20) + spreadFactor * 10; // Random left position near edges
    return { top: `${top}%`, left: `${left}%` };
  };

  const generateRandomDelay = () => {
    const delay = Math.random() * 7 + 1; // Random delay between 1s and 8s
    return `${delay}s`;
  };

  return (
    <main className="min-h-screen relative">
      {/* Ancient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100"></div>

      <div className="absolute top-20 left-12 text-6xl opacity-20 floating-ancient">🏮</div>

      <div
        className="absolute bottom-12 right-12 text-5xl opacity-20 floating-ancient"
        style={{ animationDelay: "2s" }}
      >
        🐉
      </div>      

      {['🐮', '🐯', '🐱', '🐍', '🐴', '🐑', '🐵', '🐔', '🐶', '🐷'].map((icon, index) => {
        const position = generateRandomPosition();
        return (
          <div
            key={index}
            className="absolute text-5xl opacity-20 floating-ancient"
            style={{
              ...position,
              animationDelay: generateRandomDelay(),
            }}
          >
            {icon}
          </div>
        );
      })}

      <div className="absolute top-1/2 left-14 text-4xl opacity-20 floating-ancient" style={{ animationDelay: "4s" }}>
        ☯️
      </div>

      <div className="absolute bottom-1/2 right-12 text-4xl opacity-20 floating-ancient" style={{ animationDelay: "4s" }}>
        🐭
      </div>

      {/* Ancient Clock */}
      <div className="absolute top-8 right-8 z-20">
        <AncientClock dictionary={dictionary}/>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="ancient-font text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-orange-600 to-yellow-600 ancient-text-glow mb-4">
            {dictionary.title}
          </h1>
          <p className="text-lg md:text-xl text-amber-800 ancient-font max-w-3xl mx-auto font-medium">
            {dictionary.subtitle}
          </p>
        </div>

        {/* Ancient Book Container */}
        <div className="flex justify-center w-full">
          <MysticalForm dictionary={dictionary} />
        </div>
      </div>
    </main>
  )
}

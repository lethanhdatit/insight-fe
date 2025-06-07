import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const response = await fetch("https://api.insight.ai.vn/api/LuckyNumber/theology", {
      method: "POST",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error("API request failed")
    }

    const data = await response.json()

    // const data = {
    //   message: "OK",
    //   data: {
    //     numbers: ["18", "9", "4", "6", "2025"],
    //     explanation: {
    //       detail: [
    //         {
    //           title: "Thần học và Con số May mắn",
    //           content:
    //             "<p style='color: green;'>Trong Thần học, số <strong>9</strong> được xem là biểu tượng của sự toàn vẹn và trọn vẹn. Với nền tảng Phật giáo của bạn, số 9 gắn kết sự thông thái và sự giác ngộ, tượng trưng cho những phẩm chất mà bạn luôn hướng đến trong cuộc sống. Tương tự, số <strong>18</strong>, ngày sinh của bạn, là sự kết hợp kỳ diệu của số 1 (khởi đầu mới) và số 8 (thịnh vượng và vô hạn), tạo ra một chuỗi năng lượng tích cực, giúp bạn hiện thực hóa mọi ước mơ và mục tiêu. Điều này càng mạnh mẽ hơn khi bạn mơ thấy mình quay lại không gian trường cấp 1 - thời điểm khởi đầu của nhiều mục tiêu và ước mơ.</p>",
    //         },
    //         {
    //           title: "Chiêm Tinh học và Sự Trùng hợp Kỳ diệu",
    //           content:
    //             "<p style='color: blue;'>Chiêm tinh học nhấn mạnh rằng ngày sinh <strong>18 tháng 9</strong> của bạn thuộc cung Xử Nữ, nổi bật với sự cẩn trọng và chi tiết. Điều này cộng hưởng mạnh mẽ với số <strong>6</strong> (ngày của thời gian hiện tại), đại diện cho sự hài hòa và cân bằng. Số này kết hợp với <strong>2025</strong>, năm hiện tại, đánh dấu giai đoạn của sự trưởng thành và sẻ chia. Qua giấc mơ chân thực về quá khứ, bạn đang được khuyến khích sử dụng những trải nghiệm và kỉ niệm để tạo nên đột phá trong tương lai gần.</p>",
    //         },
    //       ],
    //       warning: [
    //         {
    //           title: "Cảnh Báo Từ Tử Vi",
    //           content:
    //             "<p style='color: red;'>Theo Tử Vi, số <strong>4</strong> thường được coi là không may mắn vì đồng âm với từ \"tử\" trong tiếng Hán, có nghĩa là chết chóc. Tuy nhiên, khi số này xuất hiện trong chuỗi của bạn, nó cảnh báo bạn cần phải chủ động trong việc giữ gìn sức khỏe và tránh xa các nguy cơ tổn thương. Năm 2025, với các yếu tố thiên tượng thay đổi, nhấn mạnh tầm quan trọng của việc sống cân bằng và không bị cuốn vào những căng thẳng không cần thiết.</p>",
    //         },
    //         {
    //           title: "Chú Ý Phong Thủy Số 6",
    //           content:
    //             "<p style='color: maroon;'>Phong Thủy nhấn mạnh rằng số <strong>6</strong> tượng trưng cho dòng chảy và sự hài hòa, nhưng với điều kiện không để sự tự mãn chiếm hữu. Khi số này gắn liền với ngày thứ Sáu - 6 tháng 6, nó khuyến khích bạn tạo ra môi trường sống và làm việc hài hòa, thoáng đãng, và hạn chế sử dụng các yếu tố mang năng lượng tiêu cực như gương lớn hay các màu tối. Năm 2025 khi sự dịch chuyển hành tinh ảnh hưởng rõ nét, bạn cần phải cẩn trọng với những gì mình hấp thụ trong không gian sống.</p>",
    //         },
    //       ],
    //       advice: [
    //         {
    //           title: "Lời Khuyên Từ Thần Số Học",
    //           content:
    //             "<p style='color: purple;'>Thần số học đề xuất rằng số <strong>18</strong> và <strong>9</strong> không chỉ là những con số may mắn mà còn là những con số đầy quyền năng để giúp bạn định hướng sự tiến bộ trong sự nghiệp và cuộc sống cá nhân. Trong năm 2025, bạn nên dành thời gian để tĩnh tâm, thiền định hoặc tham gia các lớp học nâng cao, phát triển kỹ năng cá nhân. Điều này không chỉ giúp bạn cân bằng nội tâm mà còn tạo ra những kết nối giá trị trong công việc.</p>",
    //         },
    //         {
    //           title: "Tâm lý học: Giải Mã Giấc Mơ",
    //           content:
    //             "<p style='color: darkorange;'>Giấc mơ quay về thời kỳ cấp 1 của bạn có thể là một tín hiệu từ tiềm thức, nhắc nhở bạn về những giá trị cốt lõi và bản chất hiền hòa, ngây thơ mà bạn đã từng có. Tâm lý học khuyên rằng trong năm 2025, sử dụng những ký ức tốt đẹp này làm động lực để thúc đẩy bản thân tiến xa hơn. Điều quan trọng là giữ vững bản ngã của mình đồng thời không sợ hãi những thách thức về sự trưởng thành và thay đổi.</p>",
    //         },
    //       ],
    //       summary: [
    //         {
    //           title: "Tóm tắt về Thời gian Hiện tại và Tác động Địa phương",
    //           content:
    //             "<p style='color: teal;'>Hiện tại, với thời gian là ngày <strong>6 tháng 6, 2025</strong>, con số này có sức mạnh đặc biệt, kết hợp các yếu tố của quá khứ và những giấc mơ để định hình tương lai. Tại Bình Thạnh, nơi mà sự nhộn nhịp của thành phố hòa quyện với truyền thống và văn hóa, những con số này được chiếu sáng với dòng âm nhạc và năng lượng tươi mới của tuổi trẻ. Đây là thời điểm lý tưởng để bạn giữ vững niềm tin, khai thác những cơ hội và không ngừng tìm kiếm sự tiến bộ cá nhân.</p>",
    //         },
    //         {
    //           title: "Kết nối Văn hóa và Con số May mắn",
    //           content:
    //             "<p style='color: navy;'>Sống tại Bình Thạnh, một nơi giao thoa giữa nét truyền thống và hiện đại của Việt Nam, bạn có thể sử dụng các con số may mắn <strong>18, 9, 4, 6 và 2025</strong> trong các hoạt động hàng ngày. Chẳng hạn, áp dụng số <strong>18</strong> trong những lần quyết định đầu tư, khởi đầu dự án mới, hay sử dụng số <strong>9</strong> để tìm kiếm sự hòa hợp và thành công trong các mối quan hệ xung quanh. Thời gian là tài sản quý giá, và hiện tại, sự kết hợp này có thể tạo nên nhiều điều kỳ diệu.</p>",
    //         },
    //       ],
    //     },
    //   },
    //   ts: "06/06/2025 04:49:33",
    // };

    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch theology data" },
      { status: 500 }
    );
  }
}

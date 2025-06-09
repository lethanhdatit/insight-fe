import { type NextRequest, NextResponse } from "next/server";
import { withDecryption } from '@/lib/api/withDecryption'

export const POST = withDecryption(async (body, req: NextRequest) => {
  try {
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

//     const data = {
//   "message": "OK",
//   "data": {
//     "numbers": [
//       "9",
//       "18",
//       "1997",
//       "6",
//       "25"
//     ],
//     "explanation": {
//       "detail": [
//         {
//           "title": "Chiêm Tinh học",
//           "content": "Ngày sinh 18 tháng 9 nằm trong cung Hoàng Đạo Xử Nữ, đại diện cho sự ẩn chứa của sự khéo léo và tinh tế trong công việc. Con số 9 là biểu tượng của sự hoàn thiện và tâm linh, cho thấy rằng người mang con số này thường có một trực giác sâu sắc. Và khi nhìn vào Thời gian hiện tại, ngày 9 tháng 6, năm 2025 có sự giao thoa giữa các cung Hoàng Đạo và nguồn năng lượng của các hành tinh. Sự kết hợp giữa con số 9 và ngày 9 tạo ra một sức mạnh lớn về sự giác ngộ. Hơn nữa, số 18 (1 + 8 = 9) thể hiện sự đồng cảm và khả năng kết nối với người khác. Điều này rất quan trọng, vì trong bối cảnh hiện tại, sự đồng cảm và kỹ năng giao tiếp trở thành chìa khóa trong mọi lĩnh vực."
//         },
//         {
//           "title": "Phong Thuỷ",
//           "content": "Theo quan niệm Phong Thuỷ, số 6 rất được yêu thích vì nó mang lại sự hài hòa và cân bằng. Số này cũng liên quan đến sự thịnh vượng và may mắn trong cuộc sống. Ngày tháng hiện tại, 9 tháng 6 năm 2025, cũng là một thời điểm lý tưởng cho việc xây dựng những nền tảng vững chắc trong sự nghiệp. Số 25, là sự kết hợp giữa số 2 và 5, sẽ mang lại nguồn năng lượng tích cực nhằm hỗ trợ cho những quyết định quan trọng. Nhờ vào sự hài hòa mà số 6 mang lại, việc đưa ra các quyết định lớn trong Thời gian hiện tại sẽ đem lại nhiều thành quả. Người mang số may mắn này sẽ cảm thấy tự tin và quyết đoán hơn trong mỗi bước đi của mình."
//         }
//       ],
//       "warning": [
//         {
//           "title": "Cảnh báo về sự bão hòa",
//           "content": "Mặc dù con số 18 có nhiều ý nghĩa tích cực, nhưng nếu không cẩn thận, nó có thể dẫn đến sự bão hòa trong mối quan hệ. Trong Thời gian hiện tại, khi mà mọi thứ trở nên căng thẳng và khó khăn hơn, người mang số may mắn này cần phải tránh xa những xung đột không cần thiết. Việc duy trì những mối quan hệ hòa hợp là rất quan trọng, và việc sử dụng con số này để thúc đẩy điều đó là một cử chỉ thông minh. Hãy nhớ rằng sự đồng cảm và lắng nghe là điều không thể thiếu trong việc bảo vệ những gì mà ta quý trọng."
//         },
//         {
//           "title": "Cảnh báo về sự tự mãn",
//           "content": "Cái tôi có thể mang lại những lợi ích lớn, nhưng nhắc nhở bạn rằng số 9 cũng có những cảnh báo nhất định. Trong Thời gian hiện tại, sức mạnh của cái tôi có thể khiến bạn trở nên tự mãn và không chấp nhận ý kiến của người khác. Thay vì khăng khăng với những suy nghĩ riêng, hãy mở lòng để đón nhận ý kiến đóng góp từ mọi người. Sự cầu thị và khiêm tốn sẽ giúp bạn khao khát hơn trong hành trình tìm kiếm sự thật."
//         }
//       ],
//       "advice": [
//         {
//           "title": "Tìm kiếm cân bằng",
//           "content": "Nếu bạn gặp những thách thức trong vừa qua, hãy sử dụng sức mạnh của số 6 để tìm kiếm sự cân bằng. Hãy điều chỉnh các khía cạnh trong cuộc sống của mình từ đồng nghiệp đến mối quan hệ cá nhân. Chắc chắn rằng bạn đang tạo ra một không gian thoải mái và hài hòa cho mọi người chung quanh. Khi mọi thứ được sắp xếp một cách cẩn thận, tình hình sẽ sớm được cải thiện. Hãy nhận ra rằng trong Thời gian hiện tại, sự bình yên và hài hòa sẽ chu cấp cho bạn sự tự tin và sức mạnh để tiến về phía trước."
//         },
//         {
//           "title": "Chăm sóc bản thân",
//           "content": "Bên cạnh việc chăm sóc cho người khác, đừng quên chính mình. Số 9 gợi ý rằng bạn nên dành thời gian để tự chăm sóc bản thân, tái nạp năng lượng và xác định rõ mục tiêu của mình. Đặc biệt trong Thời gian hiện tại, việc sử dụng thời gian chăm sóc sức khỏe sẽ mang lại nhiều thành công trong tương lai. Trong bối cảnh hiện tại năm 2025, sức khỏe là tài sản quý giá nhất. Hãy tìm hiểu và áp dụng những phương pháp tự chăm sóc bản thân để giữ gìn sự bền bỉ và sức mạnh nội tâm."
//         }
//       ],
//       "summary": [
//         {
//           "title": "Tổng quan về con số may mắn",
//           "content": "Dựa trên các yếu tố cá nhân hóa và Thời gian hiện tại, một số con số may mắn như 9, 18, 1997, 6 và 25 đã được xác định. Những con số này không chỉ mang lại may mắn mà còn có ý nghĩa sâu sắc từ các hệ thống khác nhau như Thần học, Chiêm Tinh học, và Phong Thuỷ. Sự kết nối giữa các yếu tố này sẽ dẫn đến những cầu nối tâm linh trong hành trình phát triển bản thân. Ngành Thời gian hiện tại cho thấy rằng những ảnh hưởng từ các hệ thống sẽ tác động lớn tới các quyết định trong tương lai."
//         },
//         {
//           "title": "Sự chuyển mình trong tương lai",
//           "content": "Thời gian hiện tại vào tháng 6 năm 2025 sẽ mở ra nhiều cơ hội cho người mang con số may mắn 9 và 18. Nguyên tắc tôn trọng bản thân, người khác và cả vũ trụ sẽ cung cấp sức mạnh và may mắn để vượt qua mọi thử thách. Hãy giữ liên kết với các số may mắn kể trên, tìm kiếm đồng cảm và duy trì sự kiên nhẫn khi đối diện với thử thách. Cuộc sống luôn thay đổi và phát triển. Sự khéo léo trong việc sử dụng và ứng dụng các con số này sẽ giúp bạn không chỉ nhận ra giá trị của bản thân mà còn khám phá ra những điều mới từ cái nhìn tổng quát hơn."
//         }
//       ]
//     }
//   },
//   "ts": "09/06/2025 07:54:19"
// }

    return NextResponse.json(data.data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch theology data" },
      { status: 500 }
    );
  }
});
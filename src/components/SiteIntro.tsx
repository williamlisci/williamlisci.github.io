import type React from "react";

interface SiteIntroProps {
  totalPosts: number;
  latestDate: string | null;
}

// Tách riêng khối giới thiệu ra khỏi PostList để component list
// chỉ tập trung vào logic search/pagination, dễ đọc & test hơn.
const SiteIntro: React.FC<SiteIntroProps> = ({ totalPosts, latestDate }) => {
  return (
    <div className="prose prose-invert max-w-none mb-12">
      <p className="text-lg text-gray-300 text-justify leading-relaxed">
        - Xin chào, tôi là Nghĩa. `Nghĩa` trong trọng tình, trọng nghĩa :)
        <br />- Đây là không gian kỹ thuật số nơi tôi lưu giữ và chia sẻ những
        suy ngẫm cá nhân, thông tin và trích dẫn thú vị.
        <br />- Chỉ những người đủ từng trải, đủ nội hàm mới có năng lực đốn
        ngộ nhân quả của vạn vật, niết bàn trùng sinh. Vô danh.
        <br />- Môi trường càng khốc liệt thì năng lực tư duy sâu càng có điều
        kiện được mài giũa và nâng cao. TS LTD.
        <br />- Hãy dám đi sau thế giới, và giành thế thượng phong từ phía sau.
        段永平.
        <br />- Nếu tôi nhìn xa hơn, đó là nhờ đứng trên vai những người khổng
        lồ. Isaac Newton.
        <br />- Read the latest science news:{" "}
        <a
          href="https://scitechdaily.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
        >
          SciTechDaily.com
        </a>
        <br />- Tổng số bài đăng: {totalPosts} bài.
        {latestDate && ` Cập nhật lần cuối: ${latestDate}.`}
      </p>
    </div>
  );
};

export default SiteIntro;

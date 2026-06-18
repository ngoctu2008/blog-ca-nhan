import Link from 'next/link';

export default async function PostDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Tạm thời mock data để hiển thị trang bài viết mẫu
  const isTargetPost = slug === 'bo-gddt-tuyen-dung-du-giao-vien-truoc-nam-hoc-2026-2027';

  if (!isTargetPost) {
    return (
      <main className="min-h-screen bg-slate-50 pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Bài viết đang được cập nhật</h1>
          <Link href="/" className="text-blue-500 hover:underline">← Quay lại trang chủ</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <div className="relative h-[clamp(380px,55vh,600px)] overflow-hidden">
        <img
          alt="[BỘ GIÁO DỤC VÀ ĐÀO TẠO] Bộ GD&ĐT đề nghị các địa phương khẩn trương tuyển dụng đủ giáo viên trước năm học 2026-2027"
          className="absolute h-full w-full left-0 top-0 object-cover object-[center_20%]"
          src="/images/bai13/image.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05140a]/30 to-[#050f08]/75"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-end py-12 px-6">
          <div className="max-w-3xl w-full text-center">
            <span className="inline-block bg-[#4a90e2]/90 text-white font-semibold text-xs py-1 px-3.5 rounded-full mb-4">
              Pháp luật giáo dục
            </span>
            <h1 className="text-[clamp(1.6rem,4vw,2.8rem)] font-extrabold text-white leading-[1.25] mb-5 drop-shadow-md">
              <span className="inline-block bg-yellow-300/95 text-blue-900 px-2 py-0.5 rounded-lg mr-2 font-black shadow-sm">
                [BỘ GIÁO DỤC VÀ ĐÀO TẠO]
              </span>
              Bộ GD&amp;ĐT đề nghị các địa phương khẩn trương tuyển dụng đủ giáo viên trước năm học 2026-2027
            </h1>
            <div className="flex gap-6 justify-center flex-wrap text-white/80 text-sm">
              <span>📅 14 tháng 6, 2026</span>
              <span>⏱ 3 phút đọc</span>
              <span>✍️ Phan Lễ Nhuần</span>
            </div>
          </div>
        </div>
      </div>

      <div className="post-article max-w-[780px] mx-auto py-16 px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-500 font-semibold text-sm no-underline mb-10 py-2 px-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
          ← Quay lại bài viết
        </Link>

        <div className="bg-gradient-to-br from-[#f0f6fc] to-[#f0f9ff] border border-blue-100 rounded-2xl py-6 px-7 mb-10 border-l-4 border-l-blue-500">
          <p className="text-lg italic text-blue-900 leading-relaxed m-0 font-normal">
            Công văn 3330/BGDĐT-NGCBQLGD yêu cầu các địa phương khẩn trương tuyển dụng hết biên chế giáo viên đã được giao, hoàn thành trước khai giảng năm học 2026-2027 và báo cáo nhu cầu biên chế giai đoạn 2027-2031.
          </p>
        </div>

        <article className="font-sans">
          <p className="mb-5 leading-relaxed text-base text-[#2d2d1e]">
            Ngày 05/6/2026, Bộ Giáo dục và Đào tạo ban hành Công văn số 3330/BGDĐT-NGCBQLGD gửi UBND các tỉnh, thành phố về công tác tuyển dụng, quản lý và sử dụng biên chế giáo viên, nhân viên cơ sở giáo dục mầm non, phổ thông.
          </p>
          <p className="mb-5 leading-relaxed text-base text-[#2d2d1e]">
            Theo đó, Bộ đề nghị các địa phương:
          </p>
          <ul className="mb-5 pl-5 leading-relaxed text-base text-[#2d2d1e] list-disc">
            <li className="mb-2">
              Khẩn trương tuyển dụng hết số biên chế giáo viên đã được giao nhưng chưa sử dụng, hoàn thành trước thời điểm khai giảng năm học 2026-2027; báo cáo kết quả về Bộ trước ngày <strong>25/8/2026</strong>.
            </li>
          </ul>
          <ul className="mb-5 pl-5 leading-relaxed text-base text-[#2d2d1e] list-disc">
            <li className="mb-2">
              Tiếp tục rà soát, sắp xếp mạng lưới trường lớp, điều chuyển giáo viên từ nơi thừa sang nơi thiếu; xác định nhu cầu biên chế giáo viên theo từng cấp học, môn học đến năm học 2031-2032.
            </li>
          </ul>
          <ul className="mb-5 pl-5 leading-relaxed text-base text-[#2d2d1e] list-disc">
            <li className="mb-2">
              Gửi báo cáo nhu cầu biên chế ngành giáo dục giai đoạn 2027-2031 về Bộ GD&amp;ĐT trước ngày <strong>30/6/2026</strong> để tổng hợp, báo cáo Trung ương xem xét giao biên chế. Địa phương không gửi báo cáo sẽ được hiểu là không có nhu cầu bổ sung biên chế giai đoạn này.
            </li>
          </ul>
          <p className="mb-5 leading-relaxed text-base text-[#2d2d1e]">
            Công văn nhằm bảo đảm đủ giáo viên cho năm học mới và làm cơ sở xây dựng kế hoạch biên chế ngành giáo dục giai đoạn 2027-2031.
          </p>
        </article>

        {/* Cấu trúc các banner, link ở cuối trang mẫu */}
        <aside className="mt-12 py-8 px-7 rounded-2xl bg-gradient-to-br from-blue-900 via-blue-600 to-blue-400 shadow-lg border border-white/10">
          <h3 className="m-0 mb-5 text-[clamp(1.2rem,2.5vw,1.45rem)] font-extrabold text-white text-center tracking-wide drop-shadow-sm">
            Kết nối thầy giáo cá gỗ
          </h3>
          <ul className="m-0 p-0 list-none grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <li>
              <a href="https://www.tiktok.com/@thaygiaocago" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3.5 px-4 rounded-xl bg-white/95 text-gray-900 font-bold text-sm no-underline border border-white/20 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg">
                <span className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-black/5 text-gray-900">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"></path></svg>
                </span>
                TikTok
              </a>
            </li>
            <li>
              <a href="https://youtube.com/@thaygiaocago?si=wzi0pbJitO2VLDto" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3.5 px-4 rounded-xl bg-red-600 text-white font-bold text-sm no-underline border border-red-600/40 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg">
                <span className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-white/20 text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path></svg>
                </span>
                YouTube
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/share/g/18obXGs6qQ/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3.5 px-4 rounded-xl bg-blue-600 text-white font-bold text-sm no-underline border border-blue-600/40 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg">
                <span className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-white/20 text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>
                </span>
                Nhóm Facebook
              </a>
            </li>
            <li>
              <a href="https://zalo.me/g/ncqluq49fve36cpv2i8t" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-3.5 px-4 rounded-xl bg-blue-500 text-white font-bold text-sm no-underline border border-blue-500/40 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg">
                <span className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-white/20 text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.486 2 2 6.015 2 10.886c0 2.655 1.332 5.015 3.414 6.562L4.5 21.5l4.77-1.505c.936.26 1.926.402 2.73.402 5.514 0 10-4.015 10-8.886S17.514 2 12 2zm-2.2 9.2H7.05V7.05h2.75v4.15zm3.85 0H10.9V7.05h2.75v4.15zm3.85 0h-2.75V7.05h2.75v4.15z"></path></svg>
                </span>
                Nhóm Zalo
              </a>
            </li>
          </ul>
        </aside>

        <aside className="mt-14 py-8 px-7 rounded-2xl bg-gradient-to-br from-blue-50 via-white to-sky-50 border border-blue-100 border-l-4 border-l-blue-500">
          <p className="text-[1.15rem] font-bold text-blue-900 m-0 mb-6 leading-relaxed">Thầy cô giáo để ý kỹ nhé...</p>
          <p className="mb-4 leading-[1.85] text-[1.05rem] text-[#2d2d1e]">Riêng với lĩnh vực giáo dục, một thực tế là chi phí làm website hiện nay vẫn còn khá cao đối với nhiều thầy cô giáo.</p>
          <p className="mb-4 leading-[1.85] text-[1.05rem] text-[#2d2d1e]">Không ít đơn vị báo giá từ vài triệu đến vài chục triệu đồng, khiến nhiều nhà giáo muốn làm nhưng còn e ngại.</p>
          <p className="mb-4 leading-[1.85] text-[1.05rem] text-[#2d2d1e]">Quan trọng hơn, phần lớn những người thiết kế website không xuất phát từ môi trường giáo dục.</p>
          <p className="mb-4 leading-[1.85] text-[1.05rem] text-[#2d2d1e]">Họ giỏi công nghệ. Nhưng chưa chắc hiểu nhà giáo cần gì.</p>
          <p className="mb-4 leading-[1.85] text-[1.05rem] text-[#2d2d1e]">Vì vậy nhiều website làm xong rất đẹp nhưng chưa thực sự phục vụ hiệu quả cho hoạt động giáo dục.</p>
          <p className="mb-4 leading-[1.85] text-[1.05rem] text-[#2d2d1e]">Nhận thấy điều đó, Thầy giáo Cá Gỗ đã trực tiếp định hướng nội dung, cấu trúc và mục tiêu của từng website. Đồng thời quy tụ đội ngũ trợ lý công nghệ thông tin am hiểu giáo dục để đồng hành cùng thầy cô.</p>
          <p className="mb-4 leading-[1.85] text-[1.05rem] text-[#2d2d1e]">Thầy cô quan tâm vui lòng đăng ký tại đây:</p>
          <a href="https://nhap-thong-tin-giao-vien.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-base py-3 px-6 rounded-full no-underline mb-6 shadow-md">👉 Đăng ký hỗ trợ làm website</a>
          <p className="mb-3 text-[0.95rem] text-slate-600 leading-relaxed">Người đồng hành định hướng: <strong className="text-blue-900">Thầy giáo Cá Gỗ</strong> <a href="tel:0987674161" className="text-blue-500 font-semibold no-underline">0987674161</a></p>
          <blockquote className="mt-5 py-5 px-6 rounded-xl bg-blue-500/10 border-none font-italic text-[1.05rem] text-blue-900 leading-[1.75]">
            “Facebook, TikTok là nơi gặp gỡ.<br/>Website là nơi xây dựng sự nghiệp”
          </blockquote>
        </aside>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-[0.85rem] font-semibold text-slate-500">Tags:</span>
            <span className="bg-blue-50 text-blue-500 font-medium text-[0.8rem] py-1 px-3 rounded-full">#Bộ GD&amp;ĐT</span>
            <span className="bg-blue-50 text-blue-500 font-medium text-[0.8rem] py-1 px-3 rounded-full">#tuyển dụng giáo viên</span>
            <span className="bg-blue-50 text-blue-500 font-medium text-[0.8rem] py-1 px-3 rounded-full">#biên chế giáo dục</span>
            <span className="bg-blue-50 text-blue-500 font-medium text-[0.8rem] py-1 px-3 rounded-full">#năm học 2026-2027</span>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-2xl border border-slate-100 shadow-sm p-8 flex gap-6 items-start">
          <div className="w-16 h-16 rounded-full shrink-0 overflow-hidden relative shadow-sm">
            <img alt="Phan Lễ Nhuần" className="absolute h-full w-full left-0 top-0 object-cover" src="/images/anh1.jpg" />
          </div>
          <div>
            <div className="font-bold text-[1.05rem] text-gray-900 mb-1">Phan Lễ Nhuần</div>
            <div className="text-[0.82rem] text-blue-500 font-semibold mb-2.5">Thầy Giáo Cá Gỗ</div>
            <p className="text-[0.9rem] text-slate-500 leading-relaxed m-0 mb-4">Nhà giáo, người đồng hành và người lan tỏa những giá trị tích cực trong giáo dục.</p>
            <a href="https://www.facebook.com/lenhuanphan" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-blue-500 text-white font-semibold text-[0.85rem] py-2 px-4 rounded-full no-underline">Theo dõi trên Facebook →</a>
          </div>
        </div>
      </div>
    </main>
  );
}

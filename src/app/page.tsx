import Link from 'next/link';

export default function Home() {
  // Tạm thời mock data để hiển thị giao diện giống trang mẫu
  const mockPosts = [
    {
      id: '1',
      slug: 'bo-gddt-tuyen-dung-du-giao-vien-truoc-nam-hoc-2026-2027',
      title: '[BỘ GIÁO DỤC VÀ ĐÀO TẠO] Bộ GD&ĐT đề nghị các địa phương khẩn trương tuyển dụng đủ giáo viên trước năm học 2026-2027',
      category: 'Pháp luật giáo dục',
      thumbnail: '/images/bai13/image.jpg',
      date: '14 tháng 6, 2026',
      readTime: '3 phút đọc',
      author: 'Phan Lễ Nhuần',
      excerpt: 'Công văn 3330/BGDĐT-NGCBQLGD yêu cầu các địa phương khẩn trương tuyển dụng hết biên chế giáo viên đã được giao, hoàn thành trước khai giảng năm học 2026-2027...'
    },
    {
      id: '2',
      slug: 'day-hoc-thoi-cong-nghe-nhung-dieu-toi-hoc-duoc',
      title: 'Dạy học thời công nghệ: Những điều tôi học được từ 1 triệu học trò online',
      category: 'Giáo dục',
      thumbnail: '/images/anh2.jpg',
      date: '11 tháng 5, 2026',
      readTime: '6 phút đọc',
      author: 'Phan Lễ Nhuần',
      excerpt: 'Từ một lớp học 40 em học sinh đến hơn 1 triệu người theo dõi trên mạng xã hội — hành trình đó dạy tôi nhiều điều hơn bất kỳ cuốn sách giáo dục nào.'
    },
    {
      id: '3',
      slug: 'hanh-phuc-don-gian-cua-nguoi-thay-vung-que',
      title: 'Hạnh phúc đơn giản của người thầy vùng quê',
      category: 'Cuộc sống',
      thumbnail: '/images/anh3.jpg',
      date: '12 tháng 5, 2026',
      readTime: '5 phút đọc',
      author: 'Phan Lễ Nhuần',
      excerpt: 'Người ta hay hỏi tôi: "Thầy không tiếc khi bỏ phố về quê à?" Tiếc gì khi mỗi sáng thức dậy được nhìn thấy cánh đồng, nghe tiếng con mình cười?'
    },
    {
      id: '4',
      slug: 'xay-dung-thuong-hieu-ca-nhan-tu-so-khong',
      title: 'Xây dựng thương hiệu cá nhân từ số 0: Câu chuyện của Thầy Cá Gỗ',
      category: 'Thương hiệu cá nhân',
      thumbnail: '/images/anh4.jpg',
      date: '13 tháng 5, 2026',
      readTime: '7 phút đọc',
      author: 'Phan Lễ Nhuần',
      excerpt: 'Không studio, không ekip, không ngân sách marketing — chỉ có một điện thoại và những câu chuyện thật. Đây là hành trình tôi xây dựng thương hiệu từ số 0.'
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-16 mt-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Góc Chia Sẻ Của Thầy Giáo Cá Gỗ
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Nơi lưu giữ những câu chuyện nghề, chuyện đời và những bài học nhỏ trên hành trình giáo dục.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockPosts.map((post) => (
            <Link key={post.id} href={`/posts/${post.slug}`} className="group no-underline block">
              <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 h-full flex flex-col">
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-200">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-500/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-3">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-xl text-slate-900 leading-snug mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-100">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 relative">
                      <img src="/images/logo.png" alt={post.author} className="w-full h-full object-cover absolute" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">{post.author}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

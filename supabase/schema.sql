
-- 5. Bảng Settings (Cấu hình chung website)
CREATE TABLE settings (
    id VARCHAR(50) PRIMARY KEY DEFAULT 'global',
    site_name VARCHAR(255) NOT NULL,
    slogan TEXT,
    footer_info TEXT,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    facebook_url TEXT,
    tiktok_url TEXT,
    youtube_url TEXT,
    zalo_group_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Bảng Timeline (Hành trình)
CREATE TABLE timeline_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    icon_name VARCHAR(50), -- Tên icon từ thư viện (vd: lucide-react)
    order_index INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Bảng Menus (Quản lý liên kết menu)
CREATE TABLE menus (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    label VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    order_index INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Bảng Layout Configs (Cấu hình hiển thị)
CREATE TABLE layout_configs (
    id VARCHAR(50) PRIMARY KEY, -- vd: 'home_hero', 'home_recent_posts'
    section_name VARCHAR(255) NOT NULL,
    display_type VARCHAR(50) NOT NULL, -- 'grid', 'slider', 'list'
    is_visible BOOLEAN DEFAULT TRUE,
    order_index INT DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Thêm dữ liệu mẫu cho Settings
INSERT INTO settings (id, site_name, slogan, footer_info, facebook_url) VALUES
('global', 'Thầy Giáo Cá Gỗ', 'Cuộc đời không có bản đồ. Bản đồ được vẽ ra khi bạn đi.', 'Thầy giáo ▪︎ Người chia sẻ ▪︎ Người đồng hành ▪︎ Người truyền cảm hứng', 'https://www.facebook.com/lenhuanphan');

-- Thêm dữ liệu mẫu cho Menus
INSERT INTO menus (label, url, order_index) VALUES
('Giới thiệu', '/#ve-thay', 1),
('Giáo dục', '/#giao-duc', 2),
('Bình dân học vụ', '/#binh-dan', 3),
('Định hướng', '/#dinh-huong', 4);

-- Thêm dữ liệu mẫu cho Layout
INSERT INTO layout_configs (id, section_name, display_type, order_index) VALUES
('home_hero', 'Hero Banner', 'slider', 1),
('home_recent_posts', 'Bài viết mới', 'grid', 2);

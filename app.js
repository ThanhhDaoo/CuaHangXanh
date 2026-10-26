/**
 * ==========================================================================
 * TẠP HÓA XANH - MULTI-PAGE FRONTEND LOGIC (CLEAN CODE ARCHITECTURE)
 * ==========================================================================
 */

// --------------------------------------------------------------------------
// 1. STATE MANAGEMENT
// --------------------------------------------------------------------------
function getStoredImports() {
    const stored = localStorage.getItem('taphoaxanh_imports');
    if (stored) {
        try { return JSON.parse(stored); } catch (e) { console.error(e); }
    }
    return [
        { id: 'NH20231001', supplier: 'Nông sản Sạch Đà Lạt', date: '25/10/2023', amount: 12500000, status: 'Đã thanh toán' },
        { id: 'NH20231002', supplier: 'Công ty Thực phẩm Xanh', date: '24/10/2023', amount: 8200000, status: 'Chưa thanh toán' },
        { id: 'NH20231003', supplier: 'Hợp tác xã Organic', date: '23/10/2023', amount: 15000000, status: 'Chưa thanh toán' },
        { id: 'NH20231004', supplier: 'Vườn Rau 3 Miền', date: '22/10/2023', amount: 5450000, status: 'Đã thanh toán' }
    ];
}

function saveStoredImports(importsArray) {
    localStorage.setItem('taphoaxanh_imports', JSON.stringify(importsArray));
}

function updateImportStatus(importId, newStatus, newSupplier) {
    const imp = state.imports.find(i => i.id === importId);
    if (imp) {
        imp.status = newStatus;
        if (newSupplier) imp.supplier = newSupplier;
    } else {
        state.imports.push({
            id: importId,
            supplier: newSupplier || 'Nông sản Sạch Đà Lạt',
            date: new Date().toLocaleDateString('vi-VN'),
            amount: 12500000,
            status: newStatus
        });
    }
    saveStoredImports(state.imports);
}

function getStoredReturnSlips() {
    const stored = localStorage.getItem('taphoaxanh_return_slips');
    if (stored) {
        try { return JSON.parse(stored); } catch (e) { console.error(e); }
    }
    return [
        { id: 'PDH0000009', date: '25/10/2024', qty: 3, invoiceId: 'SON2405001', invoiceDate: '24/10/2024', note: '"Dầu ăn hết hạn, bột giặt hư hỏng"' },
        { id: 'PDH0000008', date: '20/03/2025', qty: 9, invoiceId: 'SON0000003', invoiceDate: '17/03/2025', note: '"Dầu ăn hết hạn, bột giặt hư hỏng"' },
        { id: 'PDH0000007', date: '22/07/2023', qty: 1, invoiceId: 'SON2405002', invoiceDate: '21/07/2023', note: '"Khách đổi sản phẩm chưa dùng"' },
        { id: 'PDH0000006', date: '10/07/2023', qty: 4, invoiceId: 'SON2405003', invoiceDate: '09/07/2023', note: '"Bia móp vỏ hộp"' },
        { id: 'PDH0000005', date: '15/11/2022', qty: 10, invoiceId: 'SON2404988', invoiceDate: '14/11/2022', note: '"Bột giặt rách bao bọc"' },
        { id: 'PDH0000004', date: '20/10/2022', qty: 3, invoiceId: 'SON2404987', invoiceDate: '19/10/2022', note: '"Hàng hóa móp méo vỏ"' },
        { id: 'PDH0000003', date: '10/02/2021', qty: 5, invoiceId: 'SON2404986', invoiceDate: '09/02/2021', note: '"Sữa chua quá hạn sử dụng"' },
        { id: 'PDH0000002', date: '30/01/2021', qty: 7, invoiceId: 'SON2405001', invoiceDate: '29/01/2021', note: '"Đổi hàng mới theo yêu cầu"' },
        { id: 'PDH0000001', date: '30/01/2021', qty: 7, invoiceId: 'SON2405002', invoiceDate: '29/01/2021', note: '"Hàng hóa không vừa ý"' }
    ];
}

function saveStoredReturnSlips(slipsArray) {
    localStorage.setItem('taphoaxanh_return_slips', JSON.stringify(slipsArray));
}

function getStoredProducts() {
    const saved = localStorage.getItem('taphoaxanh_products');
    if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
    }
    return [
        { id: 'HH00000010', name: 'Bánh chococpie', unit: 'Hộp', stock: 12, catCode: 'LH0000002', catName: 'Bánh', salePrice: '10,000', costPrice: '8,000', hsd: '03/12/2026' },
        { id: 'HH00000009', name: 'Bánh solite', unit: 'Hộp', stock: 15, catCode: 'LH0000002', catName: 'Bánh', salePrice: '40,000', costPrice: '32,000', hsd: '15/08/2026' },
        { id: 'HH00000008', name: 'Pepsi', unit: 'Lon', stock: 12, catCode: 'LH0000002', catName: 'Đồ uống', salePrice: '10,000', costPrice: '8,000', hsd: '03/12/2026' },
        { id: 'HH00000007', name: 'Bàn chải đ.răng P/S', unit: 'Cái', stock: 0, catCode: 'LH0000007', catName: 'Hóa mỹ phẩm', salePrice: '12,000', costPrice: '9,000', hsd: 'Không có' },
        { id: 'HH00000006', name: 'Bánh quy Cosy', unit: 'Hộp', stock: 10, catCode: 'LH0000002', catName: 'Bánh', salePrice: '45,000', costPrice: '36,000', hsd: '10/10/2026' }
    ];
}

function saveStoredProducts(prodArray) {
    localStorage.setItem('taphoaxanh_products', JSON.stringify(prodArray));
}

const state = {
    importStatusFilter: 'all',
    invoices: [
        { id: 'SON2405001', date: '25/05/2024 08:30', amount: 1250000, payment: 'Tiền mặt' },
        { id: 'SON2405002', date: '25/05/2024 10:15', amount: 850000, payment: 'Chuyển khoản' },
        { id: 'SON2405003', date: '24/05/2024 16:45', amount: 3420000, payment: 'Tiền mặt' },
        { id: 'SON2404988', date: '24/05/2024 14:20', amount: 540000, payment: 'Chuyển khoản' },
        { id: 'SON2404987', date: '23/05/2024 19:10', amount: 2150000, payment: 'Tiền mặt' },
        { id: 'SON2404986', date: '23/05/2024 11:05', amount: 920000, payment: 'Chuyển khoản' }
    ],
    imports: getStoredImports(),
    suppliers: [
        { id: 'NCC001', name: 'Nông sản sạch Đà Lạt', phone: '0901 234 567' },
        { id: 'NCC002', name: 'Thực phẩm đóng hộp Vissan', phone: '028 3844 1149' },
        { id: 'NCC003', name: 'Nước giải khát Hùng Phát', phone: '0908 999 888' },
        { id: 'NCC004', name: 'Bách hóa Tổng hợp An Nhiên', phone: '0912 345 678' }
    ],
    products: getStoredProducts(),
    categories: [
        { id: 'LH0000011', name: 'Gia vị', count: 5, img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop' },
        { id: 'LH0000012', name: 'Rau củ tươi', count: 12, img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop' },
        { id: 'LH0000013', name: 'Sữa & Chế phẩm', count: 8, img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop' },
        { id: 'LH0000014', name: 'Đồ uống', count: 25, img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop' },
        { id: 'LH0000015', name: 'Hàng khô', count: 42, img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop' }
    ],
    prices: [
        { id: 'GIA0000011', name: 'Bánh chocopie', price: 40000, costPrice: 30000, date: '28/11/2025', endDate: 'khống', status: 'Đang áp dụng' },
        { id: 'GIA0000010', name: 'Bánh chocopie', price: 35000, costPrice: 30000, date: '20/06/2025', endDate: '28/11/2025', status: 'Ngưng áp dụng' },
        { id: 'GIA0000009', name: 'Bánh solite', price: 40000, costPrice: 32000, date: '15/08/2025', endDate: 'khống', status: 'Đang áp dụng' },
        { id: 'GIA0000008', name: 'Pepsi', price: 10000, costPrice: 8000, date: '03/12/2025', endDate: 'khống', status: 'Đang áp dụng' }
    ],
    returnSlips: getStoredReturnSlips(),
    returns: [
        { id: 'SON2405001', date: '15:30, 24/05/2024', amount: 1250000 },
        { id: 'SON2405002', date: '16:10, 24/05/2024', amount: 850000 },
        { id: 'SON2405003', date: '09:45, 23/05/2024', amount: 3420000 }
    ],
    generalReports: [
        { date: '29/11/2025', revenue: 2456789, orders: 80, itemsSold: 139, profit: 1456789 },
        { date: '28/11/2025', revenue: 3563785, orders: 92, itemsSold: 276, profit: 1789987 },
        { date: '27/11/2025', revenue: 1543675, orders: 57, itemsSold: 164, profit: 867543 },
        { date: '26/11/2025', revenue: 1500000, orders: 36, itemsSold: 78, profit: 465775 },
        { date: '25/11/2025', revenue: 2456345, orders: 74, itemsSold: 111, profit: 1654223 },
        { date: '24/11/2025', revenue: 579568, orders: 18, itemsSold: 36, profit: 298567 },
        { date: '23/11/2025', revenue: 4753467, orders: 120, itemsSold: 170, profit: 2578356 }
    ],
    inventoryReports: [
        { catCode: 'H0000001', catName: 'Gia vị', code: 'HH0000006', name: 'Muối', unit: 'Bịch', stock: 3723 },
        { catCode: 'H0000003', catName: 'Bánh', code: 'HH0000010', name: 'Bánh Top', unit: 'Hộp', stock: 132 },
        { catCode: 'H0000010', catName: 'Gia vị', code: 'HH0000002', name: 'Nước mắm Chinsu', unit: 'Chai', stock: 426 },
        { catCode: 'H0000008', catName: 'Bánh', code: 'HH0000001', name: 'Bánh Chocopie', unit: 'Hộp', stock: 172 },
        { catCode: 'H0000005', catName: 'Thuốc lá', code: 'HH0000003', name: 'Con Mèo', unit: 'Hộp', stock: 423 },
        { catCode: 'H0000004', catName: 'Bánh', code: 'HH0000004', name: 'Bánh Custas', unit: 'Hộp', stock: 149 },
        { catCode: 'H0000002', catName: 'Thuốc lá', code: 'HH0000009', name: 'Chapman', unit: 'Hộp', stock: 247 }
    ]
};

// --------------------------------------------------------------------------
// 2. INITIALIZATION
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    refreshIcons();
    initRoleBasedUI();

    if (document.getElementById('revenueChart')) renderRevenueChart();
    if (document.getElementById('invoice-tbody')) renderInvoicesTable();
    if (document.getElementById('import-tbody')) renderImportsTable();
    if (document.getElementById('supplier-tbody')) renderSuppliersTable();
    if (document.getElementById('product-tbody')) renderProductsTable();
    if (document.getElementById('category-grid-container')) renderCategoriesGrid();
    if (document.getElementById('price-tbody')) renderPricesTable();
    if (document.getElementById('returns-tbody')) renderReturnsTable();
    if (document.getElementById('return-slips-tbody')) renderReturnSlipsTable();
    if (document.getElementById('general-report-tbody')) renderGeneralReportTable();
    if (document.getElementById('inventory-report-tbody')) renderInventoryReportTable();
});

function refreshIcons() {
    if (window.lucide) {
        window.lucide.createIcons({
            attrs: {
                'stroke-width': 1.6
            }
        });
    }
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount).replace('₫', 'đ');
}

function formatNumber(num) {
    return new Intl.NumberFormat('vi-VN').format(num);
}

// --------------------------------------------------------------------------
// 3. LOGIN & ROLE-BASED ACCESS CONTROL (RBAC)
// --------------------------------------------------------------------------
const USER_ROLES = {
    staff: {
        roleKey: 'staff',
        id: 'NV002',
        code: 'NV002',
        name: 'Huỳnh Thị Mỹ Linh',
        fullName: 'Huỳnh Thị Mỹ Linh',
        roleTitle: 'Nhân viên bán hàng & Thu ngân',
        title: 'Nhân viên bán hàng',
        badgeText: 'Nhân viên bán hàng',
        badgeClass: 'staff',
        avatarText: 'ML',
        avatarColor: '#059669',
        phone: '0938 123 456',
        email: 'mylinh.huynh@taphoaxanh.vn',
        branch: 'Tạp Hóa Xanh - Chi nhánh 1',
        store: 'Tạp Hóa Xanh - Chi nhánh 1',
        shift: 'Ca sáng (07:00 - 15:00)',
        joinDate: '15/03/2023',
        permissions: [
            { module: 'Bán hàng & Hóa đơn', desc: 'Tạo hóa đơn, quét mã vạch bán hàng, in biên lai, tra cứu lịch sử hóa đơn trong ca', access: 'Toàn quyền (Cho phép)' },
            { module: 'Đổi trả hàng hóa', desc: 'Tiếp nhận yêu cầu đổi hàng từ khách, lập phiếu đổi hàng hóa theo hóa đơn cũ', access: 'Toàn quyền (Cho phép)' },
            { module: 'Tra cứu hàng hóa & tồn kho', desc: 'Xem danh sách mặt hàng, đơn vị tính, số lượng tồn kho thực tế và giá bán lẻ', access: 'Xem thông tin (Cho phép)' },
            { module: 'Thông tin cá nhân & ca trực', desc: 'Xem hồ sơ nhân viên, vai trò, lịch trực ca, báo cáo doanh số cá nhân trong ca', access: 'Toàn quyền (Cho phép)' },
            { module: 'Thêm / Sửa / Xóa hàng hóa', desc: 'Tạo mới sản phẩm, sửa giá bán, cập nhật giá vốn hoặc xóa hàng khỏi hệ thống', access: 'Không có quyền' },
            { module: 'Nhập hàng từ nhà cung cấp', desc: 'Lập đơn nhập hàng, xác nhận công nợ và thanh toán phiếu nhập kho', access: 'Không có quyền' },
            { module: 'Quản lý nhà cung cấp', desc: 'Thêm, sửa, xóa thông tin đối tác và nhà cung ứng sản phẩm', access: 'Không có quyền' },
            { module: 'Quản lý loại hàng & danh mục', desc: 'Phân loại nhóm ngành hàng, cấu hình danh mục sản phẩm', access: 'Không có quyền' },
            { module: 'Quản lý giá vốn & giá bán', desc: 'Xem giá gốc nhập kho, cấu hình tỷ suất lợi nhuận và giá niêm yết', access: 'Không có quyền' },
            { module: 'Báo cáo doanh thu & tài chính', desc: 'Xem biểu đồ doanh thu tổng, báo cáo lợi nhuận và biến động tài chính cửa hàng', access: 'Không có quyền' }
        ]
    },
    admin: {
        roleKey: 'admin',
        id: 'QL001',
        code: 'QL001',
        name: 'Nguyễn Văn Quản Lý',
        fullName: 'Nguyễn Văn Quản Lý',
        roleTitle: 'Chủ cửa hàng / Quản trị viên',
        title: 'Chủ cửa hàng',
        badgeText: 'Chủ cửa hàng',
        badgeClass: 'admin',
        avatarText: 'AD',
        avatarColor: '#2563eb',
        phone: '0909 888 999',
        email: 'admin@taphoaxanh.vn',
        branch: 'Tạp Hóa Xanh - Toàn chuỗi',
        store: 'Tạp Hóa Xanh - Toàn chuỗi',
        shift: 'Toàn thời gian (Toàn quyền hệ thống)',
        joinDate: '01/01/2022',
        permissions: [
            { module: 'Bán hàng & Hóa đơn', desc: 'Tạo hóa đơn, xem, xóa, điều chỉnh hóa đơn, xuất file kế toán', access: 'Toàn quyền (Cho phép)' },
            { module: 'Đổi trả hàng hóa', desc: 'Tiếp nhận, xử lý, duyệt hoàn tiền và hủy phiếu đổi hàng', access: 'Toàn quyền (Cho phép)' },
            { module: 'Quản lý hàng hóa', desc: 'Thêm mới, sửa, xóa, theo dõi tồn kho min/max, cảnh báo hết hạn', access: 'Toàn quyền (Cho phép)' },
            { module: 'Nhập hàng', desc: 'Tạo phiếu nhập, duyệt kho, thanh toán công nợ nhà cung cấp', access: 'Toàn quyền (Cho phép)' },
            { module: 'Nhà cung cấp', desc: 'Thêm mới, sửa thông tin, xem hợp đồng và lịch sử công nợ', access: 'Toàn quyền (Cho phép)' },
            { module: 'Danh mục loại hàng', desc: 'Quản lý nhóm hàng, danh mục sản phẩm', access: 'Toàn quyền (Cho phép)' },
            { module: 'Quản lý giá & Giá vốn', desc: 'Điều chỉnh giá bán, bảo mật giá vốn, tính toán biên độ lợi nhuận', access: 'Toàn quyền (Cho phép)' },
            { module: 'Báo cáo thống kê & Tài chính', desc: 'Xem biểu đồ doanh thu, lãi lỗ, tồn kho chuyên sâu theo ngày/tháng', access: 'Toàn quyền (Cho phép)' },
            { module: 'Quản trị nhân sự & Phân quyền', desc: 'Phân ca làm việc, cấp tài khoản và gán vai trò nhân viên', access: 'Toàn quyền (Cho phép)' }
        ]
    }
};

function getCurrentUser() {
    const roleKey = localStorage.getItem('taphoaxanh_current_role') || 'staff';
    return USER_ROLES[roleKey] || USER_ROLES.staff;
}

function setCurrentRole(roleKey) {
    if (USER_ROLES[roleKey]) {
        localStorage.setItem('taphoaxanh_current_role', roleKey);
        showToast(`Đã chuyển sang vai trò: ${USER_ROLES[roleKey].name}`, 'success');
        setTimeout(() => {
            window.location.reload();
        }, 300);
    }
}

function toggleCurrentRole() {
    const current = getCurrentUser();
    const nextKey = current.roleKey === 'admin' ? 'staff' : 'admin';
    setCurrentRole(nextKey);
}

function loginAsRole(roleKey) {
    if (USER_ROLES[roleKey]) {
        localStorage.setItem('taphoaxanh_current_role', roleKey);
        showToast(`Đăng nhập thành công với vai trò: ${USER_ROLES[roleKey].name}`, 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 350);
    }
}

function toggleUserDropdown(event) {
    if (event) event.stopPropagation();
    const dropdown = document.getElementById('user-role-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

function initRoleBasedUI() {
    const user = getCurrentUser();
    const isStaff = user.roleKey === 'staff';
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop() || 'index.html';

    // 1. UPDATE TOPBAR USER BADGES & ATTACH FLOATING DROPDOWN MENU
    const topbarUserElements = document.querySelectorAll('.topbar-user');
    topbarUserElements.forEach(el => {
        el.style.position = 'relative';
        el.style.cursor = 'pointer';

        const avatar = el.querySelector('.avatar-circle');
        if (avatar) {
            avatar.textContent = user.avatarText;
            avatar.style.backgroundColor = user.avatarColor;
            avatar.style.color = '#ffffff';
        }

        const nameSpan = el.querySelector('.user-name');
        if (nameSpan) nameSpan.textContent = user.name;

        const roleSpan = el.querySelector('.user-role');
        if (roleSpan) roleSpan.textContent = user.title;

        // Check if dropdown already exists
        let dropdown = el.querySelector('.user-dropdown-menu') || document.getElementById('user-role-dropdown');
        if (!dropdown) {
            dropdown = document.createElement('div');
            dropdown.className = 'user-dropdown-menu';
            dropdown.id = 'user-role-dropdown';
            el.appendChild(dropdown);
        }

        dropdown.innerHTML = `
            <div class="dropdown-user-header">
                <div class="avatar-circle" style="background-color: ${user.avatarColor}; color: #ffffff; width: 38px; height: 38px; font-weight: 700;">${user.avatarText}</div>
                <div style="flex: 1; overflow: hidden;">
                    <div style="font-weight: 700; font-size: 0.875rem; color: #0f172a; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${user.fullName}</div>
                    <div style="display: flex; align-items: center; gap: 4px; margin-top: 2px;">
                        <span class="role-pill-badge ${user.badgeClass}">${user.badgeText}</span>
                        <span style="font-size: 0.72rem; color: #64748b; font-weight: 600;">(${user.code})</span>
                    </div>
                </div>
            </div>

            <a href="profile.html" class="dropdown-item">
                <i data-lucide="user" style="width: 16px; height: 16px;"></i>
                <span>Xem thông tin cá nhân & vai trò</span>
            </a>
            <a href="create-invoice.html" class="dropdown-item">
                <i data-lucide="shopping-cart" style="width: 16px; height: 16px;"></i>
                <span>Bán hàng - Tạo hóa đơn</span>
            </a>
            <a href="products.html" class="dropdown-item">
                <i data-lucide="boxes" style="width: 16px; height: 16px;"></i>
                <span>Tra cứu hàng hóa & tồn kho</span>
            </a>

            <div class="dropdown-divider"></div>
            <div class="dropdown-role-switch-title">Chuyển vai trò trải nghiệm:</div>

            <button type="button" class="dropdown-item ${user.roleKey === 'staff' ? 'active-role' : ''}" onclick="setCurrentRole('staff'); event.stopPropagation();" style="width: 100%; border: none; background: ${user.roleKey === 'staff' ? '#ecfdf5' : 'transparent'}; font-weight: ${user.roleKey === 'staff' ? '700' : '500'};">
                <i data-lucide="user-check" style="width: 16px; height: 16px; color: #059669;"></i>
                <span style="color: ${user.roleKey === 'staff' ? '#047857' : '#334155'};">Nhân viên bán hàng (Mỹ Linh)</span>
                ${user.roleKey === 'staff' ? '<i data-lucide="check" style="margin-left: auto; width: 15px; height: 15px; color: #059669;"></i>' : ''}
            </button>

            <button type="button" class="dropdown-item ${user.roleKey === 'admin' ? 'active-role' : ''}" onclick="setCurrentRole('admin'); event.stopPropagation();" style="width: 100%; border: none; background: ${user.roleKey === 'admin' ? '#eff6ff' : 'transparent'}; font-weight: ${user.roleKey === 'admin' ? '700' : '500'};">
                <i data-lucide="shield" style="width: 16px; height: 16px; color: #2563eb;"></i>
                <span style="color: ${user.roleKey === 'admin' ? '#1d4ed8' : '#334155'};">Chủ cửa hàng (Admin)</span>
                ${user.roleKey === 'admin' ? '<i data-lucide="check" style="margin-left: auto; width: 15px; height: 15px; color: #2563eb;"></i>' : ''}
            </button>

            <div class="dropdown-divider"></div>
            <a href="login.html" class="dropdown-item text-danger">
                <i data-lucide="log-out" style="width: 16px; height: 16px;"></i>
                <span>Đăng xuất</span>
            </a>
        `;

        el.onclick = function(e) {
            e.stopPropagation();
            toggleUserDropdown();
            refreshIcons();
        };
    });

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
        const dropdown = document.getElementById('user-role-dropdown');
        if (dropdown && dropdown.classList.contains('show')) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        }
    });

    // 2. SIDEBAR NAVIGATION MANAGEMENT & INJECTING PROFILE LINK
    const navList = document.querySelector('.sidebar-nav .nav-list');
    if (navList) {
        // Add "Thông tin cá nhân & Vai trò" if not present
        const hasProfileLink = navList.querySelector('a[href="profile.html"]');
        if (!hasProfileLink) {
            const profileLi = document.createElement('li');
            profileLi.className = 'nav-item';
            profileLi.innerHTML = `
                <a href="profile.html" class="nav-link ${pageName === 'profile.html' ? 'active' : ''}">
                    <i data-lucide="user-check"></i>
                    <span>Thông tin & Vai trò</span>
                </a>
            `;
            navList.appendChild(profileLi);
        }

        // Add role indicator below sidebar header
        const sidebarHeader = document.querySelector('.sidebar-header');
        if (sidebarHeader && !sidebarHeader.parentNode.querySelector('.sidebar-role-indicator')) {
            const roleIndicator = document.createElement('div');
            roleIndicator.className = 'sidebar-role-indicator';
            roleIndicator.style.cssText = `
                margin: 0.65rem 1rem 0.25rem 1rem;
                padding: 0.45rem 0.75rem;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 0.75rem;
                font-weight: 600;
                background: ${isStaff ? '#ecfdf5' : '#eff6ff'};
                border: 1px solid ${isStaff ? '#a7f3d0' : '#bfdbfe'};
                color: ${isStaff ? '#047857' : '#1d4ed8'};
            `;
            roleIndicator.innerHTML = `
                <div style="display: flex; align-items: center; gap: 6px;">
                    <i data-lucide="${isStaff ? 'user-check' : 'shield'}" style="width: 14px; height: 14px;"></i>
                    <span>${isStaff ? 'NV Bán hàng' : 'Chủ cửa hàng'}</span>
                </div>
                <button type="button" onclick="toggleCurrentRole()" title="Bấm để đổi vai trò" style="background: none; border: none; cursor: pointer; color: inherit; padding: 2px; display: flex; align-items: center;">
                    <i data-lucide="arrow-left-right" style="width: 12px; height: 12px;"></i>
                </button>
            `;
            sidebarHeader.parentNode.insertBefore(roleIndicator, navList.parentNode);
        }

        // IF STAFF ROLE: FILTER OUT ADMIN-ONLY MODULES
        if (isStaff) {
            const adminOnlyHrefs = [
                'imports.html',
                'suppliers.html',
                'categories.html',
                'prices.html',
                'reports.html',
                'inventory-report.html'
            ];

            const navItems = navList.querySelectorAll('.nav-item');
            navItems.forEach(item => {
                const link = item.querySelector('a');
                if (link) {
                    const href = link.getAttribute('href');
                    if (adminOnlyHrefs.some(adminHref => href && href.includes(adminHref))) {
                        item.style.display = 'none';
                    }
                }
            });
        }
    }

    // 3. ROLE-SPECIFIC CUSTOMIZATIONS PER PAGE
    // A) PRODUCTS.HTML (Tra cứu hàng hóa & Số lượng tồn)
    if (pageName === 'products.html') {
        if (isStaff) {
            const titleElem = document.querySelector('.page-header .page-title');
            if (titleElem) {
                titleElem.innerHTML = `Tra cứu hàng hóa & Số lượng tồn <span class="role-pill-badge staff" style="font-size: 0.75rem; vertical-align: middle; margin-left: 8px;">Dành cho Bán hàng</span>`;
            }
            const addProductBtn = document.querySelector('button[onclick*="create-product.html"]');
            if (addProductBtn) {
                addProductBtn.style.display = 'none';
            }
        }
    }

    // B) PRODUCT-DETAIL.HTML
    if (pageName === 'product-detail.html') {
        if (isStaff) {
            const inputs = document.querySelectorAll('.detail-fields-grid input');
            inputs.forEach(input => {
                input.setAttribute('readonly', 'true');
                input.style.backgroundColor = '#f8fafc';
                input.style.cursor = 'default';
            });
            const actionContainer = document.querySelector('.detail-main-card > div[style*="justify-content: flex-end"]');
            if (actionContainer) {
                actionContainer.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 8px; padding: 0.6rem 1rem; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; color: #047857; font-size: 0.85rem; font-weight: 600;">
                        <i data-lucide="shield-alert" style="width: 18px; height: 18px;"></i>
                        <span>Chế độ tra cứu dành cho Nhân viên bán hàng (Không có quyền chỉnh sửa / xóa hàng hóa)</span>
                    </div>
                `;
            }
        }
    }

    // C) INDEX.HTML (DASHBOARD)
    if (pageName === 'index.html' || pageName === '') {
        if (isStaff) {
            const banner = document.querySelector('.welcome-banner');
            if (banner) {
                banner.innerHTML = `
                    <h1>Xin chào, Huỳnh Thị Mỹ Linh! 👋</h1>
                    <p style="margin-top: 4px;">
                        Vai trò: <span class="role-pill-badge staff">Nhân viên bán hàng</span> &bull; 
                        Mã NV: <strong>NV002</strong> &bull; 
                        Ca trực: <strong>Ca sáng (07:00 - 15:00)</strong> &bull; 
                        Hôm nay là ${new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                `;

                if (!document.querySelector('.pos-shortcut-banner')) {
                    const shortcutBanner = document.createElement('div');
                    shortcutBanner.className = 'pos-shortcut-banner';
                    shortcutBanner.innerHTML = `
                        <div class="pos-shortcut-info">
                            <h4>Bàn làm việc Bán hàng & Thu ngân</h4>
                            <p>Tạo hóa đơn tức thì, tính tiền và in biên lai hoặc tra cứu tồn kho sản phẩm</p>
                        </div>
                        <div class="pos-shortcut-actions">
                            <a href="create-invoice.html" class="pos-shortcut-btn primary">
                                <i data-lucide="plus-circle" style="width: 18px; height: 18px;"></i>
                                <span>Tạo hóa đơn bán hàng</span>
                            </a>
                            <a href="sales.html" class="pos-shortcut-btn secondary">
                                <i data-lucide="receipt" style="width: 18px; height: 18px;"></i>
                                <span>Xem ds hóa đơn</span>
                            </a>
                            <a href="products.html" class="pos-shortcut-btn secondary">
                                <i data-lucide="boxes" style="width: 18px; height: 18px;"></i>
                                <span>Tra cứu tồn kho</span>
                            </a>
                        </div>
                    `;
                    banner.parentNode.insertBefore(shortcutBanner, banner.nextSibling);
                }
            }

            const kpiCards = document.querySelectorAll('.kpi-card');
            if (kpiCards.length >= 4) {
                const shiftMetrics = [
                    { label: 'Hóa đơn trong ca', value: '18 đơn', icon: 'receipt' },
                    { label: 'Doanh số ca hôm nay', value: '4.850.000đ', icon: 'wallet' },
                    { label: 'Sản phẩm đã bán', value: '64 món', icon: 'package' },
                    { label: 'Phiếu đổi trả xử lý', value: '2 phiếu', icon: 'refresh-cw' }
                ];

                kpiCards.forEach((card, idx) => {
                    const m = shiftMetrics[idx];
                    if (m) {
                        const lbl = card.querySelector('.kpi-label');
                        const val = card.querySelector('.kpi-value');
                        const icon = card.querySelector('.kpi-icon i');
                        if (lbl) lbl.textContent = m.label;
                        if (val) val.textContent = m.value;
                        if (icon) icon.setAttribute('data-lucide', m.icon);
                    }
                });
            }

            const chartCard = document.querySelector('.card:has(#revenueChart)');
            if (chartCard) {
                chartCard.style.display = 'none';
            }
        }
    }

    // D) RESTRICTED ADMIN PAGES (When staff tries to access directly)
    const adminPages = ['imports.html', 'suppliers.html', 'categories.html', 'prices.html', 'reports.html', 'inventory-report.html'];
    if (isStaff && adminPages.some(p => pageName === p)) {
        const contentView = document.querySelector('.content-view');
        if (contentView) {
            const warningBanner = document.createElement('div');
            warningBanner.style.cssText = `
                background: #fffbeb;
                border: 1.5px solid #fde68a;
                border-radius: 10px;
                padding: 1.25rem;
                margin-bottom: 1.5rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: #92400e;
            `;
            warningBanner.innerHTML = `
                <div style="display: flex; align-items: center; gap: 0.85rem;">
                    <i data-lucide="shield-alert" style="width: 28px; height: 28px; color: #d97706; flex-shrink: 0;"></i>
                    <div>
                        <div style="font-weight: 700; font-size: 0.95rem;">Chức năng yêu cầu quyền Chủ cửa hàng (Admin)</div>
                        <div style="font-size: 0.825rem; color: #b45309; margin-top: 2px;">
                            Bạn đang xem với vai trò <strong>Nhân viên bán hàng (Huỳnh Thị Mỹ Linh)</strong>. Bạn chỉ có quyền bán hàng, xem hóa đơn và tra cứu tồn kho.
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-primary" onclick="setCurrentRole('admin')" style="flex-shrink: 0; background: #2563eb; border-color: #2563eb;">
                    <i data-lucide="shield"></i>
                    <span>Chuyển sang Chủ cửa hàng</span>
                </button>
            `;
            contentView.insertBefore(warningBanner, contentView.firstChild);
        }
    // E) CREATE-INVOICE.HTML POS CASHIER BADGE
    const cashierSpan = document.getElementById('pos-cashier-name');
    if (cashierSpan) {
        cashierSpan.textContent = `${user.fullName} (${user.code})`;
    }

    refreshIcons();
}

function handleLoginPageSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('login-email')?.value.trim();
    const password = document.getElementById('login-password')?.value.trim();

    if (!email || !password) {
        showToast('Vui lòng nhập tài khoản và mật khẩu trước khi đăng nhập!', 'danger');
        return;
    }

    if (email.toLowerCase().includes('admin') || email.toLowerCase().includes('quanly')) {
        localStorage.setItem('taphoaxanh_current_role', 'admin');
    } else {
        localStorage.setItem('taphoaxanh_current_role', 'staff');
    }

    showToast('Đăng nhập thành công! Đang chuyển hướng...', 'success');
    setTimeout(() => window.location.href = 'index.html', 500);
}

function togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    const eyeIcon = btn.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        eyeIcon.setAttribute('data-lucide', 'eye-off');
    } else {
        input.type = 'password';
        eyeIcon.setAttribute('data-lucide', 'eye');
    }
    refreshIcons();
}

function mockSocialLogin(provider) {
    showToast(`Đang kết nối tài khoản ${provider}...`, 'info');
    setTimeout(() => window.location.href = 'index.html', 600);
}

// --------------------------------------------------------------------------
// 4. INVOICES (SALES.HTML)
// --------------------------------------------------------------------------
function renderInvoicesTable(data = state.invoices) {
    const tbody = document.getElementById('invoice-tbody');
    if (!tbody) return;

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center" style="padding: 1.5rem; color: var(--text-muted);">Không tìm thấy hóa đơn phù hợp.</td></tr>`;
        return;
    }

    tbody.innerHTML = data.map(inv => {
        return `
            <tr>
                <td class="fw-700">
                    <a href="invoice-detail.html?id=${inv.id}" style="color: var(--color-primary-dark); text-decoration: none;">${inv.id}</a>
                </td>
                <td>${inv.date}</td>
                <td class="fw-700" style="color: var(--text-primary);">${formatCurrency(inv.amount)}</td>
                <td>
                    <span class="badge-payment">
                        ${inv.payment}
                    </span>
                </td>
                <td class="text-center">
                    <button class="action-btn" onclick="window.location.href='invoice-detail.html?id=${inv.id}'" title="Xem chi tiết">
                        <i data-lucide="eye"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteInvoice('${inv.id}')" title="Xóa">
                        <i data-lucide="trash-2"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');

    const countElem = document.getElementById('invoice-count-info');
    if (countElem) countElem.textContent = `Hiển thị 1-${data.length} của ${data.length} hóa đơn`;
    refreshIcons();
}

function filterInvoices() {
    const searchVal = (document.getElementById('invoice-search-input')?.value || '').toLowerCase().trim();

    const filtered = state.invoices.filter(inv => {
        return inv.id.toLowerCase().includes(searchVal) ||
               inv.payment.toLowerCase().includes(searchVal) ||
               inv.date.toLowerCase().includes(searchVal);
    });

    renderInvoicesTable(filtered);
}

let deletingInvoiceId = null;

function deleteInvoice(id) {
    deletingInvoiceId = id;
    const inv = state.invoices.find(i => i.id === id) || { id: id, date: '25/05/2024', amount: 1250000 };
    
    const idElem = document.getElementById('modal-delete-inv-id');
    const dateElem = document.getElementById('modal-delete-inv-date');
    const amountElem = document.getElementById('modal-delete-inv-amount');

    if (idElem) idElem.textContent = inv.id;
    if (dateElem) dateElem.textContent = inv.date;
    if (amountElem) amountElem.textContent = formatCurrency(inv.amount);

    openModal('delete-invoice-modal');
}

function confirmDeleteInvoiceFromSales() {
    if (deletingInvoiceId) {
        state.invoices = state.invoices.filter(inv => inv.id !== deletingInvoiceId);
        renderInvoicesTable();
        closeModal('delete-invoice-modal');
        showResultPopup('success', 'Xoá thành công');
        deletingInvoiceId = null;
    }
}

// --------------------------------------------------------------------------
// 5. IMPORTS (IMPORTS.HTML)
// --------------------------------------------------------------------------
function renderImportsTable(data = state.imports) {
    const tbody = document.getElementById('import-tbody');
    if (!tbody) return;

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center" style="padding: 1.5rem; color: var(--text-muted);">Không tìm thấy phiếu nhập nào.</td></tr>`;
        return;
    }

    tbody.innerHTML = data.map(imp => {
        const statusBadge = imp.status === 'Đã thanh toán' ? 'status-success' : 'status-warning';

        return `
            <tr>
                <td class="fw-600">
                    <a href="update-import.html?id=${imp.id}" onclick="localStorage.setItem('taphoaxanh_last_import_id', '${imp.id}')" style="color: var(--color-primary-dark); text-decoration: none;">${imp.id}</a>
                </td>
                <td class="fw-600">${imp.supplier}</td>
                <td>${imp.date}</td>
                <td class="fw-600">${formatCurrency(imp.amount)}</td>
                <td><span class="status-pill ${statusBadge}"><span class="dot"></span> ${imp.status}</span></td>
                <td class="text-center">
                    <button class="action-btn" onclick="localStorage.setItem('taphoaxanh_last_import_id', '${imp.id}'); window.location.href='update-import.html?id=${imp.id}'" title="Xem chi tiết">
                        <i data-lucide="eye"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteImport('${imp.id}')" title="Xóa">
                        <i data-lucide="trash-2"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');

    const countElem = document.getElementById('import-count-info');
    if (countElem) countElem.textContent = `Hiển thị 1 - ${data.length} trên tổng số ${data.length} phiếu nhập`;
    refreshIcons();
}

function setImportStatusFilter(status, btn) {
    document.querySelectorAll('.pill-filter').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    state.importStatusFilter = status;
    filterImports();
}

function filterImports() {
    const searchVal = (document.getElementById('import-search-input')?.value || '').toLowerCase().trim();
    const codeVal = (document.getElementById('import-code-filter')?.value || '').toLowerCase().trim();
    const supplierVal = document.getElementById('import-supplier-filter')?.value || 'all';
    const statusVal = state.importStatusFilter;

    const filtered = state.imports.filter(imp => {
        const matchesSearch = imp.id.toLowerCase().includes(searchVal) || imp.supplier.toLowerCase().includes(searchVal);
        const matchesCode = imp.id.toLowerCase().includes(codeVal);
        const matchesSupplier = supplierVal === 'all' || imp.supplier === supplierVal;
        const matchesStatus = statusVal === 'all' || imp.status === statusVal;
        return matchesSearch && matchesCode && matchesSupplier && matchesStatus;
    });

    renderImportsTable(filtered);
}

let deletingImportId = null;

function deleteImport(id) {
    deletingImportId = id;
    const imp = state.imports.find(i => i.id === id) || { id: id, supplier: 'Nông sản Sạch Đà Lạt', date: '25/10/2023', amount: 12500000 };
    
    const idElem = document.getElementById('modal-delete-imp-id');
    const supplierElem = document.getElementById('modal-delete-imp-supplier');
    const dateElem = document.getElementById('modal-delete-imp-date');
    const amountElem = document.getElementById('modal-delete-imp-amount');

    if (idElem) idElem.textContent = imp.id;
    if (supplierElem) supplierElem.textContent = imp.supplier;
    if (dateElem) dateElem.textContent = imp.date;
    if (amountElem) amountElem.textContent = formatCurrency(imp.amount);

    openModal('delete-import-modal');
}

function confirmDeleteImportFromList() {
    if (deletingImportId) {
        state.imports = state.imports.filter(i => i.id !== deletingImportId);
        saveStoredImports(state.imports);
        renderImportsTable();
        closeModal('delete-import-modal');
        showResultPopup('success', 'Xoá thành công');
        deletingImportId = null;
    }
}

// --------------------------------------------------------------------------
// 6. SUPPLIERS (SUPPLIERS.HTML)
// --------------------------------------------------------------------------
function renderSuppliersTable(data = state.suppliers) {
    const tbody = document.getElementById('supplier-tbody');
    if (!tbody) return;

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="text-center" style="padding: 1.5rem; color: var(--text-muted);">Không có nhà cung cấp nào.</td></tr>`;
        return;
    }

    tbody.innerHTML = data.map(sup => `
        <tr>
            <td class="fw-700" style="color: #059669;">
                <a href="update-supplier.html?id=${sup.id}" style="color: #059669; text-decoration: none; font-weight: 700;">${sup.id}</a>
            </td>
            <td class="fw-700" style="color: #0F172A;">
                <div style="display: inline-flex; align-items: center; gap: 0.5rem; vertical-align: middle;">
                    <i data-lucide="building-2" style="width: 16px; height: 16px; color: #059669; flex-shrink: 0;"></i>
                    <span>${sup.name}</span>
                </div>
            </td>
            <td style="color: #334155; font-weight: 500;">${sup.phone}</td>
            <td class="text-center">
                <button class="action-btn" onclick="window.location.href='update-supplier.html?id=${sup.id}'" title="Xem chi tiết / Sửa">
                    <i data-lucide="eye"></i>
                </button>
                <button class="action-btn delete-btn" onclick="deleteSupplier('${sup.id}')" title="Xóa">
                    <i data-lucide="trash-2"></i>
                </button>
            </td>
        </tr>
    `).join('');

    const countElem = document.getElementById('supplier-count-info');
    if (countElem) countElem.textContent = `Hiển thị 1-${data.length} trên ${data.length} nhà cung cấp`;
    refreshIcons();
}

function filterSuppliers() {
    const searchVal = (document.getElementById('supplier-search-input')?.value || '').toLowerCase().trim();
    const filtered = state.suppliers.filter(sup => 
        sup.id.toLowerCase().includes(searchVal) || sup.name.toLowerCase().includes(searchVal) || sup.phone.includes(searchVal)
    );
    renderSuppliersTable(filtered);
}

let deletingSupplierId = null;

function deleteSupplier(id) {
    deletingSupplierId = id;
    const sup = state.suppliers.find(s => s.id === id) || { id: id, name: 'Nông sản sạch Đà Lạt', phone: '0901 234 567' };

    const idElem = document.getElementById('modal-delete-sup-id');
    const nameElem = document.getElementById('modal-delete-sup-name');
    const phoneElem = document.getElementById('modal-delete-sup-phone');

    if (idElem) idElem.textContent = sup.id;
    if (nameElem) nameElem.textContent = sup.name;
    if (phoneElem) phoneElem.textContent = sup.phone;

    openModal('delete-supplier-modal');
}

function confirmDeleteSupplierFromList() {
    if (deletingSupplierId) {
        state.suppliers = state.suppliers.filter(s => s.id !== deletingSupplierId);
        renderSuppliersTable();
        closeModal('delete-supplier-modal');
        showResultPopup('success', 'Xoá thành công');
        deletingSupplierId = null;
    }
}

// --------------------------------------------------------------------------
// 7. PRODUCTS (PRODUCTS.HTML)
// --------------------------------------------------------------------------
function renderProductsTable(data = state.products) {
    const tbody = document.getElementById('product-tbody');
    if (!tbody) return;

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center" style="padding: 1.5rem; color: var(--text-muted);">Không tìm thấy hàng hóa nào.</td></tr>`;
        return;
    }

    const isStaff = getCurrentUser().roleKey === 'staff';

    tbody.innerHTML = data.map(p => `
        <tr>
            <td class="fw-600">
                <a href="product-detail.html?id=${p.id}" style="color: var(--color-primary-dark); text-decoration: none;">${p.id}</a>
            </td>
            <td class="fw-600">${p.name}</td>
            <td>${p.unit}</td>
            <td class="${p.stock === 0 ? 'text-danger' : 'fw-600'}">${p.stock}</td>
            <td class="text-center">
                <button class="action-btn" onclick="window.location.href='product-detail.html?id=${p.id}'" title="Xem chi tiết">
                    <i data-lucide="eye"></i>
                </button>
                ${!isStaff ? `
                <button class="action-btn delete-btn" onclick="deleteProduct('${p.id}')" title="Xóa">
                    <i data-lucide="trash-2"></i>
                </button>
                ` : ''}
            </td>
        </tr>
    `).join('');

    const countElem = document.getElementById('product-count-info');
    if (countElem) countElem.textContent = `Hiển thị 1 - ${data.length} trên tổng số 2,450 mặt hàng`;
    refreshIcons();
}

let deletingProductId = null;

function deleteProduct(id) {
    deletingProductId = id;

    const db = {
        'HH00000010': { id: 'HH00000010', name: 'Bánh chococpie', unit: 'Hộp', stock: 12, salePrice: '10,000', costPrice: '8,000', hsd: '03/12/2026' },
        'HH00000009': { id: 'HH00000009', name: 'Bánh solite', unit: 'Hộp', stock: 15, salePrice: '40,000', costPrice: '32,000', hsd: '15/08/2026' },
        'HH00000008': { id: 'HH00000008', name: 'Pepsi', unit: 'Lon', stock: 12, salePrice: '10,000', costPrice: '8,000', hsd: '03/12/2026' },
        'HH00000007': { id: 'HH00000007', name: 'Bàn chải đ.răng P/S', unit: 'Cái', stock: 0, salePrice: '12,000', costPrice: '9,000', hsd: '0/0/0000' },
        'HH00000006': { id: 'HH00000006', name: 'Bánh quy Cosy', unit: 'Hộp', stock: 10, salePrice: '45,000', costPrice: '36,000', hsd: '10/10/2026' }
    };

    const foundInState = state.products.find(p => p.id === id);
    const prod = db[id] || (foundInState ? { id: foundInState.id, name: foundInState.name, unit: foundInState.unit, stock: foundInState.stock, salePrice: '12,000', costPrice: '9,000', hsd: '0/0/0000' } : { id: id, name: 'Bàn chải đ.răng P/S', unit: 'Cái', stock: 0, salePrice: '12,000', costPrice: '9,000', hsd: '0/0/0000' });

    const codeElem = document.getElementById('modal-del-prod-code');
    const nameElem = document.getElementById('modal-del-prod-name');
    const saleElem = document.getElementById('modal-del-prod-saleprice');
    const costElem = document.getElementById('modal-del-prod-costprice');
    const stockElem = document.getElementById('modal-del-prod-stock');
    const unitElem = document.getElementById('modal-del-prod-unit');
    const hsdElem = document.getElementById('modal-del-prod-hsd');

    if (codeElem) codeElem.textContent = prod.id;
    if (nameElem) nameElem.textContent = prod.name;
    if (saleElem) saleElem.textContent = prod.salePrice || '12,000';
    if (costElem) costElem.textContent = prod.costPrice || '9,000';
    if (stockElem) stockElem.textContent = prod.stock;
    if (unitElem) unitElem.textContent = prod.unit;
    if (hsdElem) hsdElem.textContent = prod.hsd || '0/0/0000';

    openModal('delete-product-modal');
}

function confirmDeleteProductFromList() {
    if (deletingProductId) {
        state.products = state.products.filter(p => p.id !== deletingProductId);
        saveStoredProducts(state.products);
        renderProductsTable();
        closeModal('delete-product-modal');
        showResultPopup('success', 'Xoá thành công');
        deletingProductId = null;
    }
}

function filterProducts() {
    const searchVal = (document.getElementById('product-search-input')?.value || '').toLowerCase().trim();
    const filtered = state.products.filter(p => p.id.toLowerCase().includes(searchVal) || p.name.toLowerCase().includes(searchVal));
    renderProductsTable(filtered);
}

// --------------------------------------------------------------------------
// 8. CATEGORIES (CATEGORIES.HTML)
// --------------------------------------------------------------------------
function renderCategoriesGrid(data = state.categories) {
    const container = document.getElementById('category-grid-container');
    if (!container) return;

    let html = data.map(cat => `
        <div class="category-card" onclick="window.location.href='category-detail.html?id=${cat.id}'" style="cursor: pointer;">
            <div class="category-card-img-wrapper">
                ${cat.img ? `<img src="${cat.img}" alt="${cat.name}">` : `
                    <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#E8F5E9;color:var(--color-primary-dark);">
                        <i data-lucide="layers" style="width:36px;height:36px;"></i>
                    </div>
                `}
            </div>
            <div class="category-card-body">
                <span class="category-code-badge">MÃ: ${cat.id}</span>
                <h3 class="category-card-title">${cat.name}</h3>
                <div class="category-card-footer">
                    <span>${cat.count.toString().padStart(2, '0')} hàng hóa</span>
                    <i data-lucide="chevron-right" style="width:16px;height:16px;"></i>
                </div>
            </div>
        </div>
    `).join('');

    html += `
        <div class="category-card-add" onclick="window.location.href='create-category.html'" style="cursor: pointer;">
            <div class="add-circle-icon">
                <i data-lucide="plus" style="width:20px;height:20px;"></i>
            </div>
            <span class="fw-700" style="font-size: 0.9rem; color: var(--color-primary-dark);">Thêm loại hàng mới</span>
        </div>
    `;

    container.innerHTML = html;
    refreshIcons();
}

let deletingCatId = null;

function deleteCategory(id) {
    deletingCatId = id;
    const cat = state.categories.find(c => c.id === id) || { id: id, name: 'Gia vị', count: 5 };
    const codeElem = document.getElementById('modal-cat-code');
    const nameElem = document.getElementById('modal-cat-name');
    const countElem = document.getElementById('modal-cat-count');

    if (codeElem) codeElem.textContent = cat.id;
    if (nameElem) nameElem.textContent = cat.name;
    if (countElem) countElem.textContent = cat.count;

    openModal('delete-category-modal');
}

function confirmDeleteCategory() {
    const targetId = deletingCatId || document.getElementById('modal-cat-code')?.innerText || 'LH0000011';
    state.categories = state.categories.filter(c => c.id !== targetId);
    saveStoredCategories(state.categories);
    renderCategoriesGrid(state.categories);
    closeModal('delete-category-modal');
    showResultPopup('success', 'Xoá thành công');
    deletingCatId = null;
}

function filterCategories() {
    const searchVal = (document.getElementById('category-search-input')?.value || '').toLowerCase().trim();
    const filtered = state.categories.filter(c => c.id.toLowerCase().includes(searchVal) || c.name.toLowerCase().includes(searchVal));
    renderCategoriesGrid(filtered);
}

// --------------------------------------------------------------------------
// 9. PRICES (PRICES.HTML)
// --------------------------------------------------------------------------
function renderPricesTable(data = state.prices) {
    const tbody = document.getElementById('price-tbody');
    if (!tbody) return;

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center" style="padding: 1.5rem; color: var(--text-muted);">Không tìm thấy bảng giá nào.</td></tr>`;
        return;
    }

    tbody.innerHTML = data.map(pr => {
        let badgeClass = 'status-success';
        if (pr.status === 'Chờ áp dụng') badgeClass = 'status-info';
        if (pr.status === 'Ngưng áp dụng' || pr.status === 'Ngừng áp dụng' || pr.status === 'Hết hiệu lực') badgeClass = 'status-muted';

        return `
            <tr>
                <td class="fw-600" style="color: var(--color-primary-dark);">${pr.id}</td>
                <td class="fw-600 flex-align">
                    <div class="product-img-placeholder" style="margin-right: 0.5rem;">
                        <i data-lucide="tag" style="width:16px;"></i>
                    </div>
                    ${pr.name}
                </td>
                <td class="fw-600">${formatCurrency(pr.price)}</td>
                <td>${pr.date}</td>
                <td><span class="status-pill ${badgeClass}"><span class="dot"></span> ${pr.status}</span></td>
                <td class="text-center">
                    <button class="action-btn" onclick="openPriceHistoryModal('${pr.id}')" title="Xem lịch sử giá">
                        <i data-lucide="eye"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="deletePrice('${pr.id}')" title="Xóa">
                        <i data-lucide="trash-2"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');

    const countElem = document.getElementById('price-count-info');
    if (countElem) countElem.textContent = `Hiển thị 1 - ${data.length} trên tổng số 1,305 hàng hóa`;
    refreshIcons();
}

function openPriceHistoryModal(id) {
    const pr = state.prices.find(p => p.id === id) || { id: id, name: 'Bánh chocopie', price: 40000, costPrice: 30000, date: '28/11/2025', status: 'Đang áp dụng' };

    const codeElem = document.getElementById('hist-price-code');
    const nameElem = document.getElementById('hist-price-name');
    const currSaleElem = document.getElementById('hist-price-current-sale');

    if (codeElem) codeElem.textContent = pr.id;
    if (nameElem) nameElem.textContent = pr.name;
    if (currSaleElem) currSaleElem.textContent = formatCurrency(pr.price);

    const tbody = document.getElementById('price-history-tbody');
    if (tbody) {
        tbody.innerHTML = `
            <tr>
                <td style="font-weight: 700;">28/11/2025</td>
                <td style="text-align: right;">${formatCurrency(pr.costPrice || 30000)}</td>
                <td style="text-align: right; font-weight: 700; color: #059669;">${formatCurrency(pr.price)}</td>
                <td style="text-align: center;"><span class="status-pill status-success"><span class="dot"></span> Đang áp dụng</span></td>
            </tr>
            <tr>
                <td style="font-weight: 600; color: #64748B;">15/05/2025</td>
                <td style="text-align: right; color: #64748B;">28,000 đ</td>
                <td style="text-align: right; font-weight: 600; color: #64748B;">38,000 đ</td>
                <td style="text-align: center;"><span class="status-pill status-muted"><span class="dot"></span> Ngưng áp dụng</span></td>
            </tr>
            <tr>
                <td style="font-weight: 600; color: #64748B;">10/10/2024</td>
                <td style="text-align: right; color: #64748B;">25,000 đ</td>
                <td style="text-align: right; font-weight: 600; color: #64748B;">35,000 đ</td>
                <td style="text-align: center;"><span class="status-pill status-muted"><span class="dot"></span> Ngưng áp dụng</span></td>
            </tr>
        `;
    }

    openModal('price-history-modal');
}

let deletingPriceId = null;

function deletePrice(id) {
    deletingPriceId = id;
    const pr = state.prices.find(p => p.id === id) || { id: id, name: 'Bánh chocopie', price: 40000, costPrice: 30000, date: '28/11/2025', endDate: 'khống', status: 'Đang áp dụng' };

    if (pr.status === 'Đang áp dụng' || pr.status === 'Còn hiệu lực') {
        const codeElem = document.getElementById('modal-delerr-price-code');
        const nameElem = document.getElementById('modal-delerr-price-name');
        const saleElem = document.getElementById('modal-delerr-price-saleprice');
        const costElem = document.getElementById('modal-delerr-price-costprice');
        const dateElem = document.getElementById('modal-delerr-price-date');
        const endElem = document.getElementById('modal-delerr-price-enddate');
        const statusElem = document.getElementById('modal-delerr-price-status');

        if (codeElem) codeElem.textContent = pr.id;
        if (nameElem) nameElem.textContent = pr.name;
        if (saleElem) saleElem.textContent = formatCurrency(pr.price).replace('đ', '').trim();
        if (costElem) costElem.textContent = formatCurrency(pr.costPrice || 30000).replace('đ', '').trim();
        if (dateElem) dateElem.textContent = pr.date;
        if (endElem) endElem.textContent = pr.endDate || 'khống';
        if (statusElem) statusElem.textContent = pr.status;

        openModal('delete-price-error-modal');
    } else {
        const codeElem = document.getElementById('modal-del-price-code');
        const nameElem = document.getElementById('modal-del-price-name');
        const saleElem = document.getElementById('modal-del-price-saleprice');
        const costElem = document.getElementById('modal-del-price-costprice');
        const dateElem = document.getElementById('modal-del-price-date');
        const endElem = document.getElementById('modal-del-price-enddate');
        const statusElem = document.getElementById('modal-del-price-status');

        if (codeElem) codeElem.textContent = pr.id;
        if (nameElem) nameElem.textContent = pr.name;
        if (saleElem) saleElem.textContent = formatCurrency(pr.price).replace('đ', '').trim();
        if (costElem) costElem.textContent = formatCurrency(pr.costPrice || 30000).replace('đ', '').trim();
        if (dateElem) dateElem.textContent = pr.date;
        if (endElem) endElem.textContent = pr.endDate || '28/11/2025';
        if (statusElem) statusElem.textContent = pr.status;

        openModal('delete-price-modal');
    }
}

function handleCloseDeletePriceError() {
    closeModal('delete-price-error-modal');
    showResultPopup('error', 'Xoá không thành công', 'Giá bán này còn đang được sử dụng, vui lòng thử lại sau');
}

function confirmDeletePriceFromList() {
    if (deletingPriceId) {
        state.prices = state.prices.filter(p => p.id !== deletingPriceId);
        renderPricesTable();
        closeModal('delete-price-modal');
        showResultPopup('success', 'Xoá thành công');
        deletingPriceId = null;
    }
}

// --------------------------------------------------------------------------
// 10. RETURNS (RETURNS.HTML)
// --------------------------------------------------------------------------
let currentReturnSlipPage = 1;
const returnSlipPageSize = 5;
let currentReturnSlipsData = null;

function setReturnSlipPage(page) {
    const data = currentReturnSlipsData || state.returnSlips;
    const totalPages = Math.ceil(data.length / returnSlipPageSize) || 1;
    if (page < 1 || page > totalPages) return;
    currentReturnSlipPage = page;
    renderReturnSlipsTable(data);
}

function renderReturnSlipsTable(data = state.returnSlips) {
    const tbody = document.getElementById('return-slips-tbody');
    if (!tbody) return;

    currentReturnSlipsData = data;
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / returnSlipPageSize) || 1;

    if (currentReturnSlipPage > totalPages) currentReturnSlipPage = totalPages;
    if (currentReturnSlipPage < 1) currentReturnSlipPage = 1;

    const countInfo = document.getElementById('return-slips-count-info');
    const paginationContainer = document.getElementById('return-slips-pagination');

    if (totalItems === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="text-center" style="padding: 1.5rem; color: var(--text-muted);">Không tìm thấy phiếu đổi hàng nào.</td></tr>`;
        if (countInfo) countInfo.textContent = 'Hiển thị 0 trên tổng số 0 phiếu đổi hàng';
        if (paginationContainer) paginationContainer.innerHTML = '';
        return;
    }

    const startIndex = (currentReturnSlipPage - 1) * returnSlipPageSize;
    const endIndex = Math.min(startIndex + returnSlipPageSize, totalItems);
    const pageItems = data.slice(startIndex, endIndex);

    tbody.innerHTML = pageItems.map(item => `
        <tr style="height: 52px; border-bottom: 1px solid #E2E8F0;">
            <td class="fw-700" style="color: #0F172A; font-weight: 700; padding: 0.85rem 1.25rem;">
                <a href="return-detail.html?id=${item.id}" onclick="localStorage.setItem('taphoaxanh_last_return_id', '${item.id}');" style="color: #0F172A; text-decoration: none; font-weight: 700;">${item.id}</a>
            </td>
            <td style="color: #475569; padding: 0.85rem 1.25rem;">${item.date}</td>
            <td style="color: #475569; padding: 0.85rem 1.25rem;">${item.qty}</td>
            <td class="text-center" style="padding: 0.85rem 1.25rem;">
                <button class="action-btn" onclick="localStorage.setItem('taphoaxanh_last_return_id', '${item.id}'); window.location.href='return-detail.html?id=${item.id}';" title="Xem chi tiết">
                    <i data-lucide="eye"></i>
                </button>
                <button class="action-btn delete-btn" onclick="deleteReturnSlip('${item.id}')" title="Xóa">
                    <i data-lucide="trash-2"></i>
                </button>
            </td>
        </tr>
    `).join('');

    if (countInfo) {
        countInfo.textContent = `Hiển thị ${startIndex + 1} - ${endIndex} trên tổng số ${totalItems} phiếu đổi hàng`;
    }

    if (paginationContainer) {
        let buttonsHtml = '';
        const prevDisabled = currentReturnSlipPage <= 1 ? 'disabled' : '';
        buttonsHtml += `<button class="page-btn" ${prevDisabled} onclick="setReturnSlipPage(${currentReturnSlipPage - 1})" title="Trang trước"><i data-lucide="chevron-left"></i></button>`;

        for (let p = 1; p <= totalPages; p++) {
            const activeClass = p === currentReturnSlipPage ? 'active' : '';
            buttonsHtml += `<button class="page-btn ${activeClass}" onclick="setReturnSlipPage(${p})">${p}</button>`;
        }

        const nextDisabled = currentReturnSlipPage >= totalPages ? 'disabled' : '';
        buttonsHtml += `<button class="page-btn" ${nextDisabled} onclick="setReturnSlipPage(${currentReturnSlipPage + 1})" title="Trang sau"><i data-lucide="chevron-right"></i></button>`;

        paginationContainer.innerHTML = buttonsHtml;
    }

    refreshIcons();
}

function filterReturnSlips() {
    const searchVal = (document.getElementById('return-slips-search-input')?.value || '').toLowerCase().trim();
    const filtered = state.returnSlips.filter(r => r.id.toLowerCase().includes(searchVal) || r.date.includes(searchVal));
    currentReturnSlipPage = 1;
    renderReturnSlipsTable(filtered);
}

let deletingReturnSlipId = null;
function deleteReturnSlip(id) {
    deletingReturnSlipId = id;
    const slip = state.returnSlips.find(s => s.id === id) || { id, date: '25/10/2024', qty: 3 };
    const idElem = document.getElementById('modal-del-slip-id');
    const dateElem = document.getElementById('modal-del-slip-date');
    const qtyElem = document.getElementById('modal-del-slip-qty');
    if (idElem) idElem.textContent = slip.id;
    if (dateElem) dateElem.textContent = slip.date;
    if (qtyElem) qtyElem.textContent = slip.qty;

    openModal('delete-return-slip-modal');
}

function confirmDeleteReturnSlip() {
    if (deletingReturnSlipId) {
        state.returnSlips = state.returnSlips.filter(r => r.id !== deletingReturnSlipId);
        saveStoredReturnSlips(state.returnSlips);
        
        const data = (currentReturnSlipsData && currentReturnSlipsData !== state.returnSlips)
            ? currentReturnSlipsData.filter(r => r.id !== deletingReturnSlipId)
            : state.returnSlips;
        
        const totalPages = Math.ceil(data.length / returnSlipPageSize) || 1;
        if (currentReturnSlipPage > totalPages) {
            currentReturnSlipPage = totalPages;
        }

        renderReturnSlipsTable(data);
        closeModal('delete-return-slip-modal');
        showResultPopup('success', 'Xoá thành công');
        deletingReturnSlipId = null;
    }
}

function renderReturnsTable(data = state.returns) {
    const tbody = document.getElementById('returns-tbody');
    if (!tbody) return;

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="text-center" style="padding: 1.5rem; color: var(--text-muted);">Không có hóa đơn nào.</td></tr>`;
        return;
    }

    tbody.innerHTML = data.map(ret => `
        <tr>
            <td class="fw-700">
                <a href="create-return.html?id=${ret.id}" style="color: var(--color-primary-dark); text-decoration: none;">${ret.id}</a>
            </td>
            <td>${ret.date.replace(', ', '<br>')}</td>
            <td class="fw-700" style="color: var(--text-primary);">${formatCurrency(ret.amount)}</td>
            <td class="text-center">
                <button class="btn btn-primary" onclick="window.location.href='create-return.html?id=${ret.id}'">Chọn</button>
            </td>
        </tr>
    `).join('');

    const countElem = document.getElementById('returns-count-info');
    if (countElem) countElem.textContent = `Hiển thị 1-${data.length} của 128 hóa đơn`;
    refreshIcons();
}

function filterReturns() {
    const searchVal = (document.getElementById('returns-search-input')?.value || '').toLowerCase().trim();
    const filtered = state.returns.filter(r => r.id.toLowerCase().includes(searchVal));
    renderReturnsTable(filtered);
}

function selectInvoiceForReturn(id) {
    showToast(`Đã chọn hóa đơn ${id} để lập phiếu đổi hàng!`, 'success');
    setTimeout(() => {
        window.location.href = `create-return.html?id=${id}`;
    }, 800);
}

// --------------------------------------------------------------------------
// 11. GENERAL REPORT (REPORTS.HTML)
// --------------------------------------------------------------------------
function renderGeneralReportTable(data = state.generalReports) {
    const tbody = document.getElementById('general-report-tbody');
    if (!tbody) return;

    tbody.innerHTML = data.map(r => `
        <tr>
            <td class="fw-600">${r.date}</td>
            <td class="fw-600" style="color: #16A34A;">${formatNumber(r.revenue)}</td>
            <td>${r.orders}</td>
            <td>${r.itemsSold}</td>
            <td class="fw-600">${formatNumber(r.profit)}</td>
        </tr>
    `).join('');

    refreshIcons();
}

function setReportPeriod(period, btn) {
    document.querySelectorAll('.pill-filter').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    showToast(`Đã cập nhật mốc thời gian: ${period === 'day' ? 'Ngày' : period === 'week' ? 'Tuần' : 'Tháng'}`, 'info');
}

// --------------------------------------------------------------------------
// 12. INVENTORY REPORT (INVENTORY-REPORT.HTML)
// --------------------------------------------------------------------------
function renderInventoryReportTable(data = state.inventoryReports) {
    const tbody = document.getElementById('inventory-report-tbody');
    if (!tbody) return;

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center" style="padding: 1.5rem; color: var(--text-muted);">Không tìm thấy sản phẩm tồn kho phù hợp.</td></tr>`;
        return;
    }

    tbody.innerHTML = data.map(inv => `
        <tr>
            <td class="fw-600" style="color: var(--color-primary-dark);">${inv.catCode}</td>
            <td>${inv.catName}</td>
            <td class="fw-600">${inv.code}</td>
            <td class="fw-600">${inv.name}</td>
            <td>${inv.unit}</td>
            <td class="text-center ${inv.stock < 150 ? 'text-danger' : 'fw-600'}">${formatNumber(inv.stock)}</td>
        </tr>
    `).join('');

    const countElem = document.getElementById('inventory-report-count');
    if (countElem) countElem.textContent = `Hiển thị ${data.length} trên 1,284 sản phẩm`;
    refreshIcons();
}

function filterInventoryReport() {
    const filterVal = document.getElementById('inv-stock-filter')?.value || 'all';
    let filtered = state.inventoryReports;
    if (filterVal === 'low') filtered = state.inventoryReports.filter(i => i.stock < 150);
    if (filterVal === 'normal') filtered = state.inventoryReports.filter(i => i.stock >= 150);
    renderInventoryReportTable(filtered);
}

function toggleStockDropdown(e) {
    if (e) e.stopPropagation();
    const menu = document.getElementById('inv-stock-menu');
    if (menu) menu.classList.toggle('hidden');
}

function selectStockSort(order, labelText) {
    const menu = document.getElementById('inv-stock-menu');
    if (menu) menu.classList.add('hidden');

    const labelElem = document.getElementById('inv-stock-selected-label');
    if (labelElem) labelElem.textContent = `Số lượng tồn (${labelText})`;

    let sorted = [...state.inventoryReports];
    if (order === 'asc') sorted.sort((a, b) => a.stock - b.stock);
    if (order === 'desc') sorted.sort((a, b) => b.stock - a.stock);
    renderInventoryReportTable(sorted);
    showToast(`Đã sắp xếp số lượng tồn: ${labelText}`, 'info');
}

function toggleExpiryDropdown(e) {
    if (e) e.stopPropagation();
    const menu = document.getElementById('inv-expiry-menu');
    if (menu) menu.classList.toggle('hidden');
}

function selectExpirySort(type, labelText) {
    const menu = document.getElementById('inv-expiry-menu');
    if (menu) menu.classList.add('hidden');

    const labelElem = document.getElementById('inv-expiry-selected-label');
    if (labelElem) labelElem.textContent = `Hạn sử dụng (${labelText})`;

    let sorted = [...state.inventoryReports];
    if (type === 'oldest') {
        sorted.sort((a, b) => (a.catCode || '').localeCompare(b.catCode || ''));
    } else {
        sorted.sort((a, b) => (b.catCode || '').localeCompare(a.catCode || ''));
    }
    renderInventoryReportTable(sorted);
    showToast(`Đã lọc Hạn sử dụng: ${labelText}`, 'info');
}

document.addEventListener('click', (e) => {
    const btnStock = document.getElementById('inv-stock-dropdown-btn');
    const menuStock = document.getElementById('inv-stock-menu');
    if (menuStock && !menuStock.classList.contains('hidden')) {
        if (btnStock && !btnStock.contains(e.target) && !menuStock.contains(e.target)) {
            menuStock.classList.add('hidden');
        }
    }

    const btnExpiry = document.getElementById('inv-expiry-dropdown-btn');
    const menuExpiry = document.getElementById('inv-expiry-menu');
    if (menuExpiry && !menuExpiry.classList.contains('hidden')) {
        if (btnExpiry && !btnExpiry.contains(e.target) && !menuExpiry.contains(e.target)) {
            menuExpiry.classList.add('hidden');
        }
    }
});

function sortInventoryByStock(order) {
    if (!order) return renderInventoryReportTable(state.inventoryReports);
    let sorted = [...state.inventoryReports];
    if (order === 'asc') sorted.sort((a, b) => a.stock - b.stock);
    if (order === 'desc') sorted.sort((a, b) => b.stock - a.stock);
    renderInventoryReportTable(sorted);
    showToast(`Đã sắp xếp số lượng tồn ${order === 'asc' ? 'Tăng dần' : 'Giảm dần'}`, 'info');
}

function sortInventoryByDate(type, btn) {
    document.querySelectorAll('.btn-pill-sort').forEach(b => {
        b.style.backgroundColor = '#FFFFFF';
        b.style.borderColor = '#CBD5E1';
        b.style.color = '#0F172A';
    });
    if (btn) {
        btn.style.backgroundColor = '#059669';
        btn.style.borderColor = '#047857';
        btn.style.color = '#FFFFFF';
    }
    let sorted = [...state.inventoryReports];
    if (type === 'oldest') sorted.reverse();
    renderInventoryReportTable(sorted);
    showToast(`Đã lọc sắp xếp: ${type === 'oldest' ? 'Cũ - Mới' : 'Mới - Cũ'}`, 'info');
}

// --------------------------------------------------------------------------
// 13. MODALS & CREATION HANDLERS
// --------------------------------------------------------------------------
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    if (modalId === 'add-product-modal') {
        const nextId = 'HH000000' + Math.floor(11 + Math.random() * 80);
        document.getElementById('new-product-code').value = nextId;
    }
    if (modalId === 'add-category-modal') {
        const nextId = 'LH00000' + Math.floor(16 + Math.random() * 80);
        document.getElementById('new-cat-code').value = nextId;
    }
    if (modalId === 'add-price-modal') {
        const nextId = 'GIA0000001';
        document.getElementById('new-price-code').value = nextId;
    }

    modal.classList.remove('hidden');
    modal.style.setProperty('display', 'flex', 'important');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        modal.style.setProperty('display', 'none', 'important');
    }
}

function handleCreateProduct(e) {
    e.preventDefault();
    const id = document.getElementById('new-product-code').value;
    const name = document.getElementById('new-product-name').value;
    const unit = document.getElementById('new-product-unit').value;
    const stock = parseInt(document.getElementById('new-product-stock').value) || 0;

    state.products.unshift({ id, name, unit, stock });
    renderProductsTable();
    closeModal('add-product-modal');
    showToast(`Đã thêm sản phẩm ${name}!`, 'success');
}

function handleCreateCategory(e) {
    e.preventDefault();
    const id = document.getElementById('new-cat-code').value;
    const name = document.getElementById('new-cat-name').value;
    const count = parseInt(document.getElementById('new-cat-count').value) || 0;

    state.categories.unshift({ id, name, count, img: null });
    renderCategoriesGrid();
    closeModal('add-category-modal');
    showToast(`Đã thêm loại hàng ${name}!`, 'success');
}

function handleCreatePrice(e) {
    e.preventDefault();
    const id = document.getElementById('new-price-code')?.value || 'GIA0000011';
    const nameInput = document.getElementById('new-price-name');
    const valInput = document.getElementById('new-price-val');
    const name = nameInput ? nameInput.value.trim() : '';
    const priceVal = valInput ? valInput.value.replace(/,/g, '').trim() : '';
    const price = parseFloat(priceVal) || 0;
    const dateStr = document.getElementById('new-price-date')?.value || '29/11/2025';

    const boxName = document.getElementById('box-price-name');
    const errName = document.getElementById('err-price-name');
    const boxVal = document.getElementById('box-price-val');
    const errVal = document.getElementById('err-price-val');

    let hasError = false;

    // Validate Name
    if (!name) {
        hasError = true;
        if (boxName) boxName.style.border = '1.5px dashed #3B82F6';
        if (errName) errName.style.display = 'block';
    } else {
        if (boxName) boxName.style.border = '1px solid #CBD5E1';
        if (errName) errName.style.display = 'none';
    }

    // Validate Sale Price
    if (!price || price <= 0) {
        hasError = true;
        if (boxVal) boxVal.style.border = '1.5px solid #EF4444';
        if (errVal) errVal.style.display = 'block';
    } else {
        if (boxVal) boxVal.style.border = '1px solid #CBD5E1';
        if (errVal) errVal.style.display = 'none';
    }

    if (hasError) return;

    state.prices.unshift({ id, name, price, costPrice: 30000, date: dateStr, endDate: 'khống', status: 'Đang áp dụng' });
    renderPricesTable();
    closeModal('add-price-modal');

    // Reset fields for next open
    if (nameInput) nameInput.value = '';
    if (valInput) valInput.value = '';
    showToast(`Đã thiết lập giá mới cho ${name}!`, 'success');
}

// --------------------------------------------------------------------------
// 14. CANVAS CHART
// --------------------------------------------------------------------------
function renderRevenueChart() {
    const canvas = document.getElementById('revenueChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.parentElement.clientWidth || 360;
    canvas.width = width;
    canvas.height = 220;

    const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
    const dataRevenue = [28, 42, 35, 52, 48, 65, 58];
    const dataTarget = [30, 35, 40, 45, 45, 50, 55];

    ctx.clearRect(0, 0, width, canvas.height);

    const padding = 30;
    const chartWidth = width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    const maxVal = 70;

    ctx.strokeStyle = '#F1F5F9';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
        const y = padding + (chartHeight / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }

    ctx.fillStyle = '#94A3B8';
    ctx.font = '11px "Plus Jakarta Sans"';
    ctx.textAlign = 'center';
    const xStep = chartWidth / (days.length - 1);
    days.forEach((day, index) => {
        const x = padding + index * xStep;
        ctx.fillText(day, x, canvas.height - 8);
    });

    const getCoords = (val, index) => ({
        x: padding + index * xStep,
        y: padding + chartHeight - (val / maxVal) * chartHeight
    });

    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    dataTarget.forEach((val, i) => {
        const pt = getCoords(val, i);
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    const revGradient = ctx.createLinearGradient(0, padding, 0, canvas.height - padding);
    revGradient.addColorStop(0, 'rgba(16, 185, 129, 0.22)');
    revGradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

    ctx.beginPath();
    dataRevenue.forEach((val, i) => {
        const pt = getCoords(val, i);
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
    });
    ctx.lineTo(padding + (days.length - 1) * xStep, padding + chartHeight);
    ctx.lineTo(padding, padding + chartHeight);
    ctx.closePath();
    ctx.fillStyle = revGradient;
    ctx.fill();

    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    dataRevenue.forEach((val, i) => {
        const pt = getCoords(val, i);
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
    });
    ctx.stroke();

    dataRevenue.forEach((val, i) => {
        const pt = getCoords(val, i);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.strokeStyle = '#10B981';
        ctx.lineWidth = 2;
        ctx.stroke();
    });
}

// --------------------------------------------------------------------------
// 15. TOAST NOTIFICATIONS
// --------------------------------------------------------------------------
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i data-lucide="${type === 'success' ? 'check-circle' : 'info'}" style="width:16px;height:16px;"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);
    refreshIcons();

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// --------------------------------------------------------------------------
// 16. GLOBAL RESULT POPUP MODAL (FIGMA EXACT MATCH 100%)
// --------------------------------------------------------------------------
function showResultPopup(type = 'success', title = '', message = '', callback = null) {
    let popup = document.getElementById('global-result-popup');
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'global-result-popup';
        popup.className = 'modal-backdrop hidden';
        document.body.appendChild(popup);
    }

    const isSuccess = type === 'success';
    const displayTitle = title || (isSuccess ? 'Xoá thành công' : 'Xoá không thành công');

    const iconHtml = isSuccess 
        ? `<div style="width: 56px; height: 56px; margin: 0 auto 1.25rem auto; display: flex; align-items: center; justify-content: center; color: #16A34A;">
             <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
           </div>`
        : `<div style="width: 56px; height: 56px; margin: 0 auto 1.25rem auto; display: flex; align-items: center; justify-content: center; color: #DC2626;">
             <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="#DC2626" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13" stroke="#FFFFFF" stroke-width="2.5"/><line x1="12" y1="17" x2="12.01" y2="17" stroke="#FFFFFF" stroke-width="2.5"/></svg>
           </div>`;

    const btnBg = isSuccess ? '#22C55E' : '#DC2626';

    popup.innerHTML = `
        <div class="modal-card" style="max-width: 420px; width: 90%; border-radius: 20px; padding: 2.5rem 2.25rem 2rem 2.25rem; text-align: center; background: #FFFFFF; box-shadow: 0 20px 40px rgba(0,0,0,0.15);">
            ${iconHtml}
            <h3 style="font-size: 1.25rem; font-weight: 800; color: #0F172A; margin-bottom: ${message ? '0.4rem' : '1.75rem'}; font-family: 'Plus Jakarta Sans', sans-serif;">${displayTitle}</h3>
            ${message ? `<p style="font-size: 0.875rem; color: #64748B; margin-bottom: 1.75rem;">${message}</p>` : ''}
            <div style="display: flex; justify-content: center; width: 100%;">
                <button type="button" class="btn" id="global-result-popup-btn" style="background-color: ${btnBg}; color: #FFFFFF; padding: 0.65rem 2.25rem; border-radius: 8px; border: none; font-weight: 700; cursor: pointer; min-width: 110px; font-size: 0.9rem; box-shadow: 0 4px 12px ${isSuccess ? 'rgba(34, 197, 94, 0.25)' : 'rgba(220, 38, 38, 0.25)'}">Xong</button>
            </div>
        </div>
    `;

    popup.classList.remove('hidden');
    popup.style.setProperty('display', 'flex', 'important');

    const btn = document.getElementById('global-result-popup-btn');
    btn.onclick = function() {
        popup.classList.add('hidden');
        popup.style.setProperty('display', 'none', 'important');
        if (callback && typeof callback === 'function') callback();
    };
}

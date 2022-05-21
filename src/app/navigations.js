export const navigations = [
    {
        label: '____________________________________',
        type: 'label',
    },
    {
        name: 'Trang chủ',
        path: '/dashboard/default',
        icon: 'account_balance',
    },
    {
        name: 'Quản lý sản phẩm',
        icon: 'import_contacts',
        path: '/products/manage',
    },
    {
        name: 'Quản lý đơn hàng sách',
        icon: 'event_note',
        path: '/orderbook/manage',
    },
    {
        name: 'Quản lý đơn khóa học',
        icon: 'local_library',
        path: '/ordercourse/manage',
    },
    {
        name: 'Quản lý gia sư',
        icon: 'person_pin',
        path: '/users/manage',
    }, 
    {
        name: 'Quản lý người dùng',
        icon: 'people',
        path: '/users/manage',
    }, 
    {
        name: 'Quản lý danh mục',
        icon: 'format_align_left',
        children: [
            {
                name: 'Quản lý loại',
                path: '/material/autocomplete',
                iconText: 'A',
            },
            {
                name: 'Quản lý mục',
                path: '/material/buttons',
                iconText: 'B',
            },
        ],
    },
    // {
    //     name: 'Quản lý khoá học',
    //     icon: 'local_library',
    //     path: '/users/manage',
    // }, 
]

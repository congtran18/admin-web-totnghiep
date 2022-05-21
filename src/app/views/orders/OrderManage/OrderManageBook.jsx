import React, { useEffect, useState } from 'react'
import {
    Grid,
    Divider,
    Card,
    Box,
    Icon,
    Button,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material'
import OrderOverview from './OrderOverview'
import { Link, } from 'react-router-dom'
import { styled } from '@mui/system'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { toast } from "react-toastify";
import { getOrders, getOrderById } from "app/features/orders/orderSlice";
import { SearchBox, AdminLoading } from "app/components"
import { SortByOrder } from "app/components"

const IconButton = styled(Icon)({
    fontSize: '14px',
    marginLeft: '5px',
    // paddingRight: '14px',
    verticalAlign: 'middle',
});

const CustomPagination = styled(Box)({
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
});

const OrderManageBook = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { orders, order, total, isLoading, isError, isSuccess, reload, message } = useSelector(
        (state) => state.order
    );

    const limit = queryString.parse(location.search).limit || 6;
    const queryParams = { ...queryString.parse(location.search), limit, track: false, type: "book" };

    useEffect(() => {
        (async () => {
            try {
                dispatch(getOrders(queryParams));
                // const { order, total } = result.payload;
                // setOrderList(results);
            } catch (error) {
                toast.error(error)
            }

            // setLoading(false);
        })();
    }, [location.search, navigate, isError, reload, dispatch]);

    const handlePageChange = (e, page) => {
        try {
            const path = location.pathname;
            const newParams = { ...queryParams, page };
            const newLocation = {
                pathname: path,
                search: queryString.stringify(newParams),
            };

            navigate(newLocation);
        } catch (error) {
            toast.error(error)
        }
    };


    const handleSort = (id) => {
        try {
            const path = location.pathname;
            let newParams = {};

            if (id) {
                newParams = { ...queryParams, page: 1, sort: id };
            } else {
                const { sort, page, ...rest } = queryParams;
                newParams = rest;
            }

            const newLocation = {
                pathname: path,
                search: queryString.stringify(newParams),
            };

            navigate(newLocation);
        } catch (error) {
            toast.error(error)
        }
    };

    const handleSearch = (value) => {
        try {
            const path = location.pathname;
            let newParams = {};

            if (value.length === 0) {
                const { realname, page, ...rest } = queryParams;
                newParams = rest;
            } else {
                newParams = { ...queryParams, page: 1, realname: value };
            }

            const newLocation = {
                pathname: path,
                search: queryString.stringify(newParams),
            };
            navigate(newLocation);
        } catch (error) {
            toast.error(error)
        }
    };


    let body = null

    if (isLoading) {
        body = (
            <Box sx={{ height: '500px' }}>
                <AdminLoading />
            </Box>
        )
    }
    else if (orders.length === 0) {
        body = (
            <>
                {/* <Card sx='text-center mx-5 my-5'> */}
                <Card sx={{ textAlign: 'center', mx: 5, my: 5 }}>
                    <Box>Không có hóa đơn</Box>
                </Card>

            </>
        )
    } else {
        body = (
            <>
                <Box sx={{ overflow: 'auto' }}>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" sx={{ width: '10%' }} />
                                    <TableCell align="center" sx={{ width: '22%' }}>Mã hóa đơn</TableCell>
                                    <TableCell align="center" sx={{ width: '25%' }}>Người mua</TableCell>
                                    <TableCell align="center" sx={{ width: '10%' }}>Đã vận chuyển</TableCell>
                                    <TableCell align="center" sx={{ width: '22%' }}>Ngày tạo</TableCell>
                                    <TableCell align="center">Thao tác</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {orders.map((order) => (
                                    <OrderOverview key={order._id} type={"manage"} order={order} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

            </>
        )
    }


    return (
        <Box sx={{ m: 3 }}>
            <Grid container spacing={2}>
                <Grid item md={22} xs={12}>
                    {/* <OrderOverview /> */}

                    <Card sx={{ p: 0.5 }}>
                        {/* <Box sx="mb-1 flex justify-between items-center"> */}
                        <Box sx={{
                            display: 'flex',
                            mb: 1,
                            justifyContent: 'between',
                            alignItems: 'center',
                        }}
                        >
                            <h3 sx={{ fontSize: "big" }}>Quản lý hóa đơn sách</h3>
                        </Box>

                        <Divider sx={{ mb: 6 }} />

                        {/* <Box sx="flex mb-5 justify-between items-center h-full"> */}
                        <Box sx={{
                            display: 'flex',
                            mb: 5,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            height: '100%'
                        }}
                        >
                            <Box sx={{ display: 'flex' }}>
                                <SortByOrder
                                    label={"Lọc hóa đơn"} onChange={handleSort} sort={"sort"}
                                />
                                <Button variant="contained" color="success" sx={{ width: '24vh', textAlign: 'center', fontSize: '14px' }} to={'/orderbook/restore'} as={Link}>
                                    Khôi phục
                                    <IconButton>
                                        cloud_download
                                    </IconButton>
                                </Button>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                                <SearchBox onChange={handleSearch} label={"hóa đơn"} />
                            </Box>
                        </Box>

                        <Divider />

                        {body}

                        <Divider sx={{ mt: 4, mb: 4 }} />

                        <CustomPagination>
                            <Pagination
                                page={Number(queryParams.page) || 1}
                                count={Math.ceil(total / limit)}
                                onChange={handlePageChange}
                                showFirstButton
                                showLastButton
                                color="primary"
                            />
                        </CustomPagination>
                    </Card>

                </Grid>
            </Grid>
            {/* <ImagePreview
                openPreview={true}
                setOpenPreview={setShowPreview}
                imgUrl={'https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'}
            /> */}
        </Box>
    )
}

const dummyOrderList = [
    {
        code: 'AT-AT422',
        image: 'https://aoxuanhe.com/upload/order/axh-150/ao-thun-nam-den-cao-cap-dep.jpg',
        cost: 324.0,
        amount: 19999,
        realname: 'Áo thun nam',
        rating: 5,
        category: 'Áo thun',
        type: 'Áo',
        item: 'AT-2488',
    },
    {
        code: 'AT-AT422',
        image: 'https://media3.scdn.vn/img4/2021/05_14/HM4fCbfIZIoEcRg4oNTn.jpg',
        cost: 454.0,
        amount: 15000,
        realname: 'Áo polo nam',
        rating: 4.5,
        category: 'Áo polo',
        type: 'Áo',
        item: 'AP-2800',
    },
    {
        code: 'AT-AT422',
        image: 'https://vn-live-05.slatic.net/p/a64dbf2b8edcbac7425f168f1816696a.jpg_720x720q80.jpg_.webp',
        cost: 454.0,
        amount: 24000,
        realname: 'Áo polo đẹp',
        rating: 4.8,
        category: 'Áo polo',
        type: 'Áo',
        item: 'AP-4800',
    },
    {
        code: 'AT-AT422',
        image: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/345/647/orders/6efd240964ac9cf2c5bd.jpg',
        cost: 454.0,
        amount: 84000,
        realname: 'Quần jean đen',
        rating: 4,
        category: 'Quần jean',
        type: 'Quần',
        item: '2019 6582 2365',
    },
    {
        code: 'AT-AT422',
        image: 'https://salt.tikicdn.com/cache/w444/ts/order/93/45/82/8fa12430783fd326a5634c3d6a2c0273.png',
        cost: 454.0,
        amount: 88888,
        realname: 'Áo bomber chất',
        rating: 4.5,
        category: 'Áo khoác',
        type: 'Áo',
        item: 'AK-1444',
    },
    {
        code: 'AT-AT422',
        image: 'https://benryhomme.com/upload/image/2020/ao-khoac-2020/18-1.jpg',
        cost: 454.0,
        amount: 44444,
        realname: 'Áo khoác jacket',
        rating: 4.8,
        category: 'Áo khoác',
        type: 'Áo',
        item: 'AK-8822',
    },
    {
        code: 'AT-AT422',
        image: 'https://teefit.vn/wp-content/uploads/2018/04/ao-thun-tron-trang.jpg',
        cost: 454.0,
        amount: 42000,
        realname: 'Áo thun trắng',
        rating: 5,
        category: 'Áo thun',
        type: 'Áo',
        item: 'AT-4421',
    },
    {
        code: 'AT-AT422',
        image: 'https://yinxx.vn/wp-content/uploads/2020/08/O1CN01my9BOI1pcXmF4oywA_66695381.jpg',
        cost: 454.0,
        amount: 84000,
        realname: 'Áo thun unisex',
        rating: 4.5,
        category: 'Áo thun',
        type: 'Áo',
        item: 'AT-8822',
    },
]

export default OrderManageBook

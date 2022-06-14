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
    const queryParams = { ...queryString.parse(location.search), limit, track: false, type: "course" };

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
                        <Table sx={{ minWidth: 1000 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" sx={{ width: '20%' }}>Mã hóa đơn</TableCell>
                                    <TableCell align="center" sx={{ width: '26%' }}>Người mua</TableCell>
                                    <TableCell align="center" sx={{ width: '10%' }}>Loại</TableCell>
                                    <TableCell align="center" sx={{ width: '14%' }}>Tổng giá</TableCell>
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
                            <h3 sx={{ fontSize: "big" }}>Quản lý hóa đơn khóa học</h3>
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
                                    label={"Sắp xếp hóa đơn"} onChange={handleSort} sort={"sort"}
                                />
                                <Button variant="contained" color="success" sx={{ width: '24vh', textAlign: 'center', fontSize: '14px' }} to={'/ordercourse/restore'} as={Link}>
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

export default OrderManageBook

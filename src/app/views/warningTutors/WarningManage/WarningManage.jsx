import React, { useEffect, useState } from 'react'
import {
    Grid,
    Divider,
    Card,
    Box,
    Icon,
    Button,
    Pagination,
} from '@mui/material'
import WarningOverview from './WarningOverview'
import { Link, } from 'react-router-dom'
import { styled } from '@mui/system'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { toast } from "react-toastify";
import { getWarnings, getWarningById } from "app/features/warningTutors/warningTutorSlice";
import { SearchBox, AdminLoading } from "app/components"
import { SortByWarning } from "app/components"

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

const WarningManage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { warnings, warning, total, isLoading, isError, isSuccess, reload, message } = useSelector(
        (state) => state.warningTutor
    );

    const limit = queryString.parse(location.search).limit || 6;
    const queryParams = { ...queryString.parse(location.search), limit };

    useEffect(() => {
        (async () => {
            try {
                dispatch(getWarnings(queryParams));
                // const { warning, total } = result.payload;
                // setWarningList(results);
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
                const { email, page, ...rest } = queryParams;
                newParams = rest;
            } else {
                newParams = { ...queryParams, page: 1, email: value };
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
    else if (warnings.length === 0) {
        body = (
            <>
                {/* <Card sx='text-center mx-5 my-5'> */}
                <Card sx={{ textAlign: 'center', mx: 5, my: 5 }}>
                    <Box>Không có đơn tố cáo</Box>
                </Card>

            </>
        )
    } else {
        body = (
            <>
                <Divider />
                {warnings.map(warning => (
                    <>
                        <Box sx={{ py: 4 }}>
                            <Grid container alignItems="center">
                                <WarningOverview warning={warning} />
                                <Grid
                                    item
                                    lg={2}
                                    md={2}
                                    sm={2}
                                    xs={2}
                                    sx={{ textAlign: 'center' }}
                                >
                                    <Button
                                        sx={{
                                            marginTop: '5px',
                                            "&:hover": {
                                                backgroundColor: 'rgb(104, 98, 98)',
                                            }
                                        }}
                                        to={`/updatewarning/${warning._id}`}
                                        as={Link}
                                    ><img src='https://cdn4.iconfinder.com/data/icons/buno-info-signs/32/__edit_new_compose-256.png' alt='edit' width='24' height='24' /></Button>
                                    <Button
                                        sx={{
                                            marginBottom: '15px',
                                            "&:hover": {
                                                backgroundColor: 'rgb(104, 98, 98)',
                                            }
                                        }}
                                    // onClick={handleOpenConfirm.bind(this, warning._id, warning.code, 1)}
                                    ><img src="https://cdn0.iconfinder.com/data/icons/ui-essence/32/_18ui-128.png" alt='delete' width='24' height='24' /></Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </>

                ))}

                <Divider sx={{ mt: 4, mb: 4 }} />

            </>
        )
    }


    return (
        <Box sx={{ m: 3 }}>
            <Grid container spacing={2}>
                <Grid item md={22} xs={12}>
                    {/* <WarningOverview /> */}

                    <Card sx={{ p: 0.5 }}>
                        {/* <Box sx="mb-1 flex justify-between items-center"> */}
                        <Box sx={{
                            display: 'flex',
                            mb: 1,
                            justifyContent: 'between',
                            alignItems: 'center',
                        }}
                        >
                            <h3 sx={{ fontSize: "medium" }}>Quản lí đơn tố cáo</h3>
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
                                <SortByWarning
                                    label={"Lọc tố cáo"} onChange={handleSort} sort={"sort"}
                                />
                                <Button variant="contained" color="success" sx={{ width: '24vh', textAlign: 'center', fontSize: '14px' }} to={'/warnings/restore'} as={Link}>
                                    Khôi phục
                                    <IconButton>
                                        cloud_download
                                    </IconButton>
                                </Button>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                                <SearchBox onChange={handleSearch} label={"Đơn tố cáo"} />
                            </Box>
                        </Box>

                        <Box sx={{ overflow: 'auto' }}>
                            <Box sx={{ minWidth: 600 }}>
                                <Box sx={{ py: 0 }}>
                                    <Grid container>
                                        <Grid
                                            item
                                            lg={3}
                                            md={3}
                                            sm={3}
                                            xs={3}
                                            sx={{ textAlign: 'center' }}
                                        >
                                            <Box sx={{ m: 0, fontWeight: 500 }}>Tên gia sư</Box>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={3}
                                            md={3}
                                            sm={3}
                                            xs={3}
                                            sx={{ textAlign: 'center' }}
                                        >
                                            <Box sx={{ m: 0, fontWeight: 500 }}>Người tố cáo</Box>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={1}
                                            md={1}
                                            sm={1}
                                            xs={1}
                                            sx={{ textAlign: 'center' }}
                                        >
                                            <Box sx={{ m: 0, fontWeight: 500 }}>Chấp nhận</Box>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={3}
                                            md={3}
                                            sm={3}
                                            xs={3}
                                            sx={{ textAlign: 'center' }}
                                        >
                                            <Box sx={{ m: 0, fontWeight: 500 }}>Ngày tạo</Box>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={2}
                                            md={2}
                                            sm={2}
                                            xs={2}
                                            sx={{ textAlign: 'center' }}
                                        >
                                            <Box sx={{ m: 0, fontWeight: 500 }}>Thao tác</Box>
                                        </Grid>
                                    </Grid>
                                </Box>

                                {body}
                            </Box>
                        </Box>

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

export default WarningManage

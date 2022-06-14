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
import TutorOverview from './TutorOverview'
import { styled } from '@mui/system'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import queryString from 'query-string';
import { toast } from "react-toastify";
import { getTutors, getTutorById } from "app/features/tutors/tutorSlice";
import { SearchBox, AdminLoading, SortByTutor } from "app/components"

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

const TutorRegister = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { tutors, tutor, total, isLoading, isError, isSuccess, reload, message } = useSelector(
        (state) => state.tutor
    );

    const limit = queryString.parse(location.search).limit || 6;
    const queryParams = { ...queryString.parse(location.search), limit, accept: false };

    useEffect(() => {
        (async () => {
            try {
                dispatch(getTutors(queryParams));
                // const { user, total } = result.payload;
                // setUserList(results);
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
    else if (tutors.length === 0) {
        body = (
            <>
                {/* <Card sx='text-center mx-5 my-5'> */}
                <Card sx={{ textAlign: 'center', mx: 5, my: 5 }}>
                    <Box>Danh sách trống</Box>
                </Card>

            </>
        )
    } else {
        body = (
            <>
                <Divider />
                {tutors.map(tutor => (
                    <>
                        <Box sx={{ py: 4 }}>
                            <Grid container alignItems="center">
                                <TutorOverview tutor={tutor} />
                                <Grid
                                    item
                                    lg={1}
                                    md={1}
                                    sm={1}
                                    xs={1}
                                    sx={{ textAlign: 'center' }}
                                >
                                    <Button
                                        sx={{
                                            "&:hover": {
                                                backgroundColor: 'rgb(104, 98, 98)',
                                            }
                                        }}
                                        to={`/updatetutor/${tutor.uid}`}
                                        as={Link}
                                    // onClick={handleOpenUpdateModel.bind(this, user._id)}
                                    ><img src='https://cdn4.iconfinder.com/data/icons/buno-info-signs/32/__edit_new_compose-256.png' alt='edit' width='24' height='24' /></Button>
                                    <Button
                                        sx={{
                                            "&:hover": {
                                                backgroundColor: 'rgb(104, 98, 98)',
                                            }
                                        }}
                                    // onClick={handleOpenConfirm.bind(this, user._id, user.code, 1)}
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
                    {/* <UserOverview /> */}

                    <Card sx={{ p: 0.5 }}>
                        {/* <Box sx="mb-1 flex justify-between items-center"> */}
                        <Box sx={{
                            display: 'flex',
                            mb: 1,
                            justifyContent: 'between',
                            alignItems: 'center',
                        }}
                        >
                            <h4 sx={{ fontSize: "medium" }}>Quản lý gia sư</h4>
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
                                <SortByTutor
                                    label={"Lọc gia sư"} onChange={handleSort} sort={"sort"}
                                />
                                <Button variant="contained" color="success" sx={{ width: '24vh', textAlign: 'center', fontSize: '14px' }} to={'/users/manage'} as={Link}>
                                    Quản lí
                                    <IconButton>
                                        bookmark
                                    </IconButton>
                                </Button>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                                <SearchBox onChange={handleSearch} label={"gia sư"} />
                            </Box>
                        </Box>

                        <Box sx={{ overflow: 'auto' }}>
                            <Box sx={{ minWidth: 600 }}>
                                <Box sx={{ py: 0 }}>
                                    <Grid container>
                                        <Grid item lg={2} md={2} sm={2} xs={2}>
                                            <Box sx={{ m: 0, fontWeight: 500 }}>
                                                Ảnh minh họa
                                            </Box>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={3}
                                            md={3}
                                            sm={3}
                                            xs={3}
                                            sx={{ textAlign: 'center' }}
                                        >
                                            <Box sx={{ m: 0, fontWeight: 500 }}>Email</Box>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={2}
                                            md={2}
                                            sm={2}
                                            xs={2}
                                            sx={{ textAlign: 'center' }}
                                        >
                                            <Box sx={{ m: 0, fontWeight: 500 }}>Số điện thoại</Box>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={2}
                                            md={2}
                                            sm={2}
                                            xs={2}
                                            sx={{ textAlign: 'center' }}
                                        >
                                            <Box sx={{ m: 0, fontWeight: 500 }}>Được chấp nhận</Box>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={2}
                                            md={2}
                                            sm={2}
                                            xs={2}
                                            sx={{ textAlign: 'center' }}
                                        >
                                            <Box sx={{ m: 0, fontWeight: 500 }}>Ngày đăng kí</Box>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={1}
                                            md={1}
                                            sm={1}
                                            xs={1}
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
                                count={total}
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

export default TutorRegister

import React, { useEffect, useState } from 'react'
import {
    Grid,
    Divider,
    Card,
    Box,
    TextField,
    Icon,
    Button,
    Pagination,
} from '@mui/material'
import ProductOverview from './ProductOverview'
import Autocomplete from '@mui/material/Autocomplete';
import { AdminLoading } from 'app/components'
import { Link, } from 'react-router-dom'
import { styled } from '@mui/system'
import AddProductModal from './AddProductModal'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { toast } from "react-toastify";
import { getProducts, resetProduct } from "app/features/products/productSlice";

const IconButton = styled(Icon)({
    fontSize: '14px',
    marginLeft: '5px',
    // paddingRight: '14px',
    verticalAlign: 'middle',
});

const TypeButton = styled(Button)({
    textAlign: 'center',
    fontSize: '14px'
});

const CustomPagination = styled(Box)({
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
});

const ProductManage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { products, total, isLoading, isError, message } = useSelector(
        (state) => state.product
    );

    const limit = queryString.parse(location.search).limit || 6;
    const queryParams = { ...queryString.parse(location.search), limit };
    const [openPopup, setOpenPopup] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                console.log("useEffectuseEffect")
                dispatch(getProducts(queryParams));
                // const { product, total } = result.payload;
                // setProductList(results);
            } catch (error) {
                toast.error(error)
            }

            // setLoading(false);
        })();
    }, [location.search, navigate, isError, dispatch]);

    const handlePageChange = (e, page) => {
        try {
            const path = location.pathname;
            const newParams = { ...queryParams, page };
            const newLocation = {
                pathname: path,
                search: queryString.stringify(newParams),
            };

            console.log(newLocation)

            navigate(newLocation);
        } catch (error) {
            toast.error(error)
        }
    };

    const handleTypeSort = (id) => {
        try {
            const path = location.pathname;
            let newParams = {};
            if (id) {
                const temp = { ...queryParams, type: id };
                const { category, page, ...rest } = temp;
                newParams = rest;
            } else {
                const { type, page, category, ...rest } = queryParams;
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

    const handleCategorySort = (id) => {
        try {
            const path = location.pathname;
            let newParams = {};
            if (id) {
                newParams = { ...queryParams, page: 1, category: id };
            } else {
                const { category, page, ...rest } = queryParams;
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


    let body = null

    if (isLoading) {
        body = (
            <Box>
                <AdminLoading />
            </Box>
        )
    }
    else if (products.length === 0) {
        body = (
            <>
                {/* <Card sx='text-center mx-5 my-5'> */}
                <Card sx={{ textAlign: 'center', mx: 5, my: 5 }}>
                        <Box>Không có sản phẩm</Box>
                </Card>

            </>
        )
    } else {
        body = (
            <>
                <Divider />
                { products && products.map(product => (
                    <>
                        <Box sx={{ py: 4 }}>
                            <Grid container alignItems="center">
                                <ProductOverview product={product} />
                                <Grid
                                    item
                                    lg={2}
                                    md={2}
                                    sm={2}
                                    xs={2}
                                    sx={{ textAlign: 'center' }}
                                >
                                    <Button
                                    // sx='post-button'
                                    // to={`/updateproduct/${product._id}`}
                                    // as={Link}
                                    ><img src='https://cdn0.iconfinder.com/data/icons/ui-essence/32/_8ui-128.png' alt='edit' width='24' height='24' /></Button>
                                    <Button
                                    // sx='post-button'
                                    // onClick={deletProductById.bind(this, product._id)}
                                    ><img src="https://cdn0.iconfinder.com/data/icons/ui-essence/32/_18ui-128.png" alt='delete' width='24' height='24' /></Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </>

                ))}

                <Divider sx={{ mt: 4, mb: 6 }} />

            </>
        )
    }


    return (
        <Box sx={{ m: 3 }}>
            <Grid container spacing={2}>
                <Grid item md={22} xs={12}>
                    {/* <ProductOverview /> */}

                    <Card sx={{ p: 0.5 }}>
                        {/* <Box sx="mb-1 flex justify-between items-center"> */}
                        <Box sx={{
                            display: 'flex',
                            mb: 1,
                            justifyContent: 'between',
                            alignItems: 'center',
                        }}
                        >
                            <h4 sx={{ fontSize: "medium" }}>Quản lý sản phẩm</h4>
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
                                <Autocomplete
                                    options={[{ realname: "Tất cả", _id: "" }, ...[]]}
                                    getOptionLabel={(option) => option.realname}
                                    sx={{ width: '12rem', mr: '2rem' }}
                                    // onChange={}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Thể loại"
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                        />
                                    )
                                    }
                                />
                                <Autocomplete
                                    options={[{ realname: "Tất cả", _id: "" }, ...[]]}
                                    getOptionLabel={(option) => option.realname}
                                    sx={{ width: '12rem' }}
                                    // onChange={}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Kiểu"
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                        />
                                    )
                                    }
                                />
                                <Button variant="contained" color="success" sx={{ ml: '5%', width: '24vh', textAlign: 'center', fontSize: '14px' }} to={'/products/restore'} as={Link}>
                                    Khôi phục
                                    <IconButton>
                                        cloud_download
                                    </IconButton>
                                </Button>
                                <Button variant="contained" color="success" sx={{ ml: '5%', width: '18vh', textAlign: 'center', fontSize: '14px' }} onClick={() => {
                                    setOpenPopup(true);
                                }}>
                                    Thêm
                                    <IconButton>
                                        control_point
                                    </IconButton>
                                </Button>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    placeholder="Tìm kiếm sản phẩm..."
                                    sx={{ width: '20rem' }}
                                    // onChange={({ target }) => setTimeout(() => {
                                    //     setSearch(target.value)
                                    // }, 500)}


                                    InputProps={{
                                        startAdornment: (
                                            <Icon sx={{ mr: 3, fontSize: "small" }}>
                                                search
                                            </Icon>
                                        ),
                                    }}
                                />
                            </Box>
                        </Box>

                        <Box sx={{ overflow: 'auto' }}>
                            <Box sx={{ minWidth: 600 }}>
                                <Box sx={{ py: 0 }}>
                                    <Grid container>
                                        <Grid item lg={4} md={4} sm={4} xs={4}>
                                            <Box sx={{ m: 0, fontWeight: 500 }}>
                                                Chi tiết sản phẩm
                                            </Box>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={2}
                                            md={2}
                                            sm={2}
                                            xs={2}
                                            sx={{ textAlign: 'center' }}
                                        >
                                            <Box sx={{ m: 0, fontWeight: 500 }}>Phân loại</Box>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={2}
                                            md={2}
                                            sm={2}
                                            xs={2}
                                            sx={{ textAlign: 'center' }}
                                        >
                                            <Box sx={{ m: 0, fontWeight: 500 }}>Giá</Box>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={2}
                                            md={2}
                                            sm={2}
                                            xs={2}
                                            sx={{ textAlign: 'center' }}
                                        >
                                            <Box sx={{ m: 0, fontWeight: 500 }}>rating sao</Box>
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
                        count={total}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </CustomPagination>
                    </Card>

                </Grid>
            </Grid>
            <AddProductModal
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            />
        </Box>
    )
}

const dummyProductList = [
    {
        code: 'AT-AT422',
        image: 'https://aoxuanhe.com/upload/product/axh-150/ao-thun-nam-den-cao-cap-dep.jpg',
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
        image: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/345/647/products/6efd240964ac9cf2c5bd.jpg',
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
        image: 'https://salt.tikicdn.com/cache/w444/ts/product/93/45/82/8fa12430783fd326a5634c3d6a2c0273.png',
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

export default ProductManage

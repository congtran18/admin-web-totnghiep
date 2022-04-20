import React, { useState, useEffect } from 'react'
import {
    Grid,
    Box,
    Icon,
    Button,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    InputLabel,
    CircularProgress,
    DialogTitle
} from '@mui/material'
import { InputField, SelectField, UploadField, MultipleSelectField } from 'app/components'
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { getTypes, resetAllType } from "app/features/types/typeSlice";
import { saveImage } from "app/features/storage/storageSlice";
import { getProducts, createProduct, resetProduct } from "app/features/products/productSlice";
import { toast } from "react-toastify";


const supportedImageFormat = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const listStatus = [
    { 'realname': 'Mới', '_id': 'Mới' },
    { 'realname': 'Nổi bật', '_id': 'Nổi bật' },
    { 'realname': 'Bán chạy', '_id': 'Bán chạy' },
    { 'realname': 'Bình thường', '_id': 'Bình thường' }
]

const schema = yup.object().shape({
    realname: yup
        .string()
        .required('Cần nhập tên sản phẩm')
        .test('checkName', 'Tên cần lớn hơn 3 ký tự và nhỏ hơn 50 ký tự', (value) => value.trim().length >= 3 && value.trim().length <= 50),
    type: yup.string().required('Cần có loại sản phẩm'),
    category: yup.string().required('Cần có danh mục sản phẩm'),
    cost: yup
        .number('Chỉ được nhập số')
        .required('Cần nhập giá sản phẩm')
        .min(1000, 'Giá tiền cần lớn hơn 1.000 đ')
        .max(10000000000, 'Giá tiền quá giới hạn'),
    description: yup.string()
        .required('Cần có mô tả sản phẩm')
        .test('checkDescription', 'Miêu tả cần nhỏ hơn 100 ký tự', (value) => value.trim().length > 0 && value.trim().length <= 100),
    status: yup.string().required('Cần có trạng thái sản phẩm'),
    include: yup.array()
        .required('Cần có trạng thái sản phẩm').nullable(),
    mainImage: yup
        .mixed()
        .required('Cần thêm ảnh đại diện')
        .test('fileType', 'Chỉ chấp nhập file image', (value) => value && value[0] && supportedImageFormat.includes(value[0].type)),
});

const AddProductModal = ({ openPopup, setOpenPopup }) => {

    const [categories, setCategories] = useState([]);

    const dispatch = useDispatch();

    const { types, isLoading, isError, message } = useSelector(
        (state) => state.type
    );

    const defaultValues = {
        realname: '',
        type: '',
        category: '',
        cost: 0,
        description: '',
        status: '',
        mainImage: null,
    };

    useEffect(() => {
        if (isError) {
            toast.error("Kiểm tra lại danh sách types");
        }

        dispatch(getTypes());

        return () => {
            dispatch(resetAllType());
        };
    }, [isError, message, dispatch]);

    const {
        control,
        register,
        watch,
        setValue,
        reset,
        formState: { errors, isSubmitting },
        handleSubmit,
    } = useForm({
        defaultValues,
        resolver: yupResolver(schema),
    });

    const formCoverImageValue = watch('mainImage');

    const onTypeSelectChange = (id) => {
        const selectedCategory = 0;

        if (!id) {
            setCategories([]);
            setValue('category', '');
        } else {
            setValue('category', '');
            setCategories(
                [...types].filter((x) => x._id === id).map((x) => x.categoryProduct)[
                selectedCategory
                ]
            );
        }
    };

    const onHandleSubmit = async (data) => {
        try {
            const saveData = { ...data };
            saveData.realname = data.realname.trim();
            saveData.description = data.description.trim();

            var imageData = new FormData();

            imageData.append("file", data.mainImage[0]);

            let dataImage = await dispatch(saveImage(imageData));

            dataImage = dataImage.payload

            saveData.mainImage = dataImage

            await dispatch(createProduct(saveData));

            await dispatch(resetProduct());

        } catch (error) {
            toast.error(error)
        }
        reset(defaultValues);
        closePopup();
    };

    const closePopup = async () => {
        setOpenPopup(false)
        setCategories([]);
        setValue('category', '');
        reset(defaultValues);
    }

    return (
        <>
            <Dialog open={openPopup} maxWidth="md" fullWidth="md">
                <DialogTitle>
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Thêm sản phẩm
                        </Typography>
                        <Button
                            color="secondary"
                            onClick={closePopup}>
                            <Icon>
                                close
                            </Icon>
                        </Button>
                    </Box>
                </DialogTitle>
                {isLoading ? <CircularProgress />
                    : <DialogContent dividers>
                        <form onSubmit={handleSubmit(onHandleSubmit)}>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <InputField
                                        control={control}
                                        errors={errors}
                                        name="realname"
                                        label="Tên sản phẩm"
                                        type="text"
                                    />
                                    <InputField
                                        control={control}
                                        errors={errors}
                                        name="cost"
                                        label="Giá tiền"
                                        type="number"
                                    />
                                    <SelectField
                                        control={control}
                                        errors={errors}
                                        name="status"
                                        label="Trạng thái sản phẩm"
                                        values={listStatus}
                                        disable={false}
                                    />
                                    <MultipleSelectField
                                        control={control}
                                        errors={errors}
                                        name="include"
                                        label="Bao gồm"
                                        include={[]}
                                    />
                                    <InputField
                                        control={control}
                                        errors={errors}
                                        name="description"
                                        label="Miêu tả"
                                        type="text"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <SelectField
                                        control={control}
                                        errors={errors}
                                        name="type"
                                        label="Loại sản phẩm"
                                        values={types}
                                        onChange={onTypeSelectChange}
                                        disable={false}
                                    />
                                    <SelectField
                                        control={control}
                                        errors={errors}
                                        name="category"
                                        label="Danh mục sản phẩm"
                                        values={categories}
                                        disable={categories.length === 0}
                                    />
                                    <InputLabel sx ={{ mb : '10px'}}>Thêm ảnh chính</InputLabel>
                                    <UploadField control={control} register={register} errors={errors} name="mainImage" value={formCoverImageValue} />
                                </Grid>
                            </Grid>
                            <DialogActions>
                                <Button
                                    variant="contained"
                                    onClick={closePopup}
                                    color="primary"
                                >
                                    Quay lại
                                </Button>
                                <Button
                                    variant="contained"
                                    disabled={isSubmitting}
                                    color="error"
                                    type="submit"
                                // startIcon={isSubmitting && <CircularProgress size={20} />}
                                >
                                    Tạo sản phẩm
                                </Button>
                            </DialogActions>
                        </form>
                    </DialogContent>}
            </Dialog>
        </>
    )
}

export default AddProductModal








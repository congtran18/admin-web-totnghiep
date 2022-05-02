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
    DialogTitle
} from '@mui/material'
import { InputField, SelectField, UploadField, MultipleSelectField, AdminLoading } from 'app/components'
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { saveImage } from "app/features/storage/storageSlice";
import { updateProduct, resetProduct } from "app/features/products/productSlice";
import { toast } from "react-toastify";


const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const listStatus = [
    { 'realname': 'Mới', '_id': 'Mới' },
    { 'realname': 'Nổi bật', '_id': 'Nổi bật' },
    { 'realname': 'Bán chạy', '_id': 'Bán chạy' },
    { 'realname': 'Bình thường', '_id': 'Bình thường' }
]

const isFile = input => 'File' in window && input instanceof File;

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
        .nullable()
        .notRequired()
        .test('fileType', 'Chỉ chấp nhận file image', (value) => {
            if (value && isFile(value[0])) {
                return SUPPORTED_FORMATS.includes(value[0].type);
            }

            return true;
        }),
    slideImage: yup
        .array()
        .nullable()
        .notRequired()
        .of(
            yup.object().shape({
                index: yup.number(),
                data: yup
                    .mixed()
                    .notRequired()
                    .test('fileTypeArr', 'Chỉ chấp nhận file image', (value) => {
                        if (value && isFile(value[0])) {
                            return SUPPORTED_FORMATS.includes(value[0].type);
                        }

                        return true;
                    }),
            }),
        ),
});

const UpdateProductModal = ({ openPopup, setOpenPopup, productData }) => {

    const [categories, setCategories] = useState([]);

    const dispatch = useDispatch();

    const NumberOfSlide = 4

    const { types, isLoading, isError, message } = useSelector(
        (state) => state.type
    );

    const {
        _id,
        realname,
        type: { _id: productType },
        category: { _id: productCategory },
        cost,
        description,
        status,
        include,
        mainImage,
        slideImage,
    } = productData;


    const listImage = [...Array(NumberOfSlide)].map((x, index) => ({
        index: index,
        data: '',
    }));

    const slideIndex = slideImage.map((x) => x.index);

    const renderedSlideImage = listImage.map((x) => {
        const indexImage = slideIndex.indexOf(x.index);
        const result = indexImage > -1 ? { ...x, data: slideImage[indexImage].data } : x;
        return result;
    });

    const defaultValues = {
        _id,
        realname,
        type: productType,
        category: productCategory,
        cost,
        description,
        status,
        include,
        mainImage,
        slideImage
    };

    useEffect(() => {
        const newCategory = [...types]
            .filter((x) => x._id === productType)
            .map((x) => x.categoryProduct)[0];

        setCategories(newCategory);
    }, []);

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

    const formMainImageValue = watch('mainImage');
    const formSlideImageValue = watch('slideImage');

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

            //Xu li main image
            if (isFile(data.mainImage[0])) {
                let imageData = new FormData();
                imageData.append("file", data.mainImage[0]);

                let dataMainImage = await dispatch(saveImage(imageData));
                dataMainImage = dataMainImage.payload
                saveData.mainImage = dataMainImage
            }

            //Xu li slide image
            let dataImage = []
            for (let i = 0; i < data.slideImage.length; i++) {
                if (data.slideImage[i].data && isFile(data.slideImage[i].data[0])) {
                    let imageData = new FormData();
                    imageData.append("file", data.slideImage[i].data[0]);
                    let UpdateImage = await dispatch(saveImage(imageData));
                    dataImage = [...dataImage, { data: UpdateImage.payload, index: i }]
                }
                if(data.slideImage[i].data && data.slideImage[i].data === "delete"){
                    dataImage = [...dataImage, { data: "delete", index: i }]
                }
            }

            saveData.slideImage = dataImage
            await dispatch(updateProduct(saveData));

            dispatch(resetProduct());

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
                            Cập nhật sản phẩm
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
                {isLoading ?
                    <Box sx={{ height: '500px' }}>
                        <AdminLoading />
                    </Box>

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
                                        include={include}
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
                                    <InputLabel sx={{ mb: '5px' }} >Thêm ảnh chính</InputLabel>
                                    <UploadField control={control} register={register} errors={errors} name="mainImage" value={formMainImageValue} imageSource={mainImage} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid>
                                        <InputLabel>Thêm slide ảnh</InputLabel>
                                        <br />
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                            {listImage.map((x, index) => {
                                                return (
                                                    <Grid item xs={3} key={index}>
                                                        <UploadField
                                                            control={control}
                                                            register={register}
                                                            errors={errors}
                                                            setValue = {setValue}
                                                            reset = {reset}
                                                            index = {index}
                                                            value={formSlideImageValue[index] ? formSlideImageValue[index].data : null}
                                                            name={`slideImage.${x.index}.data`}
                                                            imageSource={renderedSlideImage.length > 0
                                                                && renderedSlideImage[index]
                                                                ? renderedSlideImage[index].data
                                                                : null}
                                                        />
                                                    </Grid>)
                                                // };
                                            }
                                            )}
                                        </Box>
                                    </Grid>
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
                                >
                                    Cập nhật sản phẩm
                                </Button>
                            </DialogActions>
                        </form>
                    </DialogContent>}
            </Dialog>
        </>
    )
}

export default UpdateProductModal








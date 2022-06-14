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
import { SelectField } from 'app/components'
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { updateTimeUser } from "app/features/users/userSlice";
import { toast } from "react-toastify";


const listMonths = [
    { 'realname': '1 tháng', '_id': '30' },
    { 'realname': '3 tháng', '_id': '90' },
    { 'realname': '6 tháng', '_id': '180' },
]

const listMinutes = [
    { 'realname': '30 giây', '_id': '30000' },
    { 'realname': '50 giây', '_id': '50000' },
    { 'realname': '100 giây', '_id': '100000' },
]

const schema = yup.object().shape({
    daysleft: yup.string().required('Cần chọn số tháng'),
    minutes: yup.string().required('Cần chọn số phút'),
});

const UpdateMinutesModal = ({ openPopup, setOpenPopup, idUser }) => {

    const dispatch = useDispatch();


    const defaultValues = {
        daysleft: '',
        minutes: '',
    };

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

    const onHandleSubmit = async (data) => {
        try {
            await dispatch(updateTimeUser({ ...data, id: idUser }))
        } catch (error) {
            toast.error(error)
        }
        reset(defaultValues);
        closePopup();
    };

    const closePopup = async () => {
        setOpenPopup(false)
        reset(defaultValues);
    }

    return (
        <>
            <Dialog open={openPopup} maxWidth="xs" fullWidth="xs">
                <DialogTitle>
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Cập nhật thời gian học
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
                {<DialogContent dividers>
                    <form onSubmit={handleSubmit(onHandleSubmit)}>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <SelectField
                                    control={control}
                                    errors={errors}
                                    name="daysleft"
                                    label="Cộng tháng"
                                    values={listMonths}
                                    disable={false}
                                />
                                <SelectField
                                    control={control}
                                    errors={errors}
                                    name="minutes"
                                    label="Cộng phút"
                                    values={listMinutes}
                                    disable={false}
                                />
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
                                Cập nhật thời gian học
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>}
            </Dialog>
        </>
    )
}

export default UpdateMinutesModal








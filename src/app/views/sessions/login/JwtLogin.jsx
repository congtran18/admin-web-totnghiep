import {
    Card,
    Grid,
    Button,
    CircularProgress,
} from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, styled, useTheme } from '@mui/system'
import {  Span } from 'app/components/Typography'
import { InputField } from 'app/components'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from 'yup';
import { login, resetAll } from "app/features/auth/authSlice";

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}))

const ContentBox = styled(Box)(() => ({
    height: '100%',
    padding: '32px',
    position: 'relative',
    background: 'rgba(0, 0, 0, 0.01)',
}))

const IMG = styled('img')(() => ({
    width: '100%',
}))

const JWTRoot = styled(JustifyBox)(() => ({
    backgroundImage: `url(${"https://cutewallpaper.org/21/website-wallpaper/Image-for-Game-Developer-Office-Wallpaper-Desktop-in-2019-.jpg"})`,
    minHeight: '100% !important',
    '& .card': {
        maxWidth: 800,
        borderRadius: 12,
        margin: '1rem',
            opacity: 0.7,
    },
}))

const StyledProgress = styled(CircularProgress)(() => ({
    position: 'absolute',
    top: '6px',
    left: '25px',
}))


const schema = yup.object().shape({
    email: yup
        .string()
        .email("Định dạng email")
        .required('Nhập tên đăng nhập')
        .test('checkName', 'Tên cần lớn hơn 3 ký tự và nhỏ hơn 50 ký tự', (value) => value.trim().length >= 3 && value.trim().length <= 50),
    password: yup
        .string()
        .required('Nhập mật khẩu')
        .test('checkName', 'Tên cần lớn hơn 3 ký tự và nhỏ hơn 50 ký tự', (value) => value.trim().length >= 3 && value.trim().length <= 50),
});

const JwtLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error("Kiểm tra lại thông tin đăng nhập");
        }

        if (user) {
            navigate("/products/manage");
        }

        dispatch(resetAll());
    }, [user, isError, isSuccess, message, navigate, dispatch]);


    const defaultValues = {
        email: '',
        password: '',
    };

    const {
        control,
        formState: { errors, isSubmitting },
        handleSubmit,
    } = useForm({
        defaultValues,
        resolver: yupResolver(schema),
    });

    const { palette } = useTheme()
    const textPrimary = palette.primary.main

    const onHandleSubmit = async (data) => {
        // console.log(data)
        // toast.success("ok nhe")
        dispatch(login(data));
        // navigate('/dashboard/default')
    };

    return (
        <JWTRoot>
            <Card className="card">
                <Grid container>
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                        <JustifyBox p={4} height="100%">
                            <IMG
                                src="/assets/images/illustrations/admin4.jpg"
                                alt=""
                            />
                        </JustifyBox>
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                        <form onSubmit={handleSubmit(onHandleSubmit)}>
                            <ContentBox>
                                <InputField
                                    control={control}
                                    errors={errors}
                                    name="email"
                                    label="email"
                                    type="text"
                                />
                                <InputField
                                    control={control}
                                    errors={errors}
                                    name="password"
                                    label="Password"
                                    type="text"
                                />
                                <br />
                                <br />
                                <FlexBox mb={2} flexWrap="wrap">
                                    <Box position="relative">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={isSubmitting}
                                            type="submit"
                                        >
                                            Đăng nhập
                                        </Button>
                                        {isLoading && (
                                            <StyledProgress
                                                size={24}
                                                className="buttonProgress"
                                            />
                                        )}
                                    </Box>
                                    {/* <Span sx={{ mr: 1, ml: '20px' }}>or</Span>
                                    <Button
                                        sx={{ textTransform: 'capitalize' }}
                                        onClick={() =>
                                            navigate('/session/signup')
                                        }
                                    >
                                        Sign up
                                    </Button> */}
                                </FlexBox>
                                {/* <Button
                                    sx={{ color: textPrimary }}
                                    onClick={() =>
                                        navigate('/session/forgot-password')
                                    }
                                >
                                    Forgot password?
                                </Button> */}
                            </ContentBox>
                        </form>
                    </Grid>
                </Grid>
            </Card>
        </JWTRoot>
    )
}

export default JwtLogin

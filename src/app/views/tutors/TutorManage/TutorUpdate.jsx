import React, { useState, useEffect } from 'react'
import {
    Grid,
    Box,
    Divider,
    Button,
    Card,
} from '@mui/material'
import { styled } from '@mui/system'
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom'
import { acceptTutor, resetTutor, getTutorById } from "app/features/tutors/tutorSlice";
import { toast } from "react-toastify";
import { AdminLoading } from "app/components"
import ReactPlayer from 'react-player'
import { AiOutlineFileText } from "react-icons/ai";
import moment from 'moment'
import Rating from '@mui/material/Rating';
import AttachmentIcon from '@mui/icons-material/Attachment';
import StarIcon from '@mui/icons-material/Star';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const TextMute = styled('span')(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: '15px',
}))

const Text = styled('span')(({ theme }) => ({
    fontWeight: 400,
    fontSize: '14px',
}))

const TutorUpdate = () => {
    const { tutorid } = useParams()
    const navigate = useNavigate();

    const { tutor, isLoading, isError, isSuccess, reload, message } = useSelector(
        (state) => state.tutor
    );

    console.log("tutor",tutor)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTutorById(tutorid))
    }, [tutorid]);

    const handleUpdateTutor = async () => {
        await dispatch(acceptTutor(tutorid))

        if (!tutor.accept) {
            navigate("/tutors/manage");
        }else{
            navigate("/tutors/register");
        }
    }

    const goBack = () => {
        if (tutor.accept) {
            navigate("/tutors/manage");
        }else{
            navigate("/tutors/register");
        }
    }

    let body = null

    if (isLoading) {
        body = (
            <Box sx={{ height: '500px' }}>
                <AdminLoading />
            </Box>
        )
    } else if (tutor) {
        body = (
            <>
                <Grid container spacing={4} sx={{ px: 4, mb: 4 }}>
                    <Grid item xs={6}>
                        <ReactPlayer
                            url={tutor.videoUrl}
                            playing={true}
                            controls={true}
                            width={470}
                            height={300}
                        />
                        <Box sx={{ border: 1, borderColor: '#ffcdd2', p: 2, mt: 4 }}>
                            <Box sx={{ fontWeight: 400, fontSize: '18px', my: 1 }}>Thông tin thanh toán:</Box>
                            <Box><TextMute>Số tài khoản:</TextMute> &nbsp;&nbsp;<Text>{tutor.account}</Text></Box>
                            <Box><TextMute>Ngân hàng:</TextMute> &nbsp;&nbsp;<Text>{tutor.bank}</Text></Box>
                            <Box><TextMute>Tổng thời gian dạy trong tháng này:</TextMute> &nbsp;&nbsp;<Text>{tutor.teachingMinutesMonth}</Text></Box>
                            <Box><TextMute>Tổng thời gian dạy:</TextMute> &nbsp;&nbsp;<Text>{tutor.totalTeachingMinutes}</Text></Box>
                            <Box><TextMute>Tổng doanh thu:</TextMute> &nbsp;&nbsp;<Text>{tutor.totalrevenue}</Text></Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{ border: 1, borderColor: '#ffcdd2', p: 2 }}>
                            <Box sx={{ fontWeight: 400, fontSize: '18px', my: 1 }}>Thông tin cơ bản:</Box>
                            <Box><TextMute>Email:</TextMute> &nbsp;&nbsp;<Text>{tutor.user}</Text></Box>
                            <Box><TextMute>Số điện thoại:</TextMute> &nbsp;&nbsp;<Text>{tutor.phone}</Text></Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}><TextMute>Được chấp nhận:</TextMute> &nbsp;&nbsp;<Text>{tutor.accept ? <CheckIcon /> : <ClearIcon />}</Text></Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            ><TextMute>Rating</TextMute>&nbsp;&nbsp;
                                <Rating
                                    name="text-feedback"
                                    value={tutor.rating}
                                    readOnly
                                    precision={0.5}
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                                <Box sx={{ ml: 2 }}>{tutor.numReviews} người đánh giá</Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', my: 2, gap: 2 }}>
                                <Box><TextMute>Trạng thái:</TextMute></Box>
                                {tutor.status && tutor.status.map((item) => {
                                    return (
                                        <Box sx={{ color: '#f3e5f5', bgcolor: '#e57373', border: 1, borderColor: 'red.500', borderRadius: '10%', p: '4px' }}>{item}</Box>
                                    )
                                })}
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', my: 2, gap: 2 }}>
                                <Box><TextMute>Lĩnh vực dạy:</TextMute></Box>
                                {tutor.include && tutor.include.map((item) => {
                                    return (
                                        <Box sx={{ color: '#f3e5f5', bgcolor: '#ab47bc', border: 1, borderColor: 'red.500', borderRadius: '10%', p: '4px' }}>{item}</Box>
                                    )
                                })}
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', my: 2, gap: '3px' }}>
                                <Box><TextMute>Các chứng chỉ:</TextMute></Box>
                                {tutor.certificates && tutor.certificates.map((item, index) => {
                                    return (
                                        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', '&:hover': { color: 'red', textDecoration: 'underline', backgroundColor: 'white' }, }} onClick={() => window.open(item.dataUrl.toString())}><AttachmentIcon />&nbsp;&nbsp;<span>{item.name}</span></Box>
                                    )
                                })}
                            </Box>
                            <Box><TextMute>Ngày đăng kí:</TextMute> &nbsp;&nbsp;<Text>{moment(new Date(tutor.createdAt)).format('DD/MM/YYYY, h:mm:ss a')}</Text></Box>
                        </Box>
                        <Box sx={{ border: 1, borderColor: '#ffcdd2', p: 2, mt: 4 }}>
                            <Box sx={{ fontWeight: 400, fontSize: '18px', my: 1 }}>Trả lời câu hỏi:</Box>
                            <Box><TextMute>Câu hỏi 1:</TextMute> &nbsp;&nbsp;<Text>{tutor.questionone}</Text></Box>
                            <Box><TextMute>Câu hỏi 2:</TextMute> &nbsp;&nbsp;<Text>{tutor.questiontwo}</Text></Box>
                        </Box>
                    </Grid>
                </Grid>
            </>
        )
    }

    return (
        <>
            <Box sx={{ m: 3 }}>
                <Card sx={{ p: 0.5 }}>
                    {/* <Box sx="mb-1 flex justify-between items-center"> */}
                    <Box sx={{
                        display: 'flex',
                        mb: 1,
                        justifyContent: 'between',
                        alignItems: 'center',
                    }}
                    >
                        <h4 sx={{ fontSize: "medium" }}>Thông tin gia sư</h4>
                    </Box>

                    <Divider sx={{ mb: 6 }} />

                    {body}

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'right', mr: 5, mb: 5, gap: 2 }}>
                        <Button
                            variant="contained"
                            onClick={goBack}
                            color="primary"
                        >
                            Quay lại
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleUpdateTutor}
                            color="error"
                        >
                            Cập nhật trạng thái
                        </Button>
                    </Box>
                </Card>
            </Box>
        </>
    )
}

export default TutorUpdate








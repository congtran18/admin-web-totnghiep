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
import { acceptWarning, resetWarning, getWarningById } from "app/features/warningTutors/warningTutorSlice";
import { toast } from "react-toastify";
import { AdminLoading } from "app/components"
import ReactPlayer from 'react-player'
import { AiOutlineFileText } from "react-icons/ai";
import moment from 'moment'

const Text = styled('span')(({ theme }) => ({
    fontWeight: 400,
    fontSize: '14px',
}))

const WarningUpdate = () => {
    const { warningid } = useParams()
    const navigate = useNavigate();

    const { warning, isLoading } = useSelector(
        (state) => state.warningTutor
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWarningById(warningid))
    }, [warningid]);

    const handleUpdateWarning = async () => {
        await dispatch(acceptWarning(warningid))

        navigate("/warnings/manage");
    }

    const goBack = () => {
        navigate("/warnings/manage");
    }

    let body = null

    if (isLoading) {
        body = (
            <Box sx={{ height: '500px' }}>
                <AdminLoading />
            </Box>
        )
    } else if (warning) {
        body = (
            <>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '5rem'
                }}>
                    <ReactPlayer
                        url={warning.videoUrl}
                        playing={true}
                        controls={true}
                        width={600}
                        height={400}
                    />
                    <Box sx={{ marginTop: '1rem', width: '60%', textAlign: 'center' }}>
                        <Text>{warning.comment}</Text>
                    </Box>
                </Box>
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
                        <h4 sx={{ fontSize: "medium" }}>Nội dung tố cáo</h4>
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
                            onClick={handleUpdateWarning}
                            color="error"
                        >
                            Chấp nhận tố cáo
                        </Button>
                    </Box>
                </Card>
            </Box>
        </>
    )
}

export default WarningUpdate








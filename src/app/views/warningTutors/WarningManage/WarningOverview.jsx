import React, { useEffect, useState } from 'react'
import {
    Grid,
    Box,
} from '@mui/material'
import { styled, useTheme } from '@mui/system';
import moment from 'moment'
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const Image = styled('img')({
    borderRadius: 4,
    width: 100,
    marginRight: 12
});

const NameWarning = styled('h6')({
    marginTop: 0,
    marginBottom: 3,
    fontSize: 16,
    color: 'primary'
})


const NameAttribute = styled('p')({
    marginTop: 0,
    marginBottom: '6px',
    fontSize: 14,
})

const Status = styled('big')(({ theme, mode }) => ({
    borderRadius: '1rem',
    backgroundColor: mode === 'Mới' ? theme.palette.error.dark : mode === 'Bán chạy' ? theme.palette.info.main : theme.palette.text.disabled,
    color: 'rgb(255 255 255)',
    padding: '2px 0.5rem'
}))

const TextMute = styled('span')(({ theme }) => ({
    color: theme.palette.text.secondary
}))

const Text = styled('span')(({ theme }) => ({
    fontWeight: 500,
    fontSize: '14px',
}))

const WarningOverview = ({ warning: { user, tutor, accept, videoUrl, createdAt } }) => {

    return (
        <>
            <Grid
                item
                lg={3}
                md={3}
                sm={3}
                xs={3}
                sx={{ textAlign: 'center' }}
            >
                <Text >{tutor.fullName}</Text>
            </Grid>
            <Grid
                item
                lg={3}
                md={3}
                sm={3}
                xs={3}
                sx={{ textAlign: 'center' }}
            >
                <Text >{user.fullName}</Text>
            </Grid>
            <Grid
                item
                lg={1}
                md={1}
                sm={1}
                xs={1}
                sx={{ textAlign: 'center' }}
            >
                <Text >{accept ? <CheckIcon /> : <ClearIcon />}</Text>
            </Grid>
            <Grid
                item
                lg={3}
                md={3}
                sm={3}
                xs={3}
                sx={{ textAlign: 'center' }}
            >
                <Text >{moment(new Date(createdAt)).format('DD/MM/YYYY, h:mm:ss a')}</Text>
            </Grid>
        </>

    )
}


export default WarningOverview

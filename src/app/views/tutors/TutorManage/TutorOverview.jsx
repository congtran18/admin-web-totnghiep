import React from 'react'
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

const Text = styled('span')(({ theme }) => ({
    fontWeight: 500,
    fontSize: '14px',
}))

const TutorOverview = ({ tutor: { user, phone, accept, imageUrl, createdAt } }) => {

    return (
        <>
            <Grid item lg={2} md={2} sm={2} xs={2}>
                <Box sx={{
                    display: 'flex'
                }}>
                    {imageUrl &&
                        < Image
                            src={imageUrl}
                            alt={user}
                            width={110}
                            height={110}
                            sx={{
                                border: '1px solid #FF00FF',
                                borderRadius: '50%',
                            }}
                        />
                    }
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
                <Text >{user}</Text>
            </Grid>
            <Grid
                item
                lg={2}
                md={2}
                sm={2}
                xs={2}
                sx={{ textAlign: 'center' }}
            >
                <Text >{phone}</Text>
            </Grid>
            <Grid
                item
                lg={2}
                md={2}
                sm={2}
                xs={2}
                sx={{ textAlign: 'center' }}
            >
                <Box sx={{ m: 0, fontWeight: 500 }}>{accept ? <CheckIcon /> : <ClearIcon />}</Box>
            </Grid>
            <Grid
                item
                lg={2}
                md={2}
                sm={2}
                xs={2}
                sx={{ textAlign: 'center' }}
            >
                <Text >{moment(new Date(createdAt)).format('DD/MM/YYYY, h:mm:ss a')}</Text>
            </Grid>
        </>

    )
}


export default TutorOverview

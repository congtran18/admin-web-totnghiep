import React, { useEffect, useState } from 'react'
import {
    Grid,
    Box,
} from '@mui/material'
import { styled, useTheme } from '@mui/system';


const Image = styled('img')({
    borderRadius: 4,
    width: 100,
    marginRight: 12
});

const NameProduct = styled('h6')({
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
    backgroundColor: mode === 'Mới' ? theme.palette.error.dark : mode === 'Nổi bật' ? theme.palette.info.main : theme.palette.text.disabled,
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

const ProductOverview = ({ product: { realname, code, type, category, cost, discount, mainImage, status, include } }) => {

    const costFormat = (cost) => {
        var costlength;
        if ((cost.length / 3 - parseInt(cost.length / 3)) > 0) {
            costlength = parseInt(cost.length / 3);
        } else {
            costlength = parseInt(cost.length / 3) - 1;
        }
        for (let i = 1; i <= costlength; i++) {
            cost = [cost.slice(0, ((-3 * i) - (i - 1))), ".", cost.slice((-3 * i) - (i - 1))].join('');
        }
        return cost;
    }

    return (
        <>
            <Grid item lg={4} md={4} sm={4} xs={4}>
                <Box sx={{ display: 'flex' }}>
                    {mainImage && 
                        < Image
                            src={mainImage}
                            alt={realname}
                            width={110}
                            height={110}
                        />
                    }
                    <Box sx={{ display: 'flex-grow' }}>
                        <NameProduct>
                            {realname}
                        </NameProduct>
                        <NameAttribute>
                            <TextMute >
                                Mã:{' '}
                            </TextMute>
                            <Text >
                                {code}
                            </Text>
                        </NameAttribute>
                        <NameAttribute>
                            <TextMute >
                                Thể loại:{' '}
                            </TextMute>
                            <Text>
                                {type.realname}
                            </Text>
                        </NameAttribute>
                        <NameAttribute>
                            <TextMute >
                                Kiểu:{' '}
                            </TextMute>
                            <Text >
                                {category.realname}
                            </Text>
                        </NameAttribute>
                    </Box>
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
                <Status mode={status}>
                    {status}
                </Status>
            </Grid>
            <Grid
                item
                lg={2}
                md={2}
                sm={2}
                xs={2}
                sx={{ textAlign: 'center' }}
            >
                <Text >{costFormat(cost.toString())}đ</Text>
            </Grid>
            <Grid
                item
                lg={2}
                md={2}
                sm={2}
                xs={2}
                sx={{ textAlign: 'center' }}
            >
                <Text >{discount}</Text>
            </Grid>
        </>

    )
}


export default ProductOverview

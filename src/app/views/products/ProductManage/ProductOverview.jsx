import React, { useEffect, useState } from 'react'
import {
    Grid,
    Box,
} from '@mui/material'
import { styled, useTheme } from '@mui/system';


const Image = styled('img')({
    borderRadius: 4,
    width : 100,
    marginRight : 10
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

const TextMute = styled('span')(({ theme }) => ({
    color: 'secondary'
}))

const Text = styled('span')(({ theme }) => ({
    fontSize: 'medium'
}))

const ProductOverview = ({ product: { realname, type, category, cost, image, status, include } }) => {

    const theme = useTheme()

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
                    <Image
                        src={image[0].data}
                        alt={realname}
                        width={110}
                        height={110}
                    />
                    <Box sx={{ display: 'flex-grow' }}>
                        <NameProduct>
                            {realname}
                        </NameProduct>
                        <NameAttribute>
                            <TextMute >
                                Mã:{' '}
                            </TextMute>
                            <Text >
                                {'1213123123123'}
                            </Text>
                        </NameAttribute>
                        <NameAttribute>
                            <TextMute >
                                Thể loại:{' '}
                            </TextMute>
                            <Text>
                                {type}
                            </Text>
                        </NameAttribute>
                        <NameAttribute>
                            <TextMute >
                                Kiểu:{' '}
                            </TextMute>
                            <Text >
                                {category}
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
                className="text-center"
            >
                <big className={
					status === 'Mới'
						? 'border-radius-4 bg-error text-white px-2 py-2px'
						: status === 'Nổi bật'
						? 'border-radius-4 bg-primary text-white px-2 py-2px'
						: 'border-radius-4 bg-secondary text-white px-2 py-2px'
				}>
                        {status}
                    </big>
            </Grid>
            <Grid
                item
                lg={2}
                md={2}
                sm={2}
                xs={2}
                className="text-center"
            >
                <h6 className="m-0 text-15">{costFormat(cost)}đ</h6>
            </Grid>
            <Grid
                item
                lg={2}
                md={2}
                sm={2}
                xs={2}
                className="text-center"
            >
                <h6 className="m-0 text-15">{status}</h6>
            </Grid>
        </>

    )
}


export default ProductOverview

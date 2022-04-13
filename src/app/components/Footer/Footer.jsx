import React from 'react'
import { Span, Paragraph } from '../Typography'
import { Button, Toolbar, AppBar, ThemeProvider } from '@mui/material'
import { styled, useTheme } from '@mui/system'
import { topBarHeight } from 'app/utils/constant'
import { createTheme } from '@mui/material'

const AppFooter = styled(Toolbar)(() => ({
    display: 'flex',
    alignItems: 'center',
    minHeight: topBarHeight,
    '@media (max-width: 499px)': {
        display: 'table',
        width: '100%',
        minHeight: 'auto',
        padding: '1rem 0',
        '& .container': {
            flexDirection: 'column !important',
            '& a': {
                margin: '0 0 16px !important',
            },
        },
    },
}))

const FooterContent = styled('div')(() => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '0px 1rem',
    maxWidth: '1170px',
    margin: '0 auto',
}))

const Footer = () => {
    const theme = useTheme()

    let footerTheme = createTheme({
        palette: {
            success: {
                main: '#CD0000',
            },
            secondary: {
                main: '#edf2ff',
            },
        },
    });

    return (
        <ThemeProvider theme={footerTheme}>
            <AppBar
                color="success"
                position="static"
                sx={{ zIndex: 96 }}
            >
                <AppFooter>
                    <FooterContent>
                        <a href="https://ui-lib.com/downloads/Admin-pro-react-admin/">
                            <Button variant="contained" color="secondary">
                                Get Admin Pro
                            </Button>
                        </a>
                        <Span sx={{ m: "auto" }}></Span>
                        <Paragraph sx={{ m: 0 }}>
                            Design and Developed by{' '}
                            <a href="http://ui-lib.com">UI Lib</a>
                        </Paragraph>
                    </FooterContent>
                </AppFooter>
            </AppBar>
        </ThemeProvider>
    )
}

export default Footer

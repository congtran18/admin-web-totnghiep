import {
    Box,
    Icon,
    Button,
    Typography,
    Modal
} from '@mui/material'
import { styled } from '@mui/system'


const ImgCustom = styled('img')({
    width: '100%',
    maxWidth: 200,
    height: 150,
    objectFit: 'cover',
    border: '1px solid #cccccc',
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #cccccc',
    boxShadow: 24,
    p: 4,
};

const MainImage = styled('img')(() => ({
    width: '100%',
    // maxWidth: 200,
    height: 400,
    objectFit: 'cover',
    border: '1px solid #cccccc',
}))

const ImagePreview = ({ openPreview, setOpenPreview, imgUrl }) => {

    const closePreview = async () => {
        setOpenPreview(false)
    }

    return (
        <>
            <Modal
                open={openPreview}
                onClose={closePreview}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Ảnh minh hoạ
                        </Typography>
                        <Button
                            color="secondary"
                            onClick={closePreview}>
                            <Icon>
                                close
                            </Icon>
                        </Button>
                    </Box>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <MainImage src={imgUrl} />
                    </Typography>
                </Box>
            </Modal>
        </>
    )

}

export default ImagePreview
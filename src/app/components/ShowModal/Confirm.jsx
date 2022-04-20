import {
    Box,
    Icon,
    Button,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material'

import { trackProduct, resetProduct, removeProduct } from "app/features/products/productSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { styled } from '@mui/system'


const IconCustom = styled(ErrorOutlineIcon)({
    fontSize: '28px',
    marginLeft: '5px',
    // paddingRight: '14px',
    verticalAlign: 'middle',
});

const Confirm = ({ openConfirm, setOpenConfirm, idProduct, codeProduct, action }) => {

    const dispatch = useDispatch();

    const onHandleConfirm = async () => {
        try {
            if (action !== 3) {
                await dispatch(trackProduct(idProduct));
                await dispatch(resetProduct());
                if (action === 1) {
                    toast.success("Xoá tạm thời sản phẩm thành công")
                } else {
                    toast.success("Khôi phục sản phẩm thành công")
                }
            } else {
                await dispatch(removeProduct(idProduct));
                await dispatch(resetProduct());
            }
        } catch (error) {
            toast.error("Lỗi khi xoá sản phẩm")
        }
        closeConfirm();
    };

    const closeConfirm = async () => {
        setOpenConfirm(false)
    }

    return (
        <>
            <Dialog open={openConfirm} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle>
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Xác nhận
                        </Typography>
                        <Button
                            color="secondary"
                            onClick={closeConfirm}>
                            <Icon>
                                close
                            </Icon>
                        </Button>
                    </Box>
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                    <IconCustom/> Xác nhận {action === 1 ? "xoá" : action === 2 ? "khôi phục" : "xoá vĩnh viễn"} sản phẩm có mã <span style={{color: 'black'}}>{codeProduct}</span>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={closeConfirm}
                        color="primary"
                    >
                        Quay lại
                    </Button>
                    <Button
                        variant="contained"
                        onClick={onHandleConfirm}
                        color="error"
                        type="submit"
                    // startIcon={isSubmitting && <CircularProgress size={20} />}
                    >
                        {action === 1 ? "xoá" : action === 2 ? "khôi phục" : "xoá vĩnh viễn"} sản phẩm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )

}

export default Confirm
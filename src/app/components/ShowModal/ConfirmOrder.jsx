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

import { trackOrder, resetOrder, removeOrder, updateOrder } from "app/features/orders/orderSlice";
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

const ConfirmOrder = ({ openConfirm, setOpenConfirm, idOrder, action }) => {

    const dispatch = useDispatch();

    const onHandleConfirm = async () => {
        try {
            if (action === 1) {
                await dispatch(updateOrder(idOrder));
                await dispatch(resetOrder());
            }
            else if (action !== 4) {
                await dispatch(trackOrder(idOrder));
                await dispatch(resetOrder());
                if (action === 2) {
                    toast.success("Xoá tạm thời hóa đơn thành công")
                } else {
                    toast.success("Khôi phục hóa đơn thành công")
                }
            } else {
                await dispatch(removeOrder(idOrder));
                await dispatch(resetOrder());
            }
        } catch (error) {
            toast.error("Lỗi khi xoá hóa đơn")
        }
        // await dispatch(resetOrder());
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
                        <IconCustom /> Xác nhận {action === 1 ? "cập nhật" : action === 2 ? "xóa" : action === 3 ? "khôi phục" : "xoá vĩnh viễn"} hóa đơn có mã <span style={{ color: 'black' }}>{idOrder}</span>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={onHandleConfirm}
                        color="error"
                        type="submit"
                    // startIcon={isSubmitting && <CircularProgress size={20} />}
                    >
                        {action === 1 ? "cập nhật" : action === 2 ? "xóa" : action === 3 ? "khôi phục" : "xoá vĩnh viễn"} hóa đơn
                    </Button>
                    <Button
                        variant="contained"
                        onClick={closeConfirm}
                        color="primary"
                    >
                        Quay lại
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )

}

export default ConfirmOrder
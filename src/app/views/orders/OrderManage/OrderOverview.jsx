import React, { useState } from 'react'
import {
    Button,
    Box,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Paper
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import moment from 'moment'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useDispatch, useSelector } from "react-redux";
import { updateOrder, trackOrder } from "app/features/orders/orderSlice";
import { ConfirmOrder } from "app/components"

const OrderOverview = ({ type, order: { _id, orderItems, address, user, totalPrice, status, paymentMethod, typeCourse, track, shippingPrice, isDelivered, create_at, update_at } }) => {

    console.log("order", paymentMethod)
    // const dispatch = useDispatch();
    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedIdOrder, setSelectedIdOrder] = useState(0)
    const [action, setAction] = useState(0)

    const handleOpenConfirm = async (id, action) => {
        setSelectedIdOrder(id)
        setAction(action)
        setOpenConfirm(true)
    }

    const CostFormat = (cost) => {
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

    const [open, setOpen] = useState(false);
    return (
        <>
            {paymentMethod === "Sách" && <>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell align="center" sx={{ pb: 2, pt: 2 }}>
                        <IconButton
                            aria-label="expand row"
                            size="medium"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                        {_id}
                    </TableCell>
                    <TableCell align="center">{user}</TableCell>
                    <TableCell align="center">{isDelivered ? <CheckIcon /> : <ClearIcon />}</TableCell>
                    <TableCell align="center">{moment(new Date(create_at)).format('DD/MM/YYYY, h:mm:ss a')}</TableCell>
                    <TableCell align="center">
                        <Button
                            sx={{
                                "&:hover": {
                                    backgroundColor: 'rgb(104, 98, 98)',
                                }
                            }}
                            onClick={handleOpenConfirm.bind(this, _id, type === "manage" ? 1 : 3)}
                        ><img src='https://cdn4.iconfinder.com/data/icons/buno-info-signs/32/__edit_new_compose-256.png' alt='edit' width='24' height='24' /></Button>
                        <Button
                            sx={{
                                "&:hover": {
                                    backgroundColor: 'rgb(104, 98, 98)',
                                }
                            }}
                            onClick={handleOpenConfirm.bind(this, _id, type === "manage" ? 1 : 4)}
                        ><img src="https://cdn0.iconfinder.com/data/icons/ui-essence/32/_18ui-128.png" alt='delete' width='24' height='24' /></Button>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Địa chỉ
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Quốc gia</TableCell>
                                            <TableCell>Thành phố</TableCell>
                                            <TableCell align="right">Địa chỉ</TableCell>
                                            <TableCell align="right">Potal code</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow key={address[0]._id}>
                                            <TableCell component="th" scope="row">
                                                {address[0].country}
                                            </TableCell>
                                            <TableCell>{address[0].city}</TableCell>
                                            <TableCell align="right">{address[0].address}</TableCell>
                                            <TableCell align="right">
                                                {address[0].postal_code}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Danh sách sản phẩm
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Mã sản phẩm</TableCell>
                                            <TableCell>Tên sản phẩm</TableCell>
                                            <TableCell align="right">Số lượng</TableCell>
                                            <TableCell align="right">Đơn giá</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orderItems.map((item) => (
                                            <TableRow key={item.productId._id}>
                                                <TableCell component="th" scope="row">
                                                    {item.productId.code}
                                                </TableCell>
                                                <TableCell>{item.productId.realname}</TableCell>
                                                <TableCell align="right">{item.qty}</TableCell>
                                                <TableCell align="right">
                                                    {CostFormat(item.productId.cost.toString())}đ
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell rowSpan={4} />
                                            <TableCell rowSpan={4} />
                                            <Typography variant="h6" gutterBottom component="div">
                                                Tổng cộng
                                            </Typography>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={1}>Giá trị</TableCell>
                                            <TableCell align="right">{CostFormat(((totalPrice - shippingPrice) * 230).toString())}đ</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={1}>Phí ship</TableCell>
                                            <TableCell align="right">{CostFormat((shippingPrice * 230).toString())}đ</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={1}>Tổng giá</TableCell>
                                            <TableCell align="right">{CostFormat((totalPrice * 230).toString())}đ</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </>}
            {paymentMethod === "Khóa học" &&
                <>
                    <TableRow
                        key={_id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row" align="center">
                            {_id}
                        </TableCell>
                        <TableCell align="center">{user}</TableCell>
                        <TableCell align="center">{typeCourse}</TableCell>
                        <TableCell align="center">{CostFormat((totalPrice*230).toString())}đ</TableCell>
                        <TableCell align="center">{moment(new Date(create_at)).format('DD/MM/YYYY, h:mm:ss a')}</TableCell>
                        <TableCell align="center">
                        <Button
                            sx={{
                                "&:hover": {
                                    backgroundColor: 'rgb(104, 98, 98)',
                                }
                            }}
                            onClick={handleOpenConfirm.bind(this, _id, type === "manage" ? 2 : 4)}
                        ><img src="https://cdn0.iconfinder.com/data/icons/ui-essence/32/_18ui-128.png" alt='delete' width='24' height='24' /></Button>
                    </TableCell>
                    </TableRow>
                </>
            }
            <ConfirmOrder
                openConfirm={openConfirm}
                setOpenConfirm={setOpenConfirm}
                idOrder={selectedIdOrder}
                action={action}
            />
        </>

    )
}


export default OrderOverview

import styles from "./HistoryProfile.module.scss"
import orderService from "../../services/orderService.ts";
import {ChangeEvent, useEffect, useState} from "react";
import {AxiosError} from "axios";
import {Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import {useNavigate} from "react-router-dom";
const HistoryProfile = () => {
    const [history, setHistory] = useState<any[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();
    const getHistory = async() => {
        const response = await orderService.getOrders();
        if(response instanceof AxiosError) {
            console.log(response)
        }
        setHistory(response?.data);
    }

    useEffect(() => {
        getHistory();
    }, []);

    const handleChangePage = (_: any, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className={styles.container}>
            {history.length > 0 ? (
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Название</TableCell>
                                        <TableCell>Изображение</TableCell>
                                        <TableCell>Количество</TableCell>
                                        <TableCell>Статус</TableCell>
                                        <TableCell>Дата</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {history.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell>{order.product.name}</TableCell>
                                            <TableCell><img onClick={() => navigate(`/products/${order.productId}`)} width  = {200}  src={order.product.images[0]} alt=""/></TableCell>
                                            <TableCell>{order.count}</TableCell>
                                            <TableCell>{order.status}</TableCell>
                                            <TableCell>{order.createdAt}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={history.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                        </TableContainer>
            ) : (
                <h2>No history available</h2>
            )}
        </div>
    );
}

export default HistoryProfile;
import styles from "./HistoryProfile.module.scss"
import orderService from "../../services/orderService.ts";
import {ChangeEvent, useEffect, useState} from "react";
import {AxiosError} from "axios";
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import Loader from "../../assets/images/loader-icon.svg";
import {IOrder, IProduct, OrderStatusTypes} from "../../types/types.ts";
import ReviewModal from "../ReviewModal/ReviewModal.tsx";
import {Link} from "react-router-dom";

const getStatusClassName = (status: OrderStatusTypes) => {
    switch (status) {
        case 'В обработке':
            return styles.processing;
        case 'В пути':
            return styles.inTransit;
        case 'Доставлено':
            return styles.delivered;
        default:
            return '';
    }
};

const HistoryProfile = () => {
    const [history, setHistory] = useState<IOrder[]>([]);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isActiveModal, setIsActiveModal] = useState<boolean>(false);
    const [modalProduct, setModalProduct] = useState<IProduct | null>(null);
    const getHistory = async(): Promise<void> => {
        try {
            setIsLoading(true);
            const response = await orderService.getOrders();
            if(response instanceof AxiosError) {
                console.log(response)
            }
            setHistory(response?.data);
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false);
        }
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

    if(isLoading) {
        return (
            <div className={styles.loaderContaienr}>
                <img width = {250} src={Loader} alt=""/>
            </div>
        )
    }
    return (
        <div className={styles.container}>
            {
                isActiveModal && <ReviewModal
                    setIsActiveModal={setIsActiveModal}
                    isActiveModal={isActiveModal}
                    product={modalProduct}
                />
            }
            {history.length > 0 ? (
                        <TableContainer>
                            <Table className = {styles.table}>
                                <TableHead>
                                    <TableRow className={styles.tableRow}>
                                        <TableCell><div className = {styles.TableCell}>Название</div></TableCell>
                                        {/*<TableCell><div className = {styles.TableCell}>Изображение</div></TableCell>*/}
                                        <TableCell><div className = {styles.TableCell}>Количество</div></TableCell>
                                        <TableCell><div className = {styles.TableCell}>Цена</div></TableCell>
                                        <TableCell><div className = {styles.TableCell}>Статус</div></TableCell>
                                        <TableCell><div className = {styles.TableCell}>Дата заказа</div></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {history.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell><Link to = {`/products/${order.product.type}/${order.product.id}`} className = {[styles.TableCell, styles.link].join(' ')}>{order.product.name}</Link></TableCell>
                                            <TableCell><div className = {styles.TableCell}>{order.count}</div></TableCell>
                                            <TableCell><div className = {styles.TableCell}>{(order.count * order.product.price).toFixed(1)}р.</div></TableCell>
                                            <TableCell>
                                                <div className = {styles.TableCell}>
                                                    <span className = {getStatusClassName(order.status)}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell><div className = {styles.TableCell}>{new Date(order.createdAt).toLocaleString()}</div></TableCell>
                                            <TableCell>
                                            </TableCell>
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
                <div className={styles.loaderContaienr}>
                    <h2>Ваша истоирия пуста</h2>
                </div>
            )}
        </div>
    );
}

export default HistoryProfile;
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getHistory, getOrderStatus, mineOrders } from '../../store/orderSlice'
import LoadingSpin from '../components/loading-spin'
import Message from "../components/message"
// import TimeAgo from '../components/time-ago'
import TimeAgo from '../components/TimeAgo'
const OrderHistory = ({ user }) => {
    const dispatch = useDispatch()
    const orderStatus = useSelector(getOrderStatus)
    const historyOrder = useSelector(getHistory)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(false)
    const [history, setHistory] = useState([])
    const [sortBy, setSortBy] = useState('desc')
    useEffect(() => {
        if (orderStatus === 'order_idle') {
            setLoading(true)
            dispatch(mineOrders(user.token))
        } else if (orderStatus === 'complete') {
            if (historyOrder.error) setMessage({ message: historyOrder.message, type: 'error' })
            else setHistory([...historyOrder.orders].reverse())
        } else if (orderStatus === 'error') setMessage({ message: 'Error on fetching history!', type: 'error' })
        if (orderStatus !== 'pending') setLoading(false)
    }, [dispatch, orderStatus])
    const handleSort = (sort) => {
        if (sort === 'desc' || sort === 'asc') sort = sortBy === 'desc' ? 'asc' : 'desc'
        if (sort === sortBy) return 1
        setSortBy(sort)
        if (sort === 'desc') {
            setHistory([...historyOrder.orders].reverse())
        }
        else if (sort === 'asc') {
            setHistory([...historyOrder.orders])
        }
        else if (sort === 'delivered') {
            setHistory([...historyOrder.orders].sort(function (a, b) {
                return (a.isDelivered === b.isDelivered) ? 0 : a.isDelivered ? -1 : 1;
            }))
        } else if (sort === 'paid') {
            setHistory([...historyOrder.orders].sort(function (a, b) {
                return (a.isPaid === b.isPaid) ? 0 : a.isPaid ? -1 : 1;
            }))
        } else if (sort === 'unpaid') {
            setHistory([...historyOrder.orders].sort(function (a, b) {
                return (!a.isPaid === !b.isPaid) ? 0 : !a.isPaid ? -1 : 1;
            }))
        } else {
            setHistory(historyOrder.orders)
        }
    }
    return (
        <div className='container page-size fading order-history'>
            {message && <Message handleClose={() => setMessage(false)} variant={message.type} message={message.message} />}

            <div className='cart-view fading'>
                {
                    history && history.length > 0 &&
                    <div className='sort-btn'>
                        <button onClick={() => { handleSort('desc') }} className={sortBy === 'desc' || sortBy === 'asc' ? 'active' : ''} title='Sort by ascending/descending'>
                            <i className="fa fa-sort"></i>
                            <span>Desc/Asc</span>
                        </button>
                        <button onClick={() => { handleSort('paid') }} className={sortBy === 'paid' ? 'active' : ''} title='Sort by is Paid'>
                            <i className="fa fa-sort-alpha-asc"></i>
                            <span>Paid</span>
                        </button>
                        <button onClick={() => { handleSort('unpaid') }} className={sortBy === 'unpaid' ? 'active' : ''} title='Sort by is Unpaid'>
                            <i className="fa fa-sort-alpha-desc"></i>
                            <span>Un Paid</span>
                        </button>

                        <button onClick={() => { handleSort('delivered') }} className={sortBy === 'delivered' ? 'active' : ''} title='Sort by is Delivered'>
                            <i className="fas fa-truck"></i>
                            <span>Delivered</span>
                        </button>
                    </div>
                }
                <div className='oh-title'>Order History</div>
                <div className='oh-user'><i className="fa fa-user-circle"></i>{user.name}</div>
            </div>

            <div>

                {
                    loading && <div className='flex'><LoadingSpin /></div>
                }
                {
                    history.length > 0 ?
                        <table>

                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ID </th>
                                    <th>Ordered On</th>
                                    <th>Total</th>
                                    <th>Paid</th>
                                    <th>Delivered</th>
                                    <th>Items</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th>#</th>
                                    <th>ID </th>
                                    <th>Ordered On</th>
                                    <th>Total</th>
                                    <th>Paid</th>
                                    <th>Delivered</th>
                                    <th>Items</th>
                                    <th>Actions</th>
                                </tr>
                            </tfoot>
                            <tbody>
                                {
                                    history.map((e, i) =>
                                        <tr key={i}>
                                            <td>{
                                                sortBy === 'desc' ?
                                                    Math.abs((i + 1) - history.length)
                                                    : i + 1
                                            }</td>
                                            <td>{e._id}</td>
                                            <td>{
                                                new Date(e.createdAt).toDateString()
                                            }</td>
                                            <td>${e.totalPrice}</td>
                                            <td className={e.isPaid ? 'success' : 'danger'}>{e.isPaid ? <TimeAgo timestamp={e.createdAt} /> : 'Not paid'}</td>
                                            <td className={e.isDelivered ? 'success' : 'danger'}>{e.isDelivered ? 'Yes' : 'Not Delivered'}</td>
                                            <td className='table-image'>
                                                {
                                                    e.orderItems.map((item, t) => <img title={item.name} key={t} src={`/media/images/${item.image}`} />)
                                                }
                                            </td>
                                            <td className='link'>
                                                <Link to={`/order/${e._id}`}>
                                                    Details <i className="fa fa-external-link"></i>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        :
                        <div className='empty-order'>
                            <i className="fa fa-history"></i>
                            <h3>There is no order history</h3>
                        </div>
                }

            </div>
        </div >)

}

export default OrderHistory
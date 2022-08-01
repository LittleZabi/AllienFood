import colors from "../../colors";
import { useState, useEffect } from "react";
import Loading from "../components/loading-anim";
import RenderItem from "../components/product-render";
import Message from "../components/message";
import { useSelector, useDispatch } from "react-redux";
import { foodsAll, foodsError, foodsStatus, getFoods, getFood, fetchFood } from '../../store/foodsSlice'
import Product from "./product-view";
const HomeScreen = () => {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState(null)
    const [message, setMessage] = useState(false)
    const _foods = useSelector(foodsAll)
    const _foodsStatus = useSelector(foodsStatus)
    const _foodsError = useSelector(foodsError)
    const [viewItemRequest, setViewItemReq] = useState(0)
    const [viewItem, setViewItem] = useState(null)
    const [itemLoad, setItemLoad] = useState(false)
    const dispatch = useDispatch();
    const itemDetails = useSelector(getFood)
    useEffect(() => {
        if (_foodsStatus === 'pending' && viewItemRequest === 0) {
            setLoading(true)
        } else if (_foodsStatus === 'idle') {
            dispatch(getFoods());
        } else if (_foodsStatus === 'error') {
            setMessage({ type: 'error', message: _foodsError })
            setLoading(false)
        } else if (_foodsStatus === 'pending' && viewItemRequest === 0) {
            setItemLoad(true)
        }
        else if (_foodsStatus === 'complete' && viewItemRequest === 0) {
            setItems(_foods)
            setLoading(false)
        } else if (viewItemRequest === 1 && _foodsStatus === 'complete') {
            setViewItem(itemDetails)
            setItemLoad(false)
        }
    }, [dispatch, _foodsStatus]);
    const handleCloseModel = () => {
        setViewItemReq(0)
        setViewItem(null)
    }
    const handleViewItem = (id) => {
        setMessage(false)
        setViewItemReq(1)
        setItemLoad(true)
        dispatch(fetchFood(id))
    }
    return (
        <div className="row center items page-size">
            {
                viewItemRequest ? <Product item={viewItem} handleCloseModel={handleCloseModel} setMessage={setMessage} loading={itemLoad} /> : ''
            }
            {message && <Message handleClose={() => setMessage(false)} variant={message.type} message={message.message} />}
            {loading && <Loading limit={4} />}
            {!loading &&
                items && items.map((item, index) => {
                    let color =
                        colors[Math.ceil(Math.random() * (colors.length - 1))];
                    return (
                        <RenderItem
                            key={index}
                            index={index}
                            item={item}
                            bgColor={color}
                            handleViewItem={handleViewItem}
                        />
                    );
                })}
        </div>)
}
export default HomeScreen;
import colors from "../../colors";
import { useState, useEffect } from "react";
import Loading from "../components/loading-anim";
import RenderItem from "../components/product-render";
import Message from "../components/message";
import { useSelector, useDispatch } from "react-redux";
import { foodsAll, foodsError, foodsStatus, getFoods, getFood, fetchFood } from '../../store/foodsSlice'
import { useParams } from "react-router-dom";
import Product from "./product-view";
const HomeScreen = () => {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState(null)
    const [error, setError] = useState(null)
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
            setError({ type: 'error', message: _foodsError })
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
        setViewItemReq(1)
        setItemLoad(true)
        dispatch(fetchFood(id))
    }
    return (
        <div className="row center items page-size">
            {
                viewItemRequest && <Product item={viewItem} handleCloseModel={handleCloseModel} loading={itemLoad} />
            }
            {error && <Message variant={error.type}>{error.message}</Message>}
            {loading && <Loading limit={8} />}
            {!loading &&
                items && items.map((item, index) => {
                    let color =
                        colors[Math.ceil(Math.random() * (colors.length - 1))];
                    return (
                        <RenderItem
                            index={index}
                            key={item["id"]}
                            item={item}
                            bgColor={color}
                            handleViewItem={handleViewItem}
                        />
                    );
                })}
        </div>)
}
export default HomeScreen;
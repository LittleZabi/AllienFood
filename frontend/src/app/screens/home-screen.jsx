import colors from "../../colors";
import { useState, useEffect } from "react";
import Loading from "../components/loading-anim";
import RenderItem from "../components/product-render";
import Message from "../components/message";
import { useSelector, useDispatch } from "react-redux";
import { foodsAll, foodsError, foodsStatus, getFoods } from '../../store/foodsSlice'
const HomeScreen = () => {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState(null)
    const [error, setError] = useState(null)
    const _foods = useSelector(foodsAll)
    const _foodsStatus = useSelector(foodsStatus)
    const _foodsError = useSelector(foodsError)
    const dispatch = useDispatch();
    useEffect(() => {
        if (_foodsStatus === 'pending') {
            setLoading(true)
        } else if (_foodsStatus === 'idle') {
            dispatch(getFoods());
        } else if (_foodsStatus === 'error') {
            setError({ type: 'error', message: _foodsError })
            setLoading(false)
        } else if (_foodsStatus === 'complete') {
            setItems(_foods)
            setLoading(false)
        }
    }, [dispatch, _foodsStatus]);
    return (
        <div className="row center items page-size">
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
                        />
                    );
                })}
        </div>)
}
export default HomeScreen;
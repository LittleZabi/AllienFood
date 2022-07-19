import Stars from "./stars"
const RenderItem = ({ item, bgColor, index, handleViewItem }) => {
    return (
        <div className="card fading" style={{ animationDelay: index * 100 + 'ms' }}>
            <span className="image-sec" >
                <img onClick={() => handleViewItem(item['_id'])}
                    className="medium"
                    src={"/images/" + item["image"]}
                    alt={item["name"]}
                />
            </span>
            <div className="card-body">
                <span className="item-name" onClick={() => handleViewItem(item['_id'])}>
                    <h2>{item["name"].replace("-", " ")}</h2>
                </span>
                {<Stars rating={item["rating"]} />}
                <div className="price">
                    <span>
                        <i className="fa fa-dollar"></i>
                        {item["price"]}
                    </span>
                    <span className="restaurant"> {item["restaurant"]} </span>
                </div>
                <span className="restaurant">
                    Restaurant: #{item["restID"]}{" "}
                </span>
            </div>
            <div
                className="toolkit"
                style={{
                    background: bgColor,
                }}
            >
                <span>
                    <i className="fa fa-heart-circle-check heart"></i>
                    <i className="fa fa-message cmnt"></i>
                    <span className="badge">
                        {item["comments"] > 999 ? "999+" : item["comments"]}
                    </span>
                    <i className="fa fa-cart-plus cart"></i>
                </span>
            </div>
        </div>
    )
}
export default RenderItem
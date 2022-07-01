import Stars from "./stars"

const RenderItem = ({ item, bgColor }) => {
    return (
        <div key={item.id} className="card">
            <a className="image-sec" href={`product/${item["id"]}/${item["name"]}`}>
                <img
                    className="medium"
                    src={"/images/" + item["image"]}
                    alt={item["name"]}
                />
            </a>
            <div className="card-body">
                <a href={`product/${item["id"]}/${item["name"]}`}>
                    <h2>{item["name"].replace("-", " ")}</h2>
                </a>
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
import { useState, useEffect } from "react"


const Loading = ({ limit, styles = {} }) => {
    const [limitList, setLimitList] = useState([])
    useEffect(() => {
        setLimitList(Array(limit).fill(0))
    }, [limit])

    return (
        <>
            {
                limitList.map((t, i) => <div key={i} className="card fading" style={{ animationDelay: i * 100 + 'ms', ...styles }}>
                    <div className="loading" >
                        <div className="img"></div>
                        <div className="name"></div>
                        <div className="price"></div>
                        <div className="toolskit"></div>
                    </div>
                </div>)
            }

        </>
    )
}
export default Loading
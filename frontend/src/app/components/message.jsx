const Message = (props) => {

    return (<div className={`message-box ${props.variant || "success"}`} >
        <span>
            {props.message}
        </span> <span className="close" onClick={props.handleClose}>&times;</span>
    </div >)
}

export default Message
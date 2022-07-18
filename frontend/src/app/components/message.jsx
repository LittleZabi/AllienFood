const Message = (props) => {
    const handleClose = (element) => {
        element['target'].parentNode.style.display = 'none';
    }
    return (<div className={`message-box ${props.variant || "success"}`} >
        <span>
            {props.message}
        </span> <span className="close" onClick={(e) => handleClose(e)}>&times;</span>
    </div >)
}

export default Message
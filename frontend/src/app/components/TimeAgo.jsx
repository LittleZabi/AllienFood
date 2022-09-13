import { formatDistanceToNow, parseISO } from "date-fns"

const TimeAgo = ({ timestamp }) => {
    let timeago = ''
    if (timestamp) {
        const date = parseISO(timestamp)
        const timePeriod = formatDistanceToNow(date)
        timeago = `${timePeriod} ago`
    }
    return <>{timeago}</>

}
export default TimeAgo
export const formatDate = (dateString: string) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: '2-digit', hour: '2-digit', minute: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
};
export const formatDateForDateType = (dt) => {
    const d = new Date(dt);
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
}
export const getOneDayBefore = () => {
    const tmepDate = new Date();
    tmepDate.setDate(tmepDate.getDate() - 1);
    tmepDate.setHours(0, 0, 0);
    console.log(tmepDate);
    return { dtMs: tmepDate.getTime(), dtInput: formatDateForDateType(tmepDate) };
}
export const getTodaysDate = () => {
    const tmepDate = new Date();
    tmepDate.setHours(23, 59, 59);
    return { dtMs: tmepDate.getTime(), dtInput: formatDateForDateType(tmepDate) };
}
export const getDateStart = (dt: string) => {
    const tmepDate = new Date(dt);
    tmepDate.setHours(0, 0, 0);
    console.log(tmepDate);
    return tmepDate.getTime();
}
export const getDateEnd = (dt: string) => {
    const tmepDate = new Date(dt);
    tmepDate.setHours(23, 59, 59);
    return tmepDate.getTime();
}
export const getDateLabel = (dt) => {
    if (dt === formatDateForDateType(new Date())) {
        return 'Today'
    } else {
        const tempDt = new Date();
        tempDt.setDate(tempDt.getDate() + 1);
        if (dt === tempDt)
            return 'Tomorrow';
        else
            return dt;
    }
}
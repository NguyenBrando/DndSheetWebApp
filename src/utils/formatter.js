export const formatDate = (date) => {
    date = new Date(date)
    var dateFormatted = "";
    dateFormatted += date.getFullYear();
    dateFormatted += "-" + ("0" + (date.getMonth()+1)).slice(-2);
    dateFormatted += "-" + ("0" + date.getDate()).slice(-2);
    dateFormatted += "_" + ("0" + date.getHours()).slice(-2);
    dateFormatted += "-" + ("0" + date.getMinutes()).slice(-2);
    return dateFormatted;
}

export const capitalFirst = (text) => {
    return text.replace(/(^\w|\s\w)/g, (match) => match.toUpperCase());
}

export const modFormat = (stat) => {
    const signFormatter = new Intl.NumberFormat('en-US', { signDisplay: 'always' })
    return signFormatter.format(stat)
}

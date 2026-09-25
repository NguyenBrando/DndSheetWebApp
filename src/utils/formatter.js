export const capitalFirst = (text) => {
    return text.replace(/(^\w|\s\w)/g, (match) => match.toUpperCase());
}

export const modFormat = (stat) => {
    const signFormatter = new Intl.NumberFormat('en-US', { signDisplay: 'always' })
    return signFormatter.format(stat)
}

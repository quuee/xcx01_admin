const dateFormat = (dateTime: string) => {
    let time = new Date(dateTime);
    const year = time.getFullYear()
    const month = time.getMonth() + 1 // 由于月份从0开始，因此需加1
    const day = time.getDate()
    const hour = time.getHours()
    const minute = time.getMinutes()
    const second = time.getSeconds()
    return `${padString(year, 4)}-${padString(month)}-${padString(day)} ${padString(hour)}:${padString(minute)}:${padString(second)}`
}
const padString = (time: number, length: number = 2) => {
    return time.toString().padStart(length, '0')
}

export {
    dateFormat
}
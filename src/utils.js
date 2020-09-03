export const dateToString = (date) => `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`

export const getCardName = pdfWriter => pdfWriter.split('.')[pdfWriter.split('.').length-1].replace('Writer', '')

export const getStartOfTodayInMillis = () => {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
}

export const getStartOfDayInMillis = (timeInMillis) => {
    const date = new Date(timeInMillis);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
};

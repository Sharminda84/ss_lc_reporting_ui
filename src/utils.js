export const dateToString = (date) => `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`

export const getCardName = pdfWriter => pdfWriter.split('.')[pdfWriter.split('.').length-1].replace('Writer', '')
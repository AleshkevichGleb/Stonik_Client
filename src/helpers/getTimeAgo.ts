const formatTimeDifference = (dateString: string): string => {
    const date = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - date.getTime();
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);

    if (hoursDifference < 24) {
        if (hoursDifference >= 1) {
            return `${hoursDifference} час${hoursDifference === 1  ? "" : (hoursDifference > 1 && hoursDifference < 5) ? "а" : "ов"} назад`;
        } else if (minutesDifference >= 1) {
            return `${minutesDifference} минут${String(minutesDifference).endsWith('1') || (minutesDifference > 1 && minutesDifference < 5) ? "ы" : ""} назад`;
        } else {
            return "0 минут назад";
        }
    } else {
        const options: Intl.DateTimeFormatOptions = {
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        return date.toLocaleString("ru-RU", options);
    }
};

export default formatTimeDifference;

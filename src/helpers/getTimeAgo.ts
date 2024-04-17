export default function getTimeAgo(timestamp: string): string {
    const currentDate = new Date();
    const date = new Date(timestamp);
    const diff = currentDate.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (seconds < 60) {
        return `${pluralize(seconds, 'секунд')} назад`;
    } else if (minutes < 60) {
        return `${pluralize(minutes, 'минут')} назад`;
    } else if (hours < 24) {
        return `${pluralize(hours, 'час')} назад`;
    } else {
        return date.toLocaleString();
    }
}

function pluralize(value: number, word: string): string {
    const lastTwoDigits = value % 100;
    const lastDigit = value % 10;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return `${value} ${word}`;
    } else if (lastDigit === 1) {
        return `${value} ${word}а`;
    } else if (lastDigit >= 2 && lastDigit <= 4) {
        return `${value} ${word}ы`;
    } else {
        return `${value} ${word}`;
    }
}

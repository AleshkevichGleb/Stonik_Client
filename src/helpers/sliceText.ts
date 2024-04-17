    export default function (text: string, length:number) {
        if (text.length <= length) {
            return text.trim();
        } else {
            return text.substring(0, length).trim() + '...';
        }
    }
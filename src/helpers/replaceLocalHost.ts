export default function (inputString: string | undefined) {
    if(inputString) return inputString.replace(/localhost:5000/g, '89.23.112.56')
}

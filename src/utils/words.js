import {generate} from 'random-words'

const word = generate(100);
const wordArray = word.map((elem)=>{
    return elem.toLowerCase();
})

export default wordArray;
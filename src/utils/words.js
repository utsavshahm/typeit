import { generate } from "random-words";

const word = generate(100);
const wordArray = word.map((elem) => {
    return elem.toLowerCase();
});

export default wordArray;
const words = [
    "able", "across", "add", "afraid", "ago", "agree", "almost", "alone", "along",
    "already", "although", "always", "am", "amount", "angry", "animal", "answer",
    "appear", "apple", "arm", "arrive", "art", "ask", "at", "attack", "aunt", "autumn",
    "away", "baby", "ball", "bank", "base", "bath", "bean", "bear", "beautiful", "bed",
    "bedroom", "beer", "before", "begin", "behind", "bell", "below", "beside", "best",
    "better", "between", "big", "bird", "birthday", "bit", "bite", "black", "block",
    "blood", "blow", "blue", "boat", "body", "bone", "book", "border", "born", "borrow",
    "both", "bottle", "bottom", "bowl", "box", "boy", "branch", "brave", "bread", "break",
    "breakfast", "breathe", "bridge", "bright", "bring", "brother", "brown", "brush",
    "build", "burn", "bus", "business", "busy", "buy", "cake", "call", "can", "candle",
    "cap", "car", "card", "care", "careful", "careless", "carry", "case", "cat", "catch",
    "central", "century", "certain", "chair", "chance", "change", "chase", "cheap",
    "cheese", "chicken", "child", "children", "chocolate", "choice", "choose", "city",
    "class", "clean", "clear", "clever", "climb", "clock", "close", "cloth", "clothes",
    "cloud", "cloudy", "coat", "coffee", "coin", "cold", "collect", "color", "comb",
    "come", "comfort", "company", "compare", "complete", "computer", "condition",
    "contain", "continue", "control", "cook", "cool", "corner", "correct", "cost",
    "count", "country", "course", "cover", "crash", "cross", "cry", "cup", "cut", "dance",
    "dark", "daughter", "dead", "decide", "decrease", "deep", "deer", "depend", "desk",
    "destroy", "develop", "die", "different", "difficult", "dinner", "direction", "dirty",
    "discover", "dish", "dog", "door", "double", "down", "draw", "dream", "dress", "drink",
    "drive", "drop", "dry", "duck", "dust", "duty", "each", "ear", "early", "earn",
    "earth", "east", "easy", "eat", "education", "effect", "egg", "eight", "either",
    "electric", "elephant", "else", "empty", "end", "enemy", "enjoy", "enough", "enter",
    "equal", "escape", "even", "evening", "event", "ever", "every", "everybody", "exact",
    "examination", "example", "except", "excited", "exercise", "expect", "expensive",
    "explain", "eye", "face", "fact", "fail", "fall", "family", "famous", "far", "farm",
    "fast", "fat", "father", "fear", "feed", "feel", "female", "few", "fight", "fill",
    "film", "find", "fine", "finger", "finish", "fire", "first", "fish", "fit", "five",
    "fix", "flag", "flat", "floor", "flower", "fly", "follow", "food", "foot", "football",
    "force", "foreign", "forest", "forget", "forgive", "form", "fox", "free", "freeze",
    "fresh", "friend", "friendly", "front", "fruit", "full", "fun", "funny", "furniture",
    "further", "future", "about", "after", "again", "air", "also", "always", "another", "any",
    "around", "ask", "back", "because", "before", "big", "both", "call",
    "came", "change", "child", "come", "course", "day", "different",
    "down", "each", "end", "even", "every", "few", "find", "first",
    "food", "for", "found", "from", "get", "give", "go", "good", "great",
    "hand", "has", "have", "he", "help", "her", "here", "him", "his",
    "home", "house", "how", "important", "into", "keep", "know", "large",
    "last", "later", "leave", "left", "let", "life", "like", "long",
    "look", "made", "make", "man", "many", "may", "mean", "might",
    "more", "most", "mother", "much", "must", "name", "need", "never",
    "new", "next", "night", "not", "now", "number", "off", "old", "once",
    "one", "only", "open", "other", "our", "out", "over", "own", "part",
    "people", "place", "play", "put", "read", "right", "said", "same",
    "see", "she", "should", "show", "small", "some", "still", "such",
    "take", "tell", "than", "that", "the", "their", "them", "then",
    "there", "these", "they", "thing", "think", "this", "those", "time",
    "three", "through", "to", "together", "too", "two", "under", "up",
    "use", "very", "want", "was", "way", "we", "well", "went", "what",
    "when", "which", "who", "will", "with", "would", "year", "you",
    "your", "yet"
];


const generateWords = () => {
    const wordArray = [];
    while (wordArray.length < 200) {
        const customIndex = Math.floor(Math.random() * words.length);
        wordArray.push(words[customIndex]);
    }

    return wordArray;
};


const generateWordsWithPunctuation = () => {
    const punc = [",", "'", "!", ".", ";", "?"];
    const wordArray = [];

    while (wordArray.length < 200) {
        const puncProb = Math.random();
        const upperProb = Math.random();
        const customIndex = Math.floor(Math.random() * words.length);

        let word = words[customIndex];
        let letters = word.split('');

        if (upperProb > 0.5) {
            letters[0] = letters[0].toUpperCase();
        }

        if (puncProb > 0.7) {
            const puncIndex = Math.floor(Math.random() * punc.length);
            const puncChar = punc[puncIndex];

            if (puncChar === "'") {
                letters[0] = `'${letters[0]}`;
                letters[letters.length - 1] = `${letters[letters.length - 1]}'`;
            } else {
                letters[letters.length - 1] += puncChar;
            }
        }

        word = letters.join('');
        wordArray.push(word);
    }

    return wordArray;
}


export { generateWords, generateWordsWithPunctuation };

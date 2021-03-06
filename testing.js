const Ones = {
    0: "Zero",
    1: "Um",
    2: "Dois",
    3: "Três",
    4: "Quatro",
    5: "Cinco",
    6: "Seis",
    7: "Sete",
    8: "Oito",
    9: "Nove"
}

const Outers = {
    10: "Dez",
    11: "Onze",
    12: "Doze",
    13: "Treze",
    14: "Quatorze",
    15: "Quinze",
    16: "Dezesseis",
    17: "Dezesete",
    18: "Dezoito",
    19: "Dezenove"
}

const Hundreds = {
    1: "Cento",
    2: "Duzentos",
    3: "Trezentos",
    4: "Quatrocentos",
    5: "Quinhentos",
    6: "Seissentos",
    7: "Setecentos",
    8: "Oitocentos",
    9: "Novecentos",
}

const Tens = {
    1: "Dez",
    2: "Vinte",
    3: "Trinta",
    4: "Quarenta",
    5: "Cinquenta",
    6: "Sessenta",
    7: "Setenta",
    8: "Oitenta",
    9: "Noventa"
}

const Suffixes = {
    2: "Mil",
    3: "Milhão",
    4: "Bilhão",
    5: "Trilhão",
}

const SuffixesPlural = {
    3: "Milhões",
    4: "Bilhões",
    5: "Trilhões"
}

const numberLimit = 1000000000000;

let numberText = "";
let currentNumberText = "";

function toWords(number) {
    const absoluteNumber = Math.abs(number);

    if(absoluteNumber > numberLimit) {
        Errors.tooBig();
    }

    else if(number.toString().includes("-") && absoluteNumber != 0) {
        numberText += "Negativo"
    }

    else if(absoluteNumber in Ones) {
        numberText += Ones[absoluteNumber];
    }

    else if (absoluteNumber < 100) {
        numberText += twoDigitsConvert(absoluteNumber);
    } 
    
    else if (absoluteNumber < 1000) {
        numberText += threeDigitsConvert(absoluteNumber);
    }

    else if (absoluteNumber < 10000) {
        numberText += fourDigitsConvert(absoluteNumber);
    }

    else {
        const numberArray = splitNumber(absoluteNumber);

        let counter = numberArray.length;

        for(let interator = 0; interator < numberArray.length; interator ++) {
            if(numberArray[interator][0] !== "0000") {
                if(numberArray[interator][0].length == 4) {
                    numberText += fourDigitsConvert(parseInt(numberArray[interator]));
                    numberText += " " + Suffixes[counter];
                } else {
                    numberText += twoDigitsConvert(parseInt(numberArray[interator]));
                    numberText += " " + Suffixes[counter];
                }

                counter--;
            } else {
                counter--;
            }
        }
    }

    return numberText;
}

function twoDigitsConvert(number) {
    const absoluteNumber = Math.abs(number);

    if(absoluteNumber < 10) return Ones[absoluteNumber]
    
    else if(absoluteNumber in Outers) {
        currentNumberText += Outers[absoluteNumber];
    }

    else {
        currentNumberText += Tens[absoluteNumber.toString().charAt(0)];

        if(absoluteNumber.toString().charAt(1) !== "0") {
            currentNumberText += " e " + Ones[absoluteNumber.toString().charAt(1)];
        }
    }

    return currentNumberText;
}

function threeDigitsConvert(number) {
    const absoluteNumber = Math.abs(number);

    if(number == 0) return "";

    else if(absoluteNumber < 100) {
        currentNumberText += twoDigitsConvert(absoluteNumber);
        
        return currentNumberText;
    }

     else if(absoluteNumber in Outers) {
        currentNumberText += Outers[absoluteNumber];
    }

    else {
        currentNumberText += Hundreds[absoluteNumber.toString().charAt(0)];
        
        if(number.toString().substring(1, 2) !== "00") {

            if(number.toString().charAt(2) == "0") {
                currentNumberText += " e " + Tens[absoluteNumber.toString().substring(1, 2)];
            } 
            
            else if(number.toString().charAt(1) == "1") {
                currentNumberText += " e " + Outers[absoluteNumber.toString().substr(1, 2)];  
            }

            else {
                currentNumberText += " e " + Tens[absoluteNumber.toString().charAt(1)];
    
                if(number.toString().charAt(2) !== "0"){
                    currentNumberText += " e " + Ones[absoluteNumber.toString().charAt(2)];
                }
            }
        }
    }

    return currentNumberText
}

function fourDigitsConvert(number) {
    const absoluteNumber = Math.abs(number);

    if(absoluteNumber < 1000) {
        currentNumberText += threeDigitsConvert();
    }

    else if(absoluteNumber.toString().charAt(0) == 1) {
        currentNumberText += Suffixes[2] + " " + threeDigitsConvert(absoluteNumber.toString().substring(1));
    }

    else  if(absoluteNumber.toString().charAt(0) !== 1){
      currentNumberText += Ones[absoluteNumber.toString().charAt(0)]+ " " + Suffixes[2] + " " + threeDigitsConvert(absoluteNumber.toString().substring(1));
    }

    return currentNumberText
}

function splitNumber(number) {
    const numberArray = [];
    let tempArray = [];

    const numberString = number.toString();
    let counter = 0;

    const singleDigits = numberString.split("");
    const digits = singleDigits.length;

    for(let interator = digits - 1; interator >= 0; interator--) {
        tempArray[0] = singleDigits[interator] + tempArray[0];
        counter ++;

        tempArray[0] = tempArray[0].replace("undefined", "");

        if(counter % 3 == 0) {
            numberArray.unshift(tempArray);
            tempArray = [];
        }
    }

    if(tempArray.length != 0) {
        numberArray.unshift(tempArray);
    }

    return numberArray; 
}

const Errors = {
    tooBig() {
        console.log(`O número é muito grande, tente algo menor que ${numberLimit} (1 Trilhão).`);
    },

    NegativeNumber() {
        console.log(`O número é negativo, somente números positivos são aceitos!`);
    },
}
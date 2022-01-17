const Units = {
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

const Hundreds = {
    0: "Cem",
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

const Outers = {
    1: "Onze",
    2: "Doze",
    3: "Treze",
    4: "Quatorze",
    5: "Quinze",
    6: "Dezesseis",
    7: "Dezesete",
    8: "Dezoito",
    9: "Dezenove"
}

const Suffixes = {
    1: "Mil"
}

function transformUnits(number) {
    if(number.toString().charAt(0) in Units) return Units[number.toString().charAt(0)];
}

function transformTens(number) {
    if(number.toString().charAt(0) == 0) return transformUnits(number.toString().substring(1));

    else if(number.toString().charAt(0) == 1 && number.toString().charAt(1) == 0) return Tens[1];
    
    else if(number.toString().charAt(0) == 1 && number.toString().charAt(1) in Outers) return Outers[number.toString().charAt(1)];

    else if(number.toString().charAt(0) > 1 && number.toString().charAt(1) == 0) return Tens[number.toString().charAt(0)];

    else if(number.toString().charAt(0) in Tens) return Tens[number.toString().charAt(0)] + " e " + transformUnits(number.toString().substring(1));
}

function transformHundreds(number) {
    if(number.toString().charAt(0) == 0) return transformTens(number.toString().substring(1));

    else if(number.toString().charAt(0) == 1 && number.toString().charAt(1) == 0 && number.toString().charAt(2) == 0) return Hundreds[0];

    else if(number.toString().charAt(0) > 1 && number.toString().charAt(1) == 0  && number.toString().charAt(2) == 0) return Hundreds[number.toString().charAt(0)];

    else if(number.toString().charAt(0) in Hundreds) return Hundreds[number.toString().charAt(0)] + " e " + transformTens(number.toString().substring(1));
}

function transformThousands(number) {
    if(number.toString().charAt(0) == 0) return transformHundreds(number.toString().substring(1));

    else if(number.toString().charAt(0) == 1 && number.toString().charAt(1) == 0 && number.toString().charAt(2) == 0 && number.toString().charAt(3) == 0) return Suffixes[1];

    else if(number.toString().charAt(0) !== 1 && number.toString().charAt(1) == 0 && number.toString().charAt(2) == 0 && number.toString().charAt(3) == 0) return Units[number.toString().charAt(0)]+ " " + Suffixes[1] ;

    else if(number.toString().charAt(0) == 1) return Suffixes[1] + " " + transformHundreds(number.toString().substring(1));
    
    else if(number.toString().charAt(0) !== 1) return Units[number.toString().charAt(0)]+ " " + Suffixes[1] + " e " + transformHundreds(number.toString().substring(1));
}

function transformThousandsTens(number) {
    if(number.toString().charAt(0) == 0) return transformThousands(number.toString().substring(1));

    else if(number.toString().charAt(0) !== 0 && number.toString().charAt(1) == 0 && number.toString().charAt(2) == 0 && number.toString().charAt(3) == 0 && number.toString().charAt(4) == 0) return transformTens(number.toString().charAt(0) + number.toString().charAt(1)) + " " + Suffixes[1]

    else if(number.toString().charAt(0) !== 0) return transformTens(number.toString().charAt(0) + number.toString().charAt(1)) + " " + Suffixes[1] + " " + transformHundreds(number.toString().substring(2));
}

const numberLimit = 1000000000000;

function transformAllDigits(number) {
    const absoluteNumber = Math.abs(number);

    if(absoluteNumber > numberLimit) return "Número é muito grande! Tente novamente.";

    else if(isNaN(absoluteNumber)) return "O valor não é um número! Verifique os campos e tente novamente."

    else if(absoluteNumber.toString().length == 1) return transformUnits(absoluteNumber);

    else if(absoluteNumber.toString().length == 2) return transformTens(absoluteNumber);

    else if(absoluteNumber.toString().length == 3) return transformHundreds(absoluteNumber);

    else if(absoluteNumber.toString().length == 4) return transformThousands(absoluteNumber);

    else if(absoluteNumber.toString().length == 5) return transformThousandsTens(absoluteNumber);
}
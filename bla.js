function stringSuperReduzida(str) {
    // Escreve aqui o teu código
    let newMap = new Map()
    let novaString = ""

    for(let i = 0; i < str.length; i++){
        if(newMap.has(str[i])){
            let valor = newMap.get(str[i])
            newMap.set(str[i], valor += 1)
        } else {
            newMap.set(str[i], 1)
        }
    }

    newMap.forEach((value, key) => {
        if(value % 2 !== 0){
            novaString = novaString + key
        }
    })

    return novaString.length === 0 ? "String Vazia" : novaString

}

console.log(stringSuperReduzida("abcbba"))


//abbccbbcaazaabbcbbzcz
//aczczcz
//

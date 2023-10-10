const express = require('express')
const app = express()
const port = 3030
const history = require('./history.json')

app.use(express.json())

app.get('/spotidados/playsByMonth/:year', (req, res) => {
    const year = req.params.year

    let playByMonth = new Map()
    
    for(i = 0; i < history.length; i++){ 
        let data = new Date(history[i].ts['$date'])
        let ano = data.getFullYear()
        let mes = data.getMonth() + 1
        if(ano === Number(year)){
            if(playByMonth.has(mes)){
                let plays = playByMonth.get(mes)
                playByMonth.set(mes, plays += 1)
            } else {
                playByMonth.set(mes, 1)

            }
        }
    }

    const obj = Array.from(playByMonth)

//     let maiorMes;
//     let maior = 0;
//     let menorMes;
//     let menor = playByMonth.get(1);

//     playByMonth.forEach((value, key) => {
//         if(maior < value){
//             maior = value
//             maiorMes = key
//         }
//         if(menor > value){
//             menor = value
//             menorMes = key
//         }
//     })

//     let maiorMenorMes = {
//         [maiorMes]: maior, 
//         [menorMes]: menor
// }

    res.status(200).json(obj)
})

app.get('/spotidados/top5Artists', (req, res) => {

    let artistas = new Map()
    
    for(i = 0; i < history.length; i++){
        let artista = history[i].master_metadata_album_artist_name
        if(artistas.has(artista)){
            let nrPlays = artistas.get(artista)
            artistas.set(artista, nrPlays + 1)
        } else {
                artistas.set(artista, 1)

        }
    }
    let arrayArtistas = Array.from(artistas).sort((a, b) => a[1] - b[1])
    let top5 = []

    for(i = arrayArtistas.length - 1; i > arrayArtistas.length - 6; i--){
        top5.push(arrayArtistas[i])
    }

    res.status(200).json(top5)

})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})



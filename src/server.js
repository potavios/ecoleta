const express = require("express") // para usar o express e usar o servidor
const server = express()
const db = require("./database/db") //Exportando o banco de dados

//configurar pasta publica
server.use(express.static("public"))

//Habilitar o uso do req.body na applicaao
server.use(express.urlencoded({ extended: true }))

//Using a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// configurar caminhos do app, rotas
// pagina inicial
//requisicao, pedido
//resposta
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    req.query
    return res.render("create-point.html")

})

server.post("/save-point", (req, res) => {
    //req.body: o corpo do formulário
    //console.log(req.body)

    //Inserir os dados no banco de dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro")

        }
        console.log("Cadastrado com sucesso")
        console.log(this)
        return res.render("create-point.html", { saved: true })

    }

    db.run(query, values, afterInsertData) //chamando afunction afterInsertData como callback, se tivesse () seria chamada na hora

})



server.get("/search", (req, res) => {

    const search = req.query.search
    if (search == "") {
        //pesquisa vazia
        return res.render("search-results.html", { total: 0 })
    }

    //Pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%' `, function(err, rows) {
        if (err) {
            return console.log(err)
        }
        const amountOfPlaces = rows.length

        //mostra a página html com o banco de dados
        return res.render("search-results.html", { places: rows, total: amountOfPlaces })

    })



})




//ligar o servidor
server.listen(3000)
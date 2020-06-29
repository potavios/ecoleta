// import a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

// criar o objeto que irá fazer operacoes no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

// EXPORTANDO O BD PARA SER USADO EM OUTROS LOCAIS
module.exports = db


// // Usar o objeto de banco de dados para fazer as operacoes
// db.serialize(() => {

//     //Criar uma tabela
//     // db.run(`
//     //     CREATE TABLE IF NOT EXISTS places (
//     //         id INTEGER  PRIMARY KEY AUTOINCREMENT,
//     //         image TEXT,
//     //         name TEXT,
//     //         address TEXT,
//     //         address2 TEXT,
//     //         state TEXT,
//     //         city TEXT,
//     //         items TEXT
//     //     );
//     // `)

//     // // Inserir os dados da tabela
//     // const query = `
//     //     INSERT INTO places (
//     //         image,
//     //         name,
//     //         address,
//     //         address2,
//     //         state,
//     //         city,
//     //         items
//     //     ) VALUES (?,?,?,?,?,?,?);
//     // `

//     // const values = [
//     //     "https://images.unsplash.com/photo-https://images.unsplash.com/photo-1481761289552-381112059e05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60",
//     //     "Paper Sider",
//     //     "David Tows, Xaxim",
//     //     "Número 1002 - Casa",
//     //     "SP",
//     //     "São Paulo",
//     //     "Resíduos Papeis e lâmpadas"
//     // ]

//     // function afterInsertData(err) {
//     //     if (err) {
//     //         return console.log(err)
//     //     }
//     //     console.log("Cadastrado com sucesso")
//     //     console.log(this)
//     // }

//     // db.run(query, values, afterInsertData) //chamando afunction afterInsertData como callback, se tivesse () seria chamada na hora


//     // Consultar dados na tabela
//     // db.all(`SELECT name FROM places`, function(err, rows) {
//     //     if (err) {
//     //         return console.log(err)
//     //     }
//     //     console.log("Aqui estão seus registros: ")
//     //     console.log(rows)
//     // })


//     //Deletar um dado da tabela
//     db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) {
//         if (err) {
//             return console.log(err)
//         }
//         console.log("Aqui estão Registro deletado com sucesso.")
//         console.log(rows)
//     })


// })
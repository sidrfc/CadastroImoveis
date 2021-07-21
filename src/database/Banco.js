import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

//Variáveis de conexão/criação do banco de dados 
const database_name = "CadastroImoveis.db"; //Nome do banco de dados
const database_version = "1.0"; //Versão do banco de dados
const database_displayname = "CRUD CadastroImoveis"; //Nome de exibição do banco de dados
const database_size = 200000; //tamanho do banco de dados

export default class Banco 
{
    conectar() {
        let db;
        return new Promise((resolve) => {
            console.log("Verificar integridade do plugin...");
            SQLite.echoTest().then(() => {
                console.log("Integridade está OK!");
                console.log("Abrindo banco de dados...");
                SQLite.openDatabase(database_name, database_version, database_displayname, database_size).then(DB => {
                    db = DB;
                    console.log("Banco de dados aberto!");
                    db.executeSql("SELECT 1 FROM Imoveis LIMIT 1").then(() => {
                        console.log("O banco de dados está pronto! Executando consulta SQL...")
                    }).catch((error) => {
                        console.log("Erro recebido: ", error);
                        console.log("O banco de dados não está pronto! Criando base de dados...");
                        db.transaction((tx) => {
                            tx.executeSql("CREATE TABLE IF NOT EXISTS Imoveis (id INTEGER PRIMARY KEY AUTOINCREMENT, endereco VARCHAR(30), finalidade VARCHAR (15), tipo VARCHAR(20), valor VARCHAR(15), imagem text)");
                        }).then(() => {
                            console.log("Tabela criada com sucesso!");
                        }).catch(error => {
                            console.log(error);
                        });
                    });
                    resolve(db);
                }).catch(error => {
                    console.log(error);
                });
            }).catch(error => {
                console.log("Teste echoTest falhou - plugin não funcional");
            });
        });
    }

    desconectar(db) {
        if(db) {
            console.log("Fechando banco de dados...")
            db.close().then(status => {
                console.log("Banco de dados desconectado!");
            }).catch(error => {
                this.errorCB(error);
            });
        } else {
            console.log("A conexão com o banco não está aberta");
        }
    }
    

    //Função para listar itens da tabela produtos
    listar() {  
        return new Promise((resolve) => {    
            const imoveis = [];    
            this.conectar().then((db) => {      
                db.transaction((tx) => {     
                    //Query SQL para listar os dados da tabela   
                    tx.executeSql('SELECT * FROM Imoveis', []).then(([tx,results]) => {          
                    console.log("Consulta completa");          
                    var len = results.rows.length;          
                    for (let i = 0; i < len; i++) {            
                        let row = results.rows.item(i);                    
                        const {id, endereco, finalidade, tipo, valor, imagem } = row;
                        imoveis.push({id, endereco, finalidade, tipo, valor, imagem});
                    }
                    console.log(imoveis);          
                    resolve(imoveis);
                    });
                }).then((result) => {
                    this.desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }


      //Função para buscar os dados de um produto específico pelo id 
      buscarPorId(id) {  
        console.log(id);  
        return new Promise((resolve) => {    
            this.conectar().then((db) => {      
                db.transaction((tx) => {   
                    //Query SQL para buscar as informações do produto     
                    tx.executeSql('SELECT * FROM Imoveis WHERE id = ?', [id]).then(([tx,results]) => {          
                      console.log(results);         
                      if(results.rows.length > 0) {            
                          let row = results.rows.item(0);            
                          resolve(row);          
                      }        
                  });      
                }).then((result) => {        
                    this.desconectar(db);      
                }).catch((err) => {        
                    console.log(err);      
                });    
            }).catch((err) => {      
                console.log(err);    
            });  
        });  
    }
         

    
      // Função para acrescentar um novo produto na tabela
    adicionar(imovel) {  
        return new Promise((resolve) => {    
            this.conectar().then((db) => {      
                db.transaction((tx) => {     
                    //Query SQL para inserir um novo produto   
                    tx.executeSql('INSERT INTO Imoveis VALUES (?, ?, ?, ?, ?, ?)', [imovel.id, imovel.endereco, imovel.finalidade, imovel.tipo, imovel.valor, imovel.imagem]).then(([tx, results]) => { 
                        resolve(results);        
                    });      
                }).then((result) => {        
                    this.desconectar(db);      
                }).catch((err) => {        
                    console.log(err);      
                });    
            }).catch((err) => {      
                console.log(err);    
            });  
        });  
    }

    //Função para excluir um dado do banco pela id
    deletar(id) {  
        return new Promise((resolve) => {    
            this.conectar().then((db) => {      
                db.transaction((tx) => {    
                    //Query SQL para deletar um item da base de dados    
                    tx.executeSql('DELETE FROM Imoveis WHERE id = ?', [id]).then(([tx, results]) => {          
                        console.log(results);          
                        resolve(results);        
                    });      
                }).then((result) => {        
                    this.desconectar(db);      
                }).catch((err) => {        
                    console.log(err);      
                });    
            }).catch((err) => {      
                console.log(err);    
            });  
        });  
    }

}
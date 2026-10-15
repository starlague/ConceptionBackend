const pg = require('pg');

const client = new pg.Client({
    host: 'localhost',
    database: 'mabase', 
    user: 'postgres',
    password: 'root',
    port: 5432
})

async function getUsers() {
    try {
        await client.connect()
        console.log('Connexion réussie à PostgreSQL !')

        const result = await client.query('SELECT * FROM users;')

        console.log(result.rows)
    } catch (err) {
        console.error('Erreur lors de la connexion ou de la requête :', err)
    } finally {
        await client.end()
    }
}

getUsers()
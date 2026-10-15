const pg = require('pg');

function getConnection(username, password, database) {
    const client = new pg.Client({
        host: 'localhost',
        database: database, 
        user: username,
        password: password,
        port: 5432
    })
    return client;
}

async function getUsers(callback) {
    const client = getConnection('postgres', 'root', 'mabase');
    try {
        await client.connect()
        console.log('Connexion réussie à PostgreSQL !')

        const result = await client.query('SELECT * FROM users;')

        callback(null, result.rows)
    } catch (err) {
        callback(err, null)
    } finally {
        await client.end()
    }
}

getUsers((err, users) => {
    if (err) {
        console.error('Erreur lors de la récupération des utilisateurs :', err)
    } else {
        console.log('Utilisateurs récupérés :', users)
    }
})
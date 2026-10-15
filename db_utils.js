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

async function insert_user(user) {
    const client = getConnection('postgres', 'root', 'mabase');

    try {
        await client.connect()

        const result = await client.query('INSERT INTO users (email) VALUES ($1) RETURNING *', [user.email])
        console.log('Utilisateur inséré avec succès :', result.rows[0])
        return result.rows[0]
    } catch (err) {
        console.error('Erreur lors de l\'insertion de l\'utilisateur :', err)
    } finally {
        await client.end()
    }
}

//insert_user({ email: 'nouvel_utilisateur@test.com' })
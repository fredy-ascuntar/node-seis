const database = require('../model/database')

const usuarioController = {

    getUsuarios: (req, res) => {

        const query = 'SELECT * FROM usuarios'

        database.query(query, (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'Error': 'Error en el servidor' })
            } else {
                res.status(200).json(rows)
            }
        })

    },

    getUsuariosC: (req, res) => {

        const { Documento } = req.params

        console.log(Documento)

        const query = 'SELECT * FROM usuarios WHERE documento = ?'

        database.query(query, [Documento], (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'Error': 'Error en el servidor' })
            } else {
                console.log(rows);
                if (rows.length > 0) {
                    res.status(200).json(rows)
                } else {
                    res.status(400).json({ "No encontrado": "El usuario no existe" })
                }

            }
        })
    },

    login: (req, res) => {

        const { usuario, pasword } = req.body

        const query = 'SELECT COUNT(*) sum FROM acceso WHERE usuario = ? and contrasena = ?'

        database.query(query, [usuario, pasword], (err, rows) => {

            if (err) {
                console.log(err);
            } else {

                console.log(JSON.stringify(rows));

                const count = JSON.parse(JSON.stringify(rows))[0]['sum']

                if (count == 0) {
                    res.status(400).json({ 'Error': 'No existe' })
                } else {
                    res.status(200).json({ 'Exito': 'Existe' })
                }


            }

        })

    },

    createUsuarios: (req, res) => {

        const { documento, nombre, direccion, telefono } = req.body

        const query = 'INSERT INTO usuarios VALUES (?,?,?,?)'

        database.query(query, [documento, nombre, direccion, telefono], (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'Error': 'Error en el servidor' })
            } else {
                res.status(201).json({ 'Exito': 'Usuario Creado' })
            }
        })

    },

    updateUsuarios: (req, res) => {

        const { documento, nombre, direccion, telefono } = req.body

        const query = 'UPDATE usuarios SET nombres = ?, direccion = ?, telefono = ? WHERE documento = ?'

        database.query(query, [nombre, direccion, telefono, documento], (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'Error': 'Error en el servidor' })
            } else {
                res.status(201).json({ 'Exito': 'Usuario Actualizado' })
            }
        })

    },

    deleteUsuarios: (req, res) => {

        const { documento } = req.body

        const query = 'DELETE FROM usuarios where documento = ?'

        database.query(query, [documento], (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'Error': 'Error en el servidor' })
            } else {
                res.status(201).json({ 'Exito': 'Usuario Eliminado' })
            }
        })

    }

}

exports.default = usuarioController
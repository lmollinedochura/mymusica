const express = require('express');
const yts = require('yt-search');
const cors = require('cors'); // Agregado para permitir conexión desde el celular
const app = express();

app.use(cors()); // Esto es vital para que la APK no bloquee la búsqueda

app.get('/search', async (req, res) => {
    try {
        const r = await yts(req.query.q || 'music');
        // Enviamos datos limpios y ligeros a la APK
        res.json(r.videos.slice(0, 25).map(v => ({ 
            id: v.videoId, 
            n: v.title, 
            t: v.thumbnail, 
            a: v.author.name,
            d: v.timestamp 
        })));
    } catch (e) {
        res.status(500).json({ error: "Error en el servidor" });
    }
});

// Render usa un puerto dinámico, esto es obligatorio:
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Servidor en la nube activo en puerto ' + PORT);
});
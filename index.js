const express = require('express');
const yts = require('yt-search');
const cors = require('cors'); 
const app = express();

// Permite que tu APK de Android se conecte al servidor
app.use(cors()); 

// Ruta de búsqueda para la aplicación
app.get('/search', async (req, res) => {
    try {
        const query = req.query.q || 'music';
        const r = await yts(query);
        
        // Enviamos solo los datos necesarios para que la app sea rápida
        const videos = r.videos.slice(0, 25).map(v => ({ 
            id: v.videoId, 
            n: v.title, 
            t: v.thumbnail, 
            a: v.author.name,
            d: v.timestamp 
        }));
        
        res.json(videos);
    } catch (e) {
        res.status(500).json({ error: "Error en el servidor de búsqueda" });
    }
});

// Render asigna el puerto automáticamente mediante process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Servidor en la nube activo en puerto ' + PORT);
});

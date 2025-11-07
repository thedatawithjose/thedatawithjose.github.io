const https = require('https');
const fs = require('fs');
const path = require('path');

// Imágenes de Unsplash optimizadas para data engineering
const images = [
  {
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80',
    filename: 'data-engineering-bg-1.jpg',
    description: 'Abstract data visualization'
  },
  {
    url: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80',
    filename: 'data-engineering-bg-2.jpg', 
    description: 'Network connections'
  },
  {
    url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80',
    filename: 'data-engineering-bg-3.jpg',
    description: 'Code and algorithms'
  }
];

// Crear directorio si no existe
const bgDir = path.join(__dirname, '..', 'public', 'images', 'backgrounds');
if (!fs.existsSync(bgDir)) {
  fs.mkdirSync(bgDir, { recursive: true });
}

// Función para descargar imagen
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(bgDir, filename);
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✅ Downloaded: ${filename}`);
        resolve();
      });
      
      file.on('error', (err) => {
        fs.unlink(filePath, () => {}); // Eliminar archivo parcial
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Descargar todas las imágenes
async function downloadAllImages() {
  console.log('🎨 Downloading background images from Unsplash...');
  
  try {
    for (const image of images) {
      await downloadImage(image.url, image.filename);
    }
    console.log('🎉 All background images downloaded successfully!');
  } catch (error) {
    console.error('❌ Error downloading images:', error);
  }
}

downloadAllImages();
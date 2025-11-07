// Script para descargar imágenes de fondo para los hero slides
// Ejecutar con: node scripts/download-hero-backgrounds.js

const https = require('https');
const fs = require('fs');
const path = require('path');

// Imágenes de Unsplash con temática de datos/tecnología
const images = [
  {
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80', // Data visualization
    filename: 'hero-slide-1.jpg',
    description: 'Data infrastructure background'
  },
  {
    url: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1920&q=80', // Trading/Finance
    filename: 'hero-slide-2.jpg',
    description: 'Trading systems background'
  },
  {
    url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1920&q=80', // Engineering/Architecture
    filename: 'hero-slide-3.jpg',
    description: 'Engineering solutions background'
  }
];

const downloadDir = path.join(__dirname, '..', 'public', 'images', 'hero');

// Crear directorio si no existe
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir, { recursive: true });
  console.log(`Created directory: ${downloadDir}`);
}

// Función para descargar imagen
function downloadImage(url, filepath, description) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading ${description}...`);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`✓ Downloaded: ${filepath}`);
          resolve();
        });
      } else {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Descargar todas las imágenes
async function downloadAll() {
  console.log('Starting hero background downloads...\n');
  
  for (const image of images) {
    const filepath = path.join(downloadDir, image.filename);
    
    try {
      await downloadImage(image.url, filepath, image.description);
    } catch (error) {
      console.error(`✗ Error downloading ${image.filename}:`, error.message);
    }
  }
  
  console.log('\nDownload complete!');
  console.log(`Images saved to: ${downloadDir}`);
}

downloadAll();

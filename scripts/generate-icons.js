import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

// Minimal PNG generator using Node built-in zlib
function createPng(width, height, r, g, b, a = 255) {
  // Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // 8-bit depth
  ihdr.writeUInt8(6, 9); // RGBA color type
  ihdr.writeUInt8(0, 10); // compression
  ihdr.writeUInt8(0, 11); // filter
  ihdr.writeUInt8(0, 12); // interlace

  const ihdrChunk = makeChunk('IHDR', ihdr);

  // Raw image data: height lines, each line has 1 filter byte (0) followed by width * 4 RGBA bytes
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);

  // Draw an indigo background with a stylized white graduation cap in the center
  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter None

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;

      // Coordinate normalized from -1 to 1
      const nx = (x / width) * 2 - 1;
      const ny = (y / height) * 2 - 1;

      // Check distance from center for subtle rounded corner or circle
      const dist = Math.sqrt(nx * nx + ny * ny);

      // Default indigo background #4f46e5 (79, 70, 229)
      let pr = 79, pg = 70, pb = 229, pa = 255;

      // Center diamond/rhombus shape for graduation cap: |nx| * 1.5 + |ny + 0.15| * 2 < 0.6
      const inCapTop = (Math.abs(nx) * 1.3 + Math.abs(ny + 0.1) * 2.2) < 0.7 && (ny < 0.2);
      // Cap skull base
      const inCapBase = Math.abs(nx) < 0.35 && ny >= 0.05 && ny <= 0.35;
      // Tassel
      const inTassel = nx >= 0.45 && nx <= 0.52 && ny >= -0.05 && ny <= 0.4;

      if (inCapTop || inCapBase || inTassel) {
        // White cap
        pr = 255;
        pg = 255;
        pb = 255;
        pa = 255;
      }

      rawData[pxOffset] = pr;
      rawData[pxOffset + 1] = pg;
      rawData[pxOffset + 2] = pb;
      rawData[pxOffset + 3] = pa;
    }
  }

  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressedData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function makeChunk(type, data) {
  const length = data.length;
  const chunk = Buffer.alloc(4 + 4 + length + 4);
  chunk.writeUInt32BE(length, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);

  // Calculate CRC32
  const crc = crc32(chunk.subarray(4, 8 + length));
  chunk.writeUInt32BE(crc, 8 + length);
  return chunk;
}

// Standard CRC32 table
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate PWA icons
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), createPng(192, 192, 79, 70, 229));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), createPng(512, 512, 79, 70, 229));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), createPng(512, 512, 79, 70, 229));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), createPng(180, 180, 79, 70, 229));

console.log('Successfully generated PWA PNG icons in /public');

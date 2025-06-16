// // // const { Client } = require('whatsapp-web.js');
// // // const qrcode = require('qrcode-terminal');
// // import {Client} from 'whatsapp-web.js'
// // import {qrcode} from 'qrcode-terminal'

// // const client = new Client();

// // client.on('qr', (qr: any) => {
// //     qrcode.generate(qr, { small: true });
// //     console.log('Scan this QR code with your phone to log in');
// // });

// // client.on('ready', () => {
// //     console.log('Client is ready!');
// // });

// // client.on('message', (message: any) => {
// //     console.log(`Received message: ${message.body}`);

// //     // Example: Auto reply to "ping"
// //     if (message.body.toLowerCase() === 'ping') {
// //         message.reply('pong');
// //     }
// // });

// // client.initialize();

// // src/whatsapp/client.ts
// import { Client, LocalAuth, Message } from 'whatsapp-web.js';
// import qrcode from 'qrcode-terminal';

// const client = new Client({
//   authStrategy: new LocalAuth(),
// });

// let isClientReady = false;

// client.on('qr', (qr: string) => {
//   qrcode.generate(qr, { small: true });
//   console.log('Scan this QR code with your phone to log in');
// });

// client.on('ready', () => {
//   console.log('✅ WhatsApp client is ready!');
//   isClientReady = true;
// });

// client.on('message', async (message: Message) => {
//   console.log(`💬 Message received: ${message.body}`);

//   if (message.body.toLowerCase() === 'ping') {
//     await message.reply('pong');
//   }
// });

// client.initialize();
// export { client, isClientReady };


import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

console.log('⏳ Creating WhatsApp client...');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: false, // open browser
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
});

console.log('🚀 Initializing WhatsApp client...');
client.initialize(); // ⬅️ This MUST run

client.on('qr', (qr) => {
  console.log('📱 QR Code received');
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
  console.log('🔓 Authenticated successfully');
});

client.on('auth_failure', (msg) => {
  console.error('❌ Authentication failed:', msg);
});

client.on('ready', () => {
  console.log('✅ WhatsApp client is ready!');
});

export { client };

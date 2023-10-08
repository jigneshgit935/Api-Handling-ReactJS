import express from 'express';
const app = express();
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Api working properly');
});

app.get('/api/products', (req, res) => {
  const products = [
    {
      id: 1,
      name: 'Iphone 12',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: '50,999',
      imageUrl:
        'https://tse2.mm.bing.net/th?id=OIP.Xfo1aHIjLGIizcUPueZDWAHaIF&pid=Api&P=0&h=220',
    },
    {
      id: 2,
      name: 'Motorola Moto G82',
      description: 'Aenean euismod tempor ante, non tristique orci laoreet ut.',
      price: '19,999',
      imageUrl: 'https://phonesdata.com/files/models/Motorola-Moto-G82-256.jpg',
    },
    {
      id: 3,
      name: 'Nokia 5G',
      description:
        'Vivamus bibendum ante eu libero varius, a dapibus velit facilisis.',
      price: '10,999',
      imageUrl:
        'https://tse3.mm.bing.net/th?id=OIP.2S7KQ03DhzxlPZC_53QOBgHaHa&pid=Api&P=0&h=220',
    },
    {
      id: 4,
      name: 'Redmi 12',
      description:
        'Proin aliquam, purus non commodo lacinia, justo odio euismod sapien.',
      price: '15,000',
      imageUrl:
        'https://tse1.mm.bing.net/th?id=OIP.ahoZ8naMLG0udfMDmvktNAHaHa&pid=Api&P=0&h=220',
    },
    {
      id: 5,
      name: 'Google Pixel 7 Pro',
      description: 'Fusce vel tristique augue, vel pellentesque tortor.',
      price: '72,999',
      imageUrl:
        'https://phonesdata.com/files/models/Google-Pixel-7-Pro-645.jpg',
    },
  ];
  if (req.query.search) {
    const filterProduct = products.filter((product) =>
      product.name.includes(req.query.search)
    );
    res.send(filterProduct);
    return;
  }
  setTimeout(() => {
    res.send(products);
  }, 3000);
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});

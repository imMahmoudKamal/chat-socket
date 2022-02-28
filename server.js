import express from 'express';
import env from 'dotenv';
const PORT = env.PORT || 5000;
const app = express();

app.use(express.static('./views'));
app.use('/public', express.static('./public'));

app.get((req, res) => {
  app.render('./views');
});

app.listen(PORT, () => {
  console.log(`App is running on PORT: ${PORT}`);
});

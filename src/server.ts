import app from './app';
import mongoose from 'mongoose';
import config from './app/config';
import colors from 'colors';

async function main() {
  try {
    // database connection
    mongoose.connect(config.database_url as string).then(() => {
      console.log(colors.green.bold('Database connection was successful! 🛢'));
    });

    app.listen(config.port, () => {
      console.log(colors.yellow.bold(`App is running on port ${config.port}`));
    });
  } catch (err) {
    console.log(err);
  }
}

main();

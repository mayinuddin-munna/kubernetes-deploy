/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import colors from 'colors/safe';

async function main() {
  try {
    await mongoose.connect(config.database_url as string).then(() => {
      console.log(
        colors.bold(colors.green(`Database connection is successful 🛢`)),
      );
    });

    app.listen(config.port, () => {
      console.log(
        colors.bold(colors.yellow(`App is listening on port ${config.port}`)),
      );
    });
  } catch (err) {
    console.log(err);
  }
}

main();

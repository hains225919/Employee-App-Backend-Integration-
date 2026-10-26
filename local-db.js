const { MongoMemoryServer } = require('mongodb-memory-server');

async function startLocalDB() {
  try {
    const mongod = await MongoMemoryServer.create({
      instance: {
        port: 27017,
        dbName: 'EmployeeDB'
      }
    });
    console.log('--------------------------------------------------');
    console.log(' Local MongoDB Server is running!');
    console.log(' Connection URI: mongodb://127.0.0.1:27017/EmployeeDB');
    console.log(' Port: 27017');
    console.log(' Database: EmployeeDB');
    console.log(' Press Ctrl+C to stop.');
    console.log('--------------------------------------------------');

    process.on('SIGINT', async () => {
      console.log('\nStopping local MongoDB server...');
      await mongod.stop();
      process.exit(0);
    });
  } catch (error) {
    if (error.code === 'EADDRINUSE' || (error.message && error.message.includes('EADDRINUSE'))) {
      console.log('Port 27017 is already in use (MongoDB is already running).');
    } else {
      console.error('Failed to start local MongoDB:', error.message);
    }
  }
}

startLocalDB();

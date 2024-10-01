const admin = require('firebase-admin');
const fs = require('fs');

// Replace with your Firebase project configuration
const serviceAccount = require('./path/to/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://<YOUR_PROJECT_ID>.firebaseio.com'
});

const firestore = admin.firestore();

const importUsers = async (filePath) => {
    try {
        const data = fs.readFileSync(filePath);
        const users = JSON.parse(data);

        const batch = firestore.batch(); // Use batch write for performance
        users.forEach(user => {
            const docRef = firestore.collection('registered').doc(); // Change 'users' to 'registered'
            batch.set(docRef, user); // Set the user data to Firestore
        });

        await batch.commit(); // Commit the batch write
        console.log('Users imported successfully into the registered collection!');
    } catch (error) {
        console.error('Error importing users:', error);
    }
};

// Replace 'users.json' with the path to your JSON file
importUsers('users.json');
import { db } from '../../../lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

export async function POST(req) {
    const { name, email, year, branch } = await req.json();

    try {
        // Reference to collections
        const registeredCollection = collection(db, 'registered');

        // Check if the entry exists in the registered collection
        const querySnapshot = await getDocs(registeredCollection);
        const registeredEntry = querySnapshot.docs.find(doc => doc.data().email === email);

        if (!registeredEntry) {
            return new Response(JSON.stringify({ message: 'Entry not found in the registered database.' }), { status: 404 });
        }

        // Move the entry to the verified collection
        await addDoc(collection(db, 'verified'), registeredEntry.data());
        await deleteDoc(doc(db, 'registered', registeredEntry.id));

        return new Response(JSON.stringify({ message: 'Entry verified successfully.', details: registeredEntry.data() }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'An error occurred.', error }), { status: 500 });
    }
}
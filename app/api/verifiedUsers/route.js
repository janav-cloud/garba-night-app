import { db } from '../../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export async function GET(req) {
    try {
        const verifiedUsersCollection = collection(db, 'verified');
        const snapshot = await getDocs(verifiedUsersCollection);

        const users = snapshot.docs.map(doc => doc.data());

        return new Response(JSON.stringify({ users, count: users.length }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error fetching verified users' }), {
            status: 500,
        });
    }
}
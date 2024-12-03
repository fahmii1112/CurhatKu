const {auth, db} = require('../config/firebase');
const { router } = require('../routes/auth');

exports.register = async (req, res) => {
    const {email, password, displayName} = req.body;

    try{
        const userRecord = await auth.createUser({
            email,
            password,
            displayName,
        });

        await db.collection('users').doc(userRecord.uid).set({
            email,
            displayName,
           createdAt: new Date(),
        });

        res.status(201).json({message: 'Pengguna berhasil terdaftar', uid: userRecord.uid});
    }

    catch(error){
        res.status(400).json({error: error.message});
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        

        res.status(200).json({ message: 'Login request received. Use Firebase SDK on the client-side.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    const {displayName} = req.params;

    try{
        const usersRef = db.collection('users');
        const snapshot = await usersRef.where('displayName', '==', displayName).get();

        if(snapshot.empty){
            return res.status(404).json({ message: 'User not Found'})
        }

        const userDoc = snapshot.docs[0];
        const uid = userDoc.id;

        await auth.deleteUser(uid);

        await db.collection('users').doc(uid).delete();

        res.status(200).json({ message: 'Pengguna berhasil dihapus' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
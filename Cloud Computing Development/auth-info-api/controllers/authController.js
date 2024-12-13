const {auth, db} = require('../config/firebase');
const { router } = require('../routes/auth');
const { v4: uuidv4 } = require('uuid');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            status: 400,
            message: "Missing required fields",
            error: {
                details: "Please provide name, email, and password."
            }
        });
    }

    if (password.length < 8) {
        return res.status(400).json({
            status: 400,
            message: "Password too short",
            error: {
                details: "Password must be at least 8 characters long."
            }
        });
    }

    if (!email.includes('@')) {
        return res.status(400).json({
            status: 400,
            message: "Invalid email format",
            error: {
                details: "Email must contain '@' symbol."
            }
        });
    }

   const userQuerySnapshot = await db.collection('users').where('email', '==', email).get();
   if (!userQuerySnapshot.empty) {
       return res.status(409).json({  
           status: 409,
           message: "Akun sudah terdaftar",  // Pesan untuk user Android
           error: {
               details: "The user has already registered with this email address."
           }
       });
   }

    const id = uuidv4().replace(/-/g, '').slice(0, 16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    try {
        const userRef = db.collection('users').doc(id);
        const userData = { id, name, email, password, insertedAt, updatedAt };
        await userRef.set(userData);

        return res.status(201).json({
            status: 201,
            message: "User registered successfully",
            data: { id, name, email, insertedAt, updatedAt }
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: {
                details: error.message
            }
        });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Query untuk mencari dokumen berdasarkan email
        const userQuerySnapshot = await db.collection('users').where('email', '==', email).get();

        // Validasi jika user tidak ditemukan
        if (userQuerySnapshot.empty) {
            return res.status(400).json({
                status: 400,
                message: "Invalid credentials",
                error: {
                    details: "Authentication failed. User not found."
                }
            });
        }

        // Ambil data user dari dokumen pertama (jika ada)
        const userDoc = userQuerySnapshot.docs[0];
        const userData = userDoc.data();

        // Validasi password
        if (userData.password !== password) {
            return res.status(400).json({
                status: 400,
                message: "Invalid credentials",
                error: {
                    details: "Authentication failed. Incorrect password."
                }
            });
        }

        // Jika berhasil login
        return res.status(200).json({
            status: 200,
            message: "User logged in successfully",
            user: {
                name: userData.name, 
                email: userData.email
            }
        });

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: {
                details: error.message
            }
        });
    }
};

exports.deleteUser = async (req, res) => {
    const { name } = req.params;

    try {
        // Referensi koleksi 'users'
        const usersRef = db.collection('users');

        // Query untuk mencari pengguna berdasarkan nama
        const snapshot = await usersRef.where('name', '==', name).get();

        if (snapshot.empty) {
            return res.status(404).json({ 
                status: 404,
                message: 'User not found',
                error: {
                    details: `No user found with the name: ${name}`
                }
            });
        }

        // Jika ditemukan lebih dari satu user dengan nama yang sama
        if (snapshot.size > 1) {
            return res.status(400).json({
                status: 400,
                message: 'Ambiguous user deletion',
                error: {
                    details: 'Multiple users found with the same name. Please use a unique identifier (e.g., email or ID) to delete a specific user.'
                }
            });
        }

        // Ambil dokumen user yang ditemukan
        const userDoc = snapshot.docs[0];
        const userId = userDoc.id; // ID pengguna di Firestore

        // Hapus pengguna dari Firebase Authentication (jika UID sama dengan Firestore ID)
        try {
            await auth.deleteUser(userId);
        } catch (authError) {
            console.error('Error deleting user from Firebase Auth:', authError);
        }

        // Hapus pengguna dari Firestore
        await db.collection('users').doc(userId).delete();

        // Berikan respons sukses
        return res.status(200).json({
            status: 200,
            message: 'User deleted successfully',
            data: {
                userId,
                name
            }
        });

    } catch (error) {
        // Tangani error
        console.error('Error during user deletion:', error);
        return res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: {
                details: error.message
            }
        });
    }
};

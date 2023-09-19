import React, { useState, useEffect } from 'react';
import Gallery from './components/Gallery'; // Assuming Gallery has been modified for DnD.
import firebase from './firebase';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';


function App() {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState(''); // Added search state

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();  // cleanup the listener
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // clear previous error

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return <div className="spinner"></div>;  // Loading spinner while checking auth state
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="App">
                {user ? (
                    <div>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by tag..."
                        />
                        <Gallery searchTerm={search} />
                    </div>
                ) : (
                    <div>
                        <h2>Login</h2>
                        {error && <p style={{color: 'red'}}>{error}</p>}
                        <form onSubmit={handleLogin}>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                            <button type="submit">Login</button>
                        </form>
                    </div>
                )}
            </div>
        </DndProvider>
    );
}

export default App;

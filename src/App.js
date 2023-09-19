import React, { useState, useEffect } from 'react';
import Gallery from './components/Gallery';
import { auth } from './firebase';
// ... (rest of the imports remain unchanged)

// ... (rest of the code remains unchanged)

useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
            setUser(authUser);
        } else {
            setUser(null);
        }
        setLoading(false);
    });

    return () => unsubscribe();
}, []);

const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
        await auth.signInWithEmailAndPassword(email, password);
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

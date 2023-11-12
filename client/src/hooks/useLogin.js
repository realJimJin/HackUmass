import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Initialize as false
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('https://hackumass.onrender.com/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const json = await response.json();

            if (!response.ok) {
                setIsLoading(false);
                setError(json.error || 'An error occurred during login'); // Fallback error message
            }

            if (response.ok) {
                // Save user details to local storage, including _id
                localStorage.setItem('user', JSON.stringify(json));
                dispatch({ type: 'LOGIN', payload: json });
                setIsLoading(false);
            }
        } catch (err) {
            setIsLoading(false);
            setError(err.message || 'Failed to log in');
        }
    };

    return { login, isLoading, error };
};

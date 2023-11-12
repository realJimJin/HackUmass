import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Default should be false
    const { dispatch } = useAuthContext();

    const signup = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('https://hackumass.onrender.com/api/user/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });


            const json = await response.json(); // Await the resolution of json()
            // console.log('Response status:', response.status);
            // console.log('Response payload:', json);

            if (!response.ok) {
                setIsLoading(false);
                setError(json.error || 'An error occurred'); // Fallback error message
            }

            if (response.ok) {
                // Assuming json contains _id along with email and token
                localStorage.setItem('user', JSON.stringify(json));
                dispatch({ type: 'LOGIN', payload: json });
                setIsLoading(false);
            }
        } catch (err) {
            setIsLoading(false);
            setError(err.message || 'Failed to sign up');
        }
    };

    return { signup, isLoading, error };
};

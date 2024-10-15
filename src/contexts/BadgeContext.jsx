import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const BadgeContext = createContext({
    badges: [],
    resetBadges: () => {}
});

export const useBadges = () => useContext(BadgeContext);

/**
 * Context provider for badges
 * @param children
 */
export const BadgeProvider = ({ children }) => {
    const [badges, setBadges] = useState([]);

    const fetchBadges = async () => {
        try {
            const response = await axios.get('/badge');
            setBadges(response.data.results);
            return response.data.results;
        } catch (error) {
            return error;
        }
    };

    const resetBadges = async () => {
        try {
            const result = await fetchBadges();
            console.log('Badges fetched:', result);
        } catch (error) {
            console.error('Failed to fetch badges:', error);
        }
    };

    useEffect(() => {
        fetchBadges().then(r => {
            if (r instanceof Error) {
                console.log('Failed to fetch badges:', r);
            } else {
                console.log('Badges fetched:', r);
            }
        });
    }, []);

    return (
        <BadgeContext.Provider value={{ badges, resetBadges }}>
            {children}
        </BadgeContext.Provider>
    );
};

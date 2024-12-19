import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ResourcesContext = createContext({
    resources: [],
    resetResources: () => {}
});

export const useResources = () => useContext(ResourcesContext);

/**
 * Context provider for resources
 * @param children
 */
export const ResourcesProvider = ({ children }) => {
    const [resources, setResources] = useState([]);

    const fetchResources = async () => {
        try {
            const response = await axios.get('/resources');
            setResources(response.data.results);
            return response.data.results;
        } catch (error) {
            return error;
        }
    };

    const resetResources = async () => {
        try {
            const result = await fetchResources();
            console.log('Resources fetched:', result);
        } catch (error) {
            console.error('Failed to fetch resources:', error);
        }
    };

    // useEffect(() => {
    //     fetchResources().then(r => {
    //         if (r instanceof Error) {
    //             console.log('Failed to fetch resources:', r);
    //         } else {
    //             console.log('Resources fetched:', r);
    //         }
    //     });
    // }, []);

    return (
        <ResourcesContext.Provider value={{ resources, resetResources }}>
            {children}
        </ResourcesContext.Provider>
    );
};

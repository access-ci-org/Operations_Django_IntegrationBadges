import React, {createContext, useContext, useState, useEffect} from 'react';
import axios from 'axios';

const OrganizationsContext = createContext({
    organizations: [],
    organizationMap: {},
    resetOrganizations: () => {},
    fetchOrganization: ({organizationId}) => {}
});

export const useOrganizations = () => useContext(OrganizationsContext);

/**
 * Context provider for organizations
 * @param children
 */
export const OrganizationsProvider = ({children}) => {
    const [organizations, setOrganizations] = useState([]);
    const [organizationMap, setOrganizationMap] = useState({});

    const fetchOrganization = async ({organizationId}) => {
        try {
            const response = await axios.get(`https://operations-api.access-ci.org/wh2/cider/v1/organizations/organization_id/${organizationId}`);
            setOrganizationMap({
                ...organizationMap,
                [organizationId]: response.data.results
            });
            return response.data.results;
        } catch (error) {
            return error;
        }
    };
    const fetchOrganizations = async () => {
        try {
            const response = await axios.get('https://operations-api.access-ci.org/wh2/cider/v1/organizations/');
            setOrganizations(response.data.results);
            return response.data.results;
        } catch (error) {
            return error;
        }
    };

    const resetOrganizations = async () => {
        try {
            const result = await fetchOrganizations();
            console.log('Organizations fetched:', result);
        } catch (error) {
            console.error('Failed to fetch organizations:', error);
        }
    };

    // useEffect(() => {
    //     fetchOrganizations().then(r => {
    //         if (r instanceof Error) {
    //             console.log('Failed to fetch organizations:', r);
    //         } else {
    //             console.log('Organizations fetched:', r);
    //         }
    //     });
    // }, []);

    return (
        <OrganizationsContext.Provider value={{organizations, organizationMap, resetOrganizations, fetchOrganization}}>
            {children}
        </OrganizationsContext.Provider>
    );
};

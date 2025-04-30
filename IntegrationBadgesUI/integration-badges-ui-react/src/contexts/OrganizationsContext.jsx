import React, {createContext, useContext, useReducer} from 'react';
import axios from 'axios';
import {useResources} from "./ResourcesContext";
import DefaultReducer from "./reducers/DefaultReducer";

const OrganizationsContext = createContext({
    // organizationIds: [],
    // organizationMap: {},
    // organizationMapByName: {},
    fetchOrganizations: () => {
    },
    fetchOrganization: ({organizationId}) => {
    },
    getOrganization: ({organizationName = null, organizationId = null}) => {
    },
    getOrganizations: () => {
    }
});

export const useOrganizations = () => useContext(OrganizationsContext);

/**
 * Context provider for organizations
 * @param children
 */
export const OrganizationsProvider = ({children}) => {
    const [organizationIds, setOrganizationIds] = useReducer(DefaultReducer, []);
    const [organizationMap, setOrganizationMap] = useReducer(DefaultReducer, {});
    const [organizationMapByName, setOrganizationMapByName] = useReducer(DefaultReducer, {});

    const fetchOrganization = async ({organizationId}) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_ORGANIZATION_API_URL}organizations/organization_id/${organizationId}`);
            const organization = response.data.results;
            setOrganizationMap({
                ...organizationMap, [organizationId]: organization
            });

            setOrganizationMapByName({
                ...organizationMapByName, [organization.organization_name]: organization
            });

            setOrganizationMap({
                ...organizationMap, [organizationId]: {
                    ...organization
                }
            });

            return response.data.results;
        } catch (error) {
            console.log(error)
            return error;
        }
    };
    const fetchOrganizations = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_ORGANIZATION_API_URL}organizations/`);
            const _organizations = response.data.results;

            const _organizationIds = [];
            const _organizationMap = {};
            const _organizationMapByName = {};
            for (let i = 0; i < _organizations.length; i++) {
                const _organization = _organizations[i];
                const organizationId = _organization.organization_id;

                _organizationIds.push(organizationId);
                _organizationMap[organizationId] = _organization;
                _organizationMapByName[_organization.organization_name] = _organization;
            }

            setOrganizationIds(_organizationIds);

            setOrganizationMap({
                ...organizationMap, ..._organizationMap
            });

            setOrganizationMapByName({
                ...organizationMapByName, ..._organizationMapByName
            });

            return response.data.results;
        } catch (error) {
            console.log(error)
            return error;
        }
    };

    const getOrganization = ({organizationName = null, organizationId = null}) => {
        if (organizationMapByName[organizationName]) {
            return organizationMapByName[organizationName];
        } else if (organizationMap[organizationId]) {
            return organizationMap[organizationId];
        }
    };


    const getOrganizations = () => {
        // console.log("###### organizationIds ", organizationIds)
        return organizationIds.map(organizationId => getOrganization({organizationId}));
    };

    return (<OrganizationsContext.Provider
        value={{
            organizationIds,
            organizationMap,
            organizationMapByName,
            fetchOrganizations,
            fetchOrganization,
            getOrganization,
            getOrganizations
        }}>
        {children}
    </OrganizationsContext.Provider>);
};

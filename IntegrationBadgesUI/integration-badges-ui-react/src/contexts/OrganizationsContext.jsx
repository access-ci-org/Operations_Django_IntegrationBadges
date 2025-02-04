import React, {createContext, useContext, useReducer} from 'react';
import axios from 'axios';
import {useResources} from "./ResourcesContext";
import DefaultReducer from "./reducers/DefaultReducer";

const OrganizationsContext = createContext({
    organizations: [],
    organizationMap: {},
    organizationMapByName: {},
    fetchOrganizations: () => {
    },
    fetchOrganization: ({organizationId}) => {
    }
});

export const useOrganizations = () => useContext(OrganizationsContext);

/**
 * Context provider for organizations
 * @param children
 */
export const OrganizationsProvider = ({children}) => {
    const [organizations, setOrganizations] = useReducer(DefaultReducer, []);
    const [organizationMap, setOrganizationMap] = useReducer(DefaultReducer, {});
    const [organizationMapByName, setOrganizationMapByName] = useReducer(DefaultReducer, {});
    const {resources, fetchResources, fetchResource} = useResources();

    const fetchOrganization = async ({organizationId}) => {
        try {
            const response = await axios.get(`https://operations-api.access-ci.org/wh2/cider/v1/organizations/organization_id/${organizationId}`);
            const organization = response.data.results;
            setOrganizationMap({
                ...organizationMap,
                [organizationId]: organization
            });

            setOrganizationMapByName({
                ...organizationMapByName,
                [organization.organization_name]: organization
            });

            const fetchRequestsForIndividualResources = [];
            const orgResourceIds = [];

            for (let i = 0; i < resources.length; i++) {
                let resource = resources[i];
                if (resource.organization_name === organization.organization_name) {
                    orgResourceIds.push(resource.cider_resource_id);
                    // await fetchResource({
                    //     resourceId: resource.cider_resource_id
                    // });
                    // fetchRequestsForIndividualResources.push(fetchResource({
                    //     resourceId: resource.cider_resource_id
                    // }));
                }
            }

            //await Promise.all(fetchRequestsForIndividualResources);

            setOrganizationMap({
                ...organizationMap,
                [organizationId]: {
                    ...organization,
                    resourceIds: orgResourceIds
                }
            });

            return response.data.results;
        } catch (error) {
            return error;
        }
    };
    const fetchOrganizations = async () => {
        try {
            const response = await axios.get('https://operations-api.access-ci.org/wh2/cider/v1/organizations/');
            const _organizations = response.data.results;
            setOrganizations(_organizations);

            const _organizationMap = {};
            const _organizationMapByName = {};
            for (let i = 0; i < _organizations.length; i++) {
                let _organization = _organizations[i];
                _organizationMap[_organization.organizationId] = _organization;
                _organizationMapByName[_organization.organization_name] = _organization;
            }


            setOrganizationMap({
                ...organizationMap,
                ..._organizationMap
            });

            setOrganizationMapByName({
                ...organizationMapByName,
                ..._organizationMapByName
            });

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
        <OrganizationsContext.Provider
            value={{organizations, organizationMap, organizationMapByName, fetchOrganizations, fetchOrganization}}>
            {children}
        </OrganizationsContext.Provider>
    );
};

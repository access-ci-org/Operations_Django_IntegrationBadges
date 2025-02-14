import React, {createContext, useContext, useReducer} from 'react';
import axios from 'axios';
import DefaultReducer from "./reducers/DefaultReducer";

const ResourcesContext = createContext({
    resources: [],
    resourceMap: {},
    resourceBadgeStatusMap: {},
    resourceBadgeTaskStatusMap: {},
    resourceOrgMap: {},
    fetchResources: ({resourceIds = null} = {}) => {
    },
    fetchSelectedResources: ({resourceIds = null} = {}) => {
    },
    fetchResource: ({resourceId}) => {
    }
});

export const useResources = () => useContext(ResourcesContext);

/**
 * Context provider for resources
 * @param children
 */
export const ResourcesProvider = ({children}) => {
    const [resources, setResources] = useReducer(DefaultReducer, []);
    const [resourceMap, setResourceMap] = useReducer(DefaultReducer, {});
    const [resourceBadgeStatusMap, setResourceBadgeStatusMap] = useReducer(DefaultReducer, {});
    const [resourceBadgeTaskStatusMap, setResourceBadgeTaskStatusMap] = useReducer(DefaultReducer, {});
    const [resourceOrgMap, setResourceOrgMap] = useReducer(DefaultReducer, {});

    const fetchResource = async ({resourceId}) => {
        try {
            return fetchSelectedResources({resourceIds: [resourceId]})
        } catch (error) {
            return error;
        }
    };


    const fetchSelectedResources = async ({resourceIds}) => {
        try {
            let responseList = await Promise.all(resourceIds.map(resourceId => {
                return axios.get(`/resource/${resourceId}`);
            }));
            const _resourceMap = {};
            for (let i = 0; i < resourceIds.length; i++) {
                let resourceId = resourceIds[i];
                let response = responseList[i].data.results;
                _resourceMap[resourceId] = {
                    ...resourceMap[resourceId],
                    ...response
                };

                const _resourceBadgeStatusMap = {};
                const _resourceBadgeTaskStatusMap = {};
                const badgeStatus = response.badge_status
                for (let j = 0; j < badgeStatus.length; j++) {
                    const badgeId = badgeStatus[j].badge_id;
                    _resourceBadgeStatusMap[badgeId] = badgeStatus[j];

                    _resourceBadgeTaskStatusMap[badgeId] = {}
                    const badgeTaskStatus = badgeStatus[j].task_status
                    for (let k = 0; k < badgeTaskStatus.length; k++) {
                        const taskId = badgeTaskStatus[k].task_id;
                        _resourceBadgeTaskStatusMap[badgeId][taskId] = badgeTaskStatus[k];
                    }
                }
                setResourceBadgeStatusMap({
                    ...resourceBadgeStatusMap,
                    [resourceId]: _resourceBadgeStatusMap
                })
                setResourceBadgeTaskStatusMap({
                    ...resourceBadgeTaskStatusMap,
                    [resourceId]: _resourceBadgeTaskStatusMap
                })
            }

            setResourceMap({
                ...resourceMap,
                ..._resourceMap
            });

            return responseList;
        } catch (error) {
            return error;
        }
    };

    const fetchResources = async ({resourceIds = null} = {}) => {
        try {
            if (resourceIds) {
                return fetchSelectedResources({resourceIds});
            } else {
                const response = await axios.get('/resources');
                const _resources = response.data.results;
                setResources(_resources);
                const _resourceMap = {};
                const _resourceOrgMap = {};
                for (let i = 0; i < _resources.length; i++) {
                    let resource = _resources[i];
                    let resourceId = resource.cider_resource_id;
                    _resourceMap[resourceId] = resource;

                    let resourceOrg = resource.organization_name;
                    if (_resourceOrgMap[resourceOrg]) {
                        _resourceOrgMap[resourceOrg].push(resourceId);
                    } else {
                        _resourceOrgMap[resourceOrg] = [resourceId];
                    }
                }

                setResourceMap(_resourceMap);
                setResourceOrgMap(_resourceOrgMap);

                return response.data.results;
            }
        } catch (error) {
            return error;
        }
    };

    return (
        <ResourcesContext.Provider
            value={{resources, resourceMap, resourceBadgeStatusMap, resourceBadgeTaskStatusMap, resourceOrgMap, fetchResources, fetchResource, fetchSelectedResources}}>
            {children}
        </ResourcesContext.Provider>
    );
};

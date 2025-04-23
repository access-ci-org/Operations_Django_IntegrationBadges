import React, {createContext, useContext, useReducer} from 'react';
import axios from 'axios';
import DefaultReducer from "./reducers/DefaultReducer";
import {useBadges} from "./BadgeContext";
import {useOrganizations} from "./OrganizationsContext";
import {useTasks} from "./TaskContext";
import {useRoadmaps} from "./RoadmapContext.jsx";

const ResourcesContext = createContext({
    resources: [],
    resourceMap: {},
    resourceRoadmapIds: {},
    resourceRoadmapBadgeIds: {},
    resourceRoadmapBadgeMap: {},
    resourceRoadmapBadgeTaskMap: {},
    resourceOrgMap: {},
    fetchResources: ({resourceIds = null} = {}) => {
    },
    fetchSelectedResources: ({resourceIds = null} = {}) => {
    },
    fetchResource: ({resourceId}) => {
    },
    fetchResourceRoadmapBadges: ({resourceId, roadmapId}) => {
    },
    getResource: ({resourceId}) => {
    },
    getResourceRoadmaps: ({resourceId}) => {
    },
    isResourceRoadmapSelected: ({resourceId, roadmapId}) => {
    },
    getResourceRoadmapBadges: ({resourceId, roadmapId}) => {
    },
    getResourceBadge: ({resourceId, badgeId}) => {
    },
    getResourceBadgePrerequisites: ({resourceId, badgeId}) => {
    },
    getResourceBadgeTasks: ({resourceId, badgeId}) => {
    },
    getResourceOrganization: ({resourceId}) => {
    },
    getOrganizationResourceIds: ({organizationName}) => {
    },
    setResourceRoadmapBadgeWorkflowStatus: ({resourceId, roadmapId, badgeId, status}) => {
    },
    setResourceRoadmapBadgeTaskWorkflowStatus: ({resourceId, roadmapId, badgeId, taskId, status}) => {
    },
    setResource: ({resourceId, roadmapIds, badgeIds}) => {
    }
});

export const useResources = () => useContext(ResourcesContext);

/**
 * Context provider for resources
 * @param children
 */
export const ResourcesProvider = ({children}) => {
    const {getBadge} = useBadges();
    const {taskMap, badgeTaskIdMap} = useTasks();
    const {getOrganization} = useOrganizations();
    const {getRoadmap} = useRoadmaps();

    const [resources, setResources] = useReducer(DefaultReducer, null);
    const [resourceMap, setResourceMap] = useReducer(DefaultReducer, {});
    const [resourceRoadmapIds, setResourceRoadmapIds] = useReducer(DefaultReducer, {});
    const [resourceRoadmapBadgeIds, setResourceRoadmapBadgeIds] = useReducer(DefaultReducer, {});
    const [resourceRoadmapBadgeMap, setResourceRoadmapBadgeMap] = useReducer(DefaultReducer, {});
    const [resourceRoadmapBadgeTaskMap, setResourceRoadmapBadgeTaskMap] = useReducer(DefaultReducer, {});
    const [resourceOrgMap, setResourceOrgMap] = useReducer(DefaultReducer, {});

    const fetchResource = async ({resourceId}) => {
        try {
            return fetchSelectedResources({resourceIds: [resourceId]})
        } catch (error) {
            return error;
        }
    };

    const fetchResourceRoadmapBadges = async ({resourceId, roadmapId}) => {
        try {
            let resourceRoadmapStatus = await axios.get(`/resource/${resourceId}/roadmap/${roadmapId}/badges/`);
            const badgeStatusMap = {};
            const badgeIds = [];
            for (let j = 0; j < resourceRoadmapStatus.data.results.length; j++) {
                const badgeStatus = resourceRoadmapStatus.data.results[j];
                const badgeId = badgeStatus.badge_id;
                badgeIds.push(badgeId);
                badgeStatusMap[badgeId] = badgeStatus;
            }

            setResourceRoadmapBadgeMap({
                ...resourceRoadmapBadgeMap,
                [resourceId]: {
                    ...resourceRoadmapBadgeMap[roadmapId],
                    [roadmapId]: badgeStatusMap
                }
            });

            setResourceRoadmapBadgeIds({
                ...resourceRoadmapBadgeIds,
                [resourceId]: {
                    ...resourceRoadmapBadgeIds[resourceId],
                    [roadmapId]: badgeIds
                }
            })

            return resourceRoadmapStatus;
        } catch (error) {
            return error;
        }
    };

    function _getBadgeStatusMapFromResourceResponse(resource) {
        const _badgeStatusMap = {};

        const badgeStatus = resource.badge_status
        for (let j = 0; j < badgeStatus.length; j++) {
            const badgeId = badgeStatus[j].badge_id;
            _badgeStatusMap[badgeId] = badgeStatus[j];
        }

        return _badgeStatusMap;
    }

    function _getBadgeTaskStatusMapFromResourceResponse(resource) {
        const _badgeTaskStatusMap = {};

        const badgeStatus = resource.badge_status
        for (let j = 0; j < badgeStatus.length; j++) {
            const badgeId = badgeStatus[j].badge_id;

            _badgeTaskStatusMap[badgeId] = {}
            const badgeTaskStatus = badgeStatus[j].task_status
            for (let k = 0; k < badgeTaskStatus.length; k++) {
                const taskId = badgeTaskStatus[k].task_id;
                _badgeTaskStatusMap[badgeId][taskId] = badgeTaskStatus[k];
            }
        }

        return _badgeTaskStatusMap;
    }

    function _getResourceBadgeIds(resource) {
        let badgeIds = [];
        for (let i = 0; i < resource.roadmaps.length; i++) {
            const roadmap = resource.roadmaps[i].roadmap;
            for (let j = 0; j < roadmap.badges.length; j++) {
                const badgeId = roadmap.badges[j].badge.badge_id;
                badgeIds.push(badgeId);
            }
        }

        return badgeIds;
    }

    const fetchSelectedResources = async ({resourceIds}) => {
        try {
            let responseList = await Promise.all(resourceIds.map(resourceId => {
                return axios.get(`/resource/${resourceId}`);
            }));
            const _resourceMap = {};
            const _resourceRoadmapIds = {};

            for (let i = 0; i < resourceIds.length; i++) {
                let resourceId = resourceIds[i];
                let resource = responseList[i].data.results;
                _resourceMap[resourceId] = {
                    ...getResource({resourceId}),
                    ...resource,
                };
                _resourceRoadmapIds[resourceId] = resource.roadmaps.map(roadmap => roadmap.roadmap.roadmap_id);
            }


            setResourceMap({
                ...resourceMap,
                ..._resourceMap
            });
            setResourceRoadmapIds({
                ...resourceRoadmapIds,
                ..._resourceRoadmapIds
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
                const _resourceMap = {};
                const _resourceOrgMap = {};
                for (let i = 0; i < _resources.length; i++) {
                    let resource = _resources[i];
                    let resourceId = resource.info_resourceid;

                    _resourceMap[resourceId] = {
                        ...getResource({resourceId}),
                        ...resource
                    };

                    _resources[i] = _resourceMap[resourceId];

                    let resourceOrg = resource.organization_name;
                    if (_resourceOrgMap[resourceOrg]) {
                        _resourceOrgMap[resourceOrg].push(resourceId);
                    } else {
                        _resourceOrgMap[resourceOrg] = [resourceId];
                    }
                }


                setResources(_resources);
                setResourceMap(_resourceMap);
                setResourceOrgMap(_resourceOrgMap);

                return response.data.results;
            }
        } catch (error) {
            return error;
        }
    };


    const getResource = ({resourceId}) => {
        return resourceMap[resourceId];
    }

    const getResourceRoadmaps = ({resourceId}) => {
        if (resourceRoadmapIds[resourceId]) {
            resourceRoadmapIds[resourceId].map(roadmapId => getRoadmap({roadmapId}))
        }
    }

    const isResourceRoadmapSelected = ({resourceId, roadmapId}) => {
        return resourceRoadmapIds[resourceId] && resourceRoadmapIds[resourceId].indexOf(roadmapId) >= 0
    }

    const getResourceRoadmapBadges = ({resourceId, roadmapId}) => {
        const resource = getResource({resourceId});
        if (resourceRoadmapBadgeIds[resourceId] && resourceRoadmapBadgeIds[resourceId][roadmapId]) {
            return _getBadgesWithWorkflow({
                resourceId,
                badgeIds: resourceRoadmapBadgeIds[resourceId][roadmapId]
            });
        }
    }

    const getResourceBadge = ({resourceId, badgeId}) => {
        const badges = _getBadgesWithWorkflow({resourceId, badgeIds: [badgeId]})
        if (badges && badges.length > 0) {
            return badges[0];
        }
    }

    const getResourceBadgePrerequisites = ({resourceId, badgeId}) => {
        const badge = getBadge({badgeId});
        if (badge && badge.prerequisites) {
            const badgeIds = badge.prerequisites.map(({prerequisite_badge_id}) => prerequisite_badge_id)
            return _getBadgesWithWorkflow({resourceId, badgeIds: badgeIds});
        }
    }

    const _getBadgesWithWorkflow = ({resourceId, badgeIds}) => {
        let badges;
        const _badges = badgeIds.map(badgeId => {
            let badgeWorkflow = null;
            if (resourceRoadmapBadgeMap[resourceId] && resourceRoadmapBadgeMap[resourceId]) {
                badgeWorkflow = resourceRoadmapBadgeMap[resourceId][badgeId]
            }

            const badge = getBadge({badgeId});
            if (badge) {
                return {
                    ...badge,
                    ...badgeWorkflow
                }
            }
        });

        if (_badges.indexOf(undefined) < 0) {
            badges = _badges;
        }

        return badges;
    }

    const getResourceBadgeTasks = ({resourceId, badgeId}) => {
        let tasks;
        if (badgeTaskIdMap[badgeId]) {
            const _tasks = badgeTaskIdMap[badgeId].map(taskId => {
                let resourceBadgeTaskWorkflow = null;
                if (resourceRoadmapBadgeTaskMap[resourceId] && resourceRoadmapBadgeTaskMap[resourceId][badgeId]) {
                    resourceBadgeTaskWorkflow = resourceRoadmapBadgeTaskMap[resourceId][badgeId][taskId];
                }

                return {
                    ...taskMap[taskId],
                    ...resourceBadgeTaskWorkflow
                }
            });

            if (_tasks.indexOf(undefined) < 0) {
                tasks = _tasks;
            }
        }

        return tasks;
    };


    const getResourceOrganization = ({resourceId}) => {
        const resource = getResource({resourceId});
        if (resource) {
            return getOrganization({organizationName: resource.organization_name})
        }
    }

    const getOrganizationResourceIds = ({organizationName}) => {
        const orgResourceIds = [];

        for (let i = 0; i < resources.length; i++) {
            let resource = resources[i];
            if (resource.organization_name === organizationName) {
                orgResourceIds.push(resource.info_resourceid);
            }
        }

        return orgResourceIds;
    }

    const setResourceRoadmapBadgeWorkflowStatus = async ({resourceId, roadmapId, badgeId, status}) => {
        try {
            const response = await axios.post(
                `/resource/${resourceId}/badge/${badgeId}/workflow/${status}/`,
            );
            await fetchResource({resourceId})

            return response.data.results;
        } catch (error) {
            return error;
        }
    }

    const setResourceRoadmapBadgeTaskWorkflowStatus = async ({resourceId, roadmapId, badgeId, taskId, status}) => {
        try {
            const response = await axios.post(
                `/resource/${resourceId}/badge/${badgeId}/task/${taskId}/workflow/${status}/`,
            );
            await fetchResource({resourceId})

            return response.data.results;
        } catch (error) {
            return error;
        }
    }

    const setResource = async ({resourceId, roadmapIds, badgeIds}) => {
        try {
            const response = await axios.post(
                `/resource/${resourceId}/`,
                {
                    roadmap_ids: roadmapIds,
                    badge_ids: badgeIds
                }
            );

            return response.data.results;
        } catch (error) {
            return error;
        }
    }

    return (
        <ResourcesContext.Provider
            value={{
                resources,
                resourceMap,
                resourceRoadmapBadgeMap,
                resourceRoadmapBadgeTaskMap,
                resourceOrgMap,
                fetchResources,
                fetchResource,
                fetchSelectedResources,
                fetchResourceRoadmapBadges,
                getResource,
                isResourceRoadmapSelected,
                getResourceRoadmaps,
                getResourceRoadmapBadges,
                getResourceBadge,
                getResourceBadgePrerequisites,
                getResourceBadgeTasks,
                getResourceOrganization,
                getOrganizationResourceIds,
                setResourceRoadmapBadgeWorkflowStatus,
                setResourceRoadmapBadgeTaskWorkflowStatus,
                setResource
            }}>
            {children}
        </ResourcesContext.Provider>
    );
};

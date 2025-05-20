import React, {createContext, useContext, useReducer} from 'react';
import DefaultReducer from "./reducers/DefaultReducer";
import {BadgeWorkflowStatus, useBadges} from "./BadgeContext";
import {useOrganizations} from "./OrganizationsContext";
import {useTasks} from "./TaskContext";
import {useRoadmaps} from "./RoadmapContext.jsx";
import {dashboardAxiosInstance} from "./auth/DashboardAuthenticator.js";

const ResourcesContext = createContext({
    // resources: [],
    // resourceMap: {},
    // resourceRoadmapIds: {},
    // resourceRoadmapBadgeIds: {},
    // resourceRoadmapBadgeMap: {},
    // resourceRoadmapBadgeTaskMap: {},
    // resourceOrgMap: {},
    fetchResources: ({resourceIds = null} = {}) => {
    },
    fetchSelectedResources: ({resourceIds = null} = {}) => {
    },
    fetchResource: ({resourceId}) => {
    },
    fetchResourceRoadmapBadge: ({resourceId, roadmapId, badgeId}) => {
    },
    fetchResourceRoadmapBadges: ({resourceId, roadmapId}) => {
    },
    fetchResourceRoadmapBadgeTasks: ({resourceId, roadmapId, badgeId}) => {
    },
    getResource: ({resourceId}) => {
    },
    getResources: () => {
    },
    getResourceRoadmaps: ({resourceId}) => {
    },
    isResourceRoadmapSelected: ({resourceId, roadmapId}) => {
    },
    getResourceRoadmapBadges: ({resourceId, roadmapId}) => {
    },
    getResourceRoadmapBadge: ({resourceId, roadmapId, badgeId}) => {
    },
    getResourceRoadmapBadgePrerequisites: ({resourceId, roadmapId, badgeId}) => {
    },
    getResourceRoadmapBadgeTasks: ({resourceId, roadmapId, badgeId}) => {
    },
    getResourceOrganization: ({resourceId}) => {
    },
    getOrganizationResourceIds: ({organizationName}) => {
    },
    setResourceRoadmapBadgeWorkflowStatus: ({resourceId, roadmapId, badgeId, status}) => {
    },
    setResourceRoadmapBadgeTaskWorkflowStatus: ({resourceId, roadmapId, badgeId, taskId, status}) => {
    },
    setResourceRoadmap: ({resourceId, roadmapIds, badgeIds}) => {
    }
});

export const useResources = () => useContext(ResourcesContext);

export const ResourceStatus = {
    ANNOUNCEMENT: "coming-soon",
    PRE_PRODUCTION: "pre-production",
    PRODUCTION: "production",
    POST_PRODUCTION: "post-production",
    RETIRED: "decommissioned"
}

/**
 * Context provider for resources
 * @param children
 */
export const ResourcesProvider = ({children}) => {
    const {getBadge} = useBadges();
    const {getTask, getBadgeTasks} = useTasks();
    const {getOrganization} = useOrganizations();
    const {getRoadmap} = useRoadmaps();

    const [resourceIds, setResourceIds] = useReducer(DefaultReducer, []);
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
            console.log(error)
            return error;
        }
    };

    const fetchResourceRoadmapBadges = async ({resourceId, roadmapId}) => {
        try {
            let resourceRoadmapStatus = await dashboardAxiosInstance.get(`/resource/${resourceId}/roadmap/${roadmapId}/badges/`);
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
                    ...resourceRoadmapBadgeMap[resourceId],
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
            console.log(error)
            return error;
        }
    };

    const fetchResourceRoadmapBadge = async ({resourceId, roadmapId, badgeId}) => {
        try {
            let resourceRoadmapBadge = await dashboardAxiosInstance.get(`/resource/${resourceId}/roadmap/${roadmapId}/badge/${badgeId}/`);
            const badgeStatus = resourceRoadmapBadge.data.results;
            setResourceRoadmapBadgeMap({
                ...resourceRoadmapBadgeMap,
                [resourceId]: {
                    ...resourceRoadmapBadgeMap[resourceId],
                    [roadmapId]: {
                        ...(!!resourceRoadmapBadgeMap[resourceId] ? resourceRoadmapBadgeMap[resourceId][roadmapId] : null),
                        [badgeId]: badgeStatus
                    }
                }
            });

            return resourceRoadmapBadge;
        } catch (error) {
            console.log(error)
            return error;
        }
    };

    const fetchResourceRoadmapBadgeTasks = async ({resourceId, roadmapId, badgeId}) => {
        try {
            let res = await dashboardAxiosInstance.get(`/resource/${resourceId}/roadmap/${roadmapId}/badge/${badgeId}/tasks`);

            const taskWorkflowMap = {};
            const taskIds = [];
            for (let j = 0; j < res.data.results.length; j++) {
                const taskWorkflow = res.data.results[j];
                const taskId = taskWorkflow.task_id;
                taskIds.push(taskId);
                taskWorkflowMap[taskId] = taskWorkflow;
            }

            const _resourceRoadmapBadgeTaskMap = {
                ...resourceRoadmapBadgeTaskMap,
                [resourceId]: {
                    ...resourceRoadmapBadgeTaskMap[resourceId],
                    [roadmapId]: {
                        ...(!!resourceRoadmapBadgeTaskMap[resourceId] ? resourceRoadmapBadgeTaskMap[resourceId][roadmapId] : null),
                        [badgeId]: taskWorkflowMap
                    }
                }
            }

            setResourceRoadmapBadgeTaskMap(_resourceRoadmapBadgeTaskMap);

            return res;
        } catch (error) {
            console.log(error)
            return error;
        }
    };

    const fetchSelectedResources = async ({resourceIds}) => {
        try {
            let responseList = await Promise.all(resourceIds.map(resourceId => {
                return dashboardAxiosInstance.get(`/resource/${resourceId}`);
            }));
            const _resourceMap = {};
            const _resourceRoadmapIds = {};

            for (let i = 0; i < resourceIds.length; i++) {
                let resourceId = resourceIds[i];
                let resource = responseList[i].data.results;
                _resourceMap[resourceId] = {
                    ...getResource({resourceId}), ...resource,
                };
                _resourceRoadmapIds[resourceId] = resource.roadmaps.map(roadmap => roadmap.roadmap.roadmap_id);
            }


            setResourceMap({
                ...resourceMap, ..._resourceMap
            });
            setResourceRoadmapIds({
                ...resourceRoadmapIds, ..._resourceRoadmapIds
            });

            return responseList;
        } catch (error) {
            console.log(error)
            return error;
        }
    };

    const fetchResources = async ({resourceIds = null} = {}) => {
        try {
            if (resourceIds) {
                return fetchSelectedResources({resourceIds});
            } else {
                const response = await dashboardAxiosInstance.get('/resources');
                const _resources = response.data.results;
                const _resourceIds = [];
                const _resourceMap = {};
                const _resourceOrgMap = {};
                for (let i = 0; i < _resources.length; i++) {
                    let resource = _resources[i];
                    let resourceId = resource.info_resourceid;

                    _resourceIds.push(resourceId);

                    _resourceMap[resourceId] = {
                        ...getResource({resourceId}), ...resource
                    };

                    _resources[i] = _resourceMap[resourceId];

                    let resourceOrg = resource.organization_name;
                    if (_resourceOrgMap[resourceOrg]) {
                        _resourceOrgMap[resourceOrg].push(resourceId);
                    } else {
                        _resourceOrgMap[resourceOrg] = [resourceId];
                    }
                }

                setResourceIds(_resourceIds);
                setResourceMap(_resourceMap);
                setResourceOrgMap(_resourceOrgMap);

                return response.data.results;
            }
        } catch (error) {
            console.log(error)
            return error;
        }
    };


    const getResource = ({resourceId}) => {
        return resourceMap[resourceId];
    }

    const getResources = () => {
        return resourceIds.map(resourceId => getResource({resourceId}));
    }

    const getResourceRoadmaps = ({resourceId}) => {
        if (resourceRoadmapIds[resourceId]) {
            return resourceRoadmapIds[resourceId].map(roadmapId => getRoadmap({roadmapId}))
        }
    }

    const isResourceRoadmapSelected = ({resourceId, roadmapId}) => {
        return resourceRoadmapIds[resourceId] && resourceRoadmapIds[resourceId].indexOf(roadmapId) >= 0
    }

    const getResourceRoadmapBadges = ({resourceId, roadmapId}) => {
        if (resourceRoadmapBadgeIds[resourceId] && resourceRoadmapBadgeIds[resourceId][roadmapId]) {
            const badgeIds = resourceRoadmapBadgeIds[resourceId][roadmapId];
            return _getBadgesWithWorkflow({resourceId, roadmapId, badgeIds});
        }
    }
    const getResourceRoadmapBadge = ({resourceId, roadmapId, badgeId}) => {
        const badges = _getBadgesWithWorkflow({resourceId, roadmapId, badgeIds: [badgeId]})
        if (badges && badges.length > 0) {
            return badges[0];
        }
    }

    const getResourceRoadmapBadgePrerequisites = ({resourceId, roadmapId, badgeId}) => {
        const badge = getBadge({badgeId});
        if (badge && badge.prerequisites) {
            const badgeIds = badge.prerequisites.map(({prerequisite_badge}) => prerequisite_badge)
            return _getBadgesWithWorkflow({resourceId, roadmapId, badgeIds});
        }
    }

    const _getBadgesWithWorkflow = ({resourceId, roadmapId, badgeIds}) => {
        let badges;
        const _badges = badgeIds.map(badgeId => {
            let badgeWorkflow = null;
            if (resourceRoadmapBadgeMap[resourceId] && resourceRoadmapBadgeMap[resourceId] && resourceRoadmapBadgeMap[resourceId][roadmapId]) {
                badgeWorkflow = resourceRoadmapBadgeMap[resourceId][roadmapId][badgeId]
            }

            const badge = getBadge({badgeId});
            if (badge) {
                return {
                    ...badge, ...badgeWorkflow
                }
            }
        });

        if (_badges.indexOf(undefined) < 0) {
            badges = _badges;
        }

        return badges;
    }

    const getResourceRoadmapBadgeTasks = ({resourceId, roadmapId, badgeId}) => {
        let tasks = getBadgeTasks({badgeId});

        if (tasks) {
            return tasks.map(task => {
                const taskId = task.task_id;
                let resourceBadgeTaskWorkflow = null;
                if (resourceRoadmapBadgeTaskMap[resourceId] && resourceRoadmapBadgeTaskMap[resourceId][roadmapId] && resourceRoadmapBadgeTaskMap[resourceId][roadmapId][badgeId]) {
                    resourceBadgeTaskWorkflow = resourceRoadmapBadgeTaskMap[resourceId][roadmapId][badgeId][taskId];
                }

                return {
                    ...task,
                    ...resourceBadgeTaskWorkflow
                }
            });
        }
    };


    const getResourceOrganization = ({resourceId}) => {
        const resource = getResource({resourceId});
        if (resource) {
            return getOrganization({organizationName: resource.organization_name})
        }
    }

    const getOrganizationResourceIds = ({organizationName}) => {
        const orgResourceIds = [];
        const resources = getResources();

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
            const response = await dashboardAxiosInstance.post(`/resource/${resourceId}/roadmap/${roadmapId}/badge/${badgeId}/workflow/${status}/`,);
            await fetchResourceRoadmapBadge({resourceId, roadmapId, badgeId})

            return response.data.results;
        } catch (error) {
            console.log(error)
            return error;
        }
    }

    const setResourceRoadmapBadgeTaskWorkflowStatus = async ({resourceId, roadmapId, badgeId, taskId, status}) => {
        try {
            const response = await dashboardAxiosInstance.post(`/resource/${resourceId}/roadmap/${roadmapId}/badge/${badgeId}/task/${taskId}/workflow/${status}/`,);
            await fetchResourceRoadmapBadgeTasks({resourceId, roadmapId, badgeId});

            let resourceRoadmapBadge = getResourceRoadmapBadge({resourceId, roadmapId, badgeId});
            if ([BadgeWorkflowStatus.VERIFIED, BadgeWorkflowStatus.TASK_COMPLETED].indexOf(resourceRoadmapBadge.status) >= 0) {
                await fetchResourceRoadmapBadge({resourceId, roadmapId, badgeId})
            }

            return response.data.results;
        } catch (error) {
            console.log(error)
            return error;
        }
    }

    const setResourceRoadmap = async ({resourceId, roadmapId, badgeIds}) => {
        try {
            const response = await dashboardAxiosInstance.post(`/resource/${resourceId}/roadmap/${roadmapId}/enrollments/`, {
                badge_ids: badgeIds
            });

            return response.data.results;
        } catch (error) {
            console.log(error)
            return error;
        }
    }

    return (<ResourcesContext.Provider
        value={{
            resourceIds,
            resourceMap,
            resourceRoadmapBadgeMap,
            resourceRoadmapBadgeTaskMap,
            resourceOrgMap,
            fetchResources,
            fetchResource,
            fetchSelectedResources,
            fetchResourceRoadmapBadge,
            fetchResourceRoadmapBadges,
            fetchResourceRoadmapBadgeTasks,
            getResource,
            getResources,
            isResourceRoadmapSelected,
            getResourceRoadmaps,
            getResourceRoadmapBadges,
            getResourceRoadmapBadge,
            getResourceRoadmapBadgePrerequisites,
            getResourceRoadmapBadgeTasks,
            getResourceOrganization,
            getOrganizationResourceIds,
            setResourceRoadmapBadgeWorkflowStatus,
            setResourceRoadmapBadgeTaskWorkflowStatus,
            setResourceRoadmap
        }}>
        {children}
    </ResourcesContext.Provider>);
};

import React, {createContext, useContext, useReducer} from 'react';
import DefaultReducer from "./reducers/DefaultReducer";
import {BadgeWorkflowStatus, useBadges} from "./BadgeContext";
import {useOrganizations} from "./OrganizationsContext";
import {useTasks} from "./TaskContext";
import {useRoadmaps} from "./RoadmapContext.jsx";
import {dashboardAxiosInstance} from "./auth/DashboardAuthenticator.js";

const ResourcesContext = createContext({
    fetchResources: ({organizationId = null, resourceId = null, full = false} = {}) => {
    },
    fetchResource: ({resourceId}) => {
    },
    fetchResourceRoadmapBadges: ({
                                     resourceIds = [null],
                                     roadmapId = null,
                                     badgeId = null,
                                     badgeWorkflowStatus = null
                                 } = {}) => {
    },
    fetchResourceRoadmapBadgeLogs: ({resourceId = null, roadmapId = null, badgeId = null} = {}) => {
    },
    fetchResourceRoadmapBadgeTasks: ({resourceId, roadmapId, badgeId}) => {
    },
    fetchResourceRoadmapBadgeStatusSummary: ({resourceId = null, roadmapId = null, badgeId = null} = null) => {
    },
    getResource: ({resourceId}) => {
    },
    getResources: (organizationId = null, resourceId = null, full = false) => {
    },
    getResourceRoadmaps: ({resourceId}) => {
    },
    isResourceRoadmapSelected: ({resourceId, roadmapId}) => {
    },
    getResourceRoadmapBadges: ({resourceId = null, roadmapId = null, badgeId = null} = {}) => {
    },
    getResourceRoadmapBadge: ({resourceId, roadmapId, badgeId}) => {
    },
    getResourceRoadmapBadgeLogs: ({resourceId, roadmapId, badgeId}) => {
    },
    getResourceRoadmapBadgePrerequisites: ({resourceId, roadmapId, badgeId}) => {
    },
    getResourceRoadmapBadgeTasks: ({resourceId, roadmapId, badgeId}) => {
    },
    getResourceRoadmapBadgeStatusSummary: ({resourceId = null, roadmapId = null, badgeId = null} = {}) => {
    },
    getResourceOrganization: ({resourceId}) => {
    },
    getOrganizationResourceIds: ({organizationName}) => {
    },
    setResourceRoadmapBadgeWorkflowStatus: ({resourceId, roadmapId, badgeId, status, comment}) => {
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

    const [resourceIds, setResourceIds] = useReducer(DefaultReducer, {});
    const [resourceMap, setResourceMap] = useReducer(DefaultReducer, {});
    const [resourceRoadmapIds, setResourceRoadmapIds] = useReducer(DefaultReducer, {});
    const [resourceRoadmapBadgeIds, setResourceRoadmapBadgeIds] = useReducer(DefaultReducer, {});
    const [resourceRoadmapBadgeMap, setResourceRoadmapBadgeMap] = useReducer(DefaultReducer, {});
    const [resourceRoadmapBadgeLogIds, setResourceRoadmapBadgeLogIds] = useReducer(DefaultReducer, {});
    const [resourceRoadmapBadgeLogMap, setResourceRoadmapBadgeLogMap] = useReducer(DefaultReducer, {});
    const [resourceRoadmapBadgeTaskMap, setResourceRoadmapBadgeTaskMap] = useReducer(DefaultReducer, {});
    const [resourceRoadmapBadgeStatusSummaryMap, setResourceRoadmapBadgeStatusSummaryMap] = useReducer(DefaultReducer, {});

    const [resourceOrgMap, setResourceOrgMap] = useReducer(DefaultReducer, {});

    const fetchResource = async ({resourceId}) => {
        return fetchResources({resourceId, full: true});
    };

    const fetchResourceRoadmapBadges = async ({
                                                  resourceIds = [null],
                                                  roadmapId = null,
                                                  badgeId = null,
                                                  badgeWorkflowStatus = null
                                              } = {}) => {
        try {
            const responses = await Promise.all(resourceIds.map(resourceId => {
                let url = `/resource_roadmap_badges/?`;

                if (!!resourceId) {
                    url += `info_resourceid=${resourceId}&`
                }

                if (!!roadmapId) {
                    url += `roadmap_id=${roadmapId}&`
                }

                if (!!badgeId) {
                    url += `badge_id=${badgeId}`
                }

                if (!!badgeWorkflowStatus) {
                    url += `badge_workflow_status=${badgeWorkflowStatus}`
                }

                return dashboardAxiosInstance.get(url);
            }));

            const badgeStatusMap = {...resourceRoadmapBadgeMap};
            const badgeIds = {...resourceRoadmapBadgeIds};
            for (let response of responses) {
                for (let j = 0; j < response.data.results.length; j++) {
                    const badgeStatus = response.data.results[j];
                    const _badgeId = badgeStatus.badge_id;
                    const _resourceId = badgeStatus.info_resourceid;
                    const _roadmapId = badgeStatus.roadmap_id;

                    if (!badgeIds[_resourceId]) {
                        badgeIds[_resourceId] = {};
                    }

                    badgeIds[_resourceId] = {...badgeIds[_resourceId]};
                    if (!badgeIds[_resourceId][_roadmapId]) {
                        badgeIds[_resourceId][_roadmapId] = [_badgeId];
                    } else if (badgeIds[_resourceId][_roadmapId].indexOf(_badgeId) < 0) {
                        badgeIds[_resourceId][_roadmapId] = [...badgeIds[_resourceId][_roadmapId], _badgeId];
                    }

                    badgeStatusMap[_resourceId] = {...badgeStatusMap[_resourceId]};
                    badgeStatusMap[_resourceId][_roadmapId] = {...badgeStatusMap[_resourceId][_roadmapId]};
                    badgeStatusMap[_resourceId][_roadmapId][_badgeId] = badgeStatus;
                }
            }

            setResourceRoadmapBadgeMap(badgeStatusMap);
            setResourceRoadmapBadgeIds(badgeIds);

            return responses;
        } catch (error) {
            console.log(error)
            return error;
        }
    };

    const fetchResourceRoadmapBadgeLogs = async ({resourceId = null, roadmapId = null, badgeId = null} = {}) => {
        try {
            let url = `/resource_roadmap_badge_logs/?`;

            if (!!resourceId) {
                url += `info_resourceid=${resourceId}&`
            }

            if (!!roadmapId) {
                url += `roadmap_id=${roadmapId}&`
            }

            if (!!badgeId) {
                url += `badge_id=${badgeId}`
            }

            let resourceRoadmapBadgeLogs = await dashboardAxiosInstance.get(url);
            const _resourceRoadmapBadgeLogMap = {...resourceRoadmapBadgeLogMap};
            const _resourceRoadmapBadgeLogIds = {};
            for (let j = 0; j < resourceRoadmapBadgeLogs.data.results.length; j++) {
                const badgeLog = resourceRoadmapBadgeLogs.data.results[j];
                const _logId = badgeLog.id;
                const _badgeId = badgeLog.badge_id;
                const _resourceId = badgeLog.info_resourceid;
                const _roadmapId = badgeLog.roadmap_id;

                _resourceRoadmapBadgeLogIds[_resourceId] = {..._resourceRoadmapBadgeLogIds[_resourceId]};
                _resourceRoadmapBadgeLogIds[_resourceId][_roadmapId] = {..._resourceRoadmapBadgeLogIds[_resourceId][_roadmapId]};
                if (!!_resourceRoadmapBadgeLogIds[_resourceId][_roadmapId][_badgeId]) {
                    _resourceRoadmapBadgeLogIds[_resourceId][_roadmapId][_badgeId] = [..._resourceRoadmapBadgeLogIds[_resourceId][_roadmapId][_badgeId], _logId];
                } else {
                    _resourceRoadmapBadgeLogIds[_resourceId][_roadmapId][_badgeId] = [_logId];
                }

                _resourceRoadmapBadgeLogMap[_logId] = badgeLog;
            }

            setResourceRoadmapBadgeLogMap(_resourceRoadmapBadgeLogMap);
            setResourceRoadmapBadgeLogIds(_resourceRoadmapBadgeLogIds)

            return resourceRoadmapBadgeLogs;
        } catch (error) {
            console.log(error)
            return error;
        }
    };

    const fetchResourceRoadmapBadgeTasks = async ({resourceId, roadmapId, badgeId}) => {
        try {
            let res = await dashboardAxiosInstance.get(`/resource_roadmap_badge_tasks/?info_resourceid=${resourceId}&roadmap_id=${roadmapId}&badge_id=${badgeId}`);

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

    const fetchResourceRoadmapBadgeStatusSummary = async ({
                                                              resourceId = null,
                                                              roadmapId = null,
                                                              badgeId = null
                                                          } = {}) => {
        try {
            let url = "/resource_roadmap_badge_summary/?";

            if (resourceId) {
                url += `info_resourceid=${resourceId}`;
            }

            if (roadmapId) {
                url += `roadmap_id=${roadmapId}`;
            }

            if (badgeId) {
                url += `badge_id=${badgeId}`;
            }

            let res = await dashboardAxiosInstance.get(url);

            let _resourceRoadmapBadgeStatusSummaryMap = {...resourceRoadmapBadgeStatusSummaryMap};
            _resourceRoadmapBadgeStatusSummaryMap[resourceId] = _resourceRoadmapBadgeStatusSummaryMap[resourceId] || {};
            _resourceRoadmapBadgeStatusSummaryMap[resourceId][roadmapId] = _resourceRoadmapBadgeStatusSummaryMap[resourceId][roadmapId] || {};
            _resourceRoadmapBadgeStatusSummaryMap[resourceId][roadmapId][badgeId] = {};

            for (let j = 0; j < res.data.results.length; j++) {
                const {status, count} = res.data.results[j];
                _resourceRoadmapBadgeStatusSummaryMap[resourceId][roadmapId][badgeId][status] = count;
            }

            setResourceRoadmapBadgeStatusSummaryMap(_resourceRoadmapBadgeStatusSummaryMap);

            return res;
        } catch (error) {
            console.log(error)
            return error;
        }
    }

    const getResourcesEndpointUrl = ({organizationId = null, resourceId = null, full = false} = {}) => {
        let url = '/resources?';
        if (full) url = '/resources-full?';
        if (organizationId) url += `organization_id=${organizationId}&`;
        if (resourceId) url += `resource_id=${resourceId}`;

        return url;
    }

    const fetchResources = async ({organizationId = null, resourceId = null, full = false} = {}) => {
        try {
            let url = getResourcesEndpointUrl({organizationId, resourceId, full});

            const response = await dashboardAxiosInstance.get(url);
            const _resources = response.data.results;
            const _resourceIds = [];
            const _resourceMap = {...resourceMap};
            const _resourceRoadmapIds = {...resourceRoadmapIds};
            for (let i = 0; i < _resources.length; i++) {
                let resource = _resources[i];
                let resourceId = resource.info_resourceid;

                _resourceIds.push(resourceId);

                _resourceMap[resourceId] = {
                    ...getResource({resourceId}), ...resource
                };

                if (resource.roadmaps) {
                    _resourceRoadmapIds[resourceId] = resource.roadmaps.map(r => r.roadmap_id);
                }
            }

            setResourceIds({...resourceIds, [url]: _resourceIds});
            setResourceMap(_resourceMap);
            setResourceRoadmapIds(_resourceRoadmapIds);

            return response.data.results;
        } catch (error) {
            console.log(error)
            return error;
        }
    };


    const getResource = ({resourceId}) => {
        return resourceMap[resourceId];
    }

    const getResources = ({organizationId = null, resourceId = null, full = false} = {}) => {
        let url = getResourcesEndpointUrl({organizationId, resourceId, full});
        console.log("#### resourceIds : ", resourceIds)
        if (resourceIds[url]) {
            return resourceIds[url].map(resourceId => getResource({resourceId}));
        }
    }

    const getResourceRoadmaps = ({resourceId}) => {
        if (resourceRoadmapIds[resourceId]) {
            return resourceRoadmapIds[resourceId].map(roadmapId => getRoadmap({roadmapId}))
        }
    }

    const isResourceRoadmapSelected = ({resourceId, roadmapId}) => {
        return resourceRoadmapIds[resourceId] && resourceRoadmapIds[resourceId].indexOf(roadmapId) >= 0
    }

    const getResourceRoadmapBadges = ({resourceId = null, roadmapId = null, badgeId = null} = {}) => {
        let _resourceRoadmapBadges = [];
        for (let _resourceId in (!!resourceId ? {[resourceId]: null} : resourceRoadmapBadgeIds)) {
            for (let _roadmapId in (!!roadmapId ? {[roadmapId]: null} : resourceRoadmapBadgeIds[_resourceId])) {
                if (resourceRoadmapBadgeIds[_resourceId] && resourceRoadmapBadgeIds[_resourceId][_roadmapId]) {
                    const badgeIds = !!badgeId ? [badgeId] : resourceRoadmapBadgeIds[_resourceId][_roadmapId];
                    _resourceRoadmapBadges = _resourceRoadmapBadges.concat(_getBadgesWithWorkflow(
                        {resourceId: _resourceId, roadmapId: _roadmapId, badgeIds}));
                }
            }
        }

        return _resourceRoadmapBadges;
    }

    const getResourceRoadmapBadge = ({resourceId, roadmapId, badgeId}) => {
        const badges = _getBadgesWithWorkflow({resourceId, roadmapId, badgeIds: [badgeId]})
        if (badges && badges.length > 0) {
            return badges[0];
        }
    }

    const getResourceRoadmapBadgeLogs = ({resourceId, roadmapId, badgeId}) => {
        if (resourceRoadmapBadgeLogIds[resourceId] && resourceRoadmapBadgeLogIds[resourceId][roadmapId] && resourceRoadmapBadgeLogIds[resourceId][roadmapId][badgeId]) {
            return resourceRoadmapBadgeLogIds[resourceId][roadmapId][badgeId].map(logId => resourceRoadmapBadgeLogMap[logId]);
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

    const getResourceRoadmapBadgeStatusSummary = ({resourceId = null, roadmapId = null, badgeId = null} = {}) => {
        console.log("###### resourceRoadmapBadgeStatusSummaryMap ", resourceRoadmapBadgeStatusSummaryMap)

        if (resourceRoadmapBadgeStatusSummaryMap[resourceId] && resourceRoadmapBadgeStatusSummaryMap[resourceId][roadmapId] && resourceRoadmapBadgeStatusSummaryMap[resourceId][roadmapId][badgeId]) {
            return resourceRoadmapBadgeStatusSummaryMap[resourceId][roadmapId][badgeId];
        }
    }

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

    const setResourceRoadmapBadgeWorkflowStatus = async ({resourceId, roadmapId, badgeId, status, comment}) => {
        try {
            const response = await dashboardAxiosInstance.post(`/resource/${resourceId}/roadmap/${roadmapId}/badge/${badgeId}/workflow/${status}/`, {comment});
            await fetchResourceRoadmapBadges({resourceIds: [resourceId], roadmapId, badgeId});

            return response.data.results;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    const setResourceRoadmapBadgeTaskWorkflowStatus = async ({resourceId, roadmapId, badgeId, taskId, status}) => {
        try {
            const response = await dashboardAxiosInstance.post(`/resource/${resourceId}/roadmap/${roadmapId}/badge/${badgeId}/task/${taskId}/workflow/${status}/`,);
            await fetchResourceRoadmapBadgeTasks({resourceId, roadmapId, badgeId});

            let resourceRoadmapBadge = getResourceRoadmapBadge({resourceId, roadmapId, badgeId});
            if ([BadgeWorkflowStatus.VERIFIED, BadgeWorkflowStatus.TASK_COMPLETED].indexOf(resourceRoadmapBadge.status) >= 0) {
                await fetchResourceRoadmapBadges({resourceIds: [resourceId], roadmapId, badgeId})
            }

            return response.data.results;
        } catch (error) {
            console.log(error)
            throw error;
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
            throw error;
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
            fetchResourceRoadmapBadges,
            fetchResourceRoadmapBadgeLogs,
            fetchResourceRoadmapBadgeTasks,
            fetchResourceRoadmapBadgeStatusSummary,
            getResource,
            getResources,
            isResourceRoadmapSelected,
            getResourceRoadmaps,
            getResourceRoadmapBadges,
            getResourceRoadmapBadge,
            getResourceRoadmapBadgeLogs,
            getResourceRoadmapBadgePrerequisites,
            getResourceRoadmapBadgeTasks,
            getResourceRoadmapBadgeStatusSummary,
            getResourceOrganization,
            getOrganizationResourceIds,
            setResourceRoadmapBadgeWorkflowStatus,
            setResourceRoadmapBadgeTaskWorkflowStatus,
            setResourceRoadmap
        }}>
        {children}
    </ResourcesContext.Provider>);
};

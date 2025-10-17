import React, {createContext, useContext, useReducer} from 'react';
import DefaultReducer from "./reducers/DefaultReducer";
import {useBadges} from "./BadgeContext.jsx";
import {dashboardAxiosInstance} from "./auth/DashboardAuthenticator.js";

const RoadmapContext = createContext({
    // roadmapIds: [],
    // roadmapMap: {},
    fetchRoadmaps: () => {
    },
    fetchRoadmap: ({roadmapId}) => {
    },
    setRoadmap: ({roadmapId, roadmapData}) => {
    },
    getRoadmap: ({roadmapId}) => {
    },
    getRoadmapBadges: ({roadmapId}) => {
    },
    getRoadmaps: () => {
    }
});

export const useRoadmaps = () => useContext(RoadmapContext);

/**
 * Context provider for roadmaps
 * @param children
 */
export const RoadmapProvider = ({children}) => {
    const {getBadge} = useBadges();

    const [roadmapIds, setRoadmapIds] = useReducer(DefaultReducer, []);
    const [roadmapMap, setRoadmapMap] = useReducer(DefaultReducer, {});

    const fetchRoadmaps = async () => {
        try {
            const response = await dashboardAxiosInstance.get('/roadmaps');
            const _roadmaps = response.data.results;
            const _roadmapMap = {};
            const _roadmapIds = []
            for (let i = 0; i < _roadmaps.length; i++) {
                const _roadmap = _roadmaps[i];
                _roadmapIds.push(_roadmap.roadmap_id);
                _roadmapMap[_roadmap.roadmap_id] = {...roadmapMap[_roadmap.roadmap_id], ..._roadmap};
            }
            setRoadmapMap({
                ...roadmapMap,
                ..._roadmapMap
            });
            setRoadmapIds(_roadmapIds);


            return response.data.results;
        } catch (error) {
            console.log(error)
            throw error;
        }
    };

    const fetchRoadmap = async ({roadmapId}) => {
        try {
            const response = await dashboardAxiosInstance.get(`/roadmap/${roadmapId}`);
            const _roadmap = response.data.results;

            const _roadmapMap = {
                ...roadmapMap,
                [roadmapId]: {
                    ...roadmapMap[_roadmap.roadmap_id],
                    ..._roadmap
                }
            };
            setRoadmapMap(_roadmapMap);


            return response.data.results;
        } catch (error) {
            console.log(error)
            throw error;
        }
    };

    const setRoadmap = async ({roadmapId = null, roadmapData}) => {
        try {
            const response = await dashboardAxiosInstance.post(
                roadmapId ? `/roadmap/${roadmapId}/` : "/roadmaps/",
                roadmapData);
            const _roadmap = response.data.results;

            const _roadmapMap = {
                ...roadmapMap,
                [roadmapId]: {
                    ...roadmapMap[_roadmap.roadmap_id],
                    ..._roadmap
                }
            };
            setRoadmapMap(_roadmapMap);

            fetchRoadmaps();

            return response.data.results;
        } catch (error) {
            console.log(error)
            throw error;
        }
    };

    const getRoadmap = ({roadmapId}) => {
        return roadmapMap[roadmapId];
    };

    const getRoadmapBadges = ({roadmapId}) => {
        const roadmap = getRoadmap(({roadmapId}));
        if (roadmap && roadmap.badges) {
            return roadmap.badges.map(roadmapBadge => {
                const badgeId = roadmapBadge.badge_id;
                const required = roadmapBadge.required;
                const sequence_no = roadmapBadge.sequence_no;

                return {
                    ...getBadge({badgeId}),
                    required,
                    sequence_no
                };
            });
        }
    };

    const getRoadmaps = () => {
        return roadmapIds.map(roadmapId => getRoadmap({roadmapId}));
    };


    return (
        <RoadmapContext.Provider
            value={{roadmapMap, fetchRoadmaps, fetchRoadmap, setRoadmap, getRoadmap, getRoadmapBadges, getRoadmaps}}>
            {children}
        </RoadmapContext.Provider>
    );
};

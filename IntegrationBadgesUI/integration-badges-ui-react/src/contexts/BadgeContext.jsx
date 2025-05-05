import React, {createContext, useContext, useReducer} from 'react';
import DefaultReducer from "./reducers/DefaultReducer";
import {dashboardAxiosInstance} from "./auth/DashboardAuthenticator.js";

const BadgeContext = createContext({
    // badgeMap: {},
    fetchBadges: () => {
    },
    fetchBadge: ({badgeId}) => {
    },
    getBadge: ({badgeId}) => {
    },
    getBadges: () => {
    }
});

export const useBadges = () => useContext(BadgeContext);

export const BadgeWorkflowStatus = {
    NOT_PLANNED: "not-planned",
    PLANNED: "planned",
    TASK_COMPLETED: "task-completed",
    VERIFICATION_FAILED: "verification-failed",
    VERIFIED: "verified",
    DEPRECATED: "deprecated"
}

/**
 * Context provider for badges
 * @param children
 */
export const BadgeProvider = ({children}) => {
    const [badgeIds, setBadgeIds] = useReducer(DefaultReducer, []);
    const [badgeMap, setBadgeMap] = useReducer(DefaultReducer, {});

    const fetchBadges = async () => {
        try {
            const response = await dashboardAxiosInstance.get('/badges');
            const _badges = response.data.results;
            const _badgeIds = [];
            const _badgeMap = {};
            for (let i = 0; i < _badges.length; i++) {
                const _badge = _badges[i];
                const badgeId = _badge.badge_id;
                _badgeIds.push(badgeId)
                _badgeMap[badgeId] = {...badgeMap[badgeId], ..._badge};
            }

            setBadgeIds(_badgeIds);

            setBadgeMap({
                ...badgeMap,
                ..._badgeMap
            });

            return response.data.results;
        } catch (error) {
            console.log(error)
            return error;
        }
    };

    const fetchBadge = async ({badgeId}) => {
        try {
            const response = await dashboardAxiosInstance.get(`/badge/${badgeId}`);
            const _badge = response.data.results;

            const _badgeMap = {
                ...badgeMap,
                [badgeId]: {
                    ...badgeMap[_badge.badge_id],
                    ..._badge
                }
            };
            setBadgeMap(_badgeMap);


            return response.data.results;
        } catch (error) {
            console.log(error)
            return error;
        }
    };


    const getBadge = ({badgeId}) => {
        return badgeMap[badgeId];
    };

    const getBadges = () => {
        return badgeIds.map(badgeId => getBadge({badgeId}));
    };


    return (
        <BadgeContext.Provider value={{badgeMap, fetchBadges, fetchBadge, getBadge, getBadges}}>
            {children}
        </BadgeContext.Provider>
    );
};

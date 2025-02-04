import React, {createContext, useContext, useReducer} from 'react';
import axios from 'axios';
import DefaultReducer from "./reducers/DefaultReducer";

const BadgeContext = createContext({
    badgeMap: {},
    fetchBadges: () => {
    },
    fetchBadge: ({badgeId}) => {
    }
});

export const useBadges = () => useContext(BadgeContext);


/**
 * Context provider for badges
 * @param children
 */
export const BadgeProvider = ({children}) => {
    const [badgeMap, setBadgeMap] = useReducer(DefaultReducer, {});

    const fetchBadges = async () => {
        try {
            const response = await axios.get('/badge');
            const _badges = response.data.results;
            console.log("_badges : ", _badges)
            const _badgeMap = {};
            for (let i = 0; i < _badges.length; i++) {
                const _badge = _badges[i];
                _badgeMap[_badge.badge_id] = {...badgeMap[_badge.badge_id], ..._badge};
            }
            setBadgeMap({
                ...badgeMap,
                ..._badgeMap
            });


            console.log("$$$$$$$ _badgeMap 1 ", _badgeMap)

            return response.data.results;
        } catch (error) {
            return error;
        }
    };

    const fetchBadge = async ({badgeId}) => {
        try {
            const response = await axios.get(`/badge/${badgeId}`);
            const _badge = response.data.results;
            console.log("_badge : ", _badge)

            const _badgeMap = {
                ...badgeMap,
                [badgeId]: {
                    ...badgeMap[_badge.badge_id],
                    ..._badge
                }
            };
            setBadgeMap(_badgeMap);


            console.log("$$$$$$$ _badgeMap 2 ", _badgeMap)

            return response.data.results;
        } catch (error) {
            return error;
        }
    };

    return (
        <BadgeContext.Provider value={{badgeMap, fetchBadges, fetchBadge}}>
            {children}
        </BadgeContext.Provider>
    );
};

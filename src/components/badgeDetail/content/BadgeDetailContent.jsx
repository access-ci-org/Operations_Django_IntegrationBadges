import BadgeDetailBasicInfo from "./BadgeDetailBasicInfo";
import PrerequisiteBadgesContainer from "./PrerequisiteBadgesContainer";
import TaskContainer from "./TaskContainer";
import {useEffect, useState} from "react";
import LoadingPage from "../../fragments/LoadingPage";
import {useBadges} from "../../../contexts/BadgeContext";

export default function BadgeDetailContent({resource, badge, tasks}) {
    const {badges} = useBadges();
    const [prerequisiteBadges, setPrerequisiteBadges] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const updatedPrerequisites = badge.prerequisites.map(prerequisite => {
            // Find the badge details from the global badges array
            const fullBadge = badges.find(b => b.badge_id === prerequisite.prerequisite_badge_id);

            // Find the status of the badge from resource.badge_status
            const statusInfo = resource.badge_status.find(status => status.badge_id === prerequisite.prerequisite_badge_id);

            // Find the 'required' flag from the roadmap's badge list
            const requiredInfo = resource.roadmaps
                .flatMap(roadmap => roadmap.roadmap.badges)
                .find(b => b.badge.badge_id === prerequisite.prerequisite_badge_id)?.required || false;

            return {
                badge: fullBadge,
                status: statusInfo ? statusInfo.status : 'NotPlanned',
                required: requiredInfo,
                resource_name: resource.resource_descriptive_name
            };
        });

        setPrerequisiteBadges(updatedPrerequisites);
        setLoading(false);
    }, [badge.prerequisites, resource.badge_status, resource.roadmaps, badges, resource.resource_descriptive_name]);

    console.log("prerequisiteBadges", prerequisiteBadges);

    return (
        <div className="content-wrapper">
            <BadgeDetailBasicInfo badge={badge}/>
            {loading ? <LoadingPage/> : <PrerequisiteBadgesContainer badges={prerequisiteBadges}/>}
            <TaskContainer badgeId={badge.badge_id} tasks={tasks}/>
        </div>
    );
}
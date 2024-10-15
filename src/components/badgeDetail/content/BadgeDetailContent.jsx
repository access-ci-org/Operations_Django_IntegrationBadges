import BadgeDetailBasicInfo from "./BadgeDetailBasicInfo";
import PrerequisiteBadgesContainer from "./PrerequisiteBadgesContainer";
import TaskContainer from "./TaskContainer";
import {useEffect, useState} from "react";
import LoadingPage from "../../fragments/LoadingPage";
import {useBadges} from "../../../contexts/BadgeContext";
import {workflow_states} from "../../../App";

/**
 * The main content of the badge detail page.
 * @param {Resource} resource - The resource that the badge is associated with.
 * @param {Function} setResource - The function to set the resource.
 * @param {CombinedBadge} badge - The info of the current badge, including resource-badge model info.
 * @param {Array<Task>} tasks - The tasks associated with the badge. Default is empty array.
 */
export default function BadgeDetailContent({resource, setResource, badge, tasks}) {
    const {badges} = useBadges();
    const [prerequisiteBadges, setPrerequisiteBadges] = useState([]);
    const [loading, setLoading] = useState(true);

    // find the prerequisite badges
    useEffect(() => {
        setLoading(true);
        const updatedPrerequisites = badge.prerequisites.map(prerequisite => {
            // Find the badge details from the global badges array
            const fullBadge = badges.find(b => b.badge_id === prerequisite.prerequisite_badge_id);

            // Find the status of the badge from resource.badge_status
            const statusInfo = resource.badge_status.find(status =>
                status.badge_id === prerequisite.prerequisite_badge_id);

            return {
                ...fullBadge,
                state: statusInfo ? statusInfo.state : workflow_states.NOT_PLANNED,
                resource_name: resource.resource_descriptive_name
            };
        });

        setPrerequisiteBadges(updatedPrerequisites);
        setLoading(false);
    }, [badge.prerequisites, resource.badge_status, resource.roadmaps, badges, resource.resource_descriptive_name]);

    return (
        <div className="content-wrapper">
            <BadgeDetailBasicInfo resource_id={resource.cider_resource_id} badge={badge} setResource={setResource}/>
            {loading ? <LoadingPage/> : <PrerequisiteBadgesContainer badges={prerequisiteBadges}/>}
            <TaskContainer resource_id={resource.cider_resource_id}
                           resource_name={resource.resource_descriptive_name}
                           badge={badge}
                           tasks={tasks}
                           setResource={setResource}/>
        </div>
    );
}
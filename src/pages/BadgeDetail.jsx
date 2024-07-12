import BadgeDetailHeader from "../components/badgeDetail/BadgeDetailHeader";
import BadgeDetailSideBar from "../components/badgeDetail/sidebar/BadgeDetailSideBar";
import BadgeDetailContent from "../components/badgeDetail/content/BadgeDetailContent";
import {useParams} from "react-router-dom";
import {useBadges} from "../contexts/BadgeContext";
import {useEffect, useState} from "react";
import {useResources} from "../contexts/ResourcesContext";

const badge = {
    badge_id: 1,
    name: "Ticket Handling",
    researcher_summary: "ACCESS researchers will be assigned tickets for issues or " +
        "questions about their research. In response they will monitor the ticket " +
        "system for tickets assigned to them, triage them as necessary, reassign " +
        "them to other staff or organizations if necessary, resolve issues, and " +
        "close tickets once the request is addressed.",
    resource_provider_summary: "ACCESS resource and online service operators " +
        "will be assigned tickets for issues or questions about their resources " +
        "and online services. In response they will monitor the ticket system for " +
        "tickets assigned to them, triage them as necessary, reassign them to other " +
        "staff or organizations if necessary, resolve issues, and close tickets once " +
        "the request is addressed."
}

export default function BadgeDetail() {
    const { resourceId, badgeId } = useParams();
    const { badges } = useBadges();
    const { resources } = useResources();
    const [selectedBadge, setSelectedBadge] = useState(null);
    const [selectedResource, setSelectedResource] = useState(null);

    useEffect(() => {
        // Find the badge in the list of badges
        const badge = badges.find(b => b.badge_id === parseInt(badgeId, 10));
        setSelectedBadge(badge);
    }, [badges, badgeId]);

    useEffect(() => {
        // Find the resource in the list of resources
        const resource = resources.find(b => b.cider_resource_id === parseInt(resourceId, 10));
        setSelectedResource(resource);
    }, [resources, resourceId]);

    if (!selectedBadge || !selectedResource) {
        return <div>Loading...</div>
    }

    return (
        <div className="badge-detail-wrapper">
            <BadgeDetailHeader resource={selectedResource}/>
            <div className="main-wrapper">
                <BadgeDetailSideBar />
                <BadgeDetailContent data={badge}/>
            </div>
        </div>
    );
}
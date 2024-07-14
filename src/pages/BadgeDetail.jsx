import BadgeDetailHeader from "../components/badgeDetail/BadgeDetailHeader";
import BadgeDetailSideBar from "../components/badgeDetail/sidebar/BadgeDetailSideBar";
import BadgeDetailContent from "../components/badgeDetail/content/BadgeDetailContent";
import {useParams} from "react-router-dom";
import {useBadges} from "../contexts/BadgeContext";
import {useEffect, useState} from "react";
import {useResources} from "../contexts/ResourcesContext";
import axios from "axios";
import LoadingPage from "../components/fragments/LoadingPage";

export default function BadgeDetail() {
    const { resourceId, badgeId } = useParams();
    const { badges } = useBadges();
    const [selectedBadge, setSelectedBadge] = useState(null);
    const [selectedResource, setSelectedResource] = useState(null);
    const [selectedTasks, setSelectedTasks] = useState([]);

    // Fetch the resource and tasks
    useEffect(() => {
        const fetchResource = async () => {
            try {
                const response = await axios.get(`/resource/${resourceId}`);
                setSelectedResource(response.data.results);
                return response.data.results;
            } catch (error) {
                return error;
            }
        };

        const fetchTasks = async () => {
            try {
                const response = await axios.get(`/task/${badgeId}`);
                setSelectedTasks(response.data.results);
                return response.data.results;
            } catch (error) {
                return error;
            }
        };

        fetchResource().then(r => {
            if (r instanceof Error) {
                console.log('Failed to fetch current resource:', r);
            } else {
                console.log('Resource fetched:', r);
            }
        });

        fetchTasks().then(r => {
            if (r instanceof Error) {
                console.log('Failed to fetch current tasks:', r);
            } else {
                console.log('Tasks fetched:', r);
            }
        });
    }, [resourceId, badgeId]);

    // Merge badge details with resource and badge status
    useEffect(() => {
        const mergeBadgeDetails = () => {
            if (!badges || !selectedResource) return;

            // Find the badge in the list of badges
            const badge = badges.find(b => b.badge_id === parseInt(badgeId, 10));

            if (badge) {
                // Find badge requirements and status from the resource
                selectedResource.roadmaps.forEach(roadmap => {
                    roadmap.roadmap.badges.forEach(b => {
                        if (b.badge.badge_id === badge.badge_id) {
                            badge.required = b.required;
                        }
                    });
                });

                const statusInfo = selectedResource.badge_status.find(status => status.badge_id === badge.badge_id);
                badge.status = statusInfo ? statusInfo.status : 'NotPlanned';

                setSelectedBadge(badge);
                console.log("Badge details merged:", badge);

            }
        };

        mergeBadgeDetails();
    }, [badgeId, badges, selectedResource]);

    // If the badge, resource, or tasks are not fetched yet, display loading page
    if (!selectedBadge || !selectedResource || !selectedTasks) {
        return <LoadingPage />;
    }

    return (
        <div className="badge-detail-wrapper">
            <BadgeDetailHeader resource={selectedResource} currentBadge={selectedBadge} badges={badges} />
            <div className="main-wrapper">
                <BadgeDetailSideBar />
                <BadgeDetailContent badge={selectedBadge} tasks={selectedTasks}/>
            </div>
        </div>
    );
}
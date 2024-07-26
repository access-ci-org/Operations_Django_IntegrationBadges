import BadgeDetailHeader from "../components/badgeDetail/BadgeDetailHeader";
import BadgeDetailSideBar from "../components/badgeDetail/sidebar/BadgeDetailSideBar";
import BadgeDetailContent from "../components/badgeDetail/content/BadgeDetailContent";
import {useParams} from "react-router-dom";
import {useBadges} from "../contexts/BadgeContext";
import {useEffect, useState} from "react";
import {useResources} from "../contexts/ResourcesContext";
import axios from "axios";
import LoadingPage from "../components/fragments/LoadingPage";
import {workflow_states} from "../App";

/**
 * The page that displays the details of a badge, including basic stats,
 * plan/unplan a badge, and view/complete tasks associated with the badge.
 */
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
                let roadmapNames = [];

                // Iterate over each roadmap and badge to find matching badges and collect roadmap names
                selectedResource.roadmaps.forEach(roadmap => {
                    roadmap.roadmap.badges.forEach(b => {
                        // if the roadmap contains the badge
                        if (b.badge.badge_id === badge.badge_id) {
                            roadmapNames.push(roadmap.roadmap.name);
                        }
                    });
                });

                // Ensure the list of roadmap names is unique
                badge.roadmap_names = Array.from(new Set(roadmapNames));

                // Find badge status from the resource
                const badge_status = selectedResource.badge_status.find(status => status.badge_id === badge.badge_id);
                if (badge_status) {
                    badge.state = badge_status.state;
                    badge.badge_access_url = badge_status.badge_access_url;
                    badge.badge_access_url_label = badge_status.badge_access_url_label;
                    badge.state_updated_at = badge_status.state_updated_at;
                    badge.comment = badge_status.comment;
                } else {
                    badge.state = workflow_states.NOT_PLANNED;
                    badge.badge_access_url = null;
                    badge.badge_access_url_label = null;
                    badge.state_updated_at = null;
                    badge.comment = null;
                }

                console.log("Current badge model:", badge);
                setSelectedBadge({ ...badge });
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
            <BadgeDetailHeader resource={selectedResource} name={selectedBadge.name}/>
            <div className="main-wrapper">
                <BadgeDetailSideBar resource={selectedResource}
                                    setResource={setSelectedResource}
                                    badge={selectedBadge}
                                    tasks={selectedTasks}/>
                <BadgeDetailContent resource={selectedResource}
                                    setResource={setSelectedResource}
                                    badge={selectedBadge}
                                    tasks={selectedTasks}/>
            </div>
        </div>
    );
}
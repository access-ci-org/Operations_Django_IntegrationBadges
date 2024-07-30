import BasicInfoHeader from "../components/resourceDetail/basicInfoSection/BasicInfoHeader";
import BadgeSection from "../components/resourceDetail/badgeSection/BadgeSection";
import BasicInfoFeatures from "../components/resourceDetail/basicInfoSection/BasicInfoFeatures";
import {useParams} from "react-router-dom";
import {useBadges} from "../contexts/BadgeContext";
import React, {useEffect, useState} from "react";
import axios from "axios";
import LoadingPage from "../components/fragments/LoadingPage";
import EmptyPage from "../components/fragments/EmptyPage";

/**
 * For the case where there are no badges associated with the resource.
 */
function BadgeSectionPlaceholder() {
    return (
        <div className="resource-badge-section">
            <div className="resource-badge-header">
                <h2>Resource Badges</h2>
            </div>
            <div>
                <EmptyPage text={"No badges available for this resource."}/>
            </div>
        </div>
    );
}

/**
 * The page that displays the detail of a resource, including
 * all the badges that are associated with the resource.
 * TODO: Implement feature section after features are developed
 */
export default function ResourceDetail() {
    const {resourceId} = useParams();
    const [resource, setResource] = useState(null);
    const {badges} = useBadges();

    useEffect(() => {
        const fetchResource = async () => {
            try {
                const response = await axios.get(`/resource/${resourceId}`);
                setResource(response.data.results);
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
    }, [resourceId]);

    const handleViewGuideClick = () => {
        if (resource && resource.user_guide_url) {
            window.open(resource.user_guide_url, "_blank");
        }
    };

    // If the resource is not fetched yet, display loading page
    if (!resource || !badges) {
        return <LoadingPage/>;
    }

    return (
        <div className="resource-detail">
            <BasicInfoHeader resource={resource}/>
            <button className="btn btn-medium resource-detail-btn" onClick={handleViewGuideClick}>
                View User Guide
            </button>
            <div className="description-section">
                <h2 className="description-title">Overview</h2>
                <p className="description-text">
                    {resource.resource_description || 'Description not available.'}
                </p>
            </div>
            {/*<BasicInfoFeatures data={jetStream4}/>*/}
            {(resource.roadmaps && resource.roadmaps.length > 0) ?
                <BadgeSection resource={resource}/> : <BadgeSectionPlaceholder/>}
        </div>
    );
}
import BasicInfoHeader from "../components/resourceDetail/basicInfoSection/BasicInfoHeader";
import BadgeSection from "../components/resourceDetail/badgeSection/BadgeSection";
import BasicInfoFeatures from "../components/resourceDetail/basicInfoSection/BasicInfoFeatures";
import {useParams} from "react-router-dom";
import {useBadges} from "../contexts/BadgeContext";
import {useEffect, useState} from "react";
import axios from "axios";

function DescriptionSection({description}) {
    return (
        <div className="description-section">
            <h2 className="description-title">Overview</h2>
            <p className="description-text">
                {description}
            </p>
        </div>
    );
}

function FeatureSection({data}) {
    return (
        <BasicInfoFeatures data={data}/>
    );
}

export default function ResourceDetail() {
    const { resourceId } = useParams();
    const [resource, setResource] = useState(null);
    const { badges} = useBadges();

    useEffect(() => {
        const fetchResource = async () => {
            try {
                const response = await axios.get(`/resource/${resourceId}`);
                setResource(response.data.results);
                return response.data.results;
            } catch (error) {
                console.error('Error fetching resource:', error);
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

    if (!resource || !badges) {
        return <div>Loading...</div>;
    }

    return (
        <div className="resource-detail">
            <BasicInfoHeader resource={resource}/>
            <button className="btn btn-medium resource-detail-btn" onClick={handleViewGuideClick}>
                View User Guide
            </button>
            <DescriptionSection description={resource.resource_description}/>
            {/*<FeatureSection data={jetStream4}/> TODO: Implement feature section after features are developed*/}
            {resource.roadmaps && resource.roadmaps.length > 0 && (
                <BadgeSection resource={resource}/>
            )}
        </div>
    );
}
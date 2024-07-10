import BasicInfoHeader from "../components/resourceDetail/basicInfoSection/BasicInfoHeader";
import BadgeSection from "../components/resourceDetail/badgeSection/BadgeSection";
import BasicInfoFeatures from "../components/resourceDetail/basicInfoSection/BasicInfoFeatures";
import {useEffect, useState} from "react";
import axios from "axios";
import {useLocation, useParams} from "react-router-dom";

const jetStream4 = {
    id: 1,
    name: "JetStream 4",
    institution: "Indiana University",
    institutionUrl: "https://jetstream2.tacc.utexas.edu/",
    type: "Compute",
    status: "TBD",
    globalResourceId: "jetstream4.indiana.access-ci.org",
    description: "Jetstream2 is a hybrid-cloud platform that provides flexible, on-demand, programmable " +
        "cyberinfrastructure tools ranging from interactive virtual machine services to a variety of " +
        "infrastructure and orchestration services for research and education. The primary resource is a " +
        "standard CPU resource consisting of AMD Milan 7713 CPUs with 128 cores per node and 512gb RAM per " +
        "node connected by 100gbps ethernet to the spine.",
    features: ["Allocated by ACCESS", "Jetstream4 API", "Jetstream4 CLI", "Supported by Science Gateways",
        "Jetstream4 User Guide", "Community software areas for science gateways", "Jetstream4 User Forum"],
    roadmaps:[
        {
            name: "Jetstream4 Compute Roadmap",
            badges: [
                {
                    id: 1,
                    name: "ACCESS Resource Description",
                    description: "If you have any questions or issue related to this resource like raise a support request " +
                        "or ticket using this badge. This resource is integrated with ACCESS Ticketing systems to answer and " +
                        "resolve any queries related to accessing this resource, help with allocation, help with monitoring " +
                        "usage metrics, etc. ",
                    status: "Verified",
                    required: true,
                    source: "Indiana Jetstream2 CPU",
                    actionUrl: "https://jetstream2.tacc.utexas.edu/",
                    actionText: "Submit a Ticket"
                }, {
                    id: 2,
                    name: "Ticket Handling",
                    description: "If you have any questions or issue related to this resource like raise a support request " +
                        "or ticket using this badge. This resource is integrated with ACCESS Ticketing systems to answer and " +
                        "resolve any queries related to accessing this resource, help with allocation, help with monitoring " +
                        "usage metrics, etc. ",
                    status: "NotPlanned",
                    required: true,
                    source: "Indiana Jetstream2 CPU",
                    actionUrl: "https://jetstream2.tacc.utexas.edu/",
                    actionText: "Submit a Ticket"
                }, {
                    id: 3,
                    name: "Badge ABC",
                    description: "This is a badge description. This is a badge description. This is a badge description. " +
                        "This is a badge description. This is a badge description. This is a badge description. ",
                    status: "NotStarted",
                    required: false,
                    source: "Indiana Jetstream2 CPU",
                    actionUrl: "https://jetstream2.tacc.utexas.edu/",
                    actionText: "Submit a Ticket"
                }, {
                    id: 4,
                    name: "Another Badge",
                    description: "This is a badge description. This is a badge description. This is a badge description. " +
                        "This is a badge description. This is a badge description. This is a badge description. ",
                    status: "Planned",
                    required: false,
                    source: "Indiana Jetstream2 CPU",
                    actionUrl: "https://jetstream2.tacc.utexas.edu/",
                    actionText: "Submit a Ticket"
                }, {
                    id: 5,
                    name: "Badge for XYX",
                    description: "This is a badge description. This is a badge description. This is a badge description. " +
                        "This is a badge description. This is a badge description. This is a badge description. ",
                    status: "Planned",
                    required: true,
                    source: "Indiana Jetstream2 CPU",
                    actionUrl: "https://jetstream2.tacc.utexas.edu/",
                    actionText: "Submit a Ticket"
                }, {
                    id: 6,
                    name: "Badge for XYX",
                    description: "This is a badge description. This is a badge description. This is a badge description. " +
                        "This is a badge description. This is a badge description. This is a badge description. ",
                    status: "Deprecated",
                    required: false,
                    source: "Indiana Jetstream2 CPU",
                    actionUrl: "https://jetstream2.tacc.utexas.edu/",
                    actionText: "Submit a Ticket"
                }, {
                    id: 7,
                    name: "Badge for XYX",
                    description: "This is a badge description. This is a badge description. This is a badge description. " +
                        "This is a badge description. This is a badge description. This is a badge description. ",
                    status: "TaskCompleted",
                    required: false,
                    source: "Indiana Jetstream2 CPU",
                    actionUrl: "https://jetstream2.tacc.utexas.edu/",
                    actionText: "Submit a Ticket"
                }, {
                    id: 8,
                    name: "Badge for XYX",
                    description: "This is a badge description. This is a badge description. This is a badge description. " +
                        "This is a badge description. This is a badge description. This is a badge description. ",
                    status: "VerificationFailed",
                    required: false,
                    source: "Indiana Jetstream2 CPU",
                    actionUrl: "https://jetstream2.tacc.utexas.edu/",
                    actionText: "Submit a Ticket"
                }
            ]
        },
        {
            name: "Jetstream4 Storage Roadmap",
            badges: [
                {
                    id: 9,
                    name: "ACCESS Resource Description",
                    description: "If you have any questions or issue related to this resource like raise a support request " +
                        "or ticket using this badge. This resource is integrated with ACCESS Ticketing systems to answer and " +
                        "resolve any queries related to accessing this resource, help with allocation, help with monitoring " +
                        "usage metrics, etc. ",
                    status: "Verified",
                    required: true,
                    source: "Indiana Jetstream2 CPU",
                    actionUrl: "https://jetstream2.tacc.utexas.edu/",
                    actionText: "Submit a Ticket"
                }, {
                    id: 10,
                    name: "Ticket Handling",
                    description: "If you have any questions or issue related to this resource like raise a support request " +
                        "or ticket using this badge. This resource is integrated with ACCESS Ticketing systems to answer and " +
                        "resolve any queries related to accessing this resource, help with allocation, help with monitoring " +
                        "usage metrics, etc. ",
                    status: "NotStarted",
                    required: true,
                    source: "Indiana Jetstream2 CPU",
                    actionUrl: "https://jetstream2.tacc.utexas.edu/",
                    actionText: "Submit a Ticket"
                }, {
                    id: 11,
                    name: "Badge ABC",
                    description: "This is a badge description. This is a badge description. This is a badge description. " +
                        "This is a badge description. This is a badge description. This is a badge description. ",
                    status: "Planned",
                    required: false,
                    source: "Indiana Jetstream2 CPU",
                    actionUrl: "https://jetstream2.tacc.utexas.edu/",
                    actionText: "Submit a Ticket"
                }
            ]
        }
    ],
};

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
    const location = useLocation();
    const { resourceBadges } = location.state || {};
    const { resourceId } = useParams();

    const [resource, setResource] = useState(null);

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
        if (resource && resource.cider_view_url) {
            window.open(resource.cider_view_url, "_blank");
        }
    };

    if (!resource) {
        return <div>Loading...</div>;
    }

    return (
        <div className="resource-detail">
            <BasicInfoHeader resource={resource}/>
            <button className="btn btn-medium resource-detail-btn" onClick={handleViewGuideClick}>
                View User Guide
            </button>
            <DescriptionSection description={resource.resource_description}/>
            <FeatureSection data={jetStream4}/>
            <BadgeSection resource={resource} badges={resourceBadges}/>
        </div>
    );
}
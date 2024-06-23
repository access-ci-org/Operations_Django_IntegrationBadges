import {useParams} from "react-router-dom";
import ResourceDetailHeader from "./BasicInfoSection/ResourceDetailHeader";
import ResourceBadgeSection from "./ResourceBadgeSection/ResourceBadgeSection";
import ResourceDetailFeatures from "./BasicInfoSection/ResourceDetailFeatures";

const jetStream4 = {
    id: 1,
    name: "JetStream 4",
    institution: "Indiana University",
    institutionUrl: "https://jetstream2.tacc.utexas.edu/",
    type: "Compute",
    status: "TBD",
    globalResourceId: "jetstream4.indiana.access-ci.org",
    description: "Jetstream4 is a hybrid-cloud platform that provides flexible, on-demand, programmable " +
        "cyberinfrastructure tools ranging from interactive virtual machine services to a variety of " +
        "infrastructure and orchestration services for research and education. ",
    features: ["Allocated by ACCESS", "Jetstream4 API", "Jetstream4 CLI", "Supported by Science Gateways",
        "Jetstream4 User Guide", "Community software areas for science gateways", "Jetstream4 User Forum"],
    roadmaps:[
        {
            name: "Jetstream4 Compute Roadmap",
            badges: [
                {
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
                    name: "Badge ABC",
                    description: "This is a badge description. This is a badge description. This is a badge description. " +
                        "This is a badge description. This is a badge description. This is a badge description. ",
                    status: "NotStarted",
                    required: false,
                    source: "Indiana Jetstream2 CPU",
                    actionUrl: "https://jetstream2.tacc.utexas.edu/",
                    actionText: "Submit a Ticket"
                }, {
                    name: "Another Badge",
                    description: "This is a badge description. This is a badge description. This is a badge description. " +
                        "This is a badge description. This is a badge description. This is a badge description. ",
                    status: "Planned",
                    required: false,
                    source: "Indiana Jetstream2 CPU",
                    actionUrl: "https://jetstream2.tacc.utexas.edu/",
                    actionText: "Submit a Ticket"
                }, {
                    name: "Badge for XYX",
                    description: "This is a badge description. This is a badge description. This is a badge description. " +
                        "This is a badge description. This is a badge description. This is a badge description. ",
                    status: "Planned",
                    required: true,
                    source: "Indiana Jetstream2 CPU",
                    actionUrl: "https://jetstream2.tacc.utexas.edu/",
                    actionText: "Submit a Ticket"
                }, {
                    name: "Badge for XYX",
                    description: "This is a badge description. This is a badge description. This is a badge description. " +
                        "This is a badge description. This is a badge description. This is a badge description. ",
                    status: "Deprecated",
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

function DescriptionSection({data}) {
    return (
        <div className="description-section">
            <h2 className="description-title">Overview</h2>
            <p className="description-text">
                {data.description}
            </p>
        </div>
    );
}

function FeatureSection({data}) {
    return (
        <ResourceDetailFeatures data={data}/>
    );
}

export default function ResourceDetail() {
    const { resourceId } = useParams();

    return (
        <div className="resource-detail">
            <ResourceDetailHeader data={jetStream4}/>
            <button className="btn btn-dark resource-detail-btn">View User Guide</button>
            <DescriptionSection data={jetStream4}/>
            <FeatureSection data={jetStream4}/>
            <ResourceBadgeSection data={jetStream4}/>
        </div>
    );
}
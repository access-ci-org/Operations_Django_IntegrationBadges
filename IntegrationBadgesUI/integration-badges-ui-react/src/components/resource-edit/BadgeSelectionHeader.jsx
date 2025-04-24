import {useResources} from "../../contexts/ResourcesContext.jsx";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";

export default function BadgeSelectionHeader({resourceId, roadmapId}) {
    const {getResource, getResourceOrganization} = useResources();
    const {getRoadmap} = useRoadmaps();

    const resource = getResource({resourceId});
    const organization = getResourceOrganization({resourceId});
    const roadmap = getRoadmap({roadmapId});

    return <>
        <div className="w-100 border-gray-200 border-top">
            <div className="row bg-gray-100 rounded-3 mt-4 p-2">
                <div className="col p-2">
                    <div><strong>{resource.resource_descriptive_name}</strong></div>
                    <div><strong className="text-medium">{organization.organization_name}</strong></div>
                </div>
                <div className="col p-2">
                    <label className="text-secondary">Resource Type</label>
                    <div>{resource.cider_type}</div>
                </div>
                <div className="col p-2">
                    <label className="text-secondary">Global Resource ID</label>
                    <div>{resource.info_resourceid}</div>
                </div>
                <div className="col p-2">
                    <label className="text-secondary">Latest Status</label>
                    <div>{resource.latest_status}</div>
                </div>
                <div className="col p-2">
                    <label className="text-secondary">Roadmap</label>
                    <div>{roadmap.name}</div>
                </div>
            </div>
        </div>
    </>
}
import {Link, useParams} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import {useOrganizations} from "../contexts/OrganizationsContext";
import {useResources} from "../contexts/ResourcesContext";
import {useEffect, useState} from "react";
import {Collapse, Fade, Modal, Nav} from "react-bootstrap";
import {BadgeWorkflowStatus, useBadges} from "../contexts/BadgeContext";

import {useTranslation} from "react-i18next";
import LoadingBlock from "../components/LoadingBlock";
import {BadgeTaskWorkflowStatus} from "../contexts/TaskContext.jsx";
import {useRoadmaps} from "../contexts/RoadmapContext.jsx";

export default function ResourceEdit() {
    const {t} = useTranslation();
    const {resourceId} = useParams();
    const {fetchResource, getResource, getResourceBadges, getResourceOrganization, setResource} = useResources();
    const {getBadge} = useBadges();
    const {fetchRoadmaps, getRoadmaps} = useRoadmaps();

    const [recommendedBadgeIds, setRecommendedBadgeIds] = useState([]);
    const [selectedRoadmapIdMap, setSelectedRoadmapIdMap] = useState({});
    const [selectedBadgeIdMap, setSelectedBadgeIdMap] = useState({});
    const [saveProcessing, setSaveProcessing] = useState(false);

    useEffect(() => {
        fetchRoadmaps();
    }, []);

    useEffect(() => {
        fetchResource({resourceId});
    }, [resourceId]);

    const toggleRoadmapSelection = ({roadmapId}) => {
        setSelectedRoadmapIdMap({
            ...selectedRoadmapIdMap, [roadmapId]: !selectedRoadmapIdMap[roadmapId]
        });
    };
    const toggleBadgeSelection = ({badgeId}) => {
        setSelectedBadgeIdMap({
            ...selectedBadgeIdMap, [badgeId]: !selectedBadgeIdMap[badgeId]
        });
    };

    const handleSave = async () => {
        const roadmapIds = [];
        for (let roadmapId in selectedRoadmapIdMap) {
            if (selectedRoadmapIdMap[roadmapId]) {
                roadmapIds.push(roadmapId);
            }
        }

        const badgeIds = recommendedBadgeIds.filter(badgeId => selectedBadgeIdMap[badgeId]);

        setSaveProcessing(true);
        await setResource({resourceId, roadmapIds, badgeIds});
        setSaveProcessing(false);
    };

    const resource = getResource({resourceId});
    let organization = getResourceOrganization({resourceId})

    let roadmaps = getRoadmaps();
    let badges = recommendedBadgeIds.map(badgeId => getBadge({badgeId}));

    useEffect(() => {
        if (roadmaps.length > 0) {
            let badgeIds = [];
            for (let i = 0; i < roadmaps.length; i++) {
                const roadmapId = roadmaps[i].roadmap_id;

                if (selectedRoadmapIdMap[roadmapId]) {
                    for (let j = 0; j < roadmaps[i].badges.length; j++) {
                        const badgeId = roadmaps[i].badges[j].badge.badge_id;
                        badgeIds.push(badgeId);
                    }
                }
            }

            badgeIds = Array.from(new Set(badgeIds));
            setRecommendedBadgeIds(badgeIds);
        }
    }, [roadmaps.length, selectedRoadmapIdMap]);


    useEffect(() => {
        if (resource && resource.roadmaps) {
            const _selectedRoadmapIdMap = {};
            for (let i = 0; i < resource.roadmaps.length; i++) {
                _selectedRoadmapIdMap[resource.roadmaps[i].roadmap_id] = true;
            }
            setSelectedRoadmapIdMap(_selectedRoadmapIdMap);
        }

        if (resource && resource.badge_status) {
            const _selectedBadgeIdMap = {};
            for (let i = 0; i < resource.badge_status.length; i++) {
                _selectedBadgeIdMap[resource.badge_status[i].badge_id] = true;
            }

            setSelectedBadgeIdMap(_selectedBadgeIdMap);
        }
    }, [resource]);


    if (resource && organization) {

        return <div className="container">
            <div className="row">
                <h1>{resource.resource_descriptive_name}</h1>
                <div>
                    By&nbsp;&nbsp;
                    <Link to={`/organizations/${organization.organization_id}`} className="btn btn-link text-dark">
                        {organization.organization_name}
                    </Link>
                </div>
            </div>
            <div className="row pt-5">
                <h2>Overview</h2>
                <div className="row">
                    <div className="col">
                        <label className="text-secondary">Resource Type</label>
                        <div>{resource.cider_type}</div>
                    </div>
                    <div className="col">
                        <label className="text-secondary">Latest Status</label>
                        <div>{resource.latest_status}</div>
                    </div>
                    <div className="col">
                        <label className="text-secondary">Global Resource ID</label>
                        <div>{resource.info_resourceid}</div>
                    </div>
                </div>
            </div>

            <div className="row pt-5">
                <h2>Roadmaps</h2>
                <div className="w-100 pt-2 pb-5">
                    {roadmaps && roadmaps.map((roadmap) => {
                        const roadmapId = roadmap.roadmap_id;
                        return <div className="w-100 pt-2" key={roadmapId}>
                            {getRoadmapCard(organization, resource, roadmap, selectedRoadmapIdMap[roadmapId], toggleRoadmapSelection.bind(this, {roadmapId}), t)}
                        </div>
                    })}
                    {roadmaps && roadmaps.length === 0 && <div className="w-100 p-3 text-center lead">
                        No roadmaps available
                    </div>}
                </div>
            </div>

            <div className="row pt-5">
                <h2>Badges</h2>

                <div className="w-100 pt-2 pb-5">
                    {badges && badges.map((badge) => {
                        const badgeId = badge.badge_id;
                        return <div className="w-100 pt-2" key={badgeId}>
                            {getBadgeCard(organization, resource, badge, selectedBadgeIdMap[badgeId], toggleBadgeSelection.bind(this, {badgeId}), t)}
                        </div>
                    })}
                    {badges && badges.length === 0 && <div className="w-100 p-3 text-center lead">
                        No badges available
                    </div>}
                </div>

            </div>


            <div className="w-100 text-end pt-3 pb-5">
                <button className="btn btn-outline-dark m-1">
                    Cancel
                </button>

                {
                    saveProcessing ?
                        <button className="btn btn-dark m-1">
                                                <span className="spinner-border spinner-border-sm me-3" role="status"
                                                      aria-hidden="true"></span>
                            Loading...
                        </button> :
                        <button className="btn btn-dark m-1" onClick={handleSave}>
                            Save details
                        </button>
                }


            </div>
        </div>
    } else {
        return <LoadingBlock processing={true}/>
    }

}

function getRoadmapCard(organization, resource, roadmap, selected, toggle, t) {
    if (organization && resource && roadmap) {
        return <div className="row rounded-3 border-gray-200 border border-1">
            <div className="col-lg-4 ps-0 d-flex flex-row align-items-center">
                <div
                    className="p-3 h-100 bg-light rounded-start-3 border-gray-200 border-end border-1 align-content-center text-center"
                    role="button" onClick={toggle}>
                    <Form.Check name="roadmaps" type="checkbox" id={`roadmap-${roadmap.roadmap_id}`}
                                checked={!!selected} onChange={toggle}/>
                </div>
                <div className="mt-3 mb-3 ms-2 me-2 background-image-center-no-repeat badge-icon-small"
                     style={{backgroundImage: `url(${roadmap.graphic})`}}>
                </div>
                <h4 className="flex-fill p-2 m-0">{roadmap.name}</h4>
            </div>
            <p className="col-lg-5 pt-2 pb-2 m-0 align-content-center">
                {roadmap.executive_summary}
            </p>
            <div className="col-lg-3 pt-2 pb-2 align-content-center">
                <Link to={`/roadmaps/${roadmap.roadmap_id}`}
                      className="w-100 btn btn-outline-dark btn-sm">
                    View Additional Roadmap Details
                </Link>
            </div>
        </div>
    }
}

function getBadgeCard(organization, resource, badge, selected, toggle, t) {
    if (organization && resource && badge) {
        return <div className="row rounded-3 border-gray-200 border border-1">
            <div className="col-lg-4 ps-0 d-flex flex-row align-items-center">
                <div
                    className="p-3 h-100 bg-light rounded-start-3 border-gray-200 border-end border-1 align-content-center text-center"
                    role="button" onClick={toggle}>
                    <Form.Check name="badges" type="checkbox" id={`badge-${badge.badge_id}`}
                                checked={!!selected} onChange={toggle}/>
                </div>
                <div className="mt-3 mb-3 ms-2 me-2 background-image-center-no-repeat badge-icon-small"
                     style={{backgroundImage: `url(${badge.graphic})`}}>
                </div>
                <h4 className="flex-fill p-2 m-0">{badge.name}</h4>
            </div>
            <p className="col-lg-5 pt-2 pb-2 m-0 align-content-center">
                {badge.resource_provider_summary}
            </p>
            <div className="col-lg-3 pt-2 pb-2 align-content-center">
                <Link to={`/resources/${resource.cider_resource_id}/badges/${badge.badge_id}`}
                      className="w-100 btn btn-outline-dark btn-sm">
                    View Additional Badge Details
                </Link>
            </div>
        </div>
    }
}

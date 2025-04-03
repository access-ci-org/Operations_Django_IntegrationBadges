import {Link, useNavigate, useParams} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import {useAccordionButton} from 'react-bootstrap/AccordionButton';
import {useContext} from 'react';
import AccordionContext from 'react-bootstrap/AccordionContext';
import {useOrganizations} from "../contexts/OrganizationsContext";
import {useResources} from "../contexts/ResourcesContext";
import {useEffect, useState} from "react";
import {AccordionButton, Collapse, Fade, Modal, Nav} from "react-bootstrap";
import {BadgeWorkflowStatus, useBadges} from "../contexts/BadgeContext";

import {useTranslation} from "react-i18next";
import LoadingBlock from "../components/LoadingBlock";
import {BadgeTaskWorkflowStatus} from "../contexts/TaskContext.jsx";
import {useRoadmaps} from "../contexts/RoadmapContext.jsx";
import {
    BadgeCardRowWithAddRemove, BadgeCardRowWithCheckboxes, RoadmapCard
} from "../components/resource-edit/resource-edit-page-cards.jsx";

export default function ResourceEdit() {
    const navigate = useNavigate();

    const {t} = useTranslation();
    const {resourceId} = useParams();
    const {fetchResource, getResource, getResourceBadges, getResourceOrganization, setResource} = useResources();
    const {getBadge} = useBadges();
    const {fetchRoadmaps, getRoadmaps, getRoadmap} = useRoadmaps();

    const [recommendedBadgeIds, setRecommendedBadgeIds] = useState([]);
    const [selectedRoadmapIdMap, setSelectedRoadmapIdMap] = useState({});
    const [selectedBadgeIdMap, setSelectedBadgeIdMap] = useState({});
    const [saveProcessing, setSaveProcessing] = useState(false);
    const [wizardIndex, setWizardIndex] = useState(0);
    const [accordionActiveKeys, setAccordionActiveKeys] = useState(["0"]);

    useEffect(() => {
        fetchRoadmaps();
    }, []);

    useEffect(() => {
        fetchResource({resourceId});
    }, [resourceId]);

    const resource = getResource({resourceId});
    let organization = getResourceOrganization({resourceId})

    let roadmaps = getRoadmaps();
    const selectedBadges = [];
    const notSelectedBadges = [];
    let badges = recommendedBadgeIds.map(badgeId => {
        const badge = getBadge({badgeId});

        if (selectedBadgeIdMap[badgeId]) {
            selectedBadges.push(badge);
        } else {
            notSelectedBadges.push(badge);
        }

        return badge;
    });


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
                console.log("#### resource.roadmaps[i].roadmap. ", resource.roadmaps[i].roadmap)
                _selectedRoadmapIdMap[resource.roadmaps[i].roadmap.roadmap_id] = true;

                // Skip the roadmap selection if it's already enrolled.
                // TODO uncomment later
                // setWizardIndex(1);

                setAccordionActiveKeys(["1"])
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

    const toggleRoadmapSelection = ({roadmapId}) => {
        setSelectedRoadmapIdMap({
            // ...selectedRoadmapIdMap,
            [roadmapId]: !selectedRoadmapIdMap[roadmapId]
        });
    };
    const toggleBadgeSelection = ({badgeId}) => {
        setSelectedBadgeIdMap({
            ...selectedBadgeIdMap, [badgeId]: !selectedBadgeIdMap[badgeId]
        });
    };

    const selectedRoadmapIds = [];
    const selectedRoadmaps = [];
    for (let roadmapId in selectedRoadmapIdMap) {
        if (selectedRoadmapIdMap[roadmapId]) {
            selectedRoadmapIds.push(roadmapId);

            const roadmap = getRoadmap({roadmapId});
            if (roadmap) {
                selectedRoadmaps.push(roadmap)
            }
        }
    }
    console.log("selectedRoadmapIdMap : ", selectedRoadmapIdMap)
    console.log("selectedRoadmapIds : ", selectedRoadmapIds)
    console.log("selectedRoadmaps : ", selectedRoadmaps)

    const selectedBadgeIds = recommendedBadgeIds.filter(badgeId => selectedBadgeIdMap[badgeId]);

    const handleSave = async () => {
        setSaveProcessing(true);
        await setResource({resourceId, roadmapIds: selectedRoadmapIds, badgeIds: selectedBadgeIds});
        setSaveProcessing(false);
        navigate(`/resources/${resource.cider_resource_id}`)
    };

    console.log("accordionActiveKeys : ", accordionActiveKeys)
    function AccordionSection({children, eventKey, nextEventKey, sectionTitle}) {
        const {activeEventKey} = useContext(AccordionContext);

        const isActive = activeEventKey.indexOf(eventKey) >= 0;

        const decoratedOnClick = (eventKey) => useAccordionButton(eventKey, () => console.log('totally custom!'),);

        const clickToggle = useAccordionButton(eventKey, () => console.log('totally custom!'),);

        const clickNext = (evt) => {
            clickToggle(evt);
            useAccordionButton(eventKey, () => console.log('totally custom!'),);
        }

        const show = (eventKey) => (evt) => setAccordionActiveKeys(Array.from(new Set([...activeEventKey, eventKey])));
        const hide = (eventKey) => (evt) => setAccordionActiveKeys(activeEventKey.filter(k => k !== eventKey));
        const toggle = (eventKey) => activeEventKey.indexOf(eventKey) < 0 ? show(eventKey) : hide(eventKey);
        const next = (eventKey, nextEventKey) => (evt) => {
            let _activeEventKey = activeEventKey.filter(k => k !== eventKey);
            _activeEventKey = nextEventKey ? Array.from(new Set([..._activeEventKey, nextEventKey])) : _activeEventKey;
            setAccordionActiveKeys(_activeEventKey);
        }

        // return (
        //     <button
        //         type="button"
        //         style={{backgroundColor: 'pink'}}
        //         onClick={decoratedOnClick}
        //     >
        //         {children}
        //     </button>
        // );

        return <Accordion.Item eventKey={eventKey} className="border-0">
            <div className="row pt-5">
                <button className="btn btn-link text-decoration-none d-flex flex-row align-items-center"
                        onClick={toggle(eventKey)}>
                    <div>
                        <AccordionButton as="div" className="accordion-button border-0 shadow-none bg-white"/>
                    </div>
                    <h2 className="flex-fill m-0">{sectionTitle}</h2>
                </button>

                {children}

                {isActive && <div className="w-100 p-2 text-end">
                    <button className="btn btn-dark" onClick={next(eventKey, nextEventKey)}>
                        Save & Continue
                    </button>
                </div>}
            </div>
        </Accordion.Item>
    }

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


            <Accordion activeKey={accordionActiveKeys} alwaysOpen className="pt-5">
                <AccordionSection eventKey="0" nextEventKey="1" sectionTitle="Select the appropriate Roadmap">
                    <div className="w-100">
                        <Accordion.Collapse eventKey="0">
                            <div className="row pt-2 pb-5 row-cols-2">
                                {roadmaps && roadmaps.map((roadmap) => {
                                    const roadmapId = roadmap.roadmap_id;
                                    return <div className="col pt-2" key={roadmapId}>
                                        <RoadmapCard organization={organization} resource={resource} roadmap={roadmap}
                                                     selected={selectedRoadmapIdMap[roadmapId]}
                                                     toggle={toggleRoadmapSelection.bind(this, {roadmapId})}/>
                                    </div>
                                })}
                                {roadmaps && roadmaps.length === 0 && <div className="w-100 p-3 text-center lead">
                                    No roadmaps available
                                </div>}
                            </div>
                        </Accordion.Collapse>
                        {accordionActiveKeys.indexOf("0") < 0 ? <div className="w-100 ps-5">
                            {selectedRoadmaps && selectedRoadmaps.map((roadmap) => {
                                const roadmapId = roadmap.roadmap_id;
                                return <div className="w-100 ps-3 d-flex flex-row align-items-center" key={roadmapId}>

                                    <i className="bi bi-check-circle-fill text-medium fs-4"></i>
                                    <div className="p-2">{roadmap.name}</div>
                                </div>
                            })}
                            {selectedRoadmaps && selectedRoadmaps.length === 0 &&
                                <div className="w-100 ps-3 d-flex flex-row align-items-center">
                                    <i className="bi bi-exclamation-triangle-fill text-yellow fs-4"></i>
                                    <div className="p-2">No Roadmaps Selected</div>
                                </div>}
                        </div> : ""}
                    </div>
                </AccordionSection>

                <AccordionSection eventKey="1" sectionTitle="Recommended badges for your resource">
                    <div className="w-100">
                        <Accordion.Collapse eventKey="1">
                            <div className="w-100 pt-2 pb-5 ps-3 pe-3">
                                {badges && badges.map((badge) => {
                                    const badgeId = badge.badge_id;
                                    return <div className="w-100 pt-2" key={badgeId}>
                                        <BadgeCardRowWithCheckboxes organization={organization} resource={resource}
                                                                    badge={badge}
                                                                    selected={selectedBadgeIdMap[badgeId]}
                                                                    toggle={toggleBadgeSelection.bind(this, {badgeId})}/>
                                    </div>
                                })}
                                {badges && badges.length === 0 && <div className="w-100 p-3 text-center lead">
                                    No badges available
                                </div>}
                            </div>
                        </Accordion.Collapse>
                        {accordionActiveKeys.indexOf("1") < 0 ? <div className="w-100 ps-5">
                            {selectedBadges && selectedBadges.map((badge) => {
                                const badgeId = badge.badge_id;
                                return <div className="w-100 ps-3 d-flex flex-row align-items-center" key={badgeId}>

                                    <i className="bi bi-check-circle-fill text-medium fs-4"></i>
                                    <div className="p-2">{badge.name}</div>
                                </div>
                            })}
                            {selectedBadges && selectedBadges.length === 0 &&
                                <div className="w-100 ps-3 d-flex flex-row align-items-center">
                                    <i className="bi bi-exclamation-triangle-fill text-yellow fs-4"></i>
                                    <div className="p-2">No Badges Selected</div>
                                </div>}
                        </div> : ""}
                    </div>


                </AccordionSection>

            </Accordion>


            {/*{wizardIndex === 0 && <div className="row pt-5">*/}
            {/*    <h2>Select the appropriate Roadmap</h2>*/}
            {/*    <div className="row pt-2 pb-5 row-cols-2">*/}
            {/*        {roadmaps && roadmaps.map((roadmap) => {*/}
            {/*            const roadmapId = roadmap.roadmap_id;*/}
            {/*            return <div className="col pt-2" key={roadmapId}>*/}
            {/*                <RoadmapCard organization={organization} resource={resource} roadmap={roadmap}*/}
            {/*                             selected={selectedRoadmapIdMap[roadmapId]}*/}
            {/*                             toggle={toggleRoadmapSelection.bind(this, {roadmapId})}/>*/}
            {/*            </div>*/}
            {/*        })}*/}
            {/*        {roadmaps && roadmaps.length === 0 && <div className="w-100 p-3 text-center lead">*/}
            {/*            No roadmaps available*/}
            {/*        </div>}*/}
            {/*    </div>*/}
            {/*</div>}*/}

            {/*{wizardIndex === 1 && <div className="row pt-5">*/}
            {/*    <h2>Recommended badges for your resource</h2>*/}
            {/*    <div className="w-100 pt-2 pb-5">*/}
            {/*        {badges && badges.map((badge) => {*/}
            {/*            const badgeId = badge.badge_id;*/}
            {/*            return <div className="w-100 pt-2" key={badgeId}>*/}
            {/*                <BadgeCardRowWithCheckboxes organization={organization} resource={resource}*/}
            {/*                                            badge={badge}*/}
            {/*                                            selected={selectedBadgeIdMap[badgeId]}*/}
            {/*                                            toggle={toggleBadgeSelection.bind(this, {badgeId})}/>*/}
            {/*            </div>*/}
            {/*        })}*/}
            {/*        {badges && badges.length === 0 && <div className="w-100 p-3 text-center lead">*/}
            {/*            No badges available*/}
            {/*        </div>}*/}
            {/*    </div>*/}
            {/*</div>}*/}

            {/*{wizardIndex === 2 && <div className="row pt-5">*/}
            {/*    <h2>Confirm the Following Badges and Assignments</h2>*/}
            {/*    <div className="w-100 pt-2 pb-5">*/}
            {/*        {selectedBadges && selectedBadges.map((badge) => {*/}
            {/*            const badgeId = badge.badge_id;*/}
            {/*            return <div className="w-100 pt-2" key={badgeId}>*/}
            {/*                <BadgeCardRowWithAddRemove organization={organization} resource={resource} badge={badge}*/}
            {/*                                           selected={selectedBadgeIdMap[badgeId]}*/}
            {/*                                           toggle={toggleBadgeSelection.bind(this, {badgeId})}/>*/}
            {/*            </div>*/}
            {/*        })}*/}
            {/*        {selectedBadges && selectedBadges.length === 0 && <div className="w-100 p-3 text-center lead">*/}
            {/*            No badges available*/}
            {/*        </div>}*/}
            {/*    </div>*/}

            {/*    <h2>Recommended Badges Skipped for Integration ({notSelectedBadges.length})</h2>*/}
            {/*    <div className="w-100 pt-2 pb-5">*/}
            {/*        {notSelectedBadges && notSelectedBadges.map((badge) => {*/}
            {/*            const badgeId = badge.badge_id;*/}
            {/*            return <div className="w-100 pt-2" key={badgeId}>*/}
            {/*                <BadgeCardRowWithAddRemove organization={organization} resource={resource} badge={badge}*/}
            {/*                                           selected={selectedBadgeIdMap[badgeId]}*/}
            {/*                                           toggle={toggleBadgeSelection.bind(this, {badgeId})}/>*/}
            {/*            </div>*/}
            {/*        })}*/}
            {/*        {notSelectedBadges && notSelectedBadges.length === 0 &&*/}
            {/*            <div className="w-100 p-3 text-center lead">*/}
            {/*                No badges available*/}
            {/*            </div>}*/}
            {/*    </div>*/}
            {/*</div>}*/}

            <div className="w-100 text-end pt-3 pb-5">
                {/*{wizardIndex > 0 &&*/}
                {/*    <button className="btn btn-outline-dark m-1" onClick={setWizardIndex.bind(this, wizardIndex - 1)}>*/}
                {/*        Back*/}
                {/*    </button>}*/}

                {/*{wizardIndex === 2 && saveProcessing ? <button className="btn btn-dark m-1">*/}
                {/*                                <span className="spinner-border spinner-border-sm me-3" role="status"*/}
                {/*                                      aria-hidden="true"></span>*/}
                {/*    Loading...*/}
                {/*</button> : wizardIndex === 2 ? <button className="btn btn-dark m-1" onClick={handleSave}>*/}
                {/*    Save details*/}
                {/*</button> : <button className="btn btn-dark m-1"*/}
                {/*                    onClick={setWizardIndex.bind(this, wizardIndex + 1)}>*/}
                {/*    Continue*/}
                {/*</button>}*/}

                <button className="btn btn-dark m-1" onClick={handleSave} disabled={accordionActiveKeys.length > 0}>
                    Save and Submit
                </button>
            </div>
        </div>
    } else {
        return <LoadingBlock processing={true}/>
    }

}

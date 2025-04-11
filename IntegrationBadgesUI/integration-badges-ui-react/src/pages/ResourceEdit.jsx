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
import RoadmapSelection from "../components/resource-edit/RoadmapSelection.jsx";
import BadgeSelection from "../components/resource-edit/BadgeSelection.jsx";
import BadgeSelectionConfirmation from "../components/resource-edit/BadgeSelectionConfirmation.jsx";
import RoadmapSelectionConfirmation from "../components/resource-edit/RoadmapSelectionConfirmation.jsx";

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
    let organization = getResourceOrganization({resourceId});

    let roadmaps = getRoadmaps().filter(({infrastructure_types}) => infrastructure_types === resource.cider_type);
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
                _selectedRoadmapIdMap[resource.roadmaps[i].roadmap.roadmap_id] = true;

                // Skip the roadmap selection if it's already enrolled.
                // TODO uncomment later
                setWizardIndex(2);
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

    const selectedBadgeIds = recommendedBadgeIds.filter(badgeId => selectedBadgeIdMap[badgeId]);

    const handleSave = async () => {
        setSaveProcessing(true);
        await setResource({resourceId, roadmapIds: selectedRoadmapIds, badgeIds: selectedBadgeIds});
        setSaveProcessing(false);
        navigate(`/resources/${resource.cider_resource_id}`)
    };

    const handlePrev = () => {
        setWizardIndex(wizardIndex - 1);
    };
    const handleNext = async () => {
        if (wizardIndex === 3) {
            await handleSave();
        } else {
            setWizardIndex(wizardIndex + 1);
        }
    };

    if (resource && organization) {

        return <div className="container">
            {wizardIndex === 0 &&
                <RoadmapSelection resource={resource} roadmaps={roadmaps}
                                  selected={(roadmapId) => selectedRoadmapIdMap[roadmapId]}
                                  toggle={(roadmapId) => toggleRoadmapSelection({roadmapId})}
                                  prev={handlePrev} next={handleNext}/>}

            {wizardIndex === 1 &&
                <RoadmapSelectionConfirmation organization={organization} resource={resource}
                                              selectedRoadmaps={selectedRoadmaps} prev={handlePrev} next={handleNext}/>}

            {wizardIndex === 2 &&
                <BadgeSelection organization={organization} resource={resource} selectedRoadmaps={selectedRoadmaps} badges={badges}
                                selected={(badgeId) => selectedBadgeIdMap[badgeId]}
                                toggle={(badgeId) => toggleBadgeSelection({badgeId})}
                                prev={handlePrev} next={handleNext}/>}

            {wizardIndex === 3 &&
                <BadgeSelectionConfirmation organization={organization} resource={resource} selectedRoadmaps={selectedRoadmaps}
                                            selectedBadges={selectedBadges}
                                            notSelectedBadges={notSelectedBadges}
                                            selected={(badgeId) => selectedBadgeIdMap[badgeId]}
                                            toggle={(badgeId) => toggleBadgeSelection({badgeId})}
                                            prev={handlePrev} next={handleNext}/>}
        </div>
    } else {
        return <LoadingBlock processing={true}/>
    }
}

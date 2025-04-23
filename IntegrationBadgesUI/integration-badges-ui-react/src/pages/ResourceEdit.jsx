import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
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
    const location = useLocation();
    const navigate = useNavigate();
    const {t} = useTranslation();

    let {resourceId, roadmapId} = useParams();
    roadmapId = parseInt(roadmapId);

    const {
        fetchResource,
        fetchResourceRoadmapBadges,
        getResource,
        getResourceRoadmapBadges,
        getResourceOrganization,
        setResource, isResourceRoadmapSelected
    } = useResources();
    const {getBadge} = useBadges();
    const {fetchRoadmaps, fetchRoadmap, getRoadmaps, getRoadmap, getRoadmapBadges} = useRoadmaps();

    const [selectedBadgeIdMap, setSelectedBadgeIdMap] = useState({});
    const [saveProcessing, setSaveProcessing] = useState(false);
    const [wizardIndex, setWizardIndex] = useState(0);
    const [accordionActiveKeys, setAccordionActiveKeys] = useState(["0"]);


    const resource = getResource({resourceId});
    const organization = getResourceOrganization({resourceId});
    const roadmap = getRoadmap({roadmapId});
    const roadmapBadges = getRoadmapBadges({roadmapId});
    const resourceRoadmapBadges = getResourceRoadmapBadges({resourceId, roadmapId});

    useEffect(() => {
        fetchRoadmaps();
    }, []);

    useEffect(() => {
        fetchResource({resourceId});
    }, [resourceId]);

    useEffect(() => {
        resourceId && roadmapId && fetchResourceRoadmapBadges({resourceId, roadmapId});
    }, [resourceId, roadmapId]);


    const isRoadmapNew = !isResourceRoadmapSelected({resourceId, roadmapId})
    useEffect(() => {
        if (!!resourceId && !!roadmapId) {
            if (isRoadmapNew) {
                setWizardIndex(1);
            } else {
                setWizardIndex(2);
            }
        } else {
            setWizardIndex(0);
        }
    }, [resourceId, roadmapId, isRoadmapNew]);

    useEffect(() => {
        !!roadmapId && fetchRoadmap({roadmapId});
    }, [roadmapId]);

    useEffect(() => {
        if (resourceRoadmapBadges) {
            const _selectedBadgeIdMap = {};
            for (let i = 0; i < resourceRoadmapBadges.length; i++) {
                _selectedBadgeIdMap[resourceRoadmapBadges[i].badge_id] = true;
            }

            setSelectedBadgeIdMap(_selectedBadgeIdMap);
        }
    }, [resource, !!resourceRoadmapBadges]);

    const toggleBadgeSelection = ({badgeId}) => {
        setSelectedBadgeIdMap({
            ...selectedBadgeIdMap, [badgeId]: !selectedBadgeIdMap[badgeId]
        });
    };
    const handleSave = async () => {
        setSaveProcessing(true);
        await setResource({resourceId, roadmapId: roadmapId, badgeIds: selectedBadgeIds});
        setSaveProcessing(false);
        navigate(`/resources/${resource.info_resourceid}/roadmaps/${roadmapId}`)
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
                <RoadmapSelection resourceId={resourceId}
                                  prev={handlePrev} next={handleNext}/>}

            {wizardIndex === 1 &&
                <RoadmapSelectionConfirmation resourceId={resourceId}
                                              roadmapId={roadmapId} prev={handlePrev} next={handleNext}/>}

            {wizardIndex === 2 &&
                <BadgeSelection resourceId={resourceId} roadmapId={roadmapId}
                                selected={(badgeId) => selectedBadgeIdMap[badgeId]}
                                toggle={(badgeId) => toggleBadgeSelection({badgeId})}
                                prev={handlePrev} next={handleNext}/>}

            {wizardIndex === 3 &&
                <BadgeSelectionConfirmation resourceId={resourceId}
                                            roadmapId={roadmapId}
                                            selected={(badgeId) => selectedBadgeIdMap[badgeId]}
                                            toggle={(badgeId) => toggleBadgeSelection({badgeId})}
                                            prev={handlePrev} next={handleNext}/>}
        </div>
    } else {
        return <LoadingBlock processing={true}/>
    }
}

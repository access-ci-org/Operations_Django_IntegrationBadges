import LoadingBlock from "../../LoadingBlock.jsx";
import {useRoadmaps} from "../../../contexts/RoadmapContext.jsx";
import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom";
import {ConciergeRouteUrls} from "../../../pages/concierge/ConciergeRoute.jsx";
import RoadmapEditProgressMarker from "./RoadmapEditProgressMarker.jsx";


export default function ConciergeRoadmapEditDetails({roadmapData, setRoadmapData}) {

    const onRoadmapNameChange = (evt) => {
        setRoadmapData({...roadmapData, name: evt.target.value});
    };

    // "graphic": null,
    //     "executive_summary": "",
    //     "infrastructure_types": "",
    //     "integration_coordinators": "",
    //     "status": "Draft",
    const onRoadmapGraphicChange = (evt) => {
        setRoadmapData({...roadmapData, graphic: evt.target.value});
    };

    const onRoadmapExecutiveSummaryChange = (evt) => {
        setRoadmapData({...roadmapData, executive_summary: evt.target.value});
    };

    const onRoadmapInfrastructureTypesChange = (evt) => {
        setRoadmapData({...roadmapData, infrastructure_types: evt.target.value});
    };

    const onRoadmapIntegrationCoordinatorsChange = (evt) => {
        setRoadmapData({...roadmapData, integration_coordinators: evt.target.value});
    };

    const onRoadmapStatusChange = (evt) => {
        setRoadmapData({...roadmapData, status: evt.target.value});
    };

    return <Form className="w-100 d-inline-block text-start">
        <Form.Group className="mb-3" controlId="newRoadmapForm.name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={roadmapData.name} onChange={onRoadmapNameChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="newRoadmapForm.roadmapImage">
            <Form.Label>Roadmap Image</Form.Label>
            <Form.Control type="file" value={roadmapData.graphic} onChange={onRoadmapGraphicChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="newRoadmapForm.executiveSummary">
            <Form.Label>Executive Summary</Form.Label>
            <Form.Control as="textarea" rows={3} value={roadmapData.executive_summary}
                          onChange={onRoadmapExecutiveSummaryChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="newRoadmapForm.integrationCoordinators">
            <Form.Label>Infrastructure Type</Form.Label>
            <Form.Select aria-label="Default select example" value={roadmapData.infrastructure_types}
                         onChange={onRoadmapInfrastructureTypesChange}>
                <option value="" disabled={true}>Select the Infrastructure Type</option>
                <option value="Network">Network</option>
                <option value="Compute">Compute</option>
                <option value="Storage">Storage</option>
                <option value="Online Service">Online Service</option>
                <option value="Science Gateway">Science Gateway</option>
            </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="newRoadmapForm.integrationCoordinators">
            <Form.Label>Integration Coordinators</Form.Label>
            <Form.Control type="text" value={roadmapData.integration_coordinators}
                          onChange={onRoadmapIntegrationCoordinatorsChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="newRoadmapForm.integrationCoordinators">
            <Form.Label>Status</Form.Label>
            <Form.Select aria-label="Default select example" value={roadmapData.status}
                         onChange={onRoadmapStatusChange}>
                <option value="1">Draft</option>
                <option value="2">Production</option>
            </Form.Select>
        </Form.Group>
    </Form>
}

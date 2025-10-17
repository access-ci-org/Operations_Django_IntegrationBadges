import LoadingBlock from "../../LoadingBlock.jsx";
import {useRoadmaps} from "../../../contexts/RoadmapContext.jsx";
import Form from "react-bootstrap/Form";
import {Link, useParams} from "react-router-dom";
import {ConciergeRouteUrls} from "../../../pages/concierge/ConciergeRoute.jsx";
import RoadmapEditProgressMarker from "./RoadmapEditProgressMarker.jsx";


function getRoadmapInputFields({roadmapData, setRoadmapData}) {

    const onRoadmapNameChange = (evt) => {
        setRoadmapData({...roadmapData, name: evt.target.value});
    };

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

    const roadmapInputFields = {
        name: <Form.Control type="text" value={roadmapData.name} onChange={onRoadmapNameChange}/>,

        graphic: <button className="btn btn-gray-200">
            Browse Device
            <input className="btn btn-gray-200 visually-hidden" type="file"/>
        </button>,

        executive_summary: <Form.Control as="textarea" rows={6} value={roadmapData.executive_summary}
                                         onChange={onRoadmapExecutiveSummaryChange}/>,

        infrastructure_types: <Form.Select aria-label="Default select example" value={roadmapData.infrastructure_types}
                                           onChange={onRoadmapInfrastructureTypesChange}>
            <option value="" disabled={true}></option>
            <option value="Network">Network</option>
            <option value="Compute">Compute</option>
            <option value="Storage">Storage</option>
            <option value="Online Service">Online Service</option>
            <option value="Science Gateway">Science Gateway</option>
        </Form.Select>,

        integration_coordinators: <Form.Control type="text" value={roadmapData.integration_coordinators}
                                                onChange={onRoadmapIntegrationCoordinatorsChange}/>,

        status: <Form.Select aria-label="Default select example" value={roadmapData.status}
                             onChange={onRoadmapStatusChange}>
            <option value="1">Draft</option>
            <option value="2">Production</option>
        </Form.Select>
    };

    return roadmapInputFields;
}

export default function ConciergeRoadmapEditDetailsV1({roadmapData, setRoadmapData}) {
    const roadmapInputFields = getRoadmapInputFields({roadmapData, setRoadmapData});

    return <div className="w-100 d-inline-block text-start">
        <div className="mb-3">
            <Form.Label>Name</Form.Label>
            {roadmapInputFields.name}
        </div>
        <div className="mb-3">
            <Form.Label>Roadmap Image</Form.Label>
            <div className="w-100 p-4 rounded border border-1 text-center">
                <i className="bi bi-image fs-1"></i>
                <p className="w-100 text-center">
                    Drag and Drop to Upload Image <br/><br/>
                    or<br/>
                </p>
                {roadmapInputFields.graphic}
            </div>
        </div>
        <div className="mb-3">
            <Form.Label>Executive Summary</Form.Label>
            {roadmapInputFields.executive_summary}
        </div>
        <div className="mb-3" style={{maxWidth: "500px"}}>
            <Form.Label>Infrastructure Type</Form.Label>
            {roadmapInputFields.infrastructure_types}
        </div>
        <div className="mb-3" style={{maxWidth: "500px"}}>
            <Form.Label>Integration Coordinators</Form.Label>
            {roadmapInputFields.integration_coordinators}
        </div>
        <div className="mb-3" style={{maxWidth: "500px"}}>
            <Form.Label>Status</Form.Label>
            {roadmapInputFields.status}
        </div>
    </div>
}


export function ConciergeRoadmapEditDetailsV2({roadmapData, setRoadmapData}) {
    const {roadmapId} = useParams();

    const roadmapInputFields = getRoadmapInputFields({roadmapData, setRoadmapData});

    return <div className="w-100 d-inline-block text-start">
        <div className="mb-3 row">
            <Form.Label className="col-sm-5">Roadmap id</Form.Label>
            <div className="col-sm-7">
                <Form.Control type="text" value={roadmapId} disabled={true}/>
            </div>
        </div>
        <div className="mb-3 row">
            <Form.Label className="col-sm-5">Name</Form.Label>
            <div className="col-sm-7">{roadmapInputFields.name}</div>
        </div>
        <div className="mb-3 row">
            <Form.Label className="col-sm-5">Image</Form.Label>
            <div className="col-sm-7 d-flex flex-row">
                <div className="align-content-start">
                    <div><i className="bi bi-image text-medium d-inline-flex" style={{fontSize: "90px"}}></i></div>
                </div>
                <div className="flex-fill text-center" style={{maxWidth: "250px"}}>
                    <p className="w-100 text-center mb-0">
                        Drag and Drop to Upload Image <br/>
                        or
                    </p>
                    {roadmapInputFields.graphic}
                </div>
            </div>
        </div>
        <div className="mb-3 row">
            <Form.Label className="col-sm-5">Executive Summary</Form.Label>
            <div className="col-sm-7">{roadmapInputFields.executive_summary}</div>
        </div>
        <div className="mb-3 row">
            <Form.Label className="col-sm-5">Infrastructure Type</Form.Label>
            <div className="col-sm-7">{roadmapInputFields.infrastructure_types}</div>
        </div>
        <div className="mb-3 row">
            <Form.Label className="col-sm-5">Integration Coordinators</Form.Label>
            <div className="col-sm-7">{roadmapInputFields.integration_coordinators}</div>
        </div>
        <div className="mb-3 row">
            <Form.Label className="col-sm-5">Status</Form.Label>
            <div className="col-sm-7">{roadmapInputFields.status}</div>
        </div>
    </div>
}

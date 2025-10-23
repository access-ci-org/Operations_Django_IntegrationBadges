import Form from "react-bootstrap/Form";
import {useRoadmaps} from "../../../contexts/RoadmapContext.jsx";

function getBadgeInputFields({badgeData, setBadgeData}) {
    const {getRoadmaps} = useRoadmaps();

    const roadmaps = getRoadmaps();

    const onInputValueChange = (fieldName) => (evt) => {
        setBadgeData({...badgeData, [fieldName]: evt.target.value});
    };

    return {
        name: <Form.Control type="text" value={badgeData.name} onChange={onInputValueChange("name")}/>,

        researcher_summary: <Form.Control as="textarea" rows={6} value={badgeData.researcher_summary}
                                          onChange={onInputValueChange("researcher_summary")}/>,

        resource_provider_summary: <Form.Control as="textarea" rows={6} value={badgeData.resource_provider_summary}
                                                 onChange={onInputValueChange("resource_provider_summary")}/>,

        graphic: <button className="btn btn-gray-200">
            Browse Device
            <input className="btn btn-gray-200 visually-hidden" type="file"/>
        </button>,

        verification_method: <Form.Select aria-label="Default select example" value={badgeData.verification_method}
                                          onChange={onInputValueChange("verification_method")}>
            <option value="" disabled={true}></option>
            <option value="Automated">Automated</option>
            <option value="Manual">Manual</option>
        </Form.Select>,

        verification_summary: <Form.Control as="textarea" rows={6} value={badgeData.verification_summary}
                                            onChange={onInputValueChange("verification_summary")}/>,

        default_badge_access_url_label: <Form.Control type="text" value={badgeData.default_badge_access_url_label}
                                                      onChange={onInputValueChange("default_badge_access_url_label")}/>,

        default_badge_access_url: <Form.Control type="text" value={badgeData.default_badge_access_url}
                                                onChange={onInputValueChange("default_badge_access_url")}/>,

        linked_roadmaps: <Form.Select aria-label="" value={badgeData.linked_roadmaps}
                                      onChange={onInputValueChange("linked_roadmaps")}>
            <option value="" disabled={true}></option>
            {roadmaps.map((roadmap, roadmapIndex) =>
                <option key={roadmapIndex} value={roadmapIndex}>{roadmap.name}</option>)}
        </Form.Select>
    };
}

export default function ConciergeBadgeEditDetails({badgeData, setBadgeData}) {
    return <ConciergeBadgeEditDetailsV1 badgeData={badgeData} setBadgeData={setBadgeData}/>
}

export function ConciergeBadgeEditDetailsV1({badgeData, setBadgeData}) {
    const badgeInputFields = getBadgeInputFields({badgeData, setBadgeData});

    return <div className="w-100 d-inline-block text-start">
        <div className="mb-3">
            <Form.Label>Badge Name</Form.Label>
            {badgeInputFields.name}
        </div>
        <div className="mb-3">
            <Form.Label>Researcher Summary</Form.Label>
            {badgeInputFields.researcher_summary}
        </div>
        <div className="mb-3">
            <Form.Label>Resource Provider Summary</Form.Label>
            {badgeInputFields.resource_provider_summary}
        </div>
        <div className="mb-3" style={{maxWidth: "500px"}}>
            <Form.Label>Badge Image</Form.Label>
            <div className="w-100 p-4 rounded border border-1 text-center">
                <i className="bi bi-image fs-1"></i>
                <p className="w-100 text-center">
                    Drag and Drop to Upload Image <br/><br/>
                    or<br/>
                </p>
                {badgeInputFields.graphic}
            </div>
        </div>
        <div className="mb-3" style={{maxWidth: "500px"}}>
            <Form.Label>Verification Method</Form.Label>
            {badgeInputFields.verification_method}
        </div>
        <div className="mb-3">
            <Form.Label>Verification Summary</Form.Label>
            {badgeInputFields.verification_summary}
        </div>
        <div className="mb-3" style={{maxWidth: "500px"}}>
            <Form.Label>Badge URL Label</Form.Label>
            {badgeInputFields.default_badge_access_url_label}
        </div>
        <div className="mb-3" style={{maxWidth: "500px"}}>
            <Form.Label>Badge URL</Form.Label>
            {badgeInputFields.default_badge_access_url}
        </div>
        <div className="mb-3" style={{maxWidth: "500px"}}>
            <Form.Label>Link an Existing Roadmap</Form.Label>
            {badgeInputFields.linked_roadmaps}
        </div>
    </div>
}


export function ConciergeBadgeEditDetailsV2({badgeData, setBadgeData}) {
    const badgeInputFields = getBadgeInputFields({badgeData, setBadgeData});

    return <div className="w-100 d-inline-block text-start">
        <div className="mb-3 row">
            <Form.Label className="col-sm-5">Name</Form.Label>
            <div className="col-sm-7">{badgeInputFields.name}</div>
        </div>

        <div className="mb-3 row">
            <Form.Label className="col-sm-5">Resource Summary</Form.Label>
            <div className="col-sm-7">{badgeInputFields.researcher_summary}</div>
        </div>

        <div className="mb-3 row">
            <Form.Label className="col-sm-5">Resource Provider Summary</Form.Label>
            <div className="col-sm-7">{badgeInputFields.resource_provider_summary}</div>
        </div>

        <div className="mb-3 row">
            <Form.Label className="col-sm-5">Verification Method</Form.Label>
            <div className="col-sm-7">{badgeInputFields.verification_method}</div>
        </div>

        <div className="mb-3 row">
            <Form.Label className="col-sm-5">Verification Summary</Form.Label>
            <div className="col-sm-7">{badgeInputFields.verification_summary}</div>
        </div>

        <div className="mb-3 row">
            <Form.Label className="col-sm-5">Badge Label</Form.Label>
            <div className="col-sm-7">{badgeInputFields.default_badge_access_url_label}</div>
        </div>

        <div className="mb-3 row">
            <Form.Label className="col-sm-5">Badge URL </Form.Label>
            <div className="col-sm-7">{badgeInputFields.default_badge_access_url}</div>
        </div>

    </div>
}

import LoadingBlock from "../../components/LoadingBlock.jsx";
import {useRoadmaps} from "../../contexts/RoadmapContext.jsx";
import layersFillTealIcon from "../../assets/layers-fill-teal-icon.png";
import layersFillGrayIcon from "../../assets/layers-fill-gray-icon.png";
import Form from "react-bootstrap/Form";
import {BadgeWorkflowStatus} from "../../contexts/BadgeContext.jsx";
import {Link} from "react-router-dom";
import {ConciergeRouteUrls} from "./ConciergeRoute.jsx";

function ProgressMarker({steps, current}) {
    return <div className="w-100 d-flex flex-row">
        {steps.map((step, stepIndex) => {
            const progressCheck = <img src={stepIndex <= current ? layersFillTealIcon : layersFillGrayIcon}
                                       alt="roadmap creation progress check" style={{width: 30}} className=""
                                       key={stepIndex}/>;
            if (stepIndex === steps.length - 1) {
                return progressCheck
            } else {
                return <div className="d-flex flex-row flex-fill" key={stepIndex}>
                    {progressCheck}
                    {stepIndex !== steps.length - 1 && <div className="flex-fill align-content-center">
                        <div className="border-gray-500" style={{borderBottom: "1px dashed"}}></div>
                    </div>}
                </div>
            }
        })}
    </div>
}

export default function ConciergeRoadmapNew() {
    const {getRoadmaps} = useRoadmaps();

    const roadmaps = getRoadmaps();

    if (roadmaps) {
        return <div className="container">
            <div className="row mt-2 p-3">

                <div className="w-100 bg-white border-3 rounded-2 pt-4 ps-5 pe-5" style={{paddingBottom: 300}}>
                    <h1 className="w-100 text-center text-dark fw-normal pt-5 pb-3">Let’s Describe the New Roadmap</h1>

                    <div className="w-100 text-center position-relative pt-5 pb-5">
                        <div className="d-inline-block w-100" style={{maxWidth: 500, minWidth: 300}}>
                            <ProgressMarker steps={[1, 2, 3]} current={0}/>
                        </div>
                        <Link to={ConciergeRouteUrls.ROADMAPS} className="btn btn-outline-secondary position-absolute"
                                style={{right: 0}}>Cancel/Discard
                        </Link>
                    </div>

                    <div className="w-100 text-center">
                        <Form className="w-100 d-inline-block text-start" style={{maxWidth: 600, minWidth: 300}}>
                            <Form.Group className="mb-3" controlId="newRoadmapForm.name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="newRoadmapForm.roadmapImage">
                                <Form.Label>Roadmap Image</Form.Label>
                                <Form.Control type="file" onChange={() => {
                                }}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="newRoadmapForm.executiveSummary">
                                <Form.Label>Executive Summary</Form.Label>
                                <Form.Control as="textarea" rows={3}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="newRoadmapForm.integrationCoordinators">
                                <Form.Label>Infrastructure Type</Form.Label>
                                <Form.Select aria-label="Default select example" value="0">
                                    <option value="0" disabled={true}>Select the Infrastructure Type</option>
                                    <option value="1">Compute</option>
                                    <option value="2">Cloud</option>
                                    <option value="3">Science Gateway</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="newRoadmapForm.integrationCoordinators">
                                <Form.Label>Integration Coordinators</Form.Label>
                                <Form.Control type="text"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="newRoadmapForm.integrationCoordinators">
                                <Form.Label>Status</Form.Label>
                                <Form.Select aria-label="Default select example">
                                    <option value="1">Draft</option>
                                    <option value="2">Production</option>
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    </div>

                    <div className="w-100 text-end pt-5 pb-5">
                        <button className="btn btn-outline-dark ps-3 pe-3 m-1">
                            Back
                        </button>
                        <button className="btn btn-dark ps-3 pe-3 m-1">
                            Continue
                        </button>
                    </div>

                </div>
            </div>
        </div>
    } else {
        return <div className="container">
            <LoadingBlock processing={true}/>
        </div>
    }
}

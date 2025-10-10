import LoadingBlock from "../../../components/LoadingBlock.jsx";
import {useRoadmaps} from "../../../contexts/RoadmapContext.jsx";
import Form from "react-bootstrap/Form";
import {Link, useParams} from "react-router-dom";
import {ConciergeRouteUrls} from "./../ConciergeRoute.jsx";
import RoadmapEditProgressMarker from "../../../components/concierge/RoadmapEditProgressMarker.jsx";


export default function ConciergeRoadmapReviewAndEdit() {
    const {roadmapId} = useParams();

    const {getRoadmap} = useRoadmaps();

    const roadmap = getRoadmap({roadmapId});

    if (roadmap) {
        return <div className="container">
            <div className="row mt-2 p-3">

                <div className="w-100 bg-white border-3 rounded-2 pt-4 ps-5 pe-5" style={{paddingBottom: 300}}>
                    <h1 className="w-100 text-center text-dark fw-normal pt-5 pb-3">Review & Edit</h1>

                    <div className="w-100 text-center position-relative pt-5 pb-5">
                        <div className="d-inline-block w-100" style={{maxWidth: 500, minWidth: 300}}>
                            <RoadmapEditProgressMarker steps={[1, 2, 3]} current={2}/>
                        </div>
                        <Link to={ConciergeRouteUrls.ROADMAPS} className="btn btn-outline-secondary position-absolute"
                              style={{right: 0}}>Cancel/Discard
                        </Link>
                    </div>

                    <div className="w-100 text-center">
                        <div className="w-100 d-inline-block text-start" style={{maxWidth: 600, minWidth: 300}}>
                            <h3 className="text-black pb-4 fw-medium">Roadmap Description</h3>
                            <Form>
                                <Form.Group className="mb-3" controlId="newRoadmapForm.name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" value={roadmap.name}/>
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


                            <div className="d-flex flex-row pb-4 pt-5">
                                <h3 className="text-black fw-medium flex-fill">Associated Badges</h3>
                                <Link className="btn btn-link"
                                      to={ConciergeRouteUrls.ROADMAP_ASSOCIATE_BADGES.replace(":roadmapId", roadmapId)}>Edit</Link>
                            </div>

                            <div className="row pb-4">
                                <div className="col-sm-6 pe-3">
                                    Required Badges
                                </div>
                                <div className="col-sm-6">
                                    <div>Badge 1</div>
                                    <div>Badge 1</div>
                                    <div>Badge 1</div>
                                    <div>Badge 1</div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-6 pe-3">
                                    Recommended Badges
                                </div>
                                <div className="col-sm-6">
                                    <div>Badge 1</div>
                                    <div>Badge 1</div>
                                    <div>Badge 1</div>
                                    <div>Badge 1</div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="w-100 text-end pt-5 pb-5">
                        <Link to={ConciergeRouteUrls.ROADMAPS} className="btn btn-outline-dark ps-3 pe-3 m-1">
                            Back
                        </Link>
                        <button className="btn btn-dark ps-3 pe-3 m-1">
                            Publish
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

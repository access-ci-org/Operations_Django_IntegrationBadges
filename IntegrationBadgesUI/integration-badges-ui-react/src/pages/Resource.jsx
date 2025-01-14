import {Link, useParams} from "react-router-dom";
import {useOrganizations} from "../contexts/OrganizationsContext";
import {useResources} from "../contexts/ResourcesContext";
import {useEffect, useState} from "react";
import {Nav} from "react-bootstrap";

export default function Resource() {
    const {resourceId} = useParams();
    const {organizations, organizationMap, organizationMapByName, fetchOrganizations} = useOrganizations();
    const {resources, resourceMap, fetchResources, fetchResource, fetchSelectedResources} = useResources();
    const [filterSelection, setFilterSelection] = useState({});

    useEffect(() => {
        fetchResource({resourceId});
        fetchOrganizations();
    }, []);

    const resource = resourceMap[resourceId];

    let organization;
    if (resource) {
        organization = organizationMapByName[resource.organization_name];
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
            <div className="w-100 pt-3 pb-3">
                <p>{resource.resource_description}</p>
                <Link to={resource.user_guide_url} className="btn btn-dark">View User Guide</Link>
            </div>
            <div className=" w-100 pt-5 pb-5 text-medium lead fst-italic fs-3">
                Review the list of badges waiting for completion and start completing tasks to earn badges and track
                your progress!
            </div>

            <div className="row">
                <h2>Badges</h2>

                <Nav variant="underline" defaultActiveKey="/home">
                    <Nav.Item>
                        <Nav.Link href="/home">Active</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-1">Option 2</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="disabled" disabled>
                            Disabled
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        </div>
    } else {
        return <div>Loading...</div>
    }

}
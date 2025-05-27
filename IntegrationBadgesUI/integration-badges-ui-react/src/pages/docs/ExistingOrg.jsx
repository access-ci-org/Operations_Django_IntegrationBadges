import Accordion from 'react-bootstrap/Accordion';
import Carousel from 'react-bootstrap/Carousel';
import {Link} from "react-router-dom";

import fiveStepsForNewIntegrationsPng from "./assets/five-steps-for-new-resource-integration.png"

export default function ExistingOrg() {
    return <div className="container">
        <div className="w-100 p-3 pt-5">
            <h1>
                Welcome to CiDeR Infrastructure Integration
            </h1>
            <p className="mt-4 fs-6">
                To make your infrastructure visible within ACCESS, you’ll need to enter and maintain its description in
                the Cyberinfrastructure Description Repository (CiDeR). This ensures that researchers, resource
                providers, and the broader community can discover and understand your offerings.
            </p>
        </div>
        <div className="row pt-5 p-3 text-dark">
            <div className="col-sm-6">
                <p className="fs-6">
                    <strong>Getting Started:</strong> The process includes up to <strong>five</strong> steps.
                </p>
                <p>
                    Each step in the process expands with detailed instructions—simply click to reveal more information
                    as needed. The initial setup takes about 30 minutes, and ongoing updates require around 1 hour per
                    year per infrastructure element.
                </p>
            </div>
            <div className="col-sm-6 p-3 pt-0">
                <div className="p-3 border border-2 border-secondary">
                    <div className="w-100">
                        <h3 className="d-inline">REMINDER</h3>
                        <i className="d-inline ps-3 pe-3  text-yellow fs-3 bi bi-megaphone-fill"></i>
                    </div>
                    <p>Register your resource in CiDeR, then return to your ACCESS integration dashboard to continue.
                        Your resource will appear there with next-step guidance.</p>
                </div>
            </div>
        </div>

        <p className="w-100 p-3 lead fs-6 text-medium fw-bold">
            You have indicated you’re an&nbsp;
            <span className="text-orange">“Existing Institution!”</span>&nbsp;
            You can skip Steps 1 and 2. Please start with Step 3 below and continue through Step 5 to update or
            add infrastructure details.
        </p>

        <div className="w-100 p-3 pt-5">
            <Accordion defaultActiveKey={[]} alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Step 1: Initial Cider Set Up</Accordion.Header>
                    <Accordion.Body>
                        <h4 className="fs-6">
                            Submit an Integration and Operations Request from&nbsp;
                            <a className="btn btn-link"
                               href="https://access-ci.atlassian.net/servicedesk/customer/portal/2/group/3/create/32">this
                                page</a>
                            &nbsp;with the Title “New CiDeR
                            Organization” and the following information:
                        </h4>
                        <ul>
                            <li>Organization logo URL or attached file</li>
                            <li>Organization public URL</li>
                            <li>Organization PI/director name</li>
                            <li>Organization PI/director email address</li>
                            <li>External Data Posting</li>
                            <li>Organization ID Type either&nbsp;
                                <a className="btn btn-link" href="https://www.grid.ac/">GRID</a>&nbsp;
                                or&nbsp;
                                <a className="btn btn-link"
                                   href="https://www.copyright.com/solutions-ringgold/get-id/">RINGGOLD</a>
                            </li>
                            <li>Organization ID</li>
                            <li>City, State, and Country</li>
                            <li>The ACCESS usernames of individuals that will be CiDeR administrators for your
                                organization. These individuals will be able to grant other individuals access to
                                maintain infrastructure descriptions. Persons can be both CiDeR administrators and the
                                maintainers of descriptions.
                            </li>
                        </ul>

                        <p> Submitted organization information will be entered by a CiDeR administrator in a form as
                            shown below and used to grant access to CiDeR administrators.</p>

                        <Link to="#" className="btn btn-link">Preview Form Field </Link>

                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Step 2: Provide CiDer Access to Other Organization Staff</Accordion.Header>
                    <Accordion.Body>
                        <h4 className="fs-6">
                            After the integration coordinator has been granted CiDeR access they can grant other
                            organization staff access to enter and maintain infrastructure descriptions:
                        </h4>
                        <ul>
                            <li>Select “Service Providers” or “Organizations” along the top.</li>
                            <li>Click on your “Organization” name.</li>
                            <li>Click on “Administrators”.</li>
                            <li>Add additional Organization Admins who may enter and update your organization resource
                                information.
                            </li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Step 3: Enter Infrastructure Descriptions</Accordion.Header>
                    <Accordion.Body>
                        <h4 className="fs-6">
                            Follow the&nbsp;
                            <a className="btn btn-link" href="https://cider.access-ci.org/documentation">Quick Start Guide and User Guide</a>
                            &nbsp;for full details.
                        </h4>

                        <h5 className="fs-6">Steps:</h5>

                        <ul>
                            <li>Select "Infrastructure" from the top menu.</li>
                            <li>
                                Click "Add new Infrastructure" to create a new entry, or select an existing one to view
                                or edit (pencil icon).
                            </li>
                            <li>
                                Fill in as much information as possible.
                            </li>
                            <li>
                                Note: Resource Type cannot be changed after creation. Choose the one that best reflects
                                the infrastructure’s primary purpose.
                            </li>
                            <li>
                                Compute includes systems used for running jobs on CPUs, GPUs, or accelerators.
                            </li>
                            <li>
                                Under the Affiliations tab, add ACCESS.
                            </li>
                            <li>
                                Click "Save Changes".
                            </li>
                        </ul>

                        <p>
                            After saving, you'll be redirected to the edit page to add more details (e.g., features,
                            contacts, production dates).
                        </p>

                        <h4 className="fs-6">Resource Features:</h4>

                        <ul>
                            <li>Select features as shown in the visual guide.</li>


                            <li>For Compute, Cloud, and Storage types, complete the Type Details tab with as much
                                information as possible (minimum required shown in visual).
                            </li>
                        </ul>

                        <h4 className="fs-6">Storage Resource Tips:</h4>

                        <ul>
                            <li>Intended Use: State whether storage is tied to a specific compute resource or can be
                                used independently.
                            </li>
                            <li>
                                Backup Policy: Clearly note if the resource is not backed up.
                            </li>
                            <li>
                                Additional Allocation Requirements: Indicate if storage can only be used with other
                                resources.
                            </li>
                            <li>
                                Non-Standard Rates: If your exchange rate differs from the standard (1 credit = 1 unit =
                                1 GB), state this clearly.
                            </li>
                        </ul>

                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>Step 4: Enter Resource Conversion Factors</Accordion.Header>
                    <Accordion.Body>
                        <p>
                            <strong>Skip this section if your resource is not ACCESS allocated.</strong>
                            If applicable, follow the instructions in the CiDeR Documentation to enter your conversion
                            factor (NU conversion factor ÷ 21.576). Note: Most compute resources should not change the
                            existing conversion factor.
                        </p>

                        <ul>
                            <li>The marketplace exchange rate is now managed separately in the XRAS system and no longer
                                tied to the conversion factor. See the Variable Marketplace RP Documentation for
                                details.
                            </li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                    <Accordion.Header>Step 5: Maintain Infrastructure Description</Accordion.Header>
                    <Accordion.Body>
                        <h4 className="fs-6">Information in CiDeR must be kept up to date and reviewed for accuracy at
                            least yearly.</h4>

                        <ul>
                            <li>Status: Production</li>
                            <li>Version: v1</li>
                            <li>Task Expert(s): JP Navarro, ACCESS Operations; Nathan Tolbert, ACCESS Allocations</li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>

    </div>
}
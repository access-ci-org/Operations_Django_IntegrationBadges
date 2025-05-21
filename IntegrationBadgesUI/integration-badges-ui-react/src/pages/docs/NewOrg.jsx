import Accordion from 'react-bootstrap/Accordion';
import Carousel from 'react-bootstrap/Carousel';
import {Link} from "react-router-dom";

import fiveStepsForNewIntegrationsPng from "./assets/five-steps-for-new-resource-integration.png"

export default function NewOrg() {
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
        <div className="w-100 p-3 pt-5">
            <Accordion defaultActiveKey={[]} alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Step 1: Initial Cider Set Up</Accordion.Header>
                    <Accordion.Body>
                        <h4 className="fs-6">
                            Submit an Integration and Operations Request from this page with the Title “New CiDeR
                            Organization” and the following information:
                        </h4>
                        <ul>
                            <li>Organization logo URL or attached file</li>
                            <li>Organization public URL</li>
                            <li>Organization PI/director name</li>
                            <li>Organization PI/director email address</li>
                            <li>External Data Posting</li>
                            <li>Organization ID Type either GRID or RINGGOLD</li>
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Step 3: Enter Infrastructure Descriptions</Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>Step 4: Enter Resource Conversion Factors</Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                    <Accordion.Header>Step 5: Maintain Infrastructure Description</Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>

    </div>
}
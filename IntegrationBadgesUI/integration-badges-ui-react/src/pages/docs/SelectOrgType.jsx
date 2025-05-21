import Accordion from 'react-bootstrap/Accordion';
import Carousel from 'react-bootstrap/Carousel';
import {Link} from "react-router-dom";

import fiveStepsForNewIntegrationsPng from "./assets/five-steps-for-new-resource-integration.png"

export default function SelectOrgType() {
    return <div className="container">
        <div className="w-100 p-5 pt-5 text-medium text-center">
            <h1>
                Select Your Organization Type
            </h1>
            <p>Please choose the option that best describes your organization</p>
        </div>
        <div className="row pt-5 p-3">
            <div className="col-sm-6 p-3">
                <div
                    className="w-100 h-100 d-flex flex-column rounded-3 border-gray-200 border border-1 position-relative">

                    <Link to="/docs/new-org" className="btn btn-link text-medium">
                        <h3 className="w-100 p-5 pb-1 text-center">
                            New Organization
                        </h3>
                    </Link>
                    <p className="col-sm-12 p-5 pt-2 flex-fill">
                        If your organization is not yet set up in CiDeR, start with this option to request
                        administrator access.
                    </p>

                </div>
            </div>
            <div className="col-sm-6 p-3">
                <div
                    className="w-100 h-100 d-flex flex-column rounded-3 border-gray-200 border border-1 position-relative">

                    <Link to="/docs/existing-org" className="btn btn-link text-medium">
                        <h3 className="w-100 p-5 pb-1 text-center">
                            Existing Organization
                        </h3>
                    </Link>
                    <p className="col-sm-12 p-5 pt-1 flex-fill">
                        If your organization is already registered, select this option and enter the new infrastructure
                        descriptions.
                    </p>

                </div>
            </div>
        </div>
    </div>
}
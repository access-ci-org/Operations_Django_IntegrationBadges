import Accordion from 'react-bootstrap/Accordion';
import Carousel from 'react-bootstrap/Carousel';
import {Link} from "react-router-dom";

import fiveStepsForNewIntegrationsPng from "./assets/five-steps-for-new-resource-integration.png"

export default function HowToChooseRoadmap() {
    return <div className="container">
        <div className="w-100 p-3 pt-5">
            <h1>
                <i className="bi bi-building-fill-gear fs-1 text-medium pe-3"></i>
                What is an Integration Roadmap and how do I choose the right one?
            </h1>
        </div>

        <div className="row mt-5 p-5 bg-light">
            <p className="fs-6">
                An Integration Roadmap is a structured guide that shows how different types of infrastructure can
                connect to the ACCESS ecosystem. ACCESS uses this framework to make integration transparent and
                consistent for all Resource Providers.
            </p>
            <p className="fs-6">
                Each roadmap is tailored to a specific type of infrastructure in order to achieve a specific operational
                status. Right now, ACCESS supports integration for:
            </p>
        </div>

        <div className="row pt-5 p-3 text-dark">
            <div className="col p-3" style={{minWidth: 500}}>
                <div className="w-100 h-100 border p-4 border-2 rounded-3 border-dark">
                    <h4>Science Gateways</h4>
                    <p>
                        User-facing web portals where researchers can run complex scientific applications, without
                        needing to interact directly with backend compute or storage systems. These Science Gateways can
                        use ACCESS allocated resources without a researcher needing to request their own ACCESS
                        allocation.
                    </p>
                </div>
            </div>
            <div className="col p-3" style={{minWidth: 500}}>
                <div className="w-100 h-100 border p-4 border-2 rounded-3 border-dark">
                    <h4>High-Performance Computing (HPC)</h4>
                    <p>
                        Compute clusters that allow users to log in, install software, and run jobs through a scheduler.
                        These systems may include GPUs and always offer tightly integrated local storage.
                    </p>
                </div>
            </div>
            <div className="col p-3" style={{minWidth: 500}}>
                <div className="w-100 h-100 border p-4 border-2 rounded-3 border-dark">
                    <h4>Storage</h4>
                    <p>
                        Systems designed to store, manage, and share large datasets.
                    </p>
                </div>
            </div>
            <div className="col p-3" style={{minWidth: 500}}>
                <div className="w-100 h-100 border p-4 border-2 rounded-3 border-dark">
                    <h4>Cloud Infrastructure</h4>
                    <p>
                        Environments that run virtual machines or containers to support flexible computing.
                    </p>
                </div>
            </div>
            <div className="col p-3" style={{minWidth: 500}}>
                <div className="w-100 h-100 border p-4 border-2 rounded-3 border-dark">
                    <h4>Not sure which roadmap applies to you?</h4>
                    <p>
                        Contact our concierge team, and we’ll help you choose the right path and get started.
                    </p>
                </div>
            </div>
        </div>

        <div className="w-100 p-3 pt-5">
            <h2>Ready to integrate a new resource?</h2>
            <Link className="btn btn-dark btn-lg rounded-2 mt-2" to="/docs">Start Integration</Link>
        </div>

    </div>
}
import {useOrganizations} from "../contexts/OrganizationsContext";
import {useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useResources} from "../contexts/ResourcesContext";
import LoadingBlock from "../components/util/LoadingBlock.jsx";
import {DocumentationRouteUrls} from "./docs/DocumentationRoute.jsx";
import GridAndListSwitch from "../components/util/GridAndListSwitch.jsx";

import JSONGrid from '@redheadphone/react-json-grid'
import pkg from '../../package.json';
import {Nav} from "react-bootstrap";


/**
 * The initial page that displays al resources.
 * Get the full list of resources and badges from the contexts.
 * Sort resources by organization name and group them by organization.
 */
export default function About() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let format = queryParams.get('format');

    const [theme, setTheme] = useState("remedy");

    const availableThemes = ["default", "dracula", "monokai", "oceanicPark", "panda", "gruvboxMaterial", "tokyoNight", "remedy", "atlanticNight", "defaultLight", "defaultLight2", "slime", "spacegray", "blueberryDark", "nord", "nightOwl", "oneMonokai", "cobaltNext", "shadesOfPurple", "codeBlue", "softEra", "atomMaterial", "evaDark", "moonLight"];

    if (!!format) format = format.toLowerCase();
    if (["json", "html"].indexOf(format) < 0) {
        format = "html";
    }

    const activeTabKey = "/about" + (format ? `?format=${format}` : "")

    const data = {
        "Settings Variables": window.SETTINGS,
        "Webapp NPM Package": pkg
    }

    const tabs = [
        {"title": "HTML", link: "/about?format=html"},
        {"title": "JSON", link: "/about?format=json"},
    ]

    return <div className="container">
        <div className="row">
            <h1>About</h1>
        </div>
        <div className="row">
            <div className="w-100 d-flex flex-row pt-2 pb-4">

                <div className="flex-fill">
                    <Nav variant="underline" activeKey={activeTabKey}
                         className="pe-3 border-bottom border-1 border-gray-200">
                        {tabs.map((tab, tabIndex) => <Nav.Item key={tabIndex}>
                            <Nav.Link eventKey={tab.link} href={tab.link}>
                                {tab.title}
                            </Nav.Link>
                        </Nav.Item>)}
                    </Nav>
                </div>

                {/*<div>*/}
                {/*    <Form.Select size="sm" aria-label="Table theme dropdown"*/}
                {/*                 onChange={(event) => setTheme(event.target.value)}>*/}
                {/*        {availableThemes.map((t, i) =>*/}
                {/*            (<option key={i} value={t}>{t}</option>))}*/}
                {/*    </Form.Select>*/}
                {/*</div>*/}
            </div>

            {format === "html" && <JSONGrid data={data} defaultExpandDepth={100} theme={theme}/>}

            {format === "json" && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    </div>
        ;
}
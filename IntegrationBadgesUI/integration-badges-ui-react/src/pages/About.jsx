import {useOrganizations} from "../contexts/OrganizationsContext";
import {useState} from "react";
import {Link} from "react-router-dom";
import {useResources} from "../contexts/ResourcesContext";
import LoadingBlock from "../components/util/LoadingBlock.jsx";
import {DocumentationRouteUrls} from "./docs/DocumentationRoute.jsx";
import GridAndListSwitch from "../components/util/GridAndListSwitch.jsx";

import JSONGrid from '@redheadphone/react-json-grid'

import abc from '@redheadphone/react-json-grid/dist/index.es.js'

import pkg from '../../package.json';
import Form from "react-bootstrap/Form";


/**
 * The initial page that displays al resources.
 * Get the full list of resources and badges from the contexts.
 * Sort resources by organization name and group them by organization.
 */
export default function About() {

    const [theme, setTheme] = useState("dracula");

    const availableThemes = ["default", "dracula", "monokai", "oceanicPark", "panda", "gruvboxMaterial", "tokyoNight", "remedy", "atlanticNight", "defaultLight", "defaultLight2", "slime", "spacegray", "blueberryDark", "nord", "nightOwl", "oneMonokai", "cobaltNext", "shadesOfPurple", "codeBlue", "softEra", "atomMaterial", "evaDark", "moonLight"];

    const data = {
        "Settings Variables": window.SETTINGS, "Webapp NPM Package": pkg
    }

    return <div className="container">
        <div className="row">
            <div className="w-100 d-flex flex-row pt-2 pb-4">
                <h1 className="flex-fill text-white">About</h1>
                <div>
                    <Form.Select size="sm" aria-label="Table theme dropdown" onChange={(event) => setTheme(event.target.value)}>
                        {availableThemes.map((t, i) =>
                            (<option key={i} value={t}>{t}</option>))}
                    </Form.Select>
                </div>
            </div>
            <JSONGrid data={data} defaultExpandDepth={100} theme={theme}/>
        </div>
    </div>
        ;
}
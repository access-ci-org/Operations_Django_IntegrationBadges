import React from 'react';
import LabelTag from "../components/fragments/LabelTag";
import StatusTag from "../components/fragments/StatusTag";

/**
 * Page to test certain components. Can be accessed by going to /demo
 * and is only available in development mode.
 */
export default function Demo() {
    const demoStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        width: 'fit-content',
    };

    return (
        <div style={demoStyle}>
            <LabelTag label="Label Tag" />
            <StatusTag status="Status Tag" />
        </div>
    );
}
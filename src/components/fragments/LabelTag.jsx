import {useEffect, useState} from "react";

/**
 * The label tag that shows 'required,' 'available, or 'unverified' on the badge.
 * The 'required' and 'available' shares the same style with different text.
 * ResourceBadgeTopTag extends to this component.
 * @param {string} title - the text to display
 * @param {Boolean} verified - if the badge is verified
 * @param {Object} style - optional style
 */
export default function LabelTag({title, verified, style}) {
    const [className, setClassName] = useState("label-tag");

    useEffect(() => {
        let newClassName = "label-tag";

        if (verified === undefined || !verified) {
            newClassName += " unverified-style";
        }

        setClassName(newClassName);
    }, [verified]);

    return (
        <span className={className} style={style}>{title}</span>
    );
}
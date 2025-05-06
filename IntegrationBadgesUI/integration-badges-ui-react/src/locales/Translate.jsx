import {useTranslation} from "react-i18next";

export default function Translate({children}) {
    const {t} = useTranslation();

    if (children && Array.isArray(children) && children.length > 0) {
        return t(children.join(""));
    } else {
        return t(children);
    }
}
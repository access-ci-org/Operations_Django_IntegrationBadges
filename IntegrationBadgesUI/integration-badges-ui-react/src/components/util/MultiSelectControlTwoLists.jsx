import Form from "react-bootstrap/Form";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

/**
 * Multi select control with two lists
 * @param items [{id, label}]
 * @param value [{id, required}]
 * @param onChange
 * @param onItemExpand
 * @param filterLabel
 * @returns {JSX.Element}
 * @constructor
 */
export default function MultiSelectControlTwoLists(
    {
        items, value = [],
        onChange, onItemExpand,
        filterLabel = "Filter",
        icon = <i className="bi bi-circle-fill fs-3"></i>
    }) {
    const isItemSelected = {};
    const isItemRequired = {};
    const itemMap = {};

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        itemMap[item.id] = item;
    }

    for (let i = 0; i < value.length; i++) {
        const {id, required} = value[i];
        isItemSelected[id] = true;
        isItemRequired[id] = required;
    }

    const notSelectedItems = items.filter(item => !isItemSelected[item.id]);
    const selectedItems = value.map(({id}) => itemMap[id]);

    const addItemToSequence = ({id, required = false, sequenceNo = selectedItems.length}) => {
        const _value = [...value];
        _value.splice(sequenceNo, 0, {id, required});
        onChange && onChange(_value);
    }

    const removeItemFromSequence = ({sequenceNo}) => {
        const _value = [...value];
        _value.splice(sequenceNo, 1);
        onChange(_value);
    }

    const toggleItemRequiredStatus = ({sequenceNo}) => {
        const _value = [...value];
        _value[sequenceNo].required = !_value[sequenceNo].required;
        onChange(_value);
    }

    function getItemNameJsx(item) {
        // const renderTooltip = (props) => (
        //     <Tooltip {...props}>
        //         {item.label}
        //     </Tooltip>
        // );

        // return <OverlayTrigger placement="bottom-start" overlay={renderTooltip}>
        return <div className="flex-fill align-content-center ps-2 pe-2 text-gray-800 text-one-line-overflow-ellipsis">
            {item.label}
        </div>
        //</OverlayTrigger>;
    }

    function getItemIconJsx() {
        return <div className="text-gray-400 align-content-center ps-1 pe-1" style={{lineHeight: "30px", height: "30px"}}>
            {icon}
        </div>;
    }

    return <div className="row">
        <div className="col-sm-6 pe-sm-5">
            <div className="w-100 pe-5" style={{height: "60px"}}>
                <div className="input-group search-input input-group-sm">
                        <span className="input-group-text rounded-start-5">
                            <i className="bi bi-search"></i>
                        </span>
                    <input type="text" className="form-control rounded-end-5"
                           placeholder={filterLabel}
                           aria-label={filterLabel} onChange={(e) => console.log(e.target.value)}/>
                </div>
            </div>
            <ul className="list-unstyled overflow-auto" style={{height: "420px"}}>
                {notSelectedItems.map((item, itemIndex) => {
                    return <li key={itemIndex} className="p-0">
                        <div className="d-flex flex-row rounded-1 border border-1 border-gray-300 pt-2 pb-2 ps-2 pe-3">
                            {getItemIconJsx()}
                            {getItemNameJsx(item)}
                            <button className="btn btn-link"
                                    onClick={addItemToSequence.bind(this, {id: item.id})}>
                                <i className="bi bi-plus-square fs-5 text-gray-700"></i>
                            </button>
                        </div>
                    </li>
                })}
            </ul>
        </div>
        <div className="col-sm-6 ps-sm-5 border-start border-1 border-black">
            <div className="w-100 d-flex flex-row p-3" style={{height: "60px"}}>
                <h3 className="flex-fill coming-soon-regular text-black">Added Items</h3>
                <div style={{paddingRight: "35px"}}>
                    <small className="coming-soon-regular">Required?</small>
                </div>
            </div>
            <ul className="list-unstyled">
                {selectedItems.map((item, sequenceNo) => <li key={sequenceNo} className="p-0">
                    <div className="d-flex flex-row rounded-1 border border-1 border-gray-300 pt-2 pb-2 ps-2 pe-3">
                        {getItemIconJsx()}
                        {getItemNameJsx(item)}
                        <div className="align-content-center ps-2 pe-2">
                            <Form.Check type="switch" id={`item-required-switch-${item.id}`} label=""
                                        checked={!!isItemRequired[item.id]}
                                        onChange={toggleItemRequiredStatus.bind(this, {sequenceNo})}/>
                        </div>
                        <button className="btn btn-link"
                                onClick={removeItemFromSequence.bind(this, {sequenceNo})}>
                            <i className="bi bi-dash-square fs-5 text-gray-700"></i>
                        </button>
                    </div>
                </li>)}
            </ul>
        </div>
    </div>
}

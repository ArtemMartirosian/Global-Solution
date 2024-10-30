import { useState } from "react";
import { ArrowDown } from "../icons/ArrowDown";
import { useTranslation } from "react-i18next";
const isActive = (value, activeItemValue) => activeItemValue?.startsWith(value);

const canActive = (value, activeItemValue) =>
    isActive(value, activeItemValue) ? "active" : "";

const MenuSelect = ({ item, index, onItemClick, activeItemValue }) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(activeItemValue?.startsWith(item.value) ? true : false);

    return (
        <li
            key={index}
            className={`parent ${open ? "active" : ""}`}
        >
            <div
                className={`item ${canActive(item.value, activeItemValue)}`}
                onClick={() => setOpen(!open)}
            >
                <button className="label">{t(item.label)}</button>
                <ArrowDown color={isActive(item.value, activeItemValue) ? "#0D3664" : "#A7A7A7"} />
            </div>
            <ul key={index} className="children-block">
                {item.children?.map((child, index) => {
                    return (
                        <li
                            className={`label child ${canActive(
                                item.value + "." + child.value,
                                activeItemValue
                            )}`}
                            key={index}
                            onClick={() =>
                                onItemClick(item.value + "." + child.value)
                            }
                        >
                            <button>
                                {t(child.label)}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </li>

    )
}

export default MenuSelect
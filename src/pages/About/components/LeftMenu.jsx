import { useTranslation } from "react-i18next";
import { ArrowDown } from "../icons/ArrowDown";
import MenuSelect from "./MenuSelect";
import { Menu } from "../style/Menu.style";

const isActive = (value, activeItemValue) => activeItemValue?.startsWith(value);

const canActive = (value, activeItemValue) =>
  isActive(value, activeItemValue) ? "active" : "";

export const LeftMenu = ({ options = [], onItemClick, activeItemValue }) => {
  const { t } = useTranslation();
  
  return (
    <Menu>
      <ul className="menu">
        {options?.map((item, index) => {
          if ("children" in item) {
            return (
              <MenuSelect
                item={item}
                index={index}
                onItemClick={onItemClick}
                activeItemValue={activeItemValue}
                key={item.value} />
            );
          } else {
            return (

              <li
                className={`item label ${canActive(
                  item.value,
                  activeItemValue
                )}`}
                onClick={() => onItemClick(item.value)}
                key={index}
              >
                <button>
                  {t(item.label)}
                </button>

              </li>
            );
          }
        })}
      </ul>
    </Menu>
  );
};

import { useTranslation } from "react-i18next";
import { ArrowDown } from "../icons/ArrowDown";
import { DropDownMenu } from "../style/DropDownMenu";

const DropdownMenu = ({ children, activeItemValue, open, setOpen }) => {
  const { t } = useTranslation();

  return (
    <DropDownMenu>
      <button
        onClick={() => setOpen(!open)}
        className={open ? "toggle open" : "toggle"}
      >
        <div className="value">{t(activeItemValue)}</div>
        <ArrowDown color={"#0D3664"} />
      </button>

      <div className={open ? "popup open" : "popup"}>{children}</div>
    </DropDownMenu>
  );
};

export default DropdownMenu;

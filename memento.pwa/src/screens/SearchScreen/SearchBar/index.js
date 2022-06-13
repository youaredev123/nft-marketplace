import React from "react";
import { Search } from "react-feather";
import Input from "../../../components/Form/Input";

export default (props) => {
  // const [searchTerm, setSearchTerm] = useState("");

  return (
    <Input
      icon={<Search className="mr-3" color="var(--grey2)" />}
      name="relica-search"
      onChange={(val) => props.onTextChange(val)}
      placeholder="Search"
      onFocus={() => (props.onFocus ? props.onFocus(true) : null)}
      onBlur={() => (props.onFocus ? props.onFocus(false) : null)}
      value={props.searchTerm}
      clickHandler={props.clickHandler}
    />
  );
};

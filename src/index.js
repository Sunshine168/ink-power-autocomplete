import { h } from "ink";
import Select from "./custom-select";
import TextInput from "ink-text-input";
import PropTypes from "prop-types";
import fuzzysort from "fuzzysort";

// Helpers -------------------------------------------------------------------
const not = a => !a;
const isEmpty = arr => arr.length === 0;
const noop = () => {};

const getMatchItems = (value, items, fuzzysort) =>
  fuzzysort.go(value, items, {
    key: "label"
  });

// AutoComplete --------------------------------------------------------------

const AutoComplete = ({
  value,
  placeholder,
  items,
  getMatch,
  onChange,
  onSubmit,
  indicatorComponent,
  itemComponent,
  pageLimit,
  showListDefault
}) => {
  let matches = showListDefault ? items : [];
  if (value !== "") {
    matches = getMatchItems(value, items, fuzzysort);
  }

  if (typeof getMatch === "function") {
    matches = matches
      .map(item => (item.obj ? item.obj : item))
      .filter(getMatch(value));
  }

  const hasSuggestion = not(isEmpty(matches));

  return (
    <span>
      <div>
        <TextInput
          value={value ? value : ""}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
      {hasSuggestion && (
        <Select
          items={matches}
          onSelect={onSubmit}
          focus={hasSuggestion}
          indicatorComponent={indicatorComponent}
          itemComponent={itemComponent}
          pageLimit={pageLimit}
        />
      )}
    </span>
  );
};

AutoComplete.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired
    })
  ),
  getMatchItems:PropTypes.func,
  getMatch: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  indicatorComponent: PropTypes.func,
  itemComponent: PropTypes.func,
  showListDefault: PropTypes.bool
};

AutoComplete.defaultProps = {
  showListDefault: false,
  value: "",
  placeholder: "",
  items: [],
  getMatchItems,
  onChange: noop,
  onSubmit: noop,
  indicatorComponent: Select.defaultProps.indicatorComponent,
  itemComponent: Select.defaultProps.itemComponent
};

export default AutoComplete;

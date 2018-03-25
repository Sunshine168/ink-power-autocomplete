import { h, Component, Text } from "ink";
import PropTypes from "prop-types";
import figures from "figures";
import isEqual from 'lodash.isequal'
const noop = () => {};

export const Indicator = ({ isSelected }) => {
  if (!isSelected) {
    return " ";
  }

  return <Text blue>{`${figures.pointer} `}</Text>;
};

Indicator.propTypes = {
  isSelected: PropTypes.bool.isRequired
};

export const Item = ({ isSelected, label }) => <Text blue={isSelected}>{label}</Text>;

Item.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired
};

export default class Select extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedIndex: 0,
			startInex: 0,
			endIndex: props.pageLimit,
		};

		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	render(
		{ items, indicatorComponent, itemComponent, pageLimit },
		{ selectedIndex, startInex, endIndex }
	) {
		const currentItems = !pageLimit ? items : items.slice(startInex, endIndex);

		return currentItems.map((item, index) => {
			const isSelected = index === selectedIndex;

			return (
				<div key={item.value}>
					{h(indicatorComponent, { isSelected })}
					{h(itemComponent, { ...item, isSelected })}
				</div>
			);
		});
	}

	componentDidMount() {
		process.stdin.on("keypress", this.handleKeyPress);
	}
	
	componentWillReceiveProps(nextProps) {
		if (!isEqual(this.props.items, nextProps.items)) {
			this.setState({
				selectedIndex: 0
			});
		}
	}
	
	componentWillUnmount() {
		process.stdin.removeListener("keypress", this.handleKeyPress);
	}

	handleKeyPress(ch, key) {
		const { items, focus, onSelect, pageLimit } = this.props;
		const { selectedIndex } = this.state;
		const length = items.length;

		if (focus === false) {
			return;
		}

		if (key.name === "up" || key.name === "k") {
			const prevIndex = selectedIndex - 1;
			const newState = {
				selectedIndex: prevIndex === -1 ? selectedIndex : prevIndex
			};

			if (pageLimit) {
				if (prevIndex === -1) {
					if (this.state.startInex -1 >= 0) {
						newState.startInex = this.state.startInex - 1;
						newState.endIndex = this.state.endIndex - 1;
					}
				}
			}

			this.setState(newState);
		}

		if (key.name === "down" || key.name === "j") {
			const nextIndex = selectedIndex + 1;
			const newState = {
				selectedIndex: nextIndex >= length ? selectedIndex : nextIndex
			};

			if (pageLimit) {
				// NextPage
				if (nextIndex % pageLimit === 0) {
					if (this.state.endIndex + 1 <= length) {
						newState.startInex = this.state.startInex + 1;
						newState.endIndex = this.state.endIndex + 1;
					}
					newState.selectedIndex = selectedIndex;
				}
			}
			this.setState(newState);
		}

		if (key.name === "return") {
			onSelect(items[selectedIndex]);
		}
	}
}

Select.propTypes = {
  items: PropTypes.array,
  focus: PropTypes.bool,
  indicatorComponent: PropTypes.func,
  itemComponent: PropTypes.func,
  onSelect: PropTypes.func
};

Select.defaultProps = {
  items: [],
  focus: true,
  indicatorComponent: Indicator,
  itemComponent: Item,
  onSelect: noop
};

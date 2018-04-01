# ink-power-auto-complete
 
 
**PS: ink-autocomplete and ink-select-input still your first choose**
  
![build status][travis-image]


[travis-image]: https://travis-ci.org/Sunshine168/ink-power-autocomplete.svg?branch=master

## feature

* same as [ink-autocomplete](https://github.com/maticzav/ink-autocomplete) extra support paging(power ink-selected-input at same time)

* WIP make it flexible

* use [fuzzysort](https://github.com/farzher/fuzzysort) for searching 


## usage 

```js
npm install ink-power-auto-complete -S // or yarn add ink-power-auto-complete
```

```
import AutoComplete from "ink-power-auto-complete"; // power AutoComplete 
import Select from "ink-power-auto-complete/dist/custom-select"; // power Select


	<AutoComplete
		value={searching}
		items={list}
		onChange={this.handleChange}
		onSubmit={this.handleSubmit}
		pageLimit={10}
	/>
```

### options

#### pageLimit 

paging size

#### getMatchItems

default:

```js
const getMatchItems = (value, items, fuzzysort) =>
  fuzzysort.go(value, items, {
    key: "label"
  });
```

#### showListDefalut

true or false

show all the result before input


 
 
## base 

[ink-autocomplete](https://github.com/maticzav/ink-autocomplete)
[ink-select-input](https://github.com/vadimdemedes/ink-select-input) 


## MIT




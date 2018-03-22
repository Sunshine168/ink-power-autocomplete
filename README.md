#ink-power-auto-complete

[![build status][travis-image]][travis-url]

[travis-image]: https://travis-ci.org/Sunshine168/ink-power-autocomplete.svg?branch=master

## feature

* same as [ink-autocomplete](https://github.com/maticzav/ink-autocomplete) extra support paging(power ink-selected-input at same time)

* WIP make it flexible

## usage 

```js
npm add ink-power-auto-complete -S // or yarn add ink-power-auto-complete
```

```
import AutoComplete from "./dist/"; // power AutoComplete 
import Select from "./dist/custom-select"; // power Select


	<AutoComplete
		value={searching}
		items={list}
		onChange={this.handleChange}
		onSubmit={this.handleSubmit}
		pageLimit={10} // only different opts currently
```


 
 
## base 

[ink-autocomplete](https://github.com/maticzav/ink-autocomplete)
[ink-select-input](https://github.com/vadimdemedes/ink-select-input) 


## MIT




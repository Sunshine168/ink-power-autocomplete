// import { spy } from "sinon";
import test from "ava";
import { h, renderToString, Text } from "ink";
import Input from "ink-text-input";
import AutoComplete from "./dist/";
import Select, { Indicator, Item } from "./dist/custom-select";
import figures from "figures";

test("Renders correctly.", t => {
  t.is(
    renderToString(<AutoComplete items={[]} />),
    renderToString(
      <span>
        <div>
          <Input value={""} placeholder={""} />
        </div>
      </span>
    )
  );
});

test("value set null will be ok .", t => {
  t.is(
    renderToString(<AutoComplete items={[]} value={null} />),
    renderToString(
      <span>
        <div>
          <Input value={""} placeholder={""} />
        </div>
      </span>
    )
  );
});

test("paging render should be ok.", t => {
  const mockData = [];

  for (let i = 0; i < 10; i++) {
    mockData.push({
      label: i + "",
      value: i + ""
    });
  }
  t.is(
    renderToString(<Select items={mockData} pageLimit={2} />),
    renderToString(
      <span>
        <div>
          <Indicator isSelected />
          <Item isSelected label="0" />
        </div>

        <div>
          <Indicator />
          <Item label="1" />
        </div>
      </span>
    )
  );
});

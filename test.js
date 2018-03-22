// import { spy } from "sinon";
import test from "ava";
import { h, renderToString, Text } from "ink";
import Input from "ink-text-input";
import AutoComplete from "./dist/";
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

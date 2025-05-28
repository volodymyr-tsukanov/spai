import Snapshot from "./Snapshot";
import { render } from "@testing-library/react";
it("renderuje się poprawnie", () => {
  const { container } = render(<Snapshot />);
  expect(container).toMatchSnapshot();
});

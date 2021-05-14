import { diffObjValues } from "./core";

describe("diffObjValues()", () => {
  it("when passed an empty object returns an empty object", () => {
    const base = {};
    const comparator = {};

    const changedValues = diffObjValues(base, comparator);

    expect(changedValues).toStrictEqual({});
  });

  it("when passed two identical objects, returns an empty object", () => {
    const base = { a: "b" };
    const comparator = { a: "b" };

    const changedValues = diffObjValues(base, comparator);

    expect(changedValues).toStrictEqual({});
  });

  it("when passed two different objects, returns the changed properties", () => {
    const base = { a: "b" };
    const comparator = { a: "c" };

    const changedValues = diffObjValues(base, comparator);

    expect(changedValues).toStrictEqual({ a: "c" });
  });

  it("when passed two other different objects, returns the changed properties", () => {
    const base = { a: "b", b: "d" };
    const comparator = { a: "c", b: "e" };

    const changedValues = diffObjValues(base, comparator);

    expect(changedValues).toStrictEqual({ a: "c", b: "e" });
  });

  it("when passed a comparator with a different key to the base, throws an error", () => {
    const base = { a: "b", b: "d" };
    const comparator = { a: "c", f: "e" };

    const diffIncomparableObjects = () => diffObjValues(base, comparator);

    expect(diffIncomparableObjects).toThrowError();
  });

  it("when passed a deep object, returns the changed properties all the way down", () => {
    const base = { a: "b", c: { d: "e" } };
    const comparator = { a: "b", c: { d: "f" } };

    const changedValues = diffObjValues(base, comparator);

    expect(changedValues).toStrictEqual({ c: { d: "f" } });
  });

  it("when passed another deep object, returns the changed properties all the way down", () => {
    const base = { a: "b", c: { d: "e", f: "g" } };
    const comparator = { a: "b", c: { d: "e", f: "h" } };

    const changedValues = diffObjValues(base, comparator);

    expect(changedValues).toStrictEqual({ c: { f: "h" } });
  });

  it("when passed a three-deep object, returns the changed properties all the way down", () => {
    const base = { a: "b", c: { d: "e", f: { g: "h" } } };
    const comparator = { a: "b", c: { d: "e", f: { g: "i" } } };

    const changedValues = diffObjValues(base, comparator);

    expect(changedValues).toStrictEqual({ c: { f: { g: "i" } } });
  });

  it("handles arrays", () => {
    const base = { a: [1, 2, 3] };
    const comparator = { a: [4, 5, 6] };

    const changedValues = diffObjValues(base, comparator);

    expect(changedValues).toStrictEqual({ a: [4, 5, 6] });
  });

  it("handles other arrays", () => {
    const base = { a: [1, 2, 3], b: "c" };
    const comparator = { a: [1, 2, 3], b: [4, 5, 6] };

    const changedValues = diffObjValues(base, comparator);

    expect(changedValues).toStrictEqual({ b: [4, 5, 6] });
  });

  it("handles undefined", () => {
    const base = { a: undefined, c: "d" };
    const comparator = { a: "b", c: "d" };

    const changedValues = diffObjValues(base, comparator);

    expect(changedValues).toStrictEqual({ a: "b" });
  });
});

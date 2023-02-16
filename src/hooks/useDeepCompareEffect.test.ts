export {};
// import { useState } from "react";
// import { renderHook } from "@testing-library/react-hooks";
// import useDeepCompareEffect, { useDeepCompareEffectNoCheck, equals, isInDev } from "./useDeepCompareEffect";

// test("Equals", () => {
//   expect(equals("Check-1", "Check-1")).toBe(true);
//   expect(equals("Check-1", "Check-2")).toBe(false);
//   expect(equals(true, true)).toBe(true);
//   expect(equals(true, false)).toBe(false);
//   expect(equals(1, 1)).toBe(true);
//   expect(equals(1, 10)).toBe(false);
//   expect(equals({ firsName: "name" }, { firsName: "name" })).toBe(true);
//   expect(equals({ firsName: "name" }, { firsname: "name" })).toBe(false);
//   expect(equals({ firsName: "name", lastName: "last" }, { firsName: "name" })).toBe(false);
// });

// describe("useDeepCompareEffect Tests", () => {
//   test("useDeepCompareEffect throws an error if using it with an empty array", () => {
//     const env = process.env.NODE_ENV;
//     process.env.NODE_ENV = "development";
//     const { result } = renderHook(() => useDeepCompareEffect(() => {}, []));
//     expect(result.error).toMatchInlineSnapshot(
//       `[Error: useDeepCompareEffect should not be used with no dependencies. Use React.useEffect instead.]`
//     );
//     process.env.NODE_ENV = env;
//   });

//   test("useDeepCompareEffect throws an error if using it with an array of only primitive values", () => {
//     const env = process.env.NODE_ENV;
//     process.env.NODE_ENV = "development";
//     const { result } = renderHook(() => useDeepCompareEffect(() => {}, [true, 1, "string"]));
//     expect(result.error).toMatchInlineSnapshot(
//       `[Error: useDeepCompareEffect should not be used with dependencies that are all primitive values. Use React.useEffect instead.]`
//     );
//     process.env.NODE_ENV = env;
//   });

//   test("useDeepCompareEffectNoCheck don't throw an error if using it with an array of only primitive values", () => {
//     const errorMock = jest.spyOn(console, "error").mockImplementation(() => {});
//     expect(() => renderHook(() => useDeepCompareEffectNoCheck(() => {}, [true, 1, "string"]))).not.toThrow();
//     expect(console.error).toHaveBeenCalledTimes(0);
//     errorMock.mockRestore();
//   });

//   test("in production mode there are no errors thrown", () => {
//     const env = process.env.NODE_ENV;
//     process.env.NODE_ENV = "production";
//     renderHook(() => useDeepCompareEffect(() => {}, [true, 1, "string"]));
//     renderHook(() => useDeepCompareEffect(() => {}, []));
//     process.env.NODE_ENV = env;
//   });

//   test("useDeepCompareEffect handles changing values as expected", () => {
//     const callback = jest.fn();
//     let deps = [1, { a: "b" }, true];
//     const { rerender } = renderHook(() => useDeepCompareEffect(callback, deps));

//     expect(callback).toHaveBeenCalledTimes(1);
//     callback.mockClear();

//     // no change
//     rerender();
//     expect(callback).toHaveBeenCalledTimes(0);
//     callback.mockClear();

//     // no-change (new object with same properties)
//     deps = [1, { a: "b" }, true];
//     rerender();
//     expect(callback).toHaveBeenCalledTimes(0);
//     callback.mockClear();

//     // change (new primitive value)
//     deps = [2, { a: "b" }, true];
//     rerender();
//     expect(callback).toHaveBeenCalledTimes(1);
//     callback.mockClear();

//     // no-change
//     rerender();
//     expect(callback).toHaveBeenCalledTimes(0);
//     callback.mockClear();

//     // change (new primitive value)
//     deps = [1, { a: "b" }, false];
//     rerender();
//     expect(callback).toHaveBeenCalledTimes(1);
//     callback.mockClear();

//     // change (new properties on object)
//     deps = [1, { a: "c" }, false];
//     rerender();
//     expect(callback).toHaveBeenCalledTimes(1);
//     callback.mockClear();
//   });

//   // this may be useful in the future, but we don't support it today so I thought
//   // it'd be good to include as a test as it would be a breaking change if we
//   // did add support. I'm inclined to not support this. Manipulation is not good.
//   test("useDeepCompareEffect does NOT work with manipulation", () => {
//     const callback = jest.fn();
//     const deps = [{ a: "b" }];
//     const { rerender } = renderHook(() => useDeepCompareEffect(callback, deps));
//     expect(callback).toHaveBeenCalledTimes(1);
//     callback.mockClear();

//     deps[0].a = "c";
//     rerender();
//     expect(callback).toHaveBeenCalledTimes(0);
//   });

//   test("useDeepCompareEffect works with deep object similarities/differences", () => {
//     const callback = jest.fn();
//     let deps: Array<Record<string, unknown>> = [{ a: { b: { c: "d" } } }];
//     const { rerender } = renderHook(() => useDeepCompareEffect(callback, deps));
//     expect(callback).toHaveBeenCalledTimes(1);
//     callback.mockClear();

//     // change primitive value
//     deps = [{ a: { b: { c: "e" } } }];
//     rerender();
//     expect(callback).toHaveBeenCalledTimes(1);
//     callback.mockClear();

//     // no-change
//     deps = [{ a: { b: { c: "e" } } }];
//     rerender();
//     expect(callback).toHaveBeenCalledTimes(0);
//     callback.mockClear();

//     // add property
//     deps = [{ a: { b: { c: "e" }, f: "g" } }];
//     rerender();
//     expect(callback).toHaveBeenCalledTimes(1);
//     callback.mockClear();
//   });

//   test("useDeepCompareEffect works with getDerivedStateFromProps", () => {
//     const callback = jest.fn();
//     const { rerender } = renderHook(
//       ({ a }: { a: number }) => {
//         const [lastA, setLastA] = useState(a);
//         const [c, setC] = useState(5);
//         if (lastA !== a) {
//           setLastA(a);
//           setC(1);
//         }
//         useDeepCompareEffect(callback, [{ a, c }]);
//       },
//       { initialProps: { a: 1 } }
//     );
//     expect(callback).toHaveBeenCalledTimes(1);
//     callback.mockClear();

//     // change a, and reset c
//     rerender({ a: 2 });
//     expect(callback).toHaveBeenCalledTimes(1);
//     callback.mockClear();
//   });
// });

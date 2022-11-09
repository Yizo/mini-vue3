var VueReactivity = (() => {
  // ../packages/shared/src/index.ts
  function isObject(value) {
    return value !== null && typeof value === "object";
  }

  // ../packages/reactivity/src/index.ts
  var fn = () => {
    const a = isObject({ a: 1 });
    if (a) {
      console.log(1);
    } else {
      console.log(2);
    }
  };
  fn();
})();
//# sourceMappingURL=reactivity.global.js.map

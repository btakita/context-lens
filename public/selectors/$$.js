module.exports = function $$(selector, ctx) {
  return (ctx || document).querySelectorAll(selector)
};

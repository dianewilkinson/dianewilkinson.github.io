module.exports = function (eleventyConfig) {

  // Copy static assets directly
  eleventyConfig.addPassthroughCopy("assets");
// Ignore internal documentation
  eleventyConfig.ignores.add("internal/**");

  return {
    dir: {
      input: "site",
      output: "_site"
    }
  };
};

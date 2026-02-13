module.exports = function (eleventyConfig) {

  // Copy static assets directly
  eleventyConfig.addPassthroughCopy("assets");

  return {
    dir: {
      input: ".",
      output: "_site"
    }
  };
};

module.exports = function (eleventyConfig) {

  // Copy static assets directly
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("site/tools/**/demo-embed/**");

  // Ignore internal documentation
  eleventyConfig.ignores.add("internal/**");

  return {
    dir: {
      input: "site",
      output: "_site"
    }
  };
};

/* MathJax configuration for LaTeX maths in the manual.
 *
 * The `pymdownx.arithmatex` extension (see mkdocs.yml) does NOT render maths itself.
 * It only finds $...$ / $$...$$ in the Markdown and wraps it in <div class="arithmatex">
 * using \(...\) and \[...\] delimiters. MathJax, loaded after this file, does the drawing.
 *
 * The `document$.subscribe` block at the bottom is required because the theme has
 * `navigation.instant` enabled: pages are swapped in via JavaScript rather than a full
 * browser reload, so MathJax must be told to typeset again after each navigation.
 * Without it, maths renders on first load but shows as raw LaTeX when you click
 * through the sidebar.
 *
 * Reference: https://squidfunk.github.io/mkdocs-material/reference/math/
 */
window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    processEscapes: true,
    processEnvironments: true,
  },
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex",
  },
};

document$.subscribe(() => {
  MathJax.startup.output.clearCache();
  MathJax.typesetClear();
  MathJax.texReset();
  MathJax.typesetPromise();
});

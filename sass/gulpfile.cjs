const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const purgecss = require("gulp-purgecss");
const rename = require("gulp-rename");
const path = require("path");

// Paths for SCSS and output
const scssFilePath = path.resolve(__dirname, "../my-testing-app/app.scss"); // Use path.resolve for clarity
const outputCssPath = path.resolve(__dirname, "../my-testing-app/src"); // Output to React src/

// Compile SCSS to App.css
function compileSass() {
    console.log("Compiling SCSS from:", scssFilePath); // Debugging log
    return src(scssFilePath)
        .pipe(sass().on("error", sass.logError)) // Handle Sass errors
        .pipe(
            purgecss({
                content: [
                    path.resolve(__dirname, "../my-testing-app/**/*.html"),
                    path.resolve(__dirname, "../my-testing-app/src/**/*.{jsx,js,tsx,ts}"), // Added TypeScript support
                ],
                safelist: {
                    standard: [
                        "active",
                        "visible",
                        "container",
                        "row",
                        "col", // Keep common layout classes
                    ],
                    deep: [/^btn-/, /^nav-/, /^alert-/, /^modal-/], // Keep Bootstrap-like classes
                    greedy: [/./], // Prevent full CSS removal (TEMP FIX)
                },
                defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [], // Ensure it extracts class names
            })
        ) // Remove unused CSS
        .pipe(rename("App.css")) // Rename output to App.css
        .pipe(dest(outputCssPath)) // Output compiled CSS to React src/
        .on("end", () => console.log("SCSS compiled and written to:", outputCssPath)); // Debugging log
}

// Watch for changes in SCSS, HTML, and JS/JSX files
function watchSass() {
    console.log("Watching files for changes...");
    watch(
        [
            scssFilePath,
            path.resolve(__dirname, "../my-testing-app/**/*.html"),
            path.resolve(__dirname, "../my-testing-app/src/**/*.{jsx,js,tsx,ts}"),
        ],
        compileSass
    ).on("error", (err) => {
        console.error("Error in watch task:", err.message);
    });
}

// Default task
exports.default = series(compileSass, watchSass);

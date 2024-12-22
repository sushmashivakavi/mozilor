const mix = require('laravel-mix');

// Compile the React entry point
mix.js('resources/js/app.jsx', 'public/js')
    .react()
    .postCss('resources/css/app.css', 'public/css')
    .version()
    .webpackConfig({
        resolve: {
            extensions: ['.js', '.jsx'],
        },
    });


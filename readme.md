# oldthingsnewplaces

a simple portfolio site driven by contentful

## getting started

1. install dependencies

```
npm install
```

2. Create an .env file in project root based on .env.sample

3. Run `gulp` to start local development server

## gulpfile

`gulp fetch` pulls data from contentful and saves it to /api. This data is used to construct index.html with `gulp compile`.

`gulp build` runs tasks that build static files to /dist

`gulp serve` creates a browserSync server for local development

`gulp build-prod` builds minified assets for production

## deployment

any activity in contentful will trigger `gulp build-prod` in netlify using webhooks. see settings > webhooks in contentful for more control.

netlify is also set to auto-deploy from master branch, this can be turned off if desired.

<a href="https://www.contentful.com/" rel="nofollow" target=“_blank”><img src="https://images.contentful.com/fo9twyrwpveg/44baP9Gtm8qE2Umm8CQwQk/c43325463d1cb5db2ef97fca0788ea55/PoweredByContentful_LightBackground.svg" width="200px" alt="Powered by Contentful" /></a>

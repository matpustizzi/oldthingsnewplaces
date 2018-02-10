const contentful = require('contentful'),
  env = require('dotenv').config(),
  gulp = require('gulp'),
  fs = require('fs'),
  stringify = require('json-stringify-safe');
  client = contentful.createClient({
    space: process.env.space_id, 
    accessToken: process.env.api_key
  });

// Get the posts data from the cloud CMS and stash it locally
// content type 'page' contains one entry representing th homepage
// 'page' content type has an id of 'categoryOrder', this needs fixing
gulp.task('fetch', () =>
  client.getEntries( { 'content_type': 'categoryOrder' } )
    .then( (resp) => {
        const data = resp.items.map((item,i) => item.fields);
        fs.writeFileSync('api/pages.json', stringify(data, null, 2)); 
      }
    )
);
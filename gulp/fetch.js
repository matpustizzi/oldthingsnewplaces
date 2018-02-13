const gulp = require('gulp'),
  env = require('dotenv').config(),
  fs = require('fs')
  contentful = require('contentful'),
  stringify = require('json-stringify-safe');
  client = contentful.createClient({
    space: process.env.space_id, 
    accessToken: process.env.api_key
  });

// Get the posts data from the cloud CMS and stash it locally
// content type 'page' contains one entry representing th homepage
// 'page' content type has an id of 'categoryOrder', this needs fixing
gulp.task('fetch', () => {
  client.getEntries( { content_type: 'categoryOrder', include : 10 } )
    .then( (resp) => {
        const data = resp.items.map((item,i) => item.fields);
        fs.writeFileSync('api/pages.json', stringify(data, null, 2)); 
      }
    );
});
## Song parcer online

How to start?
<br />
```
    npm i
    npm start
```
<br />
How to build an embedded single page of the app?
<br />
`npm run build`

How to embed the code on another web page?
####Add a react CDNs and font CDN to your html file:
```
   <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react.js" charset="utf-8"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react-dom.js" charset="utf-8"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.21.1/babel.min.js" charset="utf-8"></script>
   <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
```
#### Add a container for react app inside your html file:
`<div id="root"></div>`

#### Put a script tag with my react component inside your html file
`<script src="pathto/index.js" type="text/babel"></script>`

* Note: There is an another way to embed this app to the another page via Iframe or putting builded chunks from 
`build/static/js` folder inside your html and adding a DOM container further.

### Potential improvements:
* Styling
* Tests
* Incapsulation
* Documentation 

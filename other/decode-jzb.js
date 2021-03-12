// Written by: Bill Badeaux
// Integral Ad Science
// v.1 12/7/2018

// Pendo sends events from your site to their servers in a compressed format. This is the 'jzb' parameter of the GET
//   requests you see in your network tab of dev tools.  jzb = JSON, Zlib, Base64.  You can decode this with either
//   of these. The first one is browser-side (w/ bower), and second is command line (node)


// Browser (bower)


// 1. bower install pako and base64-js, or just add these 2 files to your build:
// - https://github.com/nodeca/pako/blob/1.0.7/dist/pako_inflate.min.js
// - https://github.com/beatgammit/base64-js/blob/v1.3.0/base64js.min.js

// 2. Then immediately after your Pendo snippet code, add:
pendo.decodeJzb = function( jzbString ) {

    // The Pendo agent [randomly?] adds 0-3 characters at the end, so trim them if needed so it doesn't break base64.
    var unpaddedJzbString = jzbString.substr( 0, jzbString.length - ( jzbString.length % 4 ) );

    // base64 decode jzb string -> zlib binary
    var byteArray = base64js.toByteArray( unpaddedJzbString );

    // zlib inflate (decompress) binary -> JSON string
    var jsonStr = pako.inflate( byteArray, { to: 'string' } );

    // Return object so console pretty-prints it
    return JSON.parse( jsonStr );
};

// 3. Now, in the browser console, you can see what's being sent to Pendo:
pendo.decodeJzb( 'copy/paste your jzb URL parameter here' );


// Command line (node)


// For node: npm install pako base64-js
// Then on the command line: node decode-jzb.js <payload>

// File: decode-jzb.js
'use strict';

var pako = require('pako');
var base64js = require('base64-js');

// Get the jzbString from the command line
var jzbString = process.argv[2];

// The Pendo agent [randomly?] adds 0-3 characters at the end, so trim them if needed so it doesn't break base64.
var unpaddedJzbString = jzbString.substr( 0, jzbString.length - ( jzbString.length % 4 ) );

// base64 decode jzb string -> zlib binary
var byteArray = base64js.toByteArray( unpaddedJzbString );

// zlib inflate (decompress) binary -> JSON string
var jsonStr = pako.inflate( byteArray, { to: 'string' } );

// Make it nice to read
var humanReadable = JSON.stringify( JSON.parse( jsonStr ), null, 2 );

// Print
console.log( humanReadable );
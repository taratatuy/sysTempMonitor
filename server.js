const path = require( 'path' )
const express = require( 'express' )
const { channel } = require( './core.js' )
const server = express();

const port = 10252;

server.get( '/', ( req, res ) => { 
  res.end( 'Hello from PI!' )
 } )

channel.on('tempChange', data => { console.log( data.print() ) })

server.listen( port, console.log( `Listening on port ${ port }` ) )

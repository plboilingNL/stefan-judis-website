module.exports = ( files, metalsmith, done ) => {
  const filesNames = Object.keys( files )
    .filter( file => ! /^\./.test( file ) && file !== '/style/main.css' )
    .map( file => `'/${ file }'` );

  files[ 'sw.js' ] = {
    contents : `
      importScripts( '/cache-polyfill.js' );

      self.addEventListener( 'install', function( e ) {
        e.waitUntil(
          caches.open( 'stefan-judis' ).then( function( cache ) {
            return cache.addAll( [ ${ filesNames.join( ',' ) } ] );
          } )
        );
      } );

      self.addEventListener( 'fetch', function( event ) {
        console.log(event.request.url);
        event.respondWith(
          caches.match( event.request ).then( function( response ) {
            return response || fetch(event.request);
          } )
        );
      } );`
  };

  done();
}

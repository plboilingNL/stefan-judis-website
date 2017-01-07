module.exports = ( files, metalsmith, done ) => {
  const filesNames = Object.keys( files )
    .filter( file => ! /^\./.test( file ) && file !== '/style/main.css' )
    .map( file => `'/${ file }'` );

  files[ 'sw.js' ] = {
    contents : `
      const CACHE_NAME = '${ `sj-${ + new Date() }` }';
      importScripts( '/cache-polyfill.js' );

      self.addEventListener( 'install', function( e ) {
        e.waitUntil(
          caches.open( CACHE_NAME )
            .then( function( cache ) {
            return cache.addAll( [ ${ filesNames.join( ',' ) } ] );
            } )
            .then( function() {
              return self.skipWaiting()
            } )
        );
      } );

      self.addEventListener( 'fetch', function( event ) {
        event.respondWith(
          caches.match( event.request ).then( function( response ) {
            return response || fetch(event.request);
          } )
        );
      } );

      self.addEventListener( 'activate', function( event ) {
        var cacheWhitelist = [ CACHE_NAME ];

        console.log( 'Updated SW' );

        event.waitUntil(
          caches.keys()
            .then( function( keyList ) {
              return Promise.all( keyList.map( function( key ) {
                if ( cacheWhitelist.indexOf( key ) === -1 ) {
                  console.log( 'CURRENT', CACHE_NAME, 'DELETING', key );
                  return caches.delete( key );
                }
              }))
            })
            .then( function() {
              return self.clients.claim();
            } )
        );
      });`
  };

  done();
}

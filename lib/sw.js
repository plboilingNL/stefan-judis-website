module.exports = ( files, metalsmith, done ) => {
  const filesNames = Object.keys( files )
    .filter( file => ! /^\./.test( file ) && file !== '/style/main.css' )
    .map( file => `'/${ file }'` );

  files[ 'sw.js' ] = {
    contents : `
      importScripts( 'assets/js/sw-toolbox.js' );

      const OFFLINE_URL = '/offline.html';
      toolbox.precache( [ '/index.html', 'assets/fonts/argent-cf/argent-cf-thin.woff2', OFFLINE_URL ] );
      toolbox.router.get( /html$/, toolbox.networkFirst );
      toolbox.router.get( /woff2$/, toolbox.cacheFirst );`
  };

  done();
}

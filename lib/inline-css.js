module.exports = function( files, metalsmith, done ) {
  Object.keys( files )
    .filter( file => /.html$/.test( file ) )
    .forEach( file => {
      files[ file ].contents = ( '' + files[ file ].contents )
                                 .replace( '__INLINE_STYLES__', files[ 'style/main.css' ].contents )
    } );
  done();
};

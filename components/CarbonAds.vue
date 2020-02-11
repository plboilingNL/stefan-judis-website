<template>
  <div class="carbon-container">
    <script
      async
      type="text/javascript"
      src="//cdn.carbonads.com/carbon.js?serve=CE7DLKQM&placement=wwwstefanjudiscom"
      id="_carbonads_js"
    ></script>
  </div>
</template>

<style>
.carbon-container {
  position: relative;
  height: 97px;
  background: var(--grey-brighter);
  margin: 2em 0 4em;

  &::before {
    content: '';
    height: 0.25em;
    position: absolute;
    background: var(--grey-brighter);
    top: calc(100% + 2em);
    left: 15%;
    right: 15%;
  }
}

#carbonads {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Helvetica, Arial,
    sans-serif;
}

#carbonads {
  position: relative;
  display: flex;
  background-color: hsl(0, 0%, 98%);
}

#carbonads a {
  color: inherit;
  text-decoration: none;
}

#carbonads a:hover {
  color: inherit;
}

#carbonads span {
  position: relative;
  width: 100%;
  display: block;
  overflow: hidden;
}

#carbonads .carbon-wrap {
  display: flex;
}

.carbon-img {
  display: block;
  margin: 0;
  line-height: 1;
}

.carbon-img img {
  display: block;
}

.carbon-text {
  width: 100%;
  font-size: 0.875em;
  padding: 0.5em 3em;
  line-height: 1.5;
  text-align: center;
  display: grid;
  place-items: center;
}

.carbon-poweredby {
  display: block;
  width: auto;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 8px 10px;
  z-index: 2;
  background: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 5px,
      hsla(0, 0%, 0%, 0.025) 5px,
      hsla(0, 0%, 0%, 0.025) 10px
    )
    hsla(203, 11%, 95%, 0.4);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  font-size: 9px;
  line-height: 1;
}
</style>
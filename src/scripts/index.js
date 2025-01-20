(() => {
  console.log('loading script...: ', )
  const script = document.createElement('script');


  const timestamp = new Date().getTime();
  const scriptUrl = `http://mikefritzsche.local/public/scripts/home-worth-lead.js`;

  script.setAttribute('src', scriptUrl);
  script.setAttribute('async', '');


  script.onload = function handleScriptLoaded() {
    console.log('script has loaded');
  };

  script.onerror = function handleScriptError() {
    console.log('error loading script');
  };

  document.head.appendChild(script);
})()


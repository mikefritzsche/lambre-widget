(() => {
  // Define the namespace once at the top
  const namespace = 'rpr-avm-loading'; // Unique namespace for the loading styles

  injectLoadingCSS()
  showLoading()

  const allParams = getUrlParameters();
  console.log('All parameters:', allParams);

  // NODE_ENV=development&local=true&test=true&debug=true&should-send-lead=false&sandbox-mode=true
  // NODE_ENV=development&local=true&test=true&debug=true&should-send-lead=false&sandbox-mode=true
  // http://mikefritzsche.local/public/scripts/home-worth-test.js?cacheBreak=1738365231148&NODE_ENV=development&debug=true&should-send-lead=false&sandbox-mode=true&is-test=true&uuid=72d6801ba0197f275b79979dad2e9e330eafe591ad0dd5fffb22da9fe3ba20f9c4442dc47a5934e10c50d569220231da
  /*
  cacheBreak=1738365231148&
  NODE_ENV=development&
  debug=true&
  should-send-lead=false&
  sandbox-mode=true&
  is-test=true&
  uuid=72d6801ba0197f275b79979dad2e9e330eafe591ad0dd5fffb22da9fe3ba20f9c4442dc47a5934e10c50d569220231da
  */

  const script = document.createElement('script');

  const NODE_ENV = allParams.NODE_ENV ?? 'production'
  const debug = allParams.debug ?? false
  const shouldSendLead = allParams['should-send-lead'] ?? true
  const sandboxMode = allParams['sandbox-mode'] ?? false
  const local = allParams.local ?? false
  const isTest = allParams['is-test'] ?? false
  const cacheBreak = new Date().getTime();
  const baseUrl = local ? 'http://mikefritzsche.local' : 'https://mikefritzsche.com';

  // Lamb Real Estate
  const account = {
    uuid: '994136b371fec5b0b37ff2d642068d9e5b3ae42aa533381f358a25b5b6f5da671ac7534f00c0ad438ac4884ce8459266'
  }

  // owner
  const testAccount = {
    uuid: '72d6801ba0197f275b79979dad2e9e330eafe591ad0dd5fffb22da9fe3ba20f9c4442dc47a5934e10c50d569220231da'
  }
  const accountParams = isTest ? testAccount : account;
  const searchParams = {
    cacheBreak,
    NODE_ENV,
    debug,
    'should-send-lead': shouldSendLead,
    'sandbox-mode': sandboxMode,
    'is-test': isTest,
    ...accountParams,
  }

  console.log('searchParams: ', searchParams)

  const scriptUrl = `${baseUrl}/public/scripts/home-worth-test.js?${new URLSearchParams(searchParams).toString()}`;

  script.setAttribute('src', scriptUrl);
  script.setAttribute('async', '');

  script.onload = function handleScriptLoaded() {
    console.log('script has loaded');
    hideLoading()
  };

  script.onerror = function handleScriptError() {
    console.log('error loading script');
  };

  document.head.appendChild(script);
  function showLoading() {
    const loadingElement = document.createElement('div');
    loadingElement.className = namespace; // Apply the namespace class
    loadingElement.innerHTML = `
        <div class="spinner"></div>
        <p>Loading...</p>
    `;
    document.getElementById('rpr-avm-content').appendChild(loadingElement);
  }

  function hideLoading() {
    const loadingElement = document.querySelector(`.${namespace}`);
    if (loadingElement) {
      // Add the fade-out class to trigger the transition
      loadingElement.classList.add('fade-out');

      // Remove the loading element after the transition completes
      loadingElement.addEventListener('transitionend', () => {
        loadingElement.remove();
      }, { once: true });
    }
  }
// Function to inject CSS dynamically
  function injectLoadingCSS() {
    const css = `
        #rpr-avm-content {
            position: relative; /* Ensure the container is a positioning context */
            min-height: 100px; /* Set a minimum height to prevent jumping */
        }

        .${namespace} {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
            color: #333;
            opacity: 1;
            transition: opacity 0.5s ease;
            position: absolute; /* Position the loading element absolutely */
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white; /* Optional: Add a background to prevent content from showing through */
        }

        .${namespace}.fade-out {
            opacity: 0;
        }

        .${namespace} .spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-left-color: #09f;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: ${namespace}-spin 1s linear infinite;
        }

        @keyframes ${namespace}-spin {
            to {
                transform: rotate(360deg);
            }
        }

        .${namespace} p {
            margin-top: 10px;
            font-size: 16px;
        }
    `;

    const style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
  }

  function getUrlParameters() {
    const params = {};
    const searchParams = new URLSearchParams(window.location.search);

    for (const [key, value] of searchParams.entries()) {
      // Handle boolean values
      if (value.toLowerCase() === 'true') {
        params[key] = true;
      } else if (value.toLowerCase() === 'false') {
        params[key] = false;
      } else {
        params[key] = value;
      }
    }

    return params;
  }

})()


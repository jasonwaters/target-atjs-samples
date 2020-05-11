# Target Local execution mbox HTML sample

## Overview

For this sample, we first created a simple AB activity for the `demo-marketing-offer2` mbox.  It has two experiences, each with HTML offer content.

### Experience A
```html
<p class="lead">Experience A</p>
<img src="assets/demo-marketing-offer1-exp-A.png" class="rounded offer"/>
```
### Experience B

```html
<p class="lead">Experience B</p>
<img src="assets/demo-marketing-offer1-exp-B.png" class="rounded offer"/>
```

As you can see, each experience has an HTMl offer with a different text and image src.

When run, the page makes a getOffers call, requesting the `demo-marketing-offer2` mbox.  But at.js has been configured to use local execution mode to determine the outcome of the call rather than send a request to the target delivery API.

When the page is loaded in the browser, text and an image is shown at the top of the page.  This image comes from one of the two experiences in the activity defined above.  The target response is also shown on the page.

## Running the sample
1. Install dependencies: `npm i`
2. Start: `npm start`
3. Point a browser to http://127.0.0.1:3000


## How it works

This sample utilizes local execution mode to determine target experiences.  By default, at.js always makes a request to the target delivery API for each `getOffers` call.  But you can configure it to use local execution mode instead.  This mode downloads target activity rules on initialization.   The rules are then used to determine which experiences to return when `getOffers` is called, rather than make a request to the delivery API each time.

There are four main properties to keep in mind when using local execution mode:

| Name                      | Description                                                                         |
|---------------------------|-------------------------------------------------------------------------------------|
| executionMode             | The execution mode at.js will run in.  Can be `local`, `remote`, or `hybrid`. Defaults to `remote`      |
| artifactLocation          | This is a fully qualified url to the rules definition file that will be used to determine outcomes locally.  |
| artifactPayload           | A target decisioning JSON artifact. If specified, it is used instead of requesting one from a URL. |

```js
window.targetGlobalSettings = {
    executionMode: "local",
    artifactLocation: "assets/rules.json"
};

// at.js is loaded on the page and initialized 

// make getOffers requests
// adobe.target.getOffers(({...})
```


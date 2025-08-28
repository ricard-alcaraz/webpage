---
author: Ricard Alcaraz Mancebo
title: DanaBot Lab - CyberDefenders
tags:
  - CyberDefenders
  - Network Forensics
  - Threat Intelligence
languages:
  - wireshark
  - threatintel
image:
  url: https://cyberdefenders.org/media/terraform/DanaBot/DanaBot.webp
  alt: image of the lab
description: My notes solving the DanaBot Lab - CyberDefenders
pubDate: 2025-08-28T17:52:00.000+02:00
---
## Scenario
The SOC team has detected suspicious activity in the network traffic, revealing that a machine has been compromised. Sensitive company information has been stolen. Your task is to use Network Capture (PCAP) files and Threat Intelligence to investigate the incident and determine how the breach occurred.

## Documents Provided
- 205-DanaBot.pcap

## Q1: Which IP address was used by the attacker during the initial access?

First I took a look at some statistics to understand better what kind of access is the question talking about. At Statistics > Protocol Hierarchy we can have an idea of the most used protocols.

![statistics protocol](/images/danabot/q1-1.webp)

In this case TCP is the most used protocol in this capture, so maybe is talking about an access to a webpage or web application.

Without any query, just at the start we can see a DNS query and a DNS response, this might be useful, we can see that there is a response of a domain `portfolio.serveirc.com` and a IP related to it. Seems like a suspicious domain so we can check VirusTotal to see if its potentially malicious:

![virustotal analysis](/images/danabot/q1-2.webp)

And yes it is, also we can see that it a domain used by DanaBot.

Contiuning with the pcap we dont have to search more into it because we can see a `GET /login.php` seems that the victim tried to access the malicious domain, so this seems like the initial access, looking at the IP address involved which is the same related to the malicious domain we can have our answer.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    62.173.142.148
  </div>
</details>

## Q2: What is the name of the malicious file used for initial access?

Following the HTTP stream of the previous `GET /login.php` we can see the following:

![http stream](/images/danabot/q2.webp)

Looking at this we can already see that something curious, in the stream we see that the data is a javascript script. Anyways at the response header we can see the name of the malicious file.


<details>
  <summary>Click to reveal the answer</summary>
  <div>
    allegato_708.js
  </div>
</details>

## Q3: What is the SHA-256 hash of the malicious file used for initial access?

For this we need to download the file to obtain the hash, so be careful I recommend an isolated virtual machine or something just in case you execute some malicious code by mistake. So just calculate the hash and that's the answer.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    847b4ad90b1daba2d9117a8e05776f3f902dda593fb1252289538acf476c4268
  </div>
</details>

## Q4: Which process was used to execute the malicious file?

This one was more difficult, so here we have to take a look at the previous script, in the previous questions we already saw the content of the javascript, taking a closer look to it we can see that the script is obfuscated. I looked for a tool to deobfuscate, I found this one https://obf-io.deobfuscate.io/ which was helpful. 
Looking at the script deobfuscated we have to look for how does it executes, I looked for something like run or execute and I found this part:
```javascript
var _0x1e16b0 = WScript.CreateObject("Wscript.Shell");
_0x1e16b0.Run("rundll32.exe /B " + _0x44bdd9 + ",start", 0x0, true);
```
So now we have to search a bit about what is the process related to this object created and we will find the answer.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    wscript.exe
  </div>
</details>


## Q5: What is the file extension of the second malicious file utilized by the attacker?

For this question we have two options, we can still take a look at the deobfuscated code, and then try to follow the code, to see which is the second malicious was downloaded, or we can go back to wireshark and take a look to other files downloaded.

![wireshark query get](/images/danabot/q5.webp)

Searching for other HTTP GET requests we can get the answer, remember that is only asking for the extension.


<details>
  <summary>Click to reveal the answer</summary>
  <div>
    .dll
  </div>
</details>


## Q6: What is the MD5 hash of the second malicious file?

Finally we have to do again the same we did at **Q3** but for the second file and instead of SHA256 we have to use the hash MD5.


<details>
  <summary>Click to reveal the answer</summary>
  <div>
    e758e07113016aca55d9eda2b0ffeebe
  </div>
</details>

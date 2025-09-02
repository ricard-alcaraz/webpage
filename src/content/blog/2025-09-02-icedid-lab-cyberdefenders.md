---
author: Ricard Alcaraz Mancebo
title: IcedID Lab - CyberDefenders
tags:
  - Cybersecurity
  - Blue Team
  - CyberDefenders
  - Threat Intelligence
languages:
  - virustotal
image:
  url: https://cyberdefenders.org/media/terraform/IcedID/IcedID_4yYxbLQ.webp
  alt: Lab image
description: My notes solving IcedID Lab - CyberDefenders
pubDate: 2025-09-02T19:53:00.000+02:00
---
## Scenario

A cyber threat group was identified for initiating widespread phishing campaigns to distribute further malicious payloads. The most frequently encountered payloads were IcedID. You have been given a hash of an IcedID sample to analyze and monitor the activities of this advanced persistent threat (APT) group.

## Documents Provided
- hash.txt
```cmd
191eda0c539d284b29efe556abb05cd75a9077a0
```

## Q1: What is the name of the file associated with the given hash?
We have here a hash SHA-1 that as the scenario says that is from an IcedID sample, so first we can go to ![VirusTotal](https://www.virustotal.com/gui/home/upload) and search the given hash.

![virustotal analysis](/images/icedid-lab/q1.png)

As we already know this from a malicious file, looking at the `Details` tab we will find names asociated with this file, we have the hint that it contains a dash so its not hard to guess the name for the answer.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    document-1982481273.xlsm
  </div>
</details>

## Q2: Can you identify the filename of the GIF file that was deployed?
Now still at VirusTotal we can go to the `Relations` tab and it may contain relevant information to answer this question, in the `Contacted URLs` we can see the URLs that are called by this file, there we can find the filename of the GIF file that we are looking for.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    3003.gif
  </div>
</details>

## Q3: How many domains does the malware look to download the additional payload file in Q2?
For this question you just have to count how many times does the malicious file asks for this specific file that we have identified in the previous question.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    5
  </div>
</details>

## Q4: From the domains mentioned in Q3, a DNS registrar was predominantly used by the threat actor to host their harmful content, enabling the malware's functionality. Can you specify the Registrar INC?

Right now I think its a bit hard to do because things have changed, still I looked up all the domains that appear and then I guessed one that is common to use.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    namecheap
  </div>
</details>



## Q5: Could you specify the threat actor linked to the sample provided?
To obtain this I searched the name of the malware in MITRE ATT&CK and I looked up the groups related to this malware, there are two groups related to it, one uses more techniques than the other so I think its possible to guess because of the techniques that they use, such as hide encoded data for malware DLLs in a PNG, in this case is a GIF but it's quite similar, compared to the other one that doesn't anything like this.

![mitre icedid](/images/icedid-lab/q5.png)

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    GOLD CABIN
  </div>
</details>


## Q6: In the Execution phase, what function does the malware employ to fetch extra payloads onto the system?
For this one you have to search about the behaviour of the malware and try to find what is the function that it used to download these extra payloads. 
I have gone throught some websites to try to find it but most of the reports doesn't provide that much detail of the function used in the Execution phase. After some time I had to look at the hints to find a URL to tria.ge with the information about it...

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    URLDownloadToFileA
  </div>
</details>



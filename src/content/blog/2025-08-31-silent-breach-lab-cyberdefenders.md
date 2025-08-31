---
author: Ricard Alcaraz Mancebo
title: Silent Breach Lab - CyberDefenders
tags:
  - Digital Forensics
languages:
  - eztools
image:
  url: https://cyberdefenders.org/media/terraform/Silent%20Breach/Silent_Breach.webp
  alt: image of the lab
description: My notes solving Silent Breach Lab - CyberDefenders
pubDate: 2025-08-31T12:49:00.000+02:00
---
## Scenario
The IMF is hit by a cyber attack compromising sensitive data. Luther sends Ethan to retrieve crucial information from a compromised server. Despite warnings, Ethan downloads the intel, which later becomes unreadable. To recover it, he creates a forensic image and asks Benji for help in decoding the files.

## Documents Provided

- ethanPC.ad1

Resources:

- [Windows Mail Artifacts: Microsoft HxStore.hxd (email) Research](https://boncaldoforensics.wordpress.com/2018/12/09/microsoft-hxstore-hxd-email-research/)

## Q1: What is the MD5 hash of the potentially malicious EXE file the user downloaded?

First I took a look at the Resources link, take a a look at it its posible that it will be userful at some point of the lab. Then we will neet to use FTKImager to open the provided file `ethanPC.ad1`.
Then I started looking at the Downloads folder, as a starting point, and there we already can find something suspicious:

![]()

The file `IMF-Info.pdf.exe` seems suspicious to me, since it has a `.pdf` and a `.exe` that can confuse a victim and open it thinking its a `.pdf`. Then I used the option `Export File Hash List` right-clicking the file to provide me already the MD5 hash.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    336a7cf476ebc7548c93507339196abb
  </div>
</details>

## Q2: What is the URL from which the file was downloaded?

Clicking the suspicious file in the suspucious file, we can see that inside there is a `Zone.Identifier` this will provide us the information for this question.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    http://192.168.16.128:8000/IMF-Info.pdf.exe
  </div>
</details>

## Q3: What application did the user use to download this file?

So in this one there should be an easier way, but the way I did it was Downloading the `C:\Users\<username>\AppData\Local\ConnectedDevicesPlatform\0f17d47646a49d05\ActivitiesCache.db` and then use the EZ Tool `WxTCmd.exe` the reason is because I thought that I could find the program used looking to the date of the suspicious file and looking for some browser being open around that time, well looking at the `ActivitiesCache.db` I only saw one browser so I guessed that that was the one used.


<details>
  <summary>Click to reveal the answer</summary>
  <div>
    Microsoft Edge
  </div>
</details>


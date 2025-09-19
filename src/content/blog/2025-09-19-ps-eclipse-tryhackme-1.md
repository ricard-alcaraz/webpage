---
author: Ricard Alcaraz Mancebo
title: PS Eclipse - TryHackMe
tags:
  - Cybersecurity
  - Blue Team
  - TryHackMe
  - Digital Forensics
languages:
  - splunk
image:
  url: https://tryhackme-images.s3.amazonaws.com/user-avatars/83d369e0ec4156eef0b33faeed69346d.png
  alt: logo tryhackme
description: My notes solving PS Eclipse - TryHackMe
pubDate: 2025-09-19T20:25:00.000+02:00
---
## Scenario:
You are a SOC Analyst for an MSSP (Managed Security Service Provider) company called TryNotHackMe .

A customer sent an email asking for an analyst to investigate the events that occurred on Keegan's machine on Monday, May 16th, 2022 . The client noted that the machine is operational, but some files have a weird file extension. The client is worried that there was a ransomware attempt on Keegan's device. 

Your manager has tasked you to check the events in Splunk to determine what occurred in Keegan's device. 

## Documents Provided
- Splunk Instance

## Q1: A suspicious binary was downloaded to the endpoint. What was the name of the binary?
First of all lets open the splunk instance on the broeser, once there we have to go to `Search & Reporting`. And also we know the date range that we have to analyse so we can do that on the serach bar.
We dont know the index so we can start by doing a query using `*` and then see what index we have to investigate, which seems to be the index `main`.
Once there we can also check the available sources:

![]()

We are looking for a downloaded binary, so we can search by the sources that can provide us this information. In this case we have `Sysmon` so it seems like a good starting point.
What I did was search using this query:

```cmd
index="main" source="WinEventLog:Microsoft-Windows-Sysmon/Operational" EventCode=3 Message="*.exe*" | sort +_time
```
Looking for the sysmon event 3 (Network connection), and also `.exe` since we are looking for a bynary, and I saw that the field `Message` could contain more info related to a bynary, I think is also possible to use the field `Image` It would be more accurate.
Doing that search, and taking a look at the `Image` statistics I found a suspicious filename with the most events related, this was the answer.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    OUTSTANDING_GUTTER.exe
  </div>
</details>


## Q2: What is the address the binary was downloaded from? Add http:// to your answer & defang the URL.

For this one, I started looking for some DNS queries to see what domains where requested.
```cmd
index="main" "dns" | sort +_time
```
And then I took a look at the `QueryName` results to see if there was something suspicious, the first two results seemed suspicious so I did a query to see to which events are related.
However that didn't provide me more information to conclude which one was, so I invested more time in this by searching for the first process related to each of the query, and finally I found a 

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    hxxp[://]886e-181-215-214-32[.]ngrok[.]io
  </div>
</details>



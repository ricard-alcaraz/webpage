---
author: Ricard Alcaraz Mancebo
title: PS Eclipse - TryHackMe
tags:
  - Cybersecurity
  - Blue Team
  - TryHackMe
languages:
  - splunk
image:
  url: https://framerusercontent.com/images/wdVTdS3WyuB1DnRUmi35JNFVFY.jpg?width=900&height=900
  alt: tryhackme logo
description: My notes solving PS Eclipse - TryHackMe
pubDate: 2025-09-19T17:34:00.000+02:00
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
index="main" EventCode=3 Message="*.exe*" | sort +_time
```
Looking for the sysmon event 3 (Network connection), and also `.exe` since we are looking for a bynary.
Doing that search, and taking a look at the `Image` statistics I found a suspicious filename with the most events related, this was the answer.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    OUTSTANDING_GUTTER.exe
  </div>
</details>



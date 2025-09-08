---
author: Ricard Alcaraz Mancebo
title: Tempest - TryHackMe
image:
  url: https://assets.tryhackme.com/img/logo/tryhackme_logo_full.svg
  alt: tryhackme
description: My notes solving Tempest - TryHackMe
pubDate: 2025-09-08T19:44:00.000+02:00
---
## Scenario
This room aims to introduce the process of analysing endpoint and network logs from a compromised asset. Given the artefacts, we will aim to uncover the incident from the Tempest machine. In this scenario, you will be tasked to be one of the Incident Responders that will focus on handling and analysing the captured artefacts of a compromised machine.

## Documents Provided
- capture.pcap
- sysmon.evtx
- windows.evtx

## Task 3
In this task we are asked to obtain the SHA256 of each file that we wull use for this investigation. The information we need to do it is already on the task, we will use Powershell to obtain the hashes.

```powershell
 Get-FileHash -Algorithm SHA256 [filename]
```

Also as the tasks says I will create the parsed csv of the event log sysmon as the task suggests. I will use the following command:

```
.\EvtxECmd.exe -f "C:\Users\user\Desktop\Incident Files\sysmon.evtx" --csv "C:\Users\user\Desktop\Incident Files\out"
```

### Q1: What is the SHA256 hash of the capture.pcapng file?

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    CB3A1E6ACFB246F256FBFEFDB6F494941AA30A5A7C3F5258C3E63CFA27A23DC6
  </div>
</details>

### Q2: What is the SHA256 hash of the sysmon.evtx file?

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    665DC3519C2C235188201B5A8594FEA205C3BCBC75193363B87D2837ACA3C91F
  </div>
</details>

### Q3: What is the SHA256 hash of the windows.evtx file?

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    D0279D5292BC5B25595115032820C978838678F4333B725998CFE9253E186D60
  </div>
</details>

## Task 4
This challenge has a guideline all along so it makes it easier for people stating on these kind of analysis, such as me! This makes it easier and provides you a path to follow that you can later put in practice in other scenarios.
So following this I will open `Timeline Explorer` to open the sysmon log as suggested.

![]()

### Q4: The user of this machine was compromised by a malicious document. What is the file name of the document?

In the description of the task we have a clue, that we should investigate child processes of WinWord.exe, this question Its more related to the executable itself. Its the first time using this viewer and maybe there is something Im missing but right now Im not liking it much.
So what I did was search for the name of the file in the search bar, and then identify its process ID, to again search for it. In this case since its the begining it could be related to a Process Creation, or in sysmon Event ID 1.
Searching a little bit we will find the name of the file.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    free_magicules.doc
  </div>
</details>

#### Q5: What is the name of the compromised user and machine?

We can find this information in the same event we found, care with the format to answer the question.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    benimaru-TEMPEST
  </div>
</details>

#### Q6: What is the PID of the Microsoft Word process that opened the malicious document?

This also we found it when I started looking for the file, so we already have it.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    496
  </div>
</details>

##### Q7: Based on Sysmon logs, what is the IPv4 address resolved by the malicious domain used in the previous question?

Now, still searching for the process ID 496, we can look what `Map Description` does contain a `DNS Event (DNS query)`. Following the event of the previous document we can find two, one named `ecs.office.com` and the other `phishteam.xyz`, we can see that one of these is already suspicious by the name and the TLD, if we investigate the event of the suspicious event we will find the answer.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    167.71.199.191
  </div>
</details>


#### Q8: What is the base64 encoded string in the malicious payload executed by the document?

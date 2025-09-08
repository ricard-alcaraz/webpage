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

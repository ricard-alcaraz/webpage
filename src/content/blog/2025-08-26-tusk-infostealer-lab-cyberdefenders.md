---
author: Ricard Alcaraz
title: Tusk Infostealer Lab - CyberDefenders
tags:
  - Cybersecurity
  - Blue Team
  - CyberDefenders
  - Threat Intelligence
languages:
  - threatintel
image:
  url: https://cyberdefenders.org/media/terraform/Tusk%20Infostealer/Tusk_Infostealer.webp
  alt: tusk-infostealer-lab
description: "My notes about Tusk Infostealer Lab - CyberDefenders"
pubDate: 2025-08-26T20:52:00.000+02:00
heroImage: https://cyberdefenders.org/media/terraform/Tusk%20Infostealer/Tusk_Infostealer.webp
---
## Scenario
A blockchain development company detected unusual activity when an employee was redirected to an unfamiliar website while accessing a DAO management platform. Soon after, multiple cryptocurrency wallets linked to the organization were drained. Investigators suspect a malicious tool was used to steal credentials and exfiltrate funds.
Your task is to analyze the provided intelligence to uncover the attack methods, identify indicators of compromise, and track the threat actor’s infrastructure.


## Documents Provided

a TXT file: `hash.txt`

**Content:**

```markdown 
MD5: E5B8B2CF5B244500B22B665C87C11767
```

## Q1: In KB, what is the size of the malicious file?
Looking at the content of the hash.txt we can see a MD5 Hash, I’m using VirusTotal to search more about this hash.
 ![pcap provided](/images/tusk-infostealer-lab/Picture1.webp)
Here we can see many information related to the hash of the malware file, one of the information is the file size:
 ![pcap provided](/images/tusk-infostealer-lab/Picture2.webp)

**Answer:**

`921.36`

## Q2: What word do the threat actors use in log messages to describe their victims, based on the name of an ancient hunted creature?
This one honestly I guessed from the first letter M, because I didn’t know. 
I have found that the term “mammoth” seems to be used frequently by Russian cybercriminal groups to refer to their victims. Furthermore, I that this is because the code for this campaign was “Tusk” that is the name of one of the tooth types that a mammoth had 🦣.

**Answer:**

`Mammoth`

## Q3: The threat actor set up a malicious website to mimic a platform designed for creating and managing decentralized autonomous organizations (DAOs) on the MultiversX blockchain (peerme.io). What is the name of the malicious website the attacker created to simulate this platform?

Here the information we have is the hash of the malware and now the name of the blockchain and its address. With this information I didn’t know how to approach it so I searched a little bit on the internet, and I found this page *https://rewterz.com/threat-advisory/russian-threat-actors-deploy-fake-brand-websites-to-distribute-danabot-and-stealc-malware-active-iocs* that gets information from this report *https://securelist.com/tusk-infostealers-campaign/113367/* where they tell us more information about this campaign, one of the things is the domain: `tidyme[.]io`
Also, in VirusTotal there is a comment in the community section with the url in it.
I want to talk about the hints in this question, it tell us about looking for something similar, I assumed typosquatting, because the hint talks about slight variations, honestly, I don’t see the similarities between tidy and peer, but maybe is because English is not my first language, contact me if there is something I’m missing here.

**Answer (Defanged URL):**

`tidyme[.]io`

## Q4: Which cloud storage service did the campaign operators use to host malware samples for both macOS and Windows OS versions?
Looking at the report *https://securelist.com/tusk-infostealers-campaign/113367/* we can also see which cloud storage service they used. They found that they had several malwares for macOS and Windows hosted on Dropbox. Additionally, the campaign needed the victims to connect their crypto wallet directly through the malicious website.

**Answer:**

`Dropbox`

## Q5: The malicious executable contains a configuration file that includes base64-encoded URLs and a password used for archived data decompression, enabling the download of second-stage payloads. What is the password for decompression found in this configuration file?

In the same report we can see the password used for archived data decompression. Obtained from the initial downloader TidyMe.exe, that contained a configuration file containing base64-encoded URLs and a password. Go to the report to check the full content of the file.

**Answer:**

`newfile2024`

## Q6: What is the name of the function responsible for retrieving the field archive from the configuration file?

The report takes a deep dive into all this campaign which is interesting, you can just read and you will find all the answers here. Here they explain that the main downloader functionality contains two functions `downloadAndExtractArchive` and `loadFile`. The function `downloadAndExtractArchive` is the one that retrieves the field `archive` from the configuration file.

**Answer:**

`downloadAndExtractArchive`

## Q7: In the third sub-campaign carried out by the operators, the attacker mimicked an AI translator project. What is the name of the legitimate translator, and what is the name of the malicious translator created by the attackers?
The same article investigates more sub-campaigns, the second one being a website of an MMO game, check it out!
The third one is the one for this question, in this case they say that they created a malicious website with the name of `voico[.]io` copying the original website of `yous.ai`.

**Answer(Defanged URL):**

`yous.ai, voico[.]io`

## Q8: The downloader is tasked with delivering additional malware samples to the victim’s machine, primarily infostealers like StealC and Danabot. What are the IP addresses of the StealC C2 servers used in the campaign?

At the end of the report, we can see the Network IoCs of these campaigns, there we will find both IP addresses of the StealC C2 Servers.

**Answer(Defanged IP):**

`46[.]8[.]238[.]240, 23[.]94[.]225[.]177`

## Q9: What is the address of the Ethereum cryptocurrency wallet used in this campaign?

Finally at the end of the report we can see the ETH address used in this campaign.

**Answer:**

`0xaf0362e215Ff4e004F30e785e822F7E20b99723A`


## Notes:
I found really interesting this report, it was really nice and it well explained the campaigns. It was very interesting to read! check it out: *https://securelist.com/tusk-infostealers-campaign/113367/*

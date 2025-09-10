---
author: Ricard Alcaraz Mancebo
title: Boogeyman 1 - TryHackMe
tags:
  - Cybersecurity
  - Blue Team
languages:
  - wireshark
image:
  url: https://tryhackme-images.s3.amazonaws.com/user-avatars/af7feb2c43a2c7d5f111b98ccbd15048.png
  alt: image
description: My notes solving Boogeyman 1 - TryHackMe
pubDate: 2025-09-10T20:22:00.000+02:00
---
## Scenario

Julianne, a finance employee working for Quick Logistics LLC, received a follow-up email regarding an unpaid invoice from their business partner, B Packaging Inc. Unbeknownst to her, the attached document was malicious and compromised her workstation.

The security team was able to flag the suspicious execution of the attachment, in addition to the phishing reports received from the other finance department employees, making it seem to be a targeted attack on the finance team. Upon checking the latest trends, the initial TTP used for the malicious attachment is attributed to the new threat group named Boogeyman, known for targeting the logistics sector.

You are tasked to analyse and assess the impact of the compromise.

## Documents Provided

## Task 2

### Q1: What is the email address used to send the phishing email?

We need to analyze an email, with the name `dump.eml` I will open it using Thunderbird, for the analysis. To find the email adress that send the email we have to take a look at the header of the mail and find `From`.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    agriffin@bpakcaging.xyz
  </div>
</details>

### Q2: What is the email address of the victim?

Still loking at the header, we should search for `To` to find the victim that received the email.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    julianne.westcott@hotmail.com
  </div>
</details>

### Q3: What is the name of the third-party mail relay service used by the attacker based on the DKIM-Signature and List-Unsubscribe headers?

Now we shoud check the message source to look for this information, you can see going to `View > Message Source` or use `Ctrl+U` in `Thunderbird`. There we have to search for the DKIM-Signature, and once there see if we can find a third-party mail relay. We can search the domain to see if its a possible mail relay if we dont know.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    elasticemail
  </div>
</details>

### Q4: What is the name of the file inside the encrypted attachment?

Now the task asks us to download the attachment, which is a .zip file, and then unzip it to obtain the file inside. The zip its encrypted but in the mail we have the password, once we do it we will obtain the name of the file.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    Invoice_20230103.lnk
  </div>
</details>




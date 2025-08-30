---
author: Ricard Alcaraz Mancebo
title: Unattended - THM
tags:
  - TryHackMe
  - Incident Response
  - Digital Forensics
languages:
  - eztools
  - autopsy
image:
  url: https://ricard-alcaraz.com/images/unattended-thm/main.webp
  alt: main image
description: My notes solving Unattended Lab - TryHackMe
pubDate: 2025-08-30T18:21:00.000+02:00
---
## Scenario
Welcome to the team, kid. I have something for you to get your feet wet.
Our client has a newly hired employee who saw a suspicious-looking janitor exiting his office as he was about to return from lunch.

I want you to investigate if there was user activity while the user was away between `12:05 PM` to `12:45 PM` on the `19th of November 2022`. If there are, figure out what files were accessed and exfiltrated externally.

You'll be accessing a live system, but use the disk image already exported to the `C:\Users\THM-RFedora\Desktop\kape-results\C` directory for your investigation. The link to the tools that you'll need is in `C:\Users\THM-RFedora\Desktop\tools`

Finally, I want to remind you that you signed an NDA, so avoid viewing any files classified as top secret. I don't want us to get into trouble.

## Task 3

### Q1: What file type was searched for using the search bar in Windows Explorer?
First I will opean a cmd as administrator and I will go to the tools directory, just to have it already open:

![cmd console](/images/unattended-thm/q1-1.webp)

Now, we are asked about the file type searched using the search bar in windows explorer, so in this case we should take a look at the Windows Registry, for this we can use the EZ tool RegistryExplorer that we have already on the machine. And we have to load the NTUSER.DAT that we will find in the kape-result folder: `kape-result\C\Users\THM-RFedora\NTUSER.DAT` follow the intructions to have a clean hive and thats all. Here we have to go to the path where the information of the search bar is located: `NTUSER.DAT\Software\Microsoft\Windows\CurrentVersion\Explorer\WordWheelQuery` and we will find 3 registries:

![RegistryExplorer](/images/unattended-thm/q1-2.webp)

Looking into the second registry we will find the answer.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    .pdf
  </div>
</details>

### Q2: What top-secret keyword was searched for using the search bar in Windows Explorer?
We are already in the correct place to search this information, the third registry we will give us the correct answer.


<details>
  <summary>Click to reveal the answer</summary>
  <div>
    continental
  </div>
</details>


## Task 4

### Q3: What is the name of the downloaded file to the Downloads folder?

The lab already give us the hint that we may need the tool Autopsy and load the module `Recent Activity`, so lets open it. Now I created a New Case, and I used the option `Logical Files` to load the entire C directory inside the kape-results.
Now on the left we will look for `Web Downloads`:

![Web Downloads artifacts](/images/unattended-thm/q3.webp)

Then we can find the downloaded file, search for the first downloaded file between the date range that they provided us in the Scenario.


<details>
  <summary>Click to reveal the answer</summary>
  <div>
    7z2201-x64.exe
  </div>
</details>

### Q4: When was the file from the previous question downloaded? (YYYY-MM-DD HH:MM:SS UTC)

We can solve it from what we have from the previous question.


<details>
  <summary>Click to reveal the answer</summary>
  <div>
    2022-11-19 12:09:19 UTC
  </div>
</details>

### Q5: Thanks to the previously downloaded file, a PNG file was opened. When was this file opened? (YYYY-MM-DD HH:MM:SS)

First I looked up into Autopsy on the `Recent Documents` to see if there were some information about it, and there was nothing.
So I had to open again the RegistryExplorer with the NTUSER hive, and then go to the path `NTUSER.DAT\Software\Microsoft\Windows\CurrentVersion\Explorer\RecentDocs`, here we know the extension of the file, which is the `.png`. if we open up the `RecentDocs` folder we can search for extension, once we have it located we can take a look and see that there is only one registry, which is the `continental.png`, there is no information of the date with the registry, but since its the most recent one (and only) we can take a look at the `Last write timestamp` for the `.png` folder, and there we will find the answer.

![RegistryExplorer png](/images/unattended-thm/q5.webp)

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    2022-11-19 12:10:21
  </div>
</details>

## Task 5

### Q6: A text file was created in the Desktop folder. How many times was this file opened?
Now we will use the EZ Tool JLECmd.exe, using the command 
```
JLECmd.exe -d C:\Users\THM-RFedora\Desktop\kape-results\C\Users\THM-RFedora\AppData\Roaming\Microsoft\Windows\Recent\AutomaticDestinations\
```
We will obtain the information we need, we just have to search a bit for the `.txt`.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    2
  </div>
</details>


### Q7: When was the text file from the previous question last modified? (MM/DD/YYYY HH:MM)
Similarly to **Q5** we can obtain the information searching for the extension `.txt`

![RegistryExplorer txt](/images/unattended-thm/q7.webp)

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    11/19/2022 12:12
  </div>
</details>

### Q8: The contents of the file were exfiltrated to pastebin.com. What is the generated URL of the exfiltrated data?

Here we have to go back to Autopsy, and then take a look at the Web History Artifact.

![Web History Arrtifacts](/images/unattended-thm/q8.webp)

Here we can find it in between the date range provided, and also we can use the search bar to find something related to pastebin, and we will find the answer.


<details>
  <summary>Click to reveal the answer</summary>
  <div>
    https://pastebin.com/1FQASAav
  </div>
</details>

### Q9: What is the string that was copied to the pastebin URL?

We just have to access to the pastebin URL from the previous question and we will find the answer.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    ne7AIRhi3PdESy9RnOrN
  </div>
</details>


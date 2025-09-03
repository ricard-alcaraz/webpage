---
author: Ricard Alcaraz Mancebo
title: WhyFind - Hack The Box
tags:
  - Blue Team
  - Cybersecurity
  - Hack The Box
languages:
  - autopsy
image:
  url: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhs6oJRGZG2suzcDhW-iLWdYaMwJw3rllNyQ&s
  alt: hackthebox
description: My notes solving WhyFind - Hack The Box
pubDate: 2025-09-03T18:57:00.000+02:00
---
## Scenario
We have been hot on the trail for a political dissident. They jump from café to café using the Wi-Fi making it hard to nab them. During one of their trips, they unknowingly sat next to one of our agents and we captured them with their laptop on. We need to know where they have been and what they have been doing. Analyze the KAPE output and see if you can get us some answers.

## Documents Provided
- KAPEOUT.zip

## Q1: What is the Computer name of the machine?

First I opened Autopsy to analyze this KAPE output, it will provide us a easy way to look at this KAPE output. So we create a new case and select the `C/` folder inside the extraction provided.
Then Autopsy will identify some `Data Artifacts` one of these is `Operating System Information`:

![]()

This will give us the information we need to answer the question.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    InvisibleChains
  </div>
</details>

## Q2: What is the first Wi-Fi SSID(Decoded) they connected to on May 30th 2025?

Now we have to go to another artifact, in this case `Wireless Networks`:

![]()

We will find 3 networks, it asks for the first one but checking the time all 3 have the same timestamp, so I just picked up the first one.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    ArboretumCoffee
  </div>
</details>

## Q3: When did the system obtain a lease for the network?
For this one we have to investigate a little bit more deep so I just used RegistryExplorer, and then loaded the SYSTEM hive.
Here we have to look for the DHCP lease information related to that network from previous question. for this we have to go to this path:
```cmd
SYSTEM\ControlSet001\Services\Tcpip\Parameters\Interfaces\{18c11dbd-93ab-4ca9-a804-4f4475da25b8}\
```

Then we will find 3 folders, the same number as the Networks we found, then I noticed that Autopsy maybe was not giving the correct time for the network, instead the device timestamp, we can see the `Last write timestamp` and then we choose the first one.

![]()

There we can see the parameter `LeaseObtainedTime`. right-clicking the value and then the `Data Interpreter` we can obtain the time format to answer the question.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    2025-05-30 18:22:48
  </div>
</details>


## Q4: What IP address did the device receive when connecting to the café?

We are already at the correct place from last question, we just have to look at the `DhcpIPAddress` and we will find the answer.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    172.16.100.16
  </div>
</details>

## Q5: 

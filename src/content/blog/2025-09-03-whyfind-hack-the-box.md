---
author: Ricard Alcaraz Mancebo
title: WhyFind - Hack The Box
tags:
  - Blue Team
  - Cybersecurity
  - Hack The Box
languages:
  - autopsy
  - eztools
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

## Q5: What was the BSSID (MAC address) of the access point they connected to at the café?

Here we have to got to load the `SOFTWARE` hive, and we have to locate the path 
```cmd
SOFTWARE\Microsoft\Windows NT\CurrentVersion\NetworkList\Signatures\Unmanaged
```
Once there we will find some folders, one of them is the access point. At first I didnt consider the `access point` part and just thought about the network, once the answer was wrong I found that there is a similar name of the network but adding a `2`, this is the one we are looking for.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    E4-D1-24-96-A5-D1
  </div>
</details>

## Q6: It looks like they started some sort of manifesto at the café, what is the name of the file they started to write?

In Autopsy we can load the case with the module `Recent Documents` once there we can find the name of the file that can fit as a title of a manifesto.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    The Chains Not Seen.txt
  </div>
</details>


## Q7: What is the last sentence of the manifesto?

For this one there are some places where we can check if there is more information about it, from previous question I noticed that it was inside the `OneDrive` folder so we can check if there is something around, but its not the case.
Searching a bit we can try with the `$MFT` file, there are some parsers around, but i just opened it raw and then searched for the name of the file. Just below the name of the file we can find the answer.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    Freedom is a perspective away.
  </div>
</details>

## Q8: They started their research by watching a YouTube video of a speech, what is the name of the speech?

Now we should look for the logs of the browsers available, in this case there are two browsers I will start analyzing Microsoft Edge. We can see the information about the History in:
```cmd
C/Users/Ernes/AppData/Local/Microsoft/Edge/User Data/Default/History
```
And now we can just follow the timeline of events.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    The Ballot or the Bullet
  </div>
</details>


## Q9: They continued their research by looking up a book on Wikipedia, what was the title of the book?

We are already at the correct place, just follow the search history.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    The Iron Heel
  </div>
</details>

## Q10: What was the last thing they downloaded before leaving the café?

Following the history we can see that at the end they downloaded the other browser, the setup `.exe` of this browser is the answer to the question.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    BraveBrowserSetup.exe
  </div>
</details>

## Q11: When investigating changes to network profiles on a Windows system, which event log would you examine to find entries related to these profile-specific events, using event IDs such as 10000 or 10001?

This is more like a thoerical question, so you just have to search about the name of the event logs related to network and you may find the answer.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    Microsoft-Windows-NetworkProfile/Operational
  </div>
</details>

## Q12: Using the logs from the previous answer, when did they disconnect and leave the first café?

Now we have to look at the event log from previous question, its located at:
```cmd
C:\Windows\System32\winevt\Logs\{Name of the log from previous question}
```

I exported it and then I opened it with the event viewer of windows, choose the way you want to view the logs.

There we can find when they disconnected from the first café, we already know the name of the access point that they where conected so we have to look for a disconnection of that network. **Care with the time location** use the system time that you can find in details.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    2025-05-30 18:55:45
  </div>
</details>

## Q13: Using the same logs, when did the user arrive at the second café?

Similar to the previous question, but now search a connection to a new network.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    2025-05-30 19:05:26
  </div>
</details>

## Q14: What is the SSID(decoded) of the second Wi-Fi they connected to on May 30th 2025?

Here considering we obtained the last question we already know this information.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    Happy Trails Guest
  </div>
</details>

## Q15: What IP address did the device receive when connecting to the second café?




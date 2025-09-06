---
author: Ricard Alcaraz Mancebo
title: GetPDF Lab - CyberDefenders
tags:
  - Cybersecurity
  - Blue Team
  - CyberDefenders
  - Network Forensics
  - Malware Analysis
languages:
  - wireshark
  - cyberchef
image:
  url: https://cyberdefenders.org/media/terraform/GetPDF/GetPDF.webp
  alt: Lab image
description: My notes solving GetPDF Lab - CyberDefenders
pubDate: 2025-09-06T11:33:00.000+02:00
---
## Scenario

PDF format is the de-facto standard in exchanging documents online. Such popularity, however, has also attracted cyber criminals in spreading malware to unsuspecting users. The ability to generate malicious pdf files to distribute malware is a functionality that has been built into many exploit kits. As users are less cautious about opening PDF files, the malicious PDF file has become quite a successful attack vector.
The network traffic is captured in lala.pcap contains network traffic related to a typical malicious PDF file attack, in which an unsuspecting user opens a compromised web page, which redirects the user’s web browser to a URL of a malicious PDF file. As the PDF plug-in of the browser opens the PDF, the unpatched version of Adobe Acrobat Reader is exploited and, as a result, downloads and silently installs malware on the user’s machine.

As a soc analyst, analyze the PDF and answer the questions.

Supportive resources:

- [PDF format structure](https://resources.infosecinstitute.com/topic/pdf-file-format-basic-structure/)
- [Portable document format](https://web.archive.org/web/20220113130243/https://www.adobe.com/content/dam/acom/en/devnet/pdf/pdfs/PDF32000_2008.pdf)

## Documents Provided

- lala.pcap

## Q1: How many URL path(s) are involved in this incident?

To answer this one we can use `Wireshark`, in fact I will use this tool to analyze all the network traffic for all the questions, they are asking for the URL paths involved, to archive this we can apply a filter to obtaing the GET resquests, this way we can see the different paths accessed by the victim 
```cmd
http.request.method==GET
```
Now we just have to count all the unique paths we can see, consider that if it ends with `/` or no its a different resource, so its a different path.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    6
  </div>
</details>

## Q2: What is the URL which contains the JS code?

Now that we know the URL paths involved we can start analyzing them, doing it cronologically will help us solve it faster. Analyzing one of the response, using `Follow>HTTP` we can see that the response contains an html with a script tag that contains JS code, this is the one we are looking for.

![image of a http stream](/images/getpdf-lab/q2.png)

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    http://blog.honeynet.org.my/forensic_challenge/
  </div>
</details>

## Q3: What is the URL hidden in the JS code?

The JS code from previous question is obfuscated so we have to find a way to find what is it about, the key variable here is `ZeJexn` in a safe environment we can execute the code logging the result of this variable, do it in a safe way also removing the last command that seems to execute something, just in case. And we will obtain the answer. Also we can guess which one is the url if we follow the next requests registered in the network pcap.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    http://blog.honeynet.org.my/forensic_challenge/getpdf.php
  </div>
</details>

## Q4: What is the MD5 hash of the PDF file contained in the packet?

Now we have to locate the `.pdf` file, still in a safe environment we can extract the pdf and then obtain it's MD5 hash.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    659CF4C6BAA87B082227540047538C2A
  </div>
</details>


## Q5: How many object(s) are contained inside the PDF file?

For this one I will use the tool `pdfid.py`, and then analyze the file with it. it will give you some info, in this case qe are interested in the value of `obj`.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    19
  </div>
</details>


## Q6: How many filtering schemes are used for the object streams?

Here we can analyze it through the HTTP stream, and we will see the value `Filter` at some point for different objects, followed by some options, these options are the filters applied, we just have to count them.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    4
  </div>
</details>

## Q7: What is the number of the 'object stream' that might contain malicious JS code?

Still analyzing the stream of the `.pdf` we can look for the option `/JavaScript /JS` and we will find to which objets are applied, we already saw with the pdfid that there is one using these options.  We can also use the tool `PDF Stream Dumper` and check the object we saw, and we will find the Javascript code:

```javascript
var SSS=null;var SS="ev";var $S="";$5="in";app.doc.syncAnnotScan();S$="ti";if(app.plugIns.length!=0){var $$=0;S$+="tl";$5+="fo";____SSS=app.doc.getAnnots({nPage:0});S$+="e";$S=this.info.title;}var S5="";if(app.plugIns.length>3){SS+="a";var arr=$S.split(/U_155bf62c9aU_7917ab39/);for(var $=1;$<arr.length;$++){S5+=String.fromCharCode("0x"+arr[$]);}SS+="l";}if(app.plugIns.length>=2){app[SS](S5);}
```

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    5
  </div>
</details>


## Q8: Analyzing the PDF file. What 'object-streams' contain the JS code responsible for executing the shellcodes? The JS code is divided into two streams. Format: two numbers separated with ','. Put the numbers in ascending order

This one requires more investigation, I will start by looking at the JS code.
We can see that there its scanning the annotations and also obtaining something from there, also I noticed a split of a curious string: 
```javascript
arr=$S.split(/U_155bf62c9aU_7917ab39/)
```

having that we can take a look at the annotations and also keep in mind this string in case we find it.

In **Object 3** we can find this related to the annotations:
```
/Type /Page /MediaBox [ 0 0 612 792 ] /Annots [ 6 0 R 8 0 R ] /Parent 2 0 R
```
Its pointing at **object 6** and **object 8**, so we can take a look at them.
**Object 6** contains:
```
/Type /Annot /Subtype /Text /Name /Comment /Rect [ 200 250 300 320 ] /Subj 7 0 R
```
Which is pointing to **object 7**, so lets take a look at it. 
**Object 7** contains a long string, but doesn't seem related to the one in the JS code, but still its interesting to keep in mind, lets look at **object 8**.
**object 8** contains:
```
/Type /Annot /Subtype /Text /Name /Comment /Rect [100 180 300 210 ] /Subj 9 0 R
```
Its pointing at **object 9**.
And **object 9** also contains a long string, but different from **object 7**, its interesting to keep in mind but still doesnt match the one in the JS code. So I dont see someting interesting from here. 
Lets take a look at other objects, checking **object 10** we can find the matching string of the JS code.
Great, now that we have the object use to split that string we can do it, I will use CyberChef. First I will remove the string `U_155bf62c9aU_7917ab39` doing a replace to nothing, and then I will check the resultant string in CyberChef.
One thing I like about CyberChef is the magic wand, so the output removing that string turns out to be in hexdecimal, now we can decode it from hex in Cyberchef:

![question8](/images/getpdf-lab/q8.png)

We have obtained this code if we organize it a bit:
```javascript
____SS=1;
____$5=____SSS[____SS].subject
;____$S=0
;____$=____$5.replace(/X_17844743X_170987743/g,"%");
____S5=____SSS[____$S].subject;
____$+=____S5.replace(/89af50d/g,"%");
____$=____$.replace(/\n/,"");
____$=____$.replace(/\r/,"");
____S$=unescape(____$);
app.eval(____S$);
```

And we can see something familiar, there are two other strings to replace, and we have seen these string in other objects. Do the same proces but replacing the string with `%` as the code says, and you will find the result of them, CyberChef with help if you dont know the recipe. And you will find the answer, we can already guess from the two long string object that we found.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    7,9
  </div>
</details>

## Q9: The JS code responsible for executing the exploit contains shellcodes that drop malicious executable files. What is the full path of malicious executable files after being dropped by the malware on the victim machine?

Now we have the full JS code concatenating the decoded result of both objects.
In the code we have some comments about different executables, seems to refer to different payloads, these are:
- calc.exe
- freecell.exe
- notepad.exe
- cmd.exe

I don't see any way of finding the answer, so I think we have to debug the code, the tool `PDFStreamDumper` offer some shellcode analysis, I will use scDbg for it. 

![question 9](/images/getpdf-lab/q9.png)

We can select any of the first 3 indexes to execute, after executing it we will find the path of the malicious executable dropped.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    c:\WINDOWS\system32\a.exe
  </div>
</details>

## Q10: The PDF file contains another exploit related to CVE-2010-0188. What is the URL of the malicious executable that the shellcode associated with this exploit drop?

For this one I just went back to Wireshark and I filtered again for GET requests, I remember there was an executable obtained, so I just tried with this one and it was the answer.
To do it properly we should research a bit about the exploit CVE-2010-0188, which is a vulnerability related to Adobe Reader that causes a denial of service of the application also it possibly can execute arbitrary code.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    http://blog.honeynet.org.my/forensic_challenge/the_real_malware.exe
  </div>
</details>

## Q11: How many CVEs are included in the PDF file?

To answer this the tool `PDFStreamDumper` helps us, if we run `Exploits_Scan` on the PDF it will give us how many it has found, then if we open the `Javascript_UI` and the we paste the decoded JS Code, and run `Exploit_Scan` it will give us the ones related to the JS Code, now we add up both results and we obtain the number of CVEs, it also give use the name of each in case we want to investigate further.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    5
  </div>
</details>


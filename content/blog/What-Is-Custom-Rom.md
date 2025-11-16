---
title: 'What is Custom Rom?'
date: '2025-11-16'
author: 'Danial Nasr'
description: 'This post is about Custom ROMs and how to install them after unlocking the bootloader.'
tags: ['Mobile OS', 'AOSP']
readingTime: '7 min read'
published: true
featured: false
---
A Custom ROM is essentially a modified version of the Android operating system (or in some cases, other systems such as Linux) that is developed by independent developers or open-source communities. It replaces the Stock ROM, which is the official system pre-installed by the phone manufacturer.  

---

## What is a Bootloader?
**Every smart device has a software component called the Bootloader.**  
- The Bootloader is the first program that runs when the device is powered on.  
- Its role is to initialize the hardware and then load the main operating system.  
- In simple terms, the Bootloader acts as a bridge between the hardware and the operating system.  

On smartphones, the Bootloader is usually locked to prevent users from modifying the system directly. This lock is intended to maintain security and prevent unauthorized software installation. However, in most brands, the Bootloader can be unlocked.  
___
## Main Components of a Smartphone
Smartphones can be divided into three main parts:  
- **Fastboot:** A low-level mode that allows direct communication with the phone’s partitions via a computer.  
- **Recovery:** An independent environment separate from Android, used for system maintenance, resetting, or installing updates.  
- **System (Operating System):** The Android or other ROM that the user interacts with daily.  

When the Bootloader is unlocked, the user gains full access to Fastboot and Recovery, which makes it possible to modify or replace the operating system.  

---

## Installing a Custom ROM
There are two main methods to install a Custom ROM:  
- **Via Fastboot**: The phone is connected to a computer, and multiple partition files are flashed using command-line instructions. This method is complex and requires precision.  
- **Via Recovery**: The simpler and more common method. After installing a custom recovery (such as TWRP), the user can flash a ZIP file of the ROM directly from the recovery environment. This avoids the need for numerous commands and computer connections.  

---

## What is Recovery?
Recovery is a standalone environment separate from Android that has full access to the system.  
- When performing a factory reset or system update, the phone enters this environment.  
- By installing a custom recovery, users gain advanced features such as flashing non-official ROMs, creating full backups, clearing caches, and managing partitions.  

---

## Advantages of Installing a Custom ROM
- Extended and often unlimited updates, even for older devices.  
- Access to new Android features or unique functions developed by the community.  
- Greater customization of the user interface and system settings.  
- In some cases, improved performance and battery efficiency compared to the Stock ROM.  
- Freedom to experiment with different versions of Android or even other operating systems.  

---

## Important Notes and Risks
- Unlocking the Bootloader may void the device warranty.  
- Incorrect installation of a ROM can lead to a bricked device (rendered unusable).  
- Certain security features, such as Widevine L1 or banking apps, may stop working after installing a Custom ROM.  
- ROMs should always be downloaded from trusted sources, and users should back up their data before installation.
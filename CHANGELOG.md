# Version 1.0 - Release Notes & Updates

This document summarizes all the foundational optimizations, features, and fixes that finalized Version 1 of the portfolio. 

## 1. Mobile & Performance Optimizations
* **Dynamic 3D Models:** Optimized the heavy Spline 3D background rendering. The landing page now intelligently detects mobile devices and swaps the heavy landing scene for a lightweight model to save battery and drastically improve mobile performance.
* **Responsive Admin Layout:** Completely refactored the Admin Dashboard (`/projects/manage`) header. Buttons (Change Profile Image, Change Password, Logout, New Project) now cleanly stack vertically on mobile screens to prevent UI overflow and horizontal scrolling.
* **Hidden Mobile Admin:** Completely hid the Admin Login section on mobile devices to keep the public-facing mobile UI clean and uncluttered.

## 2. Analytics & Tracking
* **Vercel Analytics:** Successfully installed and integrated `@vercel/analytics` into `App.tsx`. The site now automatically tracks daily visits, unique visitors, and page views directly through your Vercel Dashboard without slowing down the site.

## 3. UI/UX Enhancements
* **Smart Back Button:** Upgraded the "Back" button on individual Project Detail pages. It now dynamically checks authentication: if you are logged in as an admin, it takes you directly back to the Dashboard; if a normal user clicks it, it takes them back to the public Projects list.
* **Animated Resume Download:** Built and integrated a highly-polished, animated "Download Resume" button on the Contact page.
* **Direct PDF Download:** Bypassed the standard Google Drive viewer by converting your Google Drive share link into a **Direct Download** link. Clicking the resume button now forces an instant PDF download to the user's device.

## 4. Certifications & Badges Section
* **New UI Section:** Added a stunning, animated "Certifications & Badges" grid to the About Me (`/skills`) page.
* **Credly Integration:** Successfully scraped your public Credly profile and integrated all 5 of your official badges:
  1. AWS Certified Developer – Associate
  2. GitLab Certified CI/CD Associate
  3. PCAP™ – Certified Associate Python Programmer
  4. Google Cybersecurity Professional Certificate
  5. Cybersecurity Fundamentals (IBM)
* **Local Asset Hosting:** Configured the codebase to load badge images locally from the `public/badges/` folder to permanently bypass Credly's CloudFront hotlink protection (403 errors), ensuring the badges load instantly for all visitors.

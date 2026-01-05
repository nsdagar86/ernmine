
# EarnMine Deployment Guide

## Troubleshooting GitHub Pages (IMPORTANT)
If your app is showing a blank page on GitHub Pages:
1.  **Check Paths**: Ensure your `index.html` uses relative paths (`./index.tsx`).
2.  **JSX/TSX Support**: Browsers cannot run `.tsx` files directly. You must use a build tool like Vite.
    - If you are uploading these files directly: They will NOT run. 
    - You must set up a GitHub Action to build the project.
    - Alternatively, rename `.tsx` to `.js` and remove all Type annotations and JSX (use React.createElement) - though this is not recommended.

## Deployment Steps:
1. Initialize a Git repository in this folder.
2. Push code to GitHub.
3. Use a tool like **Vite** to build: `npm run build`.
4. Deploy the `dist` folder to GitHub Pages.

## Admin Access
To access the Admin Panel:
- Log in with Telegram ID `123456789` or ensure your username is exactly `Admin`.
- The 'Admin' tab will appear in the bottom navigation bar.

## Features
- 5-Level MLM (Rewards for levels 1-5).
- Unskippable Ad-locked mining sessions.
- Task management system.
- Refund-enabled withdrawal system.

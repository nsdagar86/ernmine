
# Crypto Mining & Referral MLM MiniApp - Telegram MiniApp

This application is a feature-rich Telegram MiniApp designed for engagement, growth, and monetization through mining and multi-level marketing.

## Key Features:
1.  **5-Level MLM System**: Automated upline rewards for Level 1 to Level 5.
2.  **6-Hour Mining Sessions**: Manual activation required. Unskippable ads (configurable) before session start.
3.  **Task Rewards**: Users can complete admin-defined tasks for coins, dollars, and speed boosts.
4.  **Admin Panel**:
    - Manage MLM percentage rewards (Dollars/Speed).
    - Manage Welcome rewards.
    - Full Task Manager (CRUD).
    - Withdrawal Approval/Rejection with custom remarks and auto-refund logic.
5.  **Withdrawal Limits**: $5 minimum to $100 maximum monthly.

## Steps to Deploy on GitHub Pages:

1.  **Repository Setup**:
    - Create a new public repository on GitHub.
    - Push all the generated files to the `main` branch.

2.  **Configure GitHub Pages**:
    - Go to `Settings` > `Pages`.
    - Under `Build and deployment`, set `Source` to `Deploy from a branch`.
    - Select the `main` branch and `/ (root)` folder.
    - Click `Save`.

3.  **Telegram Bot Setup**:
    - Open @BotFather on Telegram.
    - Create a new bot or select an existing one.
    - Go to `Bot Settings` > `Menu Button` > `Configure Menu Button`.
    - Paste your GitHub Pages URL (e.g., `https://yourusername.github.io/your-repo-name/`).
    - Alternatively, create a "WebApp" command or inline button pointing to the URL.

4.  **Local Development & Testing**:
    - Ensure you test the app by appending `?ref=REF_YOUR_ID` to the URL to test the referral system.
    - The first user to log in with ID `123456789` or username `Admin` will see the Admin panel. You can adjust this in `App.tsx`.

## Technical Notes:
- **Persistence**: This version uses `localStorage` for data persistence. For a production environment with real money, you must integrate a backend API and database (Node.js, Firebase, etc.).
- **Ads**: The unskippable ad is simulated with a countdown and a redirect button. Replace the `adLink` in the Admin panel with your actual ad network link.
- **Telegram SDK**: The app uses `https://telegram.org/js/telegram-web-app.js` to interact with Telegram's theme and user data.

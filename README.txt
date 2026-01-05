
# EarnMine Deployment Guide (FIXED)

The reason your site was blank is that GitHub Pages cannot run .tsx files directly. You MUST "build" the project first.

### Local Setup & Build Instructions:

1.  **Install Node.js**: Ensure you have Node.js installed on your computer.
2.  **Download Files**: Place all the project files into a folder.
3.  **Install Dependencies**: Open your terminal in that folder and run:
    ```bash
    npm install
    ```
4.  **Build the Project**: Run the following command:
    ```bash
    npm run build
    ```
    This will create a new folder named `dist`.

### How to Deploy to GitHub Pages:

1.  **Upload the 'dist' folder content**: 
    Upload ONLY the contents of the `dist` folder to your GitHub repository (or push the `dist` folder to a branch called `gh-pages`).
2.  **GitHub Settings**: 
    - Go to your repo Settings > Pages.
    - Set the source to the branch you uploaded the built files to.
    - If you uploaded to the `main` branch, make sure you are pointing to where `index.html` (the built one) is.

### Pro Tip (GitHub Actions):
You can automate this! Create a file at `.github/workflows/deploy.yml` and use a "Vite Deploy" template. This will build your app automatically every time you push.

### Features Included:
- 5-Level MLM Referral Engine.
- 6-Hour timed mining sessions with unskippable ads.
- Task reward system (Coins, Dollars, Speed).
- Admin Panel for management and withdrawal approvals/rejections.
- Auto-refund logic for rejected withdrawals.

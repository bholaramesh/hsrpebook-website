# hsrpebook.online — Setup Guide

---

## Stage 1 — Google Sheet + Apps Script

1. Go to [sheets.google.com](https://sheets.google.com) → create a new blank spreadsheet → name it **HSRP Bookings**.
2. In the spreadsheet, click **Extensions → Apps Script**.
3. Delete all default code. Paste the entire contents of `apps-script.gs`.
4. Click **Save** (floppy disk icon). Name the project anything (e.g. `hsrpebook`).
5. Click **Deploy → New deployment**.
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy** → copy the **Web app URL** (looks like `https://script.google.com/macros/s/LONG_ID/exec`)
6. Open `enquiry.html` and paste that URL as the value of `APPS_SCRIPT_URL` at the top of the `<script>` block.

> Every form submission will now appear as a new row in the **Bookings** tab of your sheet.

---

## Stage 2 — Add Your UPI QR & Details

1. Save your UPI QR image as `upi-qr.png` inside the `assets/` folder.
2. In `enquiry.html`, find `yourupi@bank` and replace with your actual UPI ID.
3. In `index.html`, update the phone number and email in the **Contact** section.

---

## Stage 3 — Push to GitHub

1. Create a new **private or public** repository on [github.com](https://github.com).
2. Push your project folder:
   ```
   git init
   git add .
   git commit -m "initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

---

## Stage 4 — Add Domain to Cloudflare

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Add a site** → enter `hsrpebook.online`.
2. Select the **Free plan**.
3. Cloudflare will scan your existing DNS records. Continue.
4. Cloudflare gives you **2 nameservers** (e.g. `aiden.ns.cloudflare.com`).
5. Go to [Namecheap](https://namecheap.com) → Domain List → Manage `hsrpebook.online`.
6. Under **Nameservers**, select **Custom DNS** → paste Cloudflare's two nameservers → Save.
7. Wait 5–30 minutes for propagation. Cloudflare will email you when active.

---

## Stage 5 — Deploy on Cloudflare Pages

1. In Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
2. Authorise GitHub → select your repository → click **Begin setup**.
3. Settings:
   - **Build command**: *(leave blank)*
   - **Build output directory**: `/` (or leave blank)
4. Click **Save and Deploy**. Your site will be live at a `.pages.dev` URL within seconds.
5. Go to **Custom domains → Add custom domain** → enter `hsrpebook.online`.
6. Cloudflare will auto-create the DNS record. Click **Activate domain**.

> Every time you push to GitHub, Cloudflare Pages auto-deploys the latest version.

---

## You're live!

| What | Where |
|------|-------|
| Website | https://hsrpebook.online |
| Form submissions | Google Sheet → Bookings tab |
| New deployments | Push to GitHub (auto) |
| DNS | Cloudflare (pointed from Namecheap) |

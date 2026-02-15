## 📁 Project Structure

Below is the repository folder and file layout with short comments for key files.

```text
stripe-subscription-integration/
├─ client/                     # React + Vite frontend
│  ├─ public/
│  │  └─ index.html            # App entry HTML served by Vite
│  ├─ src/
│  │  ├─ api/
│  │  │  └─ apiClient.ts       # Axios client (uses `VITE_API_BASE_URL`)
│  │  ├─ assets/               # static images/icons
│  │  ├─ pages/
│  │  │  ├─ Success.tsx        # Page shown after successful checkout
│  │  │  └─ Cancel.tsx         # Page shown when checkout is canceled
│  │  ├─ services/
│  │  │  └─ stripeService.ts   # Frontend service calling backend endpoints
│  │  ├─ App.tsx               # Pricing UI and subscribe flow
│  │  ├─ main.tsx              # React entry (Vite bootstrapping)
│  │  ├─ index.css
│  │  └─ App.css
│  ├─ package.json
│  ├─ tsconfig.json
│  └─ vite.config.ts
├─ server/                     # Node/Express backend
│  ├─ index.js                 # Express app - creates Stripe sessions
│  ├─ package.json
│  └─ .env                     # STRIPE_SECRET_KEY (keep out of VCS)
└─ README.md                   # This file (project overview & structure)

```

Notes:
- Keep `server/.env` private; do not commit to source control.
- Frontend environment variables must start with `VITE_` to be exposed to the client.
---

## 🏗️ Project Architecture

The integration is split into two main parts to ensure security and scalability:

* **Client**: Handles the UI and redirects users to the secure Stripe Checkout page.
* **Server**: Securely communicates with Stripe's API using your secret keys.

---

## 🔑 Critical Setup: Environment Variables

To run this project, you **must** configure these two hidden files. They act as the bridge between your local code and the Stripe servers.

### 1. Frontend Configuration (`client/.env.development`)

This file tells your React app where your backend server is running.

* **File Path**: `client/.env.development`
* **Content**:
```env
VITE_API_BASE_URL=http://localhost:5000

```


> **Important**: In Vite, variables must start with `VITE_` to be accessible in your frontend code.



### 2. Backend Configuration (`server/.env`)

This file holds your "Master Key" for Stripe. **Never share this file.**

* **File Path**: `server/.env`
* **Content**:
```env
STRIPE_SECRET_KEY=sk_test_51T0MM1R2... (Your Secret Key)

```


> **Important**: This key allows your server to create subscription sessions securely.



---

## 🛠️ Integration Steps Recap

### Step 1: Stripe Dashboard

1. Create products in your **Stripe Product Catalog**.
2. Copy the **Price ID** (e.g., `price_1T0RMo...`) for each plan.
3. Paste these IDs into the `plans` array in `App.tsx`.

### Step 2: The Logic Flow

1. **User Clicks Subscribe**: `App.tsx` calls `createSubscriptionSession(priceId)`.
2. **API Call**: `stripeService.ts` sends a POST request to your backend using the `apiClient`.
3. **Session Created**: Your backend (`index.js`) uses the `STRIPE_SECRET_KEY` to ask Stripe for a checkout URL.
4. **Redirect**: The backend sends the URL back to the frontend, which redirects the user: `window.location.assign(data.url)`.

---

## 📂 File Dictionary

| File | Purpose |
| --- | --- |
| `App.tsx` | UI for the pricing table and plan selection logic. |
| `apiClient.ts` | Centralized Axios configuration using `VITE_API_BASE_URL`. |
| `stripeService.ts` | Dedicated service to handle subscription API requests. |
| `index.js` (Server) | Express server that manages the Stripe session creation. |

---

## ⚠️ Future Troubleshooting

* **`undefined` priceId**: Ensure `app.use(express.json())` is placed **above** your routes in `index.js`.
* **Connection Refused**: Double-check that `VITE_API_BASE_URL` in your client `.env` matches the port your server is listening on (usually `5000`).
* **`TypeError: Cannot destructure property 'priceId'`**: This usually means the middleware order in `index.js` is wrong. `express.json()` must be at the top.
* **CORS Error**: Ensure `app.use(cors())` is active on the server and that your React URL (usually `http://localhost:5173`) is allowed.
* **Stripe Key Error**: Ensure your `.env` variable names exactly match those called in `index.js` (e.g., `process.env.STRIPE_SECRET_KEY`).

---

## 🔗 Useful Links

* [Stripe Dashboard](https://dashboard.stripe.com/)
* [Stripe Documentation](https://docs.stripe.com/checkout/quickstart)
* [Video Tutorial Reference 1](https://www.youtube.com/watch?v=tqt9Vo7CXWM)
* [Video Tutorial Reference 2](https://youtu.be/15l6QTz1T4o?si=uEfrg8Jw5LUhqrpz)


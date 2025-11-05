# Google Analytics 4 Setup Guide

## Quick Setup (5 minutes)

### 1. Create Google Analytics Account
1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Start measuring"
3. Create an account for your website
4. Set up a property for your domain
5. Choose "Web" as platform
6. Enter your website URL: `https://thedatawithjose.github.io`

### 2. Get Your Measurement ID
1. In GA4, go to Admin (gear icon)
2. Under Property, click "Data Streams"
3. Click your web stream
4. Copy the **Measurement ID** (starts with `G-`)

### 3. Add to Your Environment
1. Open your `.env.local` file (create if doesn't exist)
2. Add this line:
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```
Replace `G-XXXXXXXXXX` with your actual Measurement ID

### 4. Deploy
Push your changes and deploy. Analytics will start tracking immediately!

## What Gets Tracked

### Automatic Tracking
- Page views
- User sessions
- Traffic sources
- Device/browser info
- Geographic data

### Custom Events
- **Contact form submissions** - tracks success/failure
- **Form completion time** - measures user engagement
- **Lead quality metrics** - budget, timeline, message length

## Viewing Your Data

### Key Reports to Check
1. **Realtime** - See current visitors
2. **Acquisition** - Where visitors come from
3. **Engagement** - Most popular pages
4. **Events** - Contact form submissions

### Important Metrics for Freelancers
- **Contact form conversion rate**
- **Most visited portfolio projects**
- **Traffic sources** (LinkedIn, Google, direct)
- **Time spent on services page**

## Privacy Compliance

The implementation is privacy-friendly:
- No personal data collected without consent
- Respects user privacy settings
- Only tracks business-relevant metrics
- Complies with GDPR requirements

## Troubleshooting

### Not seeing data?
1. Check your Measurement ID is correct
2. Wait 24-48 hours for data to appear
3. Test in incognito mode
4. Verify the environment variable is set

### Testing locally
Add this to `.env.local` for development testing:
```bash
NEXT_PUBLIC_ENABLE_GA_DEV=true
```
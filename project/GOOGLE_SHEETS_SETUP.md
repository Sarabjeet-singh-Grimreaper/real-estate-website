# 📋 Setup Guide: Google Sheets Integration for Property Publishing

## What's New
Your property publishing form now has:

✅ **Comprehensive Property Details:**
- Property Title, Location, Type (Apartment, Villa, Plot, etc.)
- Price & Status (For Sale, New Launch, Sold Out, Limited Units)
- Description with rich formatting
- Area, Bedrooms, Bathrooms
- 13 pre-configured amenities/features (checkboxes)

✅ **Advanced Image Handling:**
- Upload images directly from your device
- Image preview before submission
- Automatic base64 encoding for cloud storage
- Alternative URL input for online images
- Maximum 5MB file size with validation

✅ **Form Validation:**
- Required field checking
- Error messages for better UX
- Real-time feedback on submission status

✅ **User Experience:**
- Beautiful gradient header
- Organized sections (Basic Info, Details, Amenities, Images)
- Loading states with spinner
- Success/error notifications

---

## Setup: Google Sheets Backend Integration

To make properties persist across users and sessions, follow these steps:

### Step 1: Create a Google Sheet
1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new spreadsheet called "Real Estate Properties"
3. Create these column headers in Row 1:
   ```
   timestamp | title | location | price | priceValue | type | status | description | area | bedrooms | bathrooms | features | imageUrl
   ```
4. Keep the sheet open (you'll need its ID)

### Step 2: Create a Google Apps Script
1. In your Google Sheet, go to **Extensions → Apps Script**
2. Delete all default code
3. Paste this code:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp || new Date(),
      data.title || '',
      data.location || '',
      data.price || '',
      data.priceValue || 0,
      data.type || '',
      data.status || '',
      data.description || '',
      data.area || '',
      data.bedrooms || '',
      data.bathrooms || '',
      data.features ? data.features.join(', ') : '',
      data.imageUrl || ''
    ]);
    
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: 'Property added successfully' })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Save**
5. Choose project name: "Real Estate Publisher"

### Step 3: Deploy as Web App
1. Click **Deploy → New Deployment**
2. Select type: **Web app**
3. Settings:
   - Execute as: Your email
   - Who has access: **Anyone**
4. Click **Deploy**
5. You'll get a URL like: `https://script.google.com/macros/s/SCRIPT_ID/userweb`
6. **Copy this URL** (important!)

### Step 4: Connect to Your Website
1. Open [AddPropertyForm.jsx](../src/components/AddPropertyForm.jsx)
2. Find line 118: `const SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL';`
3. Replace with your actual URL:
   ```javascript
   const SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/userweb';
   ```
4. Save the file
5. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Connect Google Sheets backend"
   git push
   npm run deploy
   ```

---

## How It Works

**User Flow:**
1. User fills property form on your website
2. Clicks "Publish Property Now"
3. Form validates data
4. Images are converted to base64
5. Data sent to Google Sheets via Apps Script
6. Google Sheet stores all property data
7. User sees success message

**Your Workflow:**
1. Properties saved to Google Sheet automatically
2. You can manage data in Google Sheet
3. Download as CSV if needed
4. Track submissions with timestamps
5. Monitor property listings in real-time

---

## Image Storage Options

### Option 1: Base64 in Google Sheets (Current)
- ✅ Simple setup
- ✅ No additional services needed
- ⚠️ Large file sizes in sheet
- ❌ Slow loading for many images

### Option 2: Upload to Imgur/Postimages (Recommended)
1. User uploads to external image service
2. Receives public URL
3. Store URL in Google Sheet
4. Images load instantly

### Option 3: Google Drive Storage
- Upload images to Google Drive
- Store Drive file IDs in Sheet
- Fetch via Google Drive API
- (More complex setup)

---

## Testing the Integration

1. **Local Test:**
   ```bash
   npm run dev
   ```
   - Form shows "Publishing..." but mock success message

2. **After Adding Script URL:**
   - Real data saves to Google Sheet
   - Check your sheet for new rows
   - Verify all fields captured

3. **Live Testing:**
   ```bash
   npm run deploy
   ```
   - Your live site sends real data
   - Check Google Sheet for customer submissions
   - Test with different property types

---

## Troubleshooting

**Issue: "Repository not found" error**
- Make sure Google Sheet is shared publicly or with your email
- Check Script URL is correct (no extra spaces)

**Issue: Image is too large**
- Limit to 5MB maximum
- Compress images before uploading

**Issue: Data not appearing in Sheet**
- Verify Apps Script has correct column names
- Check script is deployed correctly
- Look at browser console for errors (F12 → Console)

---

## Next Steps

1. ✅ Deploy this form to live site
2. ⭐ Set up Google Sheets integration
3. 📊 Monitor submissions from customers
4. 🔄 Update properties in real-time
5. 📈 Add analytics dashboard (optional)

---

## Files Modified

- `src/components/AddPropertyForm.jsx` - Enhanced form component
- `src/components/PropertyList.jsx` - Property listing display
- `src/App.jsx` - Navigation between form and listings

All changes automatically deploy to: https://sarabjeet-singh-grimreaper.github.io/real-estate-website/

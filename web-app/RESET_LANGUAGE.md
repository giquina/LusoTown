# Reset Language to English Default

If you're seeing Portuguese as the default language, follow these steps:

## Quick Reset:
1. Open browser at http://localhost:3000
2. Open Developer Tools (F12)
3. Go to Console tab
4. Run: `localStorage.setItem('lusotown-language', 'en')`
5. Refresh the page

## Or Clear All Storage:
1. Open Developer Tools (F12)
2. Go to Application tab
3. Click "Local Storage" → "http://localhost:3000"
4. Delete the `lusotown-language` key
5. Refresh the page

The platform will now default to English for all new users, with the option to switch to Portuguese manually using the language toggle button.
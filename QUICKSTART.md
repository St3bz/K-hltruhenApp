# 🚀 Quick Start Guide - Kühltruhnen App

## Starting Both Backend and Frontend

### Option 1: Two Terminal Windows (Recommended for Development)

**Terminal 1 - Backend:**
```bash
cd d:\Heimprojekte\KühltruhenApp
mvnw spring-boot:run
# Wait for: "Tomcat started on port(s): 8080"
```

**Terminal 2 - Frontend:**
```bash
cd d:\Heimprojekte\KühltruhenApp\frontend\kuhltruhenapp
npm install    # First time only
npm run dev
# Wait for: "Local: http://localhost:3000"
```

**Then:** Open browser to `http://localhost:3000`

---

## 📱 Using the App

### Dashboard (Homepage)
- **URL:** `http://localhost:3000`
- **Features:**
  - Overview of app capabilities
  - Navigation links to both features

### Refrigerator Management
- **URL:** `http://localhost:3000/kuhlschrank`
- **Features:**
  - View all items
  - Add new item (click "+ Add Item")
  - Edit existing item (click Edit button)
  - Delete item (click Delete button)
  - Fields: Name, Quantity, Category, Expiration Date

### Pantry/Stock Management
- **URL:** `http://localhost:3000/vorrat`
- **Status:** Template ready for you to implement
- **Fields:** Name, Target Quantity, Current Quantity

---

## 🔧 Troubleshooting

### Backend won't start
```bash
# Check if port 8080 is already in use
# Kill the process or use different port

# Try clean build
mvnw clean install
mvnw spring-boot:run
```

### Frontend won't connect to backend
1. ✓ Backend running on port 8080?
2. ✓ Check `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```
3. ✓ Hard refresh browser (Ctrl+Shift+R)

### npm install fails
```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

### TypeScript errors
```bash
# Reinstall dependencies
rm -r node_modules
npm install

# Rebuild
npm run build
```

---

## 📋 What's Already Built

### ✅ Completed Components
- **Dashboard page** - Beautiful landing page
- **Kuhlschrank page** - Fully functional refrigerator management
- **Reusable components** - Forms, lists, buttons, alerts
- **API layer** - All backend communication functions
- **TypeScript types** - Data models for type safety

### 🎯 Your Task
- **Vorrat page** - Complete the pantry management page
  - Follow the Kuhlschrank page as a template
  - File: `app/vorrat/page.tsx`

---

## 💡 Next Steps After Completing Vorrat Page

1. **Test both features** work correctly
2. **Add a navigation bar** (optional)
3. **Add error handling** for network issues (optional)
4. **Deploy to production** (optional)

---

## 📚 Important Files to Know

| File | Purpose |
|------|---------|
| `types/index.ts` | TypeScript data models |
| `lib/api.ts` | All API calls to backend |
| `components/ui.tsx` | Basic UI components |
| `components/ItemForm.tsx` | Form for create/edit |
| `components/ItemList.tsx` | List display component |
| `app/page.tsx` | Dashboard |
| `app/kuhlschrank/page.tsx` | Refrigerator page (reference) |
| `app/vorrat/page.tsx` | Pantry page (exercise) |

---

## 🎓 Learning Resources

### Inside This App
- React hooks: `useState`, `useEffect`
- TypeScript generics: `ItemForm<T>`, `ItemList<T>`
- Component composition: Build complex UIs from simple pieces
- API integration: How frontend talks to backend

### Good To Know
- **Next.js App Router** - How pages and routing work
- **Tailwind CSS** - Utility-first styling
- **REST API** - HTTP methods: GET, POST, PUT, DELETE

---

## 🆘 Need Help?

1. Check `DEVELOPMENT.md` for detailed explanations
2. Compare your code with `kuhlschrank/page.tsx`
3. Review `lib/api.ts` to understand API calls
4. Check browser console (F12) for error messages

**Happy coding!** 🎉

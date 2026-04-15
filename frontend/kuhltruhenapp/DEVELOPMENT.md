# Kühltruhnen App - React Frontend

A modern React-based frontend for managing refrigerator and pantry inventory using Next.js, TypeScript, and Tailwind CSS.

## 🏗️ Architecture Overview

### Frontend Structure
```
frontend/kuhltruhenapp/
├── app/
│   ├── page.tsx                    # Dashboard/Landing page
│   ├── kuhlschrank/page.tsx        # Refrigerator management (IMPLEMENTED)
│   └── vorrat/page.tsx             # Pantry management (EXERCISE)
├── components/
│   ├── ui.tsx                      # Reusable UI components:
│   │   ├── LoadingSpinner
│   │   ├── ErrorAlert/SuccessAlert
│   │   ├── InputField/SelectField
│   │   ├── Button (variants)
│   │   ├── DeleteConfirmation
│   │   └── Card
│   ├── ItemList.tsx                # Generic list component
│   └── ItemForm.tsx                # Generic form component (create/edit)
├── lib/
│   └── api.ts                      # API service layer (all fetch calls)
├── types/
│   └── index.ts                    # TypeScript interfaces
└── .env.local                      # Environment variables
```

### Key Files Explained

#### 1. **types/index.ts** 
- Defines TypeScript interfaces for data models
- `KuhlschrankArtikel` - refrigerator items
- `VorratsArtikel` - pantry items
- Ensures type safety across the app

#### 2. **lib/api.ts**
- Centralized API communication layer
- Functions for all CRUD operations (Create, Read, Update, Delete)
- Easy to maintain - change backend URL in one place
- Organized into two sections: Kuhlschrank and Vorrat APIs

#### 3. **components/ui.tsx**
- Building blocks for the UI
- Reusable components prevent code duplication
- Consistent styling via Tailwind CSS

#### 4. **components/ItemList.tsx**
- Generic component to display items
- Works with any data type (using TypeScript generics `<T>`)
- Handles edit/delete actions
- Shows empty state when no items

#### 5. **components/ItemForm.tsx**
- Generic form for creating and editing items
- Automatic validation
- Works with any data type
- Handles both create and update modes

#### 6. **app/kuhlschrank/page.tsx** ✅ COMPLETE
- Full refrigerator management
- Shows how to use all components together
- Demonstrates React hooks: `useState`, `useEffect`
- Handles loading, success, and error states

#### 7. **app/vorrat/page.tsx** 🎯 EXERCISE
- Template for pantry management
- Follow the same pattern as Kuhlschrank page
- This is where you practice what you learned!

#### 8. **app/page.tsx**
- Beautiful dashboard with navigation
- Links to both Kuhlschrank and Vorrat pages
- Explains app features

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Backend running on `http://localhost:8080`

### Installation

```bash
# Navigate to frontend directory
cd frontend/kuhltruhenapp

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 🔄 How It Works

### Data Flow
1. **User Action** → Click edit, add, or delete button
2. **Component State Update** → React updates `useState` variables
3. **API Call** → `lib/api.ts` functions communicate with backend
4. **Response Handling** → Success/error messages shown
5. **UI Update** → Component re-renders with new data

### Example Flow: Creating an Item
```
User clicks "Add Item"
↓
ItemForm appears with fields
↓
User fills in data and clicks "Save"
↓
ItemForm validates input
↓
ItemForm calls handleSubmit() → createKuhlschrankArtikel()
↓
lib/api.ts makes POST request to backend
↓
Backend saves and returns new item
↓
Page calls loadItems() to refresh list
↓
ItemList component re-renders with new item
```

## 📚 Learning Points

### TypeScript Generics
```typescript
// ItemList works with ANY type
ItemList<KuhlschrankArtikel>     // For fridge items
ItemList<VorratsArtikel>         // For pantry items
```

### React Hooks
- **useState**: Manage component state (items, loading, errors)
- **useEffect**: Run code on component mount (load initial data)

### Composition Over Duplication
Instead of writing separate forms for each type, we have:
- One `ItemForm<T>` component used for both
- One `ItemList<T>` component used for both

This is the DRY principle: **Don't Repeat Yourself**

## 🔌 API Integration

### Backend Requirements
Backend must expose these endpoints:

**Kuhlschrank:**
- `GET /api/v1/kuhlschrank` - Get all items
- `GET /api/v1/kuhlschrank/{id}` - Get one item
- `POST /api/v1/kuhlschrank` - Create item
- `PUT /api/v1/kuhlschrank/{id}` - Update item
- `DELETE /api/v1/kuhlschrank` - Delete item (ID in body)

**Vorrat:**
- `GET /api/v1/vorrat` - Get all items
- `GET /api/v1/vorrat/{id}` - Get one item
- `POST /api/v1/vorrat` - Create item
- `PUT /api/v1/vorrat/{id}` - Update item
- `DELETE /api/v1/vorrat` - Delete item (ID in body)

### CORS Configuration
Backend CORS is configured to allow:
- `http://localhost:3000` (Next.js dev server)
- `http://localhost:5173` (Vite dev server)

## 🎨 Styling

### Tailwind CSS
- Utility-first CSS framework
- Define styles inline using class names
- Example: `className="bg-blue-500 text-white px-4 py-2 rounded"`

### Color Scheme
- Dashboard: Dark purple gradient
- Kuhlschrank (Refrigerator): Blue
- Vorrat (Pantry): Green

## 📝 Completing the Vorrat Page

The `app/vorrat/page.tsx` is an exercise. Follow these steps:

1. **Import necessary modules** (see Kuhlschrank page)
2. **Set up state** (items, loading, error, etc.)
3. **Define form fields** for VorratsArtikel:
   - `name` (text, required)
   - `zielMenge` (number, required) - target quantity
   - `momentaneMenge` (number, required) - current quantity
4. **Implement functions**:
   - `loadItems()` - fetch all items
   - `handleSubmit()` - create/update items
   - `handleEdit()` - prepare item for editing
   - `handleDelete()` - delete item
   - `handleCancel()` - close form
5. **Render the page** - copy structure from Kuhlschrank and adapt

**Hint**: Compare line-by-line with `app/kuhlschrank/page.tsx`. The pattern is identical!

## 🧪 Testing Your Changes

### Test Flow
1. Start backend: `mvn spring-boot:run` in one terminal
2. Start frontend: `npm run dev` in another terminal
3. Navigate to `http://localhost:3000`
4. Click on Refrigerator or Pantry
5. Try:
   - Adding an item
   - Editing (click Edit)
   - Deleting (click Delete)
   - Refresh page (data persists - stored in database)

### Common Issues

**"API mismatch" errors?**
- Check backend is running on port 8080
- Check CORS is configured correctly
- Check `.env.local` has `NEXT_PUBLIC_API_URL=http://localhost:8080`

**Styling looks wrong?**
- Tailwind CSS might not be compiled. Run: `npm install`
- Clear browser cache and hard refresh

**TypeScript errors?**
- Run: `npm install` to install dependencies
- Check that types are imported correctly

## 📦 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🤝 Component Communication

```
Page (manages state)
├── ItemForm
│   ├── InputField
│   ├── SelectField
│   └── Button
├── ItemList
│   ├── Button (Edit/Delete)
│   └── DeleteConfirmation
│       └── Button
└── Alerts (Error/Success)
```

## 🎓 Key Takeaways

1. **Separation of Concerns**: API calls in one place, UI in another
2. **Reusability**: Generic components work with multiple data types
3. **Type Safety**: TypeScript catches errors before runtime
4. **Composition**: Build complex UIs from small, simple components
5. **State Management**: React hooks (`useState`, `useEffect`) manage changing data

---

**Ready to code?** Start with the Vorrat page exercise and follow the Kuhlschrank pattern!

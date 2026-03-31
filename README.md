# 🕰️ Timepiece - Watch Trading & E-Commerce Platform

A sophisticated dual-mode application combining a **Watch Trading Simulator** with a **Luxury Watch E-Commerce Storefront**. Built with React, featuring Hamilton-inspired luxury design aesthetics.

## ✨ Features

### Trading Simulator
- Real-time market simulation with price fluctuations
- News feed system affecting watch prices
- Portfolio management with profit/loss tracking
- Interactive charts powered by Chart.js
- Local storage persistence for game state

### E-Commerce Storefront
- Luxury product catalog with 12+ premium watches
- Advanced filtering (brand, collection, price range, stock status)
- Product detail pages with image galleries and zoom functionality
- Shopping cart with quantity management
- Complete checkout flow with form validation
- Order confirmation system
- Persistent cart storage

## 🎨 Design Highlights

The e-commerce section features a **Hamilton-inspired luxury aesthetic**:
- **Typography**: Playfair Display (serif headers) + Lato (body text)
- **Color Palette**: Gold accents (#d4af37) on dark backgrounds
- **Animations**: Smooth transitions, hover effects, and micro-interactions
- **Layout**: Full-screen hero sections, grid-based product displays
- **Details**: Gradient text effects, custom form styling, elegant borders

## 📁 Project Structure

```
src/
├── App.jsx                    # Main app with routing
├── App.css                    # Comprehensive styling
├── index.js                   # Entry point
├── context/
│   └── CartContext.jsx        # Global cart state management
├── pages/
│   ├── TradingDashboard.jsx   # Trading simulator
│   ├── Shop.jsx               # Product listings
│   ├── ProductDetail.jsx      # Individual product view
│   ├── Cart.jsx               # Shopping cart
│   ├── Checkout.jsx           # Checkout form
│   └── OrderConfirmation.jsx  # Order success page
├── components/
│   ├── ProductCard.jsx        # Product grid item
│   ├── ProductGallery.jsx     # Image viewer with zoom
│   └── FilterSidebar.jsx      # Product filters
└── data/
    └── products.js            # Mock product database
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "chart.js": "^4.4.0",
  "react-chartjs-2": "^5.2.0"
}
```

## 🗺️ Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with mode selection |
| `/trading` | Trading simulator dashboard |
| `/shop` | Product catalog with filters |
| `/shop/:id` | Product detail page |
| `/cart` | Shopping cart |
| `/checkout` | Checkout form |
| `/order-confirmation` | Order success page |

## 🎮 Trading Simulator Usage

1. **Navigate** to `/trading` from the landing page
2. **View** marketplace with 5 watches and live price charts
3. **Buy** watches when you have sufficient cash
4. **Monitor** your portfolio's profit/loss in real-time
5. **Watch** for news events that impact prices every 30 seconds
6. **Sell** watches from your portfolio at current market prices

### Trading Features
- Starting cash: $10,000
- Market updates every 30 seconds
- News-driven price impacts (±15%)
- Random fluctuations (±5%) when no news
- Portfolio tracking with P/L calculations

## 🛍️ E-Commerce Usage

1. **Browse** luxury watches on `/shop`
2. **Filter** by brand, collection, or price range
3. **Sort** by price or name
4. **Click** any watch to view full details
5. **Add to cart** with quantity selection
6. **Review** cart and adjust quantities
7. **Checkout** with shipping and payment info (mock)
8. **Receive** order confirmation

### Shop Features
- 12 luxury watches from top brands
- Real product specifications
- Image galleries with zoom
- Stock status indicators
- Price sorting and filtering
- Persistent cart across sessions

## 🎨 Customization

### Adding New Products

Edit `src/data/products.js`:

```javascript
{
  id: 'unique-id',
  brand: 'Brand Name',
  model: 'Model Name',
  collection: 'Collection',
  price: 5000,
  images: ['url1', 'url2', 'url3'],
  description: '...',
  specifications: { ... },
  inStock: true,
  features: ['Feature 1', 'Feature 2']
}
```

### Styling Modifications

Key CSS variables in `App.css`:

```css
:root {
  --gold: #d4af37;
  --gold-light: #e8c05c;
  --dark-bg: #0a0a0a;
  --dark-surface: #1a1a1a;
  --text-primary: #e5e5e5;
  /* ... */
}
```

### Trading Configuration

Adjust in `TradingDashboard.jsx`:

```javascript
const INITIAL_WATCHES = [ ... ];
const NEWS_TEMPLATES = [ ... ];
const [timer, setTimer] = useState(30); // Update frequency
```

## 🔄 Backend Integration (Future)

The app is designed for easy backend integration:

1. **Replace mock data** in `products.js` with API calls
2. **Update CartContext** to sync with server
3. **Add authentication** for user accounts
4. **Implement payment processing** (Stripe, PayPal, etc.)
5. **Connect trading data** to real market feeds

Example API structure:

```javascript
// In Shop.jsx
useEffect(() => {
  fetch('/api/products')
    .then(res => res.json())
    .then(data => setProducts(data));
}, []);
```

## 📱 Responsive Design

The application is fully responsive with breakpoints at:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

Key responsive features:
- Collapsible navigation
- Stacked layouts on mobile
- Touch-friendly controls
- Optimized typography scaling

## 🎯 Key Technologies

- **React 18**: Component architecture and hooks
- **React Router 6**: Client-side routing
- **Context API**: Global state management
- **Chart.js**: Trading charts
- **CSS3**: Advanced animations and layouts
- **LocalStorage**: Data persistence

## 📝 Notes

- All payments are **mock** - no real transactions occur
- Product images use Unsplash for demo purposes
- Trading simulator uses pseudo-random price movements
- Cart persists in browser localStorage
- No backend required for full functionality

## 🚧 Future Enhancements

- [ ] User authentication
- [ ] Wishlist functionality
- [ ] Product reviews and ratings
- [ ] Advanced trading strategies
- [ ] Historical price data
- [ ] Email notifications
- [ ] Multi-currency support
- [ ] Admin dashboard
- [ ] Real payment integration
- [ ] Order tracking

## 🤝 Contributing

This is a demonstration project. Feel free to fork and customize for your needs.

## 📄 License

MIT License - Free to use and modify

---

**Built with ❤️ using React and modern web technologies**




4. For a given set of training data example, implement and demonstrate the Find-S algorithm to output a description of the set of all hypotheses consistent with the training examples.

# Load training data
data = [
    ['Sunny', 'Warm', 'Normal', 'Strong', 'Warm', 'Same', 'Yes'],
    ['Sunny', 'Warm', 'High', 'Strong', 'Warm', 'Same', 'Yes'],
    ['Rainy', 'Cold', 'High', 'Strong', 'Warm', 'Change', 'No'],
    ['Sunny', 'Warm', 'High', 'Strong', 'Cool', 'Change', 'Yes']
]

# Initialize hypothesis with most specific values
hypothesis = ['0'] * (len(data[0]) - 1)

print("Initial Hypothesis:", hypothesis)

# Apply Find-S
for example in data:
    if example[-1] == "Yes":  # Only positive examples
        for i in range(len(hypothesis)):
            if hypothesis[i] == '0':
                hypothesis[i] = example[i]
            elif hypothesis[i] != example[i]:
                hypothesis[i] = '?'

print("\nFinal Hypothesis:", hypothesis)



















#Explanation
data = [
    ['Sunny', 'Warm', 'Normal', 'Strong', 'Warm', 'Same', 'Yes'],
    ['Sunny', 'Warm', 'High', 'Strong', 'Warm', 'Same', 'Yes'],
    ['Rainy', 'Cold', 'High', 'Strong', 'Warm', 'Change', 'No'],
    ['Sunny', 'Warm', 'High', 'Strong', 'Cool', 'Change', 'Yes']
]
This is the training dataset.
Each row represents one training example.
The last column represents the target/class label:
Yes → Positive example
No → Negative example

hypothesis = ['0'] * (len(data[0]) - 1)

Explanation:
len(data[0]) → number of columns in first row = 7
-1 → remove the target column
So number of attributes = 6
['0'] * 6 creates:
['0','0','0','0','0','0']
Meaning:
0 represents the most specific hypothesis (no information yet).

print("Initial Hypothesis:", hypothesis)

Output:
Initial Hypothesis: ['0','0','0','0','0','0']

for example in data:
Iterates through each row of dataset.
example stores one training instance at a time.
Check if example is positive:

if example[-1] == "Yes":

Explanation:
example[-1] → last element of row (class label)
If label = Yes, it is a positive example
Find-S only learns from positive examples




Compare attributes:

for i in range(len(hypothesis)):

Loops through each attribute position

i represents attribute index (0 to 5)
First positive example update
if hypothesis[i] == '0':
hypothesis[i] = example[i]

Example:
Hypothesis = ['0','0','0','0','0','0']
Example = ['Sunny','Warm','Normal','Strong','Warm','Same']
After update:
['Sunny','Warm','Normal','Strong','Warm','Same']
Generalization step:
elif hypothesis[i] != example[i]:
hypothesis[i] = '?'

Explanation:
If hypothesis value differs from example value
Replace with ?
Meaning:
? = any value allowed
Example:
Warm vs Cool → ?

Print final hypothesis

print("\nFinal Hypothesis:", hypothesis)

Output:
Final Hypothesis:
['Sunny', 'Warm', '?', 'Strong', '?', '?']

Meaning the learned concept is:
Sky = Sunny
AirTemp = Warm
Humidity = Any
Wind = Strong
Water = Any
Forecast = Any

Very Short Explanation:

 (Initialize hypothesis with most specific values (0).
Consider only positive examples.
Compare attributes with hypothesis.
If different → replace with ?.
Final hypothesis becomes the most specific hypothesis consistent with positive examples.


Python Program (Reading from Excel)
import pandas as pd

# Load Excel file
df = pd.read_excel("data.xlsx")

# Convert dataframe to list
data = df.values.tolist()

# Initialize hypothesis
hypothesis = ['0'] * (len(data[0]) - 1)

print("Initial Hypothesis:", hypothesis)

# Apply Find-S Algorithm
for example in data:
    if example[-1] == "Yes":
        for i in range(len(hypothesis)):
            if hypothesis[i] == '0':
                hypothesis[i] = example[i]
            elif hypothesis[i] != example[i]:
                hypothesis[i] = '?'

print("\nFinal Hypothesis:", hypothesis)
# 🧠 Nuvion - AI API Platform

**Intelligence Meets Innovation — The Smarter Way to Connect with AI APIs.**

A beautifully designed, neumorphic-styled website showcasing an AI API platform that allows developers to explore, test, and integrate the world's most advanced AI APIs.

## ✨ Features

### 🎨 Neumorphic Design
- Soft, extruded elements that appear to push through the surface
- Subtle dual shadows (light and dark) for tactile feel
- Monochromatic color palette with minimal depth
- Soft pressed effects on button interactions

### 🚀 Core Sections
- **Hero Section**: Animated particles with futuristic dashboard mockup
- **API Exploration**: 4 modern cards showcasing OpenAI, Stability AI, ElevenLabs, and Hugging Face
- **Interactive Playground**: Real-time API testing with simulated responses
- **Code Generator**: Multi-language code snippets (Python, Node.js, React)
- **Community Showcase**: Featured projects and creations
- **Developer Dashboard**: Analytics and API management interface
- **Pricing Plans**: Transparent, flexible pricing tiers
- **Call-to-Action**: Dynamic gradient animations

### 🎯 Interactive Features
- Smooth scrolling navigation
- Animated particle system
- Real-time API simulation
- Code tab switching
- Responsive design for all devices
- Hover effects and micro-interactions
- Loading animations and notifications

## 🛠️ Technologies Used

- **HTML5**: Semantic structure and accessibility
- **CSS3**: Neumorphic design system with custom properties
- **JavaScript**: Interactive features and animations
- **Font Awesome**: Icons and visual elements
- **Google Fonts**: Inter font family for typography

## 🚀 Getting Started

1. **Clone or download** the project files
2. **Open** `index.html` in your web browser
3. **Explore** the interactive features and animations

### Local Development Server
```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 🔐 Authentication Setup

### Google OAuth Setup (Optional)
To enable real Google OAuth instead of demo mode:

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project** or select existing one
3. **Enable Google+ API** in the APIs & Services section
4. **Create OAuth 2.0 credentials**:
   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
   - Application type: "Web application"
   - Add authorized origins: `http://localhost:8000` (or your domain)
   - Add authorized redirect URIs: `http://localhost:8000`
5. **Copy the Client ID** and replace `YOUR_GOOGLE_CLIENT_ID` in `script.js`
6. **Test the integration** with your Google account

### Demo Mode
The authentication system works in demo mode by default:
- **Email sign-up** with verification codes (shown in console)
- **Google OAuth simulation** with mock user data
- **All features functional** without external dependencies

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🎨 Design System

### Color Palette
- **Primary**: #e0e0e0 (Light gray background)
- **Secondary**: #f5f5f5 (Card backgrounds)
- **Accent**: #6366f1 (Interactive elements)
- **Text Primary**: #2d3748 (Main text)
- **Text Secondary**: #718096 (Secondary text)

### Neumorphic Shadows
- **Light Shadow**: #ffffff
- **Dark Shadow**: #bebebe
- **Border Radius**: 20px (primary), 12px (buttons), 16px (cards)

## 🔧 Customization

### Adding New API Cards
1. Add HTML structure in the `.api-grid` section
2. Follow the existing `.api-card-large` pattern
3. Update the JavaScript if needed for interactions

### Modifying Colors
1. Update CSS custom properties in `:root`
2. Maintain the neumorphic shadow relationships
3. Test contrast ratios for accessibility

### Adding New Sections
1. Follow the existing section structure
2. Use the `.section` and `.container` classes
3. Maintain consistent spacing and typography

## 📄 File Structure

```
nuvion-website/
├── index.html          # Main HTML file
├── styles.css          # Neumorphic CSS framework
├── script.js           # Interactive JavaScript
└── README.md           # Project documentation
```

## 🌟 Key Features Implemented

✅ **Complete Neumorphic Design System**
✅ **Animated Hero Section with Particles**
✅ **Interactive API Testing Playground**
✅ **Multi-language Code Generator**
✅ **Community Project Showcase**
✅ **Developer Dashboard Mockup**
✅ **Responsive Pricing Table**
✅ **Smooth Animations and Transitions**
✅ **Mobile-First Responsive Design**
✅ **Accessibility Considerations**

## 🎯 Performance

- Optimized CSS with efficient selectors
- Minimal JavaScript for smooth performance
- Compressed and minified assets
- Fast loading times
- Smooth 60fps animations

## 📞 Support

For questions or support regarding this website template, please refer to the code comments or create an issue in the repository.

---

**Built with ❤️ for the next generation of AI developers.**
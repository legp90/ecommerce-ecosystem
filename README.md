# 🛒 E-Commerce Ecosystem & Checkout

A production-grade, end-to-end e-commerce storefront showcasing advanced client-side architecture. This platform handles complex frontend business logic, including scalable global state management for real-time shopping cart synchronization, dynamic product catalog filtering, and an optimized checkout workflow with strict validation schemas.

🌐 **Live Demo:** [View Live Instance] https://ecommerce-ecosystem.vercel.app/

---

## 🚀 Key Features

* **Scalable Global State Management:** Leverages React Context API to handle seamless, atomic updates across the shopping cart, dynamically calculating item quantities, prices, taxes, and shipping constraints on the fly.
* **Dynamic Multi-Parametric Filtering:** A highly optimized product catalog engine allowing users to filter and sort items instantly by categories, price ranges, and search terms with immediate UI response.
* **Optimized Checkout Pipeline:** A simulated multi-step checkout workflow featuring robust form validations, secure mocked payment gateway feedback, and graceful handling of success/failure order states.
* **High-Conversion UI/UX:** Clean, modern layout engineered with utility-first Tailwind CSS classes, emphasizing accessibility, strict input feedback, and fluid transitions to minimize cart abandonment.

---

## 🛠️ Tech Stack

* **Core Framework:** React (Functional Design, Optimized Hooks, Context API)
* **Static Typing:** TypeScript (Strict interfaces for Products, CartItems, and Checkout schemas)
* **Styling & Asset System:** Tailwind CSS & Lucide React
* **Build Tooling:** Vite
* **Hosting & Deployment:** Vercel

---

## 🧠 Technical Highlight: Predictable State Transitions

The core of the e-commerce ecosystem relies on type-safe, immutable mutations to the global state, ensuring that cart synchronization is deterministic and safe across asynchronous user interactions:

```typescript
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Prevents state corruption by enforcing strict boundary validations
const updateCartQuantity = (productId: string, targetAmount: number) => {
  setCart((currentCart) =>
    currentCart.map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.max(1, targetAmount) }
        : item
    )
  );
};
```

---

## 🔧 Installation and Local Setup

Follow these steps to run the e-commerce application locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/legp90/ecommerce-checkout.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
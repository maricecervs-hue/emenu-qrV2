# eMenu QR Mobile - Product Requirements & Features

## 1. User Journey & Navigation
- **Home Screen**: Features a premium hero image (Beef Burger), table identification (Table 12), and language selector.
- **Navigation**: Home -> View Menu leads to the digital menu.
- **Bottom Navigation**: Persistent menu and orders icons with an active state for "Menu".

## 2. Menu Experience
- **Categories**: Horizontal scrolling category navigation (Bestsellers, Pizza, Sides, Desserts, Drinks) with active category detection on scroll.
- **Menu Cards**:
  - Clicking the main card area opens the **Item Detail/Customization Drawer**.
  - **Non-customisable items**: "Add" button adds directly to the cart with a bounce animation.
  - **Customisable items**: "+" button and "Add" button always trigger the customization drawer.
- **Dynamic Scroll**: Categories highlight automatically as the user scrolls through the list.

## 3. Item Customization (Bottom Sheet)
- **Visuals**: Full-width high-quality image with a gradient overlay for the close button.
- **Information**:
  - Item name, price, and long description.
  - **Nutritional Info**: Calories, Protein, Fat, and Carbs badges.
  - **Allergen Info**: Dynamic allergen badges (Gluten-Free, Contains Nuts, etc.) with icons.
- **Condiments & Add-ons**:
  - **Multi-Condiment**: Support for multiple extras with individual quantity counters (+/-).
  - **Mandatory Items**: Required selections feature a light orange-red background (`bg-orange-50/80`) and a "Required" badge.
  - **Nested Customization**: Support for sub-options (e.g., "Stuffed Crust" -> "Fill Type"). Indicated by a chevron arrow; opens a sub-view.
- **Special Requests**: Textarea for manual notes (e.g., "no spice").

## 4. Shopping Cart & Basket
- **Floating Cart Button**: 
  - Hidden by default.
  - Appears automatically once the first item is added.
  - Stays visible during scroll.
  - Includes a red badge for total item count.
- **Cart Drawer (Bottom Sheet)**:
  - List of items with price and quantity controls.
  - **Customization Dropdown**: Accordion-style "Review condiments & addons" for items with selections.
  - **Recommendations**: "You might also like" horizontal scrolling section.
  - **Note & Discount**: Sections for adding a note and applying a promo code.
  - **Price Summary**: Subtotal, Tax (8%), and Service Charge (10%) breakdown.
  - **VIP Perks**: Premium banner for loyalty program conversion.
- **Auto-Empty Logic**: Removing the last item from the cart automatically closes the drawer, hides the floating button, and shows a "Basket Empty" toast notification.

## 5. UI/UX Standards
- **Theme**: HSL-based colors with `#12B4A3` as the primary brand color.
- **Components**: Heavy use of ShadCN UI (Sheet, Accordion, Badge, Button, ScrollArea).
- **Design Tokens**: Large border-radius (`1.5rem` / `2rem`) for a premium, rounded feel. High-fidelity shadows for floating elements.
- **Accessibility**: Semantic headers and screen-reader friendly visually hidden labels (`sr-only`) for all Dialog/Sheet components.
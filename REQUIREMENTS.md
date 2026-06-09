
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
- **Currency**: Displayed as "$" for all food/beverage items and totals.

## 3. Item Customization (Bottom Sheet)
- **Visuals**: Full-width high-quality image with a gradient overlay for the close button.
- **Background**: Clean white background (`bg-white`).
- **Information**:
  - Item name, price, and long description.
  - **Nutritional Info**: Calories, Protein, Fat, and Carbs badges in a clean card layout with a "Per serving" header.
  - **Allergen Info**: Dynamic allergen badges (Gluten, Meat, etc.) in a dedicated cream-colored container (`bg-[#FFFBEB]`).
- **Customization Logic**:
  - **Single Choice**: Uses Radio Buttons for mandatory selections (e.g., Doneness, Crust).
  - **Multi-Choice**: Uses quantity counters (+/-) for optional add-ons.
  - **Mandatory Highlighting**: Required sections feature a light orange-red background (`bg-orange-50/80`) and a "Required" badge until a selection is made.
  - **Completion State**: Once selected, the section background transitions to a subtle gray (`bg-slate-50`).
  - **Auto-Scroll**: Selecting an option or adding a quantity automatically scrolls the view to the next available section.
  - **Nested Options**: Support for sub-selections (e.g., "Stuffed Crust" -> "Fill Type").

## 4. Shopping Cart & Basket
- **Floating Cart Button**: 
  - Hidden by default.
  - Appears once the first item is added with a bounce/scale animation.
  - Includes a red badge for total item count.
- **Cart Drawer (Bottom Sheet)**:
  - List of items with price and quantity controls.
  - **Editing**: A pencil icon on each item allows returning to the Customizer to update selections.
  - **Customization Review**: Accordion-style "Review condiments & addons" for items with selections.
  - **Price Summary**: Subtotal, Tax (8%), and Service Charge (10%) breakdown ($).
- **Auto-Empty Logic**: Removing the last item closes the drawer and shows a "Basket Empty" toast.

## 5. Checkout & Payment
- **Transition**: "Proceed to Checkout" triggers a smooth slide-into-view of the payment screen.
- **Payment Features**:
  - **Order Review**: Itemized list with customizations and quantity ($).
  - **Floating Summary Card**: Card-based pricing breakdown (Subtotal, Taxes, Tip, Total).
  - **Animate Tipping**: A friendly waving hand emoji animation.
  - **Tipping UX**:
    - **Currency**: Tip amounts are displayed in **AED**.
    - Grid of tip cards (AED 2, AED 4, AED 8, Custom).
    - Selected tips show an "X" button to remove.
    - "Custom" tip allows numerical entry directly inside the card.
  - **Split Bill**: Support for splitting the total among multiple diners.

## 6. UI/UX Standards
- **Theme**: HSL-based colors with `#12B4A3` as the primary brand color.
- **Typography**: Professional "Inter" typeface with balanced font weights (headers: 700/600, body: 400/500).
- **Design Tokens**: Large border-radius (`1.5rem` / `2.5rem`) for a premium feel.
- **Accessibility**: Semantic headers and ARIA labels for all interactive elements.

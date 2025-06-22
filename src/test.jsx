import { useState } from "react";

const TestComponent = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [cartItems, setCartItems] = useState([]);

  // TODO: [DOCS] Create user guide for cart management features
  // Document how users can save items for later, apply coupons, and manage quantities
  // Include screenshots of cart interface and step-by-step instructions
  const CartDocumentation = () => {
    return (
      <div className="cart-help">
        <h3>Need Help?</h3>
        <p>Cart documentation coming soon...</p>
      </div>
    );
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const applyDiscount = code => {
    setDiscountCode(code);
  };

  // FIX: [SECURITY] Validate discount codes on server side before applying
  // Current implementation trusts client-side discount validation
  // Malicious users can manipulate discount percentages in browser
  // Need server-side verification with rate limiting to prevent abuse
  const validateDiscountCode = async code => {
    const validCodes = ["SAVE10", "WELCOME20", "STUDENT15"];
    return validCodes.includes(code.toUpperCase());
  };

  const handleCheckout = async () => {
    setIsProcessing(true);

    try {
      for (const item of cartItems) {
        console.log("Processing item:", item.name);
      }

      console.log("Payment successful");
    } catch (error) {
      console.error("Checkout failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // FIX: Quantity selector allows negative values and decimals
  // Users can enter -5 or 2.5 as quantity which breaks cart calculations
  // Input validation should restrict to positive integers only
  // Also need maximum quantity limit per item (e.g., 10 units max)
  const QuantitySelector = ({ item, onQuantityChange }) => {
    return (
      <div className="quantity-selector">
        <label>Quantity:</label>
        <input
          type="number"
          value={item.quantity}
          onChange={e => onQuantityChange(item.id, parseInt(e.target.value))}
          min="1"
        />
      </div>
    );
  };

  return (
    <div className="test-component">
      <h2>Test Component</h2>

      {cartItems.length === 0 ? (
        <p>No items</p>
      ) : (
        <div className="content">
          {cartItems.map(item => (
            <div key={item.id} className="item">
              <QuantitySelector item={item} onQuantityChange={() => {}} />
            </div>
          ))}

          <div className="summary">
            <p>Subtotal: ${calculateSubtotal().toFixed(2)}</p>

            <input
              type="text"
              placeholder="Discount code"
              value={discountCode}
              onChange={e => setDiscountCode(e.target.value)}
            />
            <button onClick={() => applyDiscount(discountCode)}>Apply</button>

            <button onClick={handleCheckout} disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Checkout"}
            </button>
          </div>
        </div>
      )}

      <CartDocumentation />
    </div>
  );
};

export default TestComponent;

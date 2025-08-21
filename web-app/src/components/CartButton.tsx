"use client";

import { useState, useEffect } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon as CartSolidIcon } from "@heroicons/react/24/solid";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { isAuthenticated, useAuthState as onAuthStateChange } from "@/lib/auth";
import { useAuthPopup } from "@/components/AuthPopupProvider";
import Cart from "@/components/Cart";

type CartButtonProps = {
  className?: string;
};

export default function CartButton({ className = "" }: CartButtonProps) {
  const { cartCount, cartItems } = useCart();
  const { language } = useLanguage();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { showPopup } = useAuthPopup();

  const isPortuguese = language === "pt";

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setIsLoggedIn(!!user);
    });
    return unsubscribe;
  }, []);

  const handleCartClick = () => {
    if (isLoggedIn) {
      setIsCartOpen(true);
    } else {
      showPopup("add-to-cart", {
        type: "add-to-cart",
        redirectPath: "/cart",
      });
    }
  };

  return (
    <>
      <button
        onClick={handleCartClick}
        className={`relative p-3 text-secondary-600 hover:text-primary-500 transition-colors group min-h-[44px] min-w-[44px] flex items-center justify-center ${className}`}
        title={isPortuguese ? "Carrinho de Compras" : "Shopping Cart"}
      >
        {cartCount > 0 ? (
          <CartSolidIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500" />
        ) : (
          <ShoppingCartIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        )}

        {cartCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-action-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-bold animate-pulse">
            {cartCount > 99 ? "99+" : cartCount}
          </div>
        )}

        {/* Tooltip */}
        <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-secondary-900 text-white text-xs px-3 py-2 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
          {isLoggedIn
            ? cartCount > 0
              ? `${cartCount} ${
                  isPortuguese
                    ? cartCount === 1
                      ? "item"
                      : "itens"
                    : cartCount === 1
                    ? "item"
                    : "items"
                }`
              : isPortuguese
              ? "Carrinho vazio"
              : "Empty cart"
            : isPortuguese
            ? "Clique para se registar"
            : "Click to sign up"}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-secondary-900 rotate-45"></div>
        </div>
      </button>

      {isLoggedIn && (
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      )}
    </>
  );
}

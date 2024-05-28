import { createContext, useState } from "react";

export const UserProgressContext = createContext({
    progress: '', // cart, checkout, payment, success
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {},
});

export const UserProgressContextProvider = ({ children }) => {
    const [userProgress, setUserProgress] = useState("");

    function showCart() {
        setUserProgress("cart");
    };

    function hideCart() {
        setUserProgress("");
    };

    function showCheckout() {
        setUserProgress("checkout");
    }

    function hideCheckout() {
        setUserProgress("");
    }

    const context = {
        progress: userProgress,
        showCart: showCart,
        hideCart: hideCart,
        showCheckout: showCheckout,
        hideCheckout: hideCheckout,
    }; 


    return <UserProgressContext.Provider value={context}>{children}</UserProgressContext.Provider>;
};
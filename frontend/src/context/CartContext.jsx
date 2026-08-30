import { useState } from "react";
import { CartContext } from "./CartContext.js";



export function CartProvider({ children }) {

    const [cart, setCart] = useState([]);

    const addToCart = (product) => {

        setCart((currentCart) => {

            if (product.banderilla) {
                return [
                    ...currentCart,
                    {
                        ...product, id_carrito: crypto.randomUUID(),
                        cantidad: 1
                    }];
            }


            const productoExistente = currentCart.find(
                item => !item.banderilla && item.id_producto === product.id_producto
            );

            if (productoExistente) {

                return currentCart.map(item =>
                    item.id_carrito === productoExistente.id_carrito
                        ? {
                            ...item,
                            cantidad: item.cantidad + 1
                        }
                        : item
                );

            }

            return [
                ...currentCart,
                {
                    ...product,
                    id_carrito: crypto.randomUUID(),
                    cantidad: 1
                }
            ];

        });

    };


    const increaseQuantity = (id_carrito) => {

        setCart((currentCart) =>
            currentCart.map(item =>
                item.id_carrito === id_carrito
                    ? {
                        ...item,
                        cantidad: item.cantidad + 1
                    }
                    : item
            )
        );

    };


    const decreaseQuantity = (id_carrito) => {

        setCart((currentCart) =>
            currentCart
                .map(item =>
                    item.id_carrito === id_carrito
                        ? {
                            ...item,
                            cantidad: item.cantidad - 1
                        }
                        : item
                )
                .filter(item => item.cantidad > 0)
        );

    };


    const removeFromCart = (id_carrito) => {

        setCart((currentCart) =>
            currentCart.filter(
                item => item.id_carrito !== id_carrito
            )
        );

    };


    const clearCart = () => {

        setCart([]);

    };


        return (

            <CartContext.Provider
                value={{
                    cart,
                    addToCart,
                    increaseQuantity,
                    decreaseQuantity,
                    removeFromCart,
                    clearCart
                }}
            >

                {children}

            </CartContext.Provider>

        );
    }

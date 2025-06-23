import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import Button from "./Button";
import { SneakersType } from "../../types/SneakersType";

const ProductCard: React.FC<SneakersType> = ({ _id, name, price, image }) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="group relative bg-dark-card rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Image */}
      <Link
        to={`/products/${_id}`}
        className="block relative overflow-hidden aspect-square"
      >
        <img
          src={`http://localhost:3000${image}`}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {/* {product.isNew && (
                <span className="bg-primary text-white text-xs font-medium py-1 px-2 rounded">
              New
            </span>
            )} */}
          {/* {product.originalPrice && (
                <span className="bg-secondary text-dark text-xs font-medium py-1 px-2 rounded">
              {Math.round(
                  ((product.originalPrice - product.price) / product.originalPrice) * 100
              )}
                  % Off
            </span>
            )} */}
        </div>
      </Link>

      {/* Product info */}
      <div className="p-4">
        <h3 className="font-medium text-white mb-1 group-hover:text-primary transition-colors">
          <Link to={`/products/${_id}`}>{name}</Link>
        </h3>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-white font-semibold">
            ₽{Math.round(price).toLocaleString("ru-RU")}
          </span>
          {/* {product.originalPrice && (
            <span className="text-light-muted text-sm line-through">
              ₽{Math.round(product.originalPrice).toLocaleString("ru-RU")}
            </span>
          )} */}
        </div>

        <Button
          variant="primary"
          size="md"
          fullWidth
          onClick={handleAddToCart}
          icon={<ShoppingBag size={16} />}
        >
          В корзину
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;

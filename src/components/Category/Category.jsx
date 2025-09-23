import React from "react";
import { categoryData } from "./categoryFull";
import CategoryCard from "./CategoryCard";
import "./Category.css"; // <-- add css file

function Category() {
  return (
    <section className="category-section">
      <div className="category__list">
        {categoryData.map((infos) => (
          <CategoryCard key={infos.id} data={infos} />
        ))}
      </div>
    </section>
  );
}

export default Category;

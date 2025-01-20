import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/CategoryPage.css"; // Import the CSS file

const categories = [
  { "_id": "67370281067550940b14c09e", "name": "HTML5", "__v": 0 },
  { "_id": "673b1333b8008cc1e7390c80", "name": "React", "__v": 0 },
  { "_id": "6737028b067550940b14c0a0", "name": "CSS", "__v": 0 },
  { "_id": "6783efd45136df028e050ea7", "name": "JavaScript",  "__v": 0},
  { "_id": "67376b2357cf9e591771c2b5", "name": "WebBasics", "__v": 0 },
  { "_id": "6783d7fdac732165e38bde6e", "name": "Mongodb","__v": 0}

];

function CategoryPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
    if (!token) {
      alert("You must be logged in to access this page.");
      navigate("/login"); // Redirect to login page
    }
  }, [navigate]);

  const handleCategoryClick = (categoryId) => {
    navigate(`/videos/${categoryId}`);
  };

  return (
    <div className="category-page">
      <h1 className="category-page-title">Categories</h1>
      <div className="category-list">
        {categories.map((category) => (
          <div
            key={category._id}
            className="category-card"
            onClick={() => handleCategoryClick(category.name)}
          >
            <h3 className="category-name">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;

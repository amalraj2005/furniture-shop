import { useState, useEffect } from "react";
import { supabase } from "../supabase";

function Admin() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [customerPrice, setCustomerPrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const [showDeleteCategories, setShowDeleteCategories] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      console.log(error);
    } else {
      setProducts(data);
    }
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase.from("categories").select("*");

    if (error) {
      console.log(error);
    } else {
      setCategories(data);
    }
  };

  const addCategory = async () => {
    if (!newCategory) {
      alert("Please enter category name");
      return;
    }

    const { error } = await supabase
      .from("categories")
      .insert([{ name: newCategory }]);

    if (error) {
      alert(error.message);
    } else {
      alert("Category Added");
      setNewCategory("");
      setShowAddCategory(false);
      fetchCategories();
    }
  };

  const deleteCategory = async (id) => {
    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      alert("Category Deleted");
      fetchCategories();
    }
  };

  const addProduct = async () => {
    let imageUrl = "";

    if (image) {
      const fileName = `${Date.now()}-${image.name}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, image);

      if (uploadError) {
        alert(uploadError.message);
        return;
      }

      const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);

      imageUrl = data.publicUrl;
    }

    const { error } = await supabase.from("products").insert([
      {
        name,
        category,
        customer_price: customerPrice,
        cost_price: costPrice,
        description,
        image_url: imageUrl,
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Product Added Successfully");
      fetchProducts();

      setName("");
      setCategory("");
      setCustomerPrice("");
      setCostPrice("");
      setDescription("");
      setImage(null);
    }
  };
  const updateProduct = async () => {
  const { error } = await supabase
    .from("products")
    .update({
      name,
      category,
      customer_price: customerPrice,
      cost_price: costPrice,
      description,
    })
    .eq("id", editingProduct);

  if (error) {
    alert(error.message);
  } else {
    alert("Product Updated");

    setEditingProduct(null);

    setName("");
    setCategory("");
    setCustomerPrice("");
    setCostPrice("");
    setDescription("");

    fetchProducts();
  }
};
  const deleteProduct = async (id) => {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      fetchProducts();
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Admin Panel</h1>

      <div className="card shadow p-4 mb-5">
        <h3 className="mb-3">Add New Product</h3>

        <input
          className="form-control mb-3"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="form-control mb-2"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);

            if (e.target.value === "__new__") {
              setShowAddCategory(true);
            }
          }}
        >
          <option value="">Select Category</option>

          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}

          <option value="__new__">➕ Add New Category</option>
        </select>

        {showAddCategory && (
          <div className="mb-3">
            <input
              className="form-control mb-2"
              placeholder="New Category Name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />

            <button
              className="btn btn-success"
              type="button"
              onClick={addCategory}
            >
              Save Category
            </button>
          </div>
        )}

        <button
          className="btn btn-outline-danger mb-3"
          type="button"
          onClick={() => setShowDeleteCategories(!showDeleteCategories)}
        >
          Delete Category
        </button>

        {showDeleteCategories && (
          <div className="card p-3 mb-3">
            <h5>Delete Categories</h5>

            {categories.map((cat) => (
              <div
                key={cat.id}
                className="d-flex justify-content-between align-items-center border rounded p-2 mb-2"
              >
                <span>{cat.name}</span>

                <button
                  className="btn btn-danger btn-sm"
                  type="button"
                  onClick={() => deleteCategory(cat.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          className="form-control mb-3"
          type="number"
          placeholder="Customer Price"
          value={customerPrice}
          onChange={(e) => setCustomerPrice(e.target.value)}
        />

        <input
          className="form-control mb-3"
          type="number"
          placeholder="Cost Price"
          value={costPrice}
          onChange={(e) => setCostPrice(e.target.value)}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="form-control mb-3"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

{editingProduct ? (
  <button
    className="btn btn-warning w-100"
    onClick={updateProduct}
  >
    Update Product
  </button>
) : (
  <button
    className="btn btn-dark w-100"
    onClick={addProduct}
  >
    Add Product
  </button>
)}
      </div>

      <h3 className="mb-4">All Products</h3>

      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card shadow h-100">
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="card-img-top"
                  style={{ height: "220px", objectFit: "cover" }}
                />
              )}

              <div className="card-body">
                <h5>{product.name}</h5>
                <p>Category: {product.category}</p>
                <p>Customer Price: ₹{product.customer_price}</p>
                <p>Cost Price: ₹{product.cost_price}</p>
                <p>{product.description}</p>

<div className="d-flex gap-2">

  <button
    className="btn btn-warning w-50"
    onClick={() => {
      setEditingProduct(product.id);

      setName(product.name);
      setCategory(product.category);
      setCustomerPrice(product.customer_price);
      setCostPrice(product.cost_price);
      setDescription(product.description);
    }}
  >
    Update
  </button>

  <button
    className="btn btn-danger w-50"
    onClick={() => deleteProduct(product.id)}
  >
    Delete
  </button>

</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
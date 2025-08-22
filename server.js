// import express from "express";

// const app = express();
// const PORT = 3000;

// // GET endpoint for product ingredients
// app.get("/product", async (req, res) => {
//   const { barcode } = req.query;

//   if (!barcode) {
//     return res.status(400).json({ error: "Product name is required" });
//   }

//   try {
//     // const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
//     //   name
//     // )}&search_simple=1&action=process&json=1`;
//     const url = `https://world.openfoodfacts.net/api/v2/product/${encodeURIComponent(barcode)}`;


//     const response = await fetch(url);
//     const data = await response.json();

//     if (data.products && data.products.length > 0) {
//     //   const product = data.products[0];
//       return res.json({
//         // product: product.product_name,
//         // ingredients: product.ingredients_text || "No ingredients listed",
//         data:data
//       });
//     } else {
//       return res.status(404).json({ error: "No product found" });
//     }
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`✅ Server running at http://localhost:${PORT}`);
// });


// import express from "express";

// const app = express();
// const PORT = 3000;

// // GET endpoint for product ingredients
// app.get("/product", async (req, res) => {
//   const { barcode } = req.query;

//   if (!barcode) {
//     return res.status(400).json({ error: "Barcode is required" });
//   }

//   try {
//     const url = `https://world.openfoodfacts.net/api/v2/product/${encodeURIComponent(
//       barcode
//     )}`;
//     const response = await fetch(url);
//     const data = await response.json();

//     if (data.status === 1 && data.product) {
//       const product = data.product;
//       return res.json({
//         product: product.product_name || "Unknown",
//         ingredients: product.ingredients_text || "No ingredients listed",
//         raw: data, // optional: return full raw response
//       });
//     } else {
//       return res.status(404).json({ error: "No product found" });
//     }
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`✅ Server running at http://localhost:${PORT}`);
// });


// api for product name
// const url = `https://world.openfoodfacts.net/api/v2/search?categories_tags_en=${encodeURIComponent(productName)}`;


import express from "express";

const app = express();
const PORT = 3000;

// GET endpoint for product ingredients
// Barcode lookup
app.get("/product/barcode", async (req, res) => {
  const { barcode } = req.query;

  if (!barcode) {
    return res.status(400).json({ error: "Barcode is required" });
  }

  try {
    const url = `https://world.openfoodfacts.net/api/v2/product/${encodeURIComponent(barcode)}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 1 && data.product) {
      const product = data.product;
      return res.json({
        product: product.product_name || "Unknown",
        ingredients: product.ingredients_text || "No ingredients listed",
        last_updated_t: product.last_updated_t || null,
      });
    } else {
      return res.status(404).json({ error: "No product found for this barcode" });
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Search by product name
app.get("/product/search", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    const url = `https://world.openfoodfacts.net/cgi/search.pl?search_terms=${encodeURIComponent(
      query
    )}&search_simple=1&action=process&json=1&page_size=10`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.products && data.products.length > 0) {
      const results = data.products.map((p) => ({
        product: p.product_name || "Unknown",
        barcode: p.code || null,
        ingredients: p.ingredients_text || "No ingredients listed",
        last_updated_t: p.last_updated_t || null,
      }));
      return res.json({ results });
    } else {
      return res.status(404).json({ error: "No products found for this search" });
    }
  } catch (error) {
    console.error("Error searching products:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});



app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});


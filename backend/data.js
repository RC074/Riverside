import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Richard",
      email: "admin@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "John",
      email: "user@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],
  products: [
    {
      // _id: "1",
      name: "Echeveria Perle von Nurnberg",
      slug: "ECHEVERIA-PERLE-VON-NURNBERG",
      category: "succulent",
      image: "/images/1.webp",
      price: 5.75,
      inStockCount: 10,
      rating: 4.5,
      reviewsCount: 10,
      description:
        "This succulent is a beautifully colored Echeveria Perle Von Nurnberg. The plant is a hybrid of E. Gibbiflora v. Metallica and E. Potosina.",
    },
    {
      // _id: "2",
      name: "String of Pearls",
      slug: "STRING-OF-PEARLS",
      category: "succulent",
      image: "/images/2.webp",
      price: 7.75,
      inStockCount: 10,
      rating: 4.8,
      reviewsCount: 15,
      description: `Senecio Rowleyanus has pendant stems to 3' or more with unusual round "leaves" giving the impression of a "String of pearls plant". Both the stems and leaves are green.`,
    },
    {
      // _id: "3",
      name: "Sedum Donkey's Tail",
      slug: "SEDUM-DONKEY'S-TAIL",
      category: "succulent",
      image: "/images/3.webp",
      price: 6.75,
      inStockCount: 10,
      rating: 3.5,
      reviewsCount: 20,
      description:
        "Sedum Burrito/ Sedum Morganianum, also known as Burro's Tail or Donkey's Tail Succulent, is native to Mexico.",
    },
  ],
};

export default data;

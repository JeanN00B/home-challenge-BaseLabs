import prisma from "@/server/db";

async function main() {
  // Check if an admin user already exists
  const existingAdmin = await prisma.user.findFirst({
    where: { role: "admin" },
  });
  const existingUser = await prisma.user.findFirst({
    where: { email: "user@user.com" },
  });

  if (existingAdmin) {
    console.warn("Admin user already exists. No action taken.");
  } else {
    await prisma.user.create({
      data: {
        email: "admin@admin.com",
        name: "Admin",
        password: "admin",
        role: "admin",
      },
    });
  }

  if (existingUser) {
    console.warn("User already exists. No action taken.");
  } else {
    await prisma.user.create({
      data: {
        email: "user@user.com",
        name: "User",
        password: "user",
        role: "user",
      },
    });
  }

  console.log("Initial users created.");

  const existingProduct = await prisma.product.findFirst({
    where: { name: "corn" },
  });

  if (existingProduct) {
    console.warn("Product already exists. No action taken.");
  } else {
    await prisma.product.create({
      data: {
        name: "corn",
        description: "American sweet corn",
        price: 1,
        stock: 100,
        imageUrl:
          "https://images.unsplash.com/photo-1634467524884-897d0af5e104?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ammountLimit: 1,
        timeRangeLimit: 1,
      },
    });
  }

  console.log("Initial product created.");
  return;
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

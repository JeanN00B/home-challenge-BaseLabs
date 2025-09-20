import prisma from "@/server/db";

async function main() {
  // Check if an admin user already exists
  const existingAdmin = await prisma.user.findFirst({
    where: { role: "admin" },
  });

  if (existingAdmin) {
    console.log("Admin user already exists. No action taken.");
    return;
  }

  const email = process.env.ADMIN_EMAIL;
  const name = process.env.ADMIN_NAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !name || !password) {
    console.error(
      "Error, to setup the initial ADMIN, please provide the environment variables as described on example.env"
    );
    process.exit(1);
  }

  await prisma.user.create({
    data: {
      email,
      name,
      password,
      role: "admin",
    },
  });

  console.log("Initial admin user created.");
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

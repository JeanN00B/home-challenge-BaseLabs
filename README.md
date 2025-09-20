# Bob's Corn

## Thinking process:

Check the step by step documented [here](./THINKING-PROCESS.md)

## Clone this project:

1. Copy the repo:

```bash
gh repo clone JeanN00B/home-challenge-BaseLabs
cd home-challenge-BaseLabs
pnpm install
```

2. Setup a .env based on example.env:

```bash
#  Admin user will be created with this values if no admin exists!
 ADMIN_EMAIL = admin@domain.com
 ADMIN_NAME = admin
 ADMIN_PASSWORD = secretPassword123
```

3. Create and setup DB schemas:

```bash
pnpm run db:generate
pnpm run db:migrate
```

5. yarn run dev | build? --> executes admin check (if not user with status ADMIN, then register with ADMIN_EMAIL with status ADMIN...else, pass)

6. Create user, login into admin, CRUD, etc implementation.
7. TEST The original flow/idea

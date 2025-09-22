# Bob's Corn

## Introduction:

### Thinking process:

Check the step by step documented [here](./THINKING-PROCESS.md)

### To improve:

Check some of the areas I think we can improve this [here](./TO-IMPROVE)!

## Clone this project:

1. Copy the repo:

```bash
gh repo clone JeanN00B/home-challenge-BaseLabs
cd home-challenge-BaseLabs
pnpm install
```

2. Create and setup DB schemas:

```bash
pnpm run db:generate
pnpm run db:migrate
pnpm run db:seed
```

Then the database will be populated with this information:

```bash
Users:
- user: admin@admin.com
- password: admin

- user: user@user.com
- password: user

Products:
- corn ( +100 stock, with 1 item per 1 minute)
```

3. execute local dev:

```bash
pnpm run dev
```

4. Test the project!

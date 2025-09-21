Hello! this is the initial commit where I start the project (using NextJS for monorepo front + back simplicity, on a real project I would prefer a dedicated server with NestJS, express, fastAPI, etc.)

Here I show the result after a thinking process, where I tried to split the app into the different fields it is compossed,it has 3 main areas/entities that are involved:

- StoreItems{Corn}: The main and only item to buy in the store, we can standarize this by reading all availables products from a DB => (Execute requests by passing itemID and there we get):

  - ItemBuy => POST {userId, itemId, ammount}
    (reduce ammount of item, and registerInvoce)
  - BuyRateLimiter({itemId, ammount}) => (see docs )

    ```Typescript
    const {ammountLimit, timeRangeLimit} = searchItem(itemId);

    const hasInvoices = []
    const isTooManyItems = false

    if (timeRangeLimit > 0):
      const hasInvoices = searchInvoices(userId, timeRangeLimit);
      const itemAmmount = 0
      for invoice in hasInvoices:
        itemAmmount += length(invoice.filter(productId: itemId))
        if itemAmmount > ammountLimit;
          isTooManyItems = true

    if (hasInvoices AND isTooManyItems): {
      return {error: 429, message: "too many requests!"}
    }
    if ((request.ammount <= ammountLimit) && (ammountLimit > 0)):{
      const execute = ItemBuy();
      return execute.status
    }
    else: return {error: 429, message: "too many requests!"}
    ```

  - if (AdminRole):
    - AddInventory(itemId):
    - NewItem(name, ammount):

- Auth: To track a record of now many corn a specific user has bought, we need to identify the buyer (with a user) an how much that client has bought (invoices with clientId and ammount)

  - Login
  - Logout
  - UserRegister
  - UserBuyItem => Registers an Invoice if success 200, else 429.

- StorePage: FrontedPage
  - ListAvailableItems => availableProd.map(render item with BUY button)
  - InvociesInfo => Buys metadata:
    - GET all client invoices:
    - InvoicesList(render => date, ID, Items buyed, totalPrice)
    - InvoicesMetadata (itemsBuyed.map(items => totalItemsBuyed(items)))
  - if (AdminRole): StoreAnalytics(render all products and ammount buyed per day graph (shadCN or materialUI))

---

---

## Tasks:

### Backend

From sessions, request, etc endpoints exposure to consume on front

- [x] NextJS repo, Front + backend possibility (simple monorepo for the task)

- [ ] DB schemas:

  - [x] Prisma ORM + sqlite
  - [x] Users (names, email, password, ID, role (client | admin)); => Register/Check Admin on (build | dev) process with script
  - [x] Products (name, stock, ID, Price, ammountLimit, timeRangeLimit);
  - [x] Invoices (ID, clientId, productsArray[productId, ammount])
  - [ ] Seed script to init admin! + user!

- [ ] Backend that receives a POST to buy corn

  - [x] body: {userId, itemId, ammount}
  - [ ] RateLimit: Decorator (using userId, and productId) --> If no invoice on the last min, pass, if invoice and no productId, pass... ELSE, error 429.

- [x] Auth-based: (With many mockuped functionalities)
  - [x] Login => We need a JWT or similar to auth the user & transactions! (Using client ID by now)
  - [x] Logout => remove token from localStorage
  - [x] Register? => Set localstorage ID

## Frontend

Now consume this endpoints on React components that will be triggered on different Elements that the users will interact with..

- [ ] Bring MUI elements!

- [ ] MenuRoutes (

  - [ ] /auth --> /auth/login, /auth/signup
  - [ ] /auth/logout
  - [ ] /products --> /products/register, /products/update
        )

- [ ] Home (

  - [ ] Header --> {storeIcon + storeName} + MenuRoutes
  - [ ] Child --> {storeDashboard | authForm | adminDashboard}
  - [ ] Footer --> copyright, made with love and coffe by @JeanCamacho
        )

- [ ] StoreDashboard ()

  - [ ] DisplayStoreItems()

    - [ ] Image + title + description + price + buy + ammount(default=1)
    - [ ] BuyHandler() --> /product/buy(itemId, ammount, clientId:token)

  - [ ] DisplayUserInvoices (token)

    - [ ] If not token --> "Login to see your invoices"
    - [ ] Fetch from prisma by userId
    - [ ] useEffect to trigger sync each time buy is successfully + useMemo / useCallback??
    - [ ] Display table with --> id + products[productid, ammount]

- [ ] AuthForm ()

  - If already token --> "redirect to /home"
  - On lef button login, on right register
    - [ ] LoginForm
    - [ ] RegisterForm

- [ ] AdminDashboard()
  - if user.role not admin --> "redirect to /home"
  - [ ] RegisterProduct --> form + /product/register{request} button
  - [ ] ListAllProducts()
    - [ ] ProductCard()
    - [ ] EditProduct(id)
      - [ ] Popup with updateForm
      - [ ] Button to update--> /product/update{id, ...request}

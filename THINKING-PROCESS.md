Hello! this is the initial commit where I start the project (using NextJS for monorepo front + back simplicity, on a real project I would prefer a dedicated server with NestJS, express, fastAPI, etc.)

Here I show the result after a thinking process, where I tried to split the app into the different fields it is compossed,it has 3 main areas/entities that are involved:

- StoreItems{Corn}: The main and only item to buy in the store, we can standarize this by reading all availables products from a DB => (Execute requests by passing itemID and there we get):

  - ItemBuy => POST {userId, itemId, ammount}
    (reduce ammount of item, and registerInvoce)
  - BuyRateLimiter({itemId, ammount}) => (see docs )

    ```Typescript
    const {ammountLimit, timeRangeLimit} = searchItem(itemId);
    const hasInvoices = searchInvoices(userId, timeRangeLimit);

    if (!hasInvoices): {
      const execute =  ItemBuy();
      return execute.status
    }
    if (hasInvoices AND !itemId): {
      const execute = ItemBuy();
      return execute.status
    }
    if (request.ammount <= ammountLimit):{
      const execute = ItemBuy();
      return execute.status
    }
    else: return error 429
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

- [ ] NextJS repo, Front + backend possibility (simple monorepo for the task)

- [ ] DB schemas:

  - [ ] Prisma ORM + sqlite
  - [ ] Users (names, email, password, ID, role (client | admin)); => Register/Check Admin on (build | dev) process with script
  - [ ] Products (name, stock, ID, Price, ammountLimit, timeRangeLimit);
  - [ ] Invoices (ID, clientId, productsArray[productId, ammount])

- [ ] Backend that receives a POST to buy corn

  - [ ] body: {userId, itemId, ammount}
  - [ ] RateLimit: Decorator (using userId, and productId) --> If no invoice on the last min, pass, if invoice and no productId, pass... ELSE, error 429.

- [ ] Auth-based:
  - [ ] Login
  - [ ] Logout
  - [ ] Register?

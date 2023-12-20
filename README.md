# Project Setup

I used the offered codebase and worked on top of it.

## My initiative
### API
- A feature-based folder structure was implemented to improve readability and code reusability.
- Unit tests is implemented for the business logic.
- The business logic was decoupled from the HTTP API library (in this case, Express) to facilitate the migration of the logic to another library like Nest.js or Koa by using a wrapper function.

### Web
- Created a search module containing filter and result components and user search root to glue them together and manage the search page layout.
- The logic is centralized in the search service.
- I used a **Subject** from `rxjs` library to centralize the search result data which I could have used `ngrx store` but since the data were used only on the search page not the whole application I decided not adding it to reduce the dependencies and keep data available within the module scope.

## What would I have done if I had more time
- I would have added a pagination functionality to manage the data flow and prevent big request payloads.
- Introduced an extra service layer to enhance the separation of business logic from handlers. This guarantees that the fundamental business logic remains entirely detached from the operating environment. Currently, the logic is housed within the handlers, responsible for returning HTTP status codes.

## Architecture
I the architecture is been used on the backend is not my favorite but. If I was designing it I would have created models as interfaces and decoupled it from database schemas then used repository pattern to decouple business logic from the database operations, Also used .env file instead of a config file this approach will not be so easy to manage as the product grows.
Please refer to a test project I've recently done to checkout my approach on backend architecture.
https://github.com/meitix/todos (Done 3 weeks ago)

https://github.com/tad-group/app-platform-be (I did 4 years ago)
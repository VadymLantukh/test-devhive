# User Management Dashboard (Test Assignment)

This is a technical assignment demonstrating a React/Next.js application for managing a list of users. It features data fetching, client-side filtering, and local editing capabilities.

## 🚀 How to Run the Project

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/VadymLantukh/test-devhive.git
    cd test-devhive
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

---

## 🏗 Architecture & Design Decisions

### Tech Stack
-   **Framework:** Next.js 13+ (App Router)
-   **State/Data Fetching:** TanStack Query (React Query)
-   **UI Library:** Mantine v7 (Chosen for its seamless CSS-module based integration with Next.js App Router, avoiding hydration mismatches common with runtime CSS-in-JS libraries).
-   **Forms:** React Hook Form
-   **Language:** TypeScript

### Key Architectural Decisions

1.  **Client-Side Rendering (CSR) for the List:**
    Since the requirements involve interactive filtering and "local updates" to a mock API, I chose to manage the state on the client side using **TanStack Query**.
  * *Why:* It simplifies the logic for updating the cache locally (`queryClient.setQueryData`) without needing complex server-side hydration for a mock scenario.

2.  **Component Breakdown (Separation of Concerns):**
  * **`UserList` (Smart Container):** Manages state (fetching, filtering logic, modal visibility) and orchestrates data flow.
  * **`UserCard` (Presentational):** Pure component responsible only for rendering a single user item.
  * **`FilterBar` (Lifted State):** A controlled component that receives state from the parent, ensuring the logic stays in one place.
  * **`EditUserDialog` (Form Logic):** Handles form validation and submission.

3.  **Performance & Optimization:**
  * **Debouncing:** Implemented using `@mantine/hooks` (`useDebouncedValue`) for search inputs. This prevents excessive re-renders during typing (Nice-to-have requirement met).
  * **Derived State:** Filtering is calculated during the render pass, avoiding unnecessary `useEffect` calls.
  * **Stable Keys:** API IDs are used as keys for list rendering.

4.  **React Hook Form Integration:**
    For the edit functionality, **React Hook Form** is used via `<Controller />`.
  * *Pattern:* I utilized the `values` prop to reactively update the form when a new user is selected. This eliminates the need for manual `useEffect` synchronization between props and form state.

---


🔮 Improvements for Production
If this were a real-world production application, I would implement the following improvements:

Server-Side Pagination & Filtering: Currently, filtering is done on the client. In a real scenario with thousands of users, filtering and pagination should be handled by the backend API via URL Search Params.

Zod Schema Validation: While I used basic regex for email validation, using Zod integrated with React Hook Form would provide more robust, type-safe schema validation that can be shared between client and server.

Error Boundaries: Wrap the main components in a React Error Boundary to gracefully handle unexpected crashes in the UI.

E2E Testing: Add Cypress or Playwright tests to verify the "Edit User" flow and filtering logic.

## 📂 Project Structure

```text
src/
├── app/
│   ├── layout.tsx        
│   ├── page.tsx     
├── components/
│   ├── user-list.tsx   
│   ├── user-card.tsx     
│   ├── filter-bar.tsx    
│   └── edit-user-dialog.tsx
├── lib/
│   └── constants.ts        
├── service/
│   └── queries.ts      
├── providers/
│   └── app-providers.tsx  
└── types/
    └── types.ts
    


# CvSU Mini Store — Laboratory Exercise 4

React live search and filter project using `useState` and `useEffect`. This project continues the Mini Product Catalog from Laboratory Exercise 3 and retains the reusable `ProductCard`, product data, and Add to Cart feature.

## Run the project

1. Extract the ZIP file.
2. Open the `product-catalog-lab4` folder in VS Code.
3. Open a terminal in this folder.
4. Install packages:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL shown in the terminal, usually `http://localhost:5173`.

To check the production build, run `npm run build`.

## Features

- Controlled product search input.
- Category filter: All, Electronics, Books, School Supplies, Accessories.
- Sort: Default, Price: Low to High, Price: High to Low.
- 300ms debounce using `useEffect`, `setTimeout`, and `clearTimeout` cleanup.
- Keyword and category filtering work together.
- Sorting uses a copied array and does not mutate `products`.
- Result count and friendly empty state.
- Browser tab title updates with the number of results.
- Clear Filters resets keyword, category, and sort order.
- Lab 3 Add to Cart callback and cart message remain functional.
- Responsive CSS for desktop, tablet, and mobile.

## Project structure

```text
product-catalog-lab4/
├── src/
│   ├── components/
│   │   ├── ProductCard.jsx
│   │   ├── ProductCard.css
│   │   ├── SearchBar.jsx
│   │   └── SearchBar.css
│   ├── data/
│   │   └── products.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## Guide questions

1. **Why do we use two separate states, `searchText` and `debouncedSearch`, instead of only one?**  
   `searchText` updates immediately whenever the user types, so the input feels responsive. `debouncedSearch` updates only after the user pauses for 300 milliseconds. This prevents the product list from being filtered on every keystroke.

2. **What would happen if the debounce effect did not return a cleanup function?**  
   Older timers would keep running even when the user types again. They could update the debounced value using an earlier keyword. The cleanup function cancels the previous timer so only the final pause triggers the update.

3. **What is the purpose of the dependency array? What happens if it is empty (`[]`)? What happens if it is left out completely?**  
   The dependency array tells React when an effect should run again. An empty array means the effect runs after the component's initial mount (and its cleanup when it unmounts). If the dependency array is omitted, the effect runs after every render.

4. **Why should we avoid sorting the original `products` array directly?**  
   The `sort()` method changes the array it is called on. Sorting the original data could change its order for other parts of the application. This project copies the filtered results before sorting so the original `products` array stays unchanged.

5. **Is the filtered product list better stored in its own state, or calculated from existing state during rendering? Explain your choice.**  
   It is better to calculate it from the existing search, category, and sort states. The filtered list is derived data, so storing another copy in state could make it become out of sync. This project calculates it with `useMemo` from those values.

## Git branch and submission

If you are continuing your existing Lab 3 Git repository, open that repository and create the required branch **before making the Lab 4 changes**:

```bash
git switch main
git pull origin main
git switch -c lab4-live-search
```

Copy the Lab 4 files into that repository, then make at least four meaningful commits:

```bash
git add src/components/SearchBar.jsx src/components/SearchBar.css
git commit -m "Add reusable SearchBar component"

git add src/App.jsx
git commit -m "Add product filtering and sorting logic"

git add src/App.jsx
git commit -m "Implement 300ms debounced search effect"

git add src/App.jsx src/App.css README.md
git commit -m "Add result title effect and empty state"
```

Push the Lab 4 branch and the main branch:

```bash
git push -u origin lab4-live-search
git push origin main
```

Submit the URL of your GitHub repository. Keep the repository **Private** if you want access limited to your account. Do not add collaborators unless you decide to grant them access.

> If this ZIP is being used as a separate fresh repository rather than copied into your Lab 3 repository, initialize Git first with `git init`, create the `lab4-live-search` branch, and configure your GitHub remote before pushing.

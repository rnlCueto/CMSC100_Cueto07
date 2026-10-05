# CMSC100_Cueto07

# Exercise 07: Front-end Scripting
- Raven Nathalie L. Cueto
- BS Computer Science
- October 5, 2026

## Code Description
- A "Favorite Food" web page that is served by an Express JS server as static files and made dynamic with front-end JavaScript (DOM manipulation).
- Front-end code is separated into three files inside `static_files/`:
    - `index.html` (page structure),
    - `styles.css` (Barbie-themed styling), and
    - `form.js` (form validation and entry creation using the DOM).
- `server.js` serves everything inside `static_files/` using `express.static()`.
- The page layout follows the recommended interface of the exercise: 
    - a menu on the left, 
    - the form and food entries in the middle, and 
    - an ads column on the right.
    - A header was added on top.

### Page Behavior (`form.js`)
- The food entries section (`#food-entries`) is empty when the page loads.
- The form has four fields: Food name, Description, Image URL, and Rank, plus a Submit button.
- When Submit is clicked, the inputs are checked first:
    - No field may be empty (extra spaces are trimmed, so a field with only spaces counts as empty), otherwise an alert says `Please fill in all fields.`
    - Rank must be a number, otherwise an alert says `Rank must be a number.`
- If the inputs are valid, a new food entry (image, food name, description, and a Delete button) is created with `document.createElement()` and added to the section.
- Entries are kept in ascending order of rank (rank 1 first). Entries with the same rank stay in the order they were added.
- Clicking Delete on a entry removes only that entry (`parentNode.removeChild()`).
- After a successful submit, the form inputs are cleared.
- The Favorite Songs and Favorite Quotes menu items do nothing, since they are not part of the exercise.

### Static File Serving (`server.js`)
- Runs on port `3000`.
- `app.use(express.static('static_files'))` makes `index.html`, `styles.css`, and `form.js` reachable as URLs:
    - `http://localhost:3000/index.html`
    - `http://localhost:3000/styles.css`
    - `http://localhost:3000/form.js`
- As required by the exercise, the CSS and JS files are referenced in `static_files/index.html` using these full URLs (not relative paths).

### GitHub Pages Copy (`docs/`)
- GitHub Pages can only host static files and cannot run `server.js`, so a copy of the page lives in `docs/`.
- `docs/index.html`, `docs/styles.css`, and `docs/form.js` are identical to the ones in `static_files/`, except that `docs/index.html` links to `styles.css` and `form.js` using relative paths (the `localhost:3000` URLs would not work on GitHub Pages).
- Live page: `https://rnlCueto.github.io/CMSC100_Cueto07/`

## Project Structure
```
CMSC100_Cueto07/
├── server.js
├── package.json
├── .gitignore
├── README.md
├── static_files/        (served by Express)
└── docs/                (served by GitHub Pages)
```

## How to use
### Case 1: Run locally with the Express server
1. Install dependencies (only needed once):
```bash
   npm install
```
2. Start the server:
```bash
   node server.js
```
   - Wait for the `Server running at http://localhost:3000/index.html` message.
3. Open `http://localhost:3000/index.html` in a browser.
4. Fill in all four fields (Food name, Description, Image URL, Rank) and click Submit to add a food entry.
5. Add more Entries with different ranks to see them arranged from the lowest to the highest rank.
6. Click Delete on a entry to remove it.

### Case 2: Open the GitHub Pages version
1. Go to `https://rnlCueto.github.io/CMSC100_Cueto07/`.
2. Use the page the same way as steps 4 to 6 above (no server needed).

## Dependencies
- `express` — serves the front-end files as static files

## Notes
- `type="button"` is used for the Submit button so the page does not reload when it is clicked; the click is handled in `form.js`.
- Rank is checked using both `validity.badInput` (for number inputs where the browser rejects the typed value) and `isNaN()`, so the "rank must be a number" check works even if the browser does not block non-numeric characters.
- The ad images are Barbie: Life in the Dreamhouse thumbnails linked from YouTube; they only load while the links are available.
- `node_modules/` is excluded via `.gitignore`.
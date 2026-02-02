# Cute Quest

A single-page, personalized Valentine's Day "Love Quest" for **Irina**.  
Built with pure HTML, CSS, and Vanilla JavaScript. Zero frameworks, 100% chaos (Love Level 4).

## 💌 Concept
This is a small, interactive website that takes the user through a series of "chaotic" questions.
- **Wrong answers** are gently mocked (and trigger screen shakes).
- **Correct answers** are rewarded with confetti hearts.
- **One button** physically runs away from the cursor.
- **The End** is a heartfelt message.

## 🚀 How to Use on GitHub Pages
1. **Fork or Clone** this repository.
2. Go to **Settings** > **Pages** in your GitHub repository.
3. Under **Source**, select `main` (or `master`) branch.
4. Click **Save**.
5. Your Valentine's site is now live at `https://yourusername.github.io/my-valentine/`.

## 🛠 Tech Stack
- **HTML5** (Structure)
- **CSS3** (Animations, Variables, Flexbox)
- **Vanilla JS** (Logic, DOM Manipulation, Arrays)

## 🎨 Customization
### 1. Change the Name
Open `script.js` and change the `recipientName` variable:
```javascript
const recipientName = "Irina"; // Change this to your Valentine's name
```

### 2. Adjust Chaos Level
To make the "No" button move faster or slower, edit `script.js` in the `initMovingButton` function.

### 3. Edit Questions
All text and steps are stored in the `steps` array in `script.js`. You can add, remove, or modify steps easily.

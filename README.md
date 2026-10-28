# Asfaw Gedamu | Technical Portfolio

Welcome to my technical portfolio, showcasing my work in enterprise technology, back-end engineering, machine learning research, and developer capability development.

**Explore:** [Portfolio Website](https://asfawgedamu.github.io/) · [GitHub Projects](https://github.com/asfawgedamu) · [LinkedIn](https://linkedin.com/in/asfawgedamu)

## Structure

Plain HTML, CSS and JavaScript. No build step.

| File | Page |
| --- | --- |
| `index.html` | Home: introduction and links to the other pages |
| `work.html` | Selected work, with the research and API deep dives under their project cards |
| `resume.html` | Experience, education and skills |
| `code.html` | Live list of the other GitHub repositories |
| `contact.html` | Contact form |
| `cv.html` | Printable CV (save as PDF from the browser print dialog) |

Shared files: `assets/css/style.css` (colors and type are tokens at the top) and `assets/js/main.js` (theme, menu, tabs, repository list).

## Editing

- The header and footer are repeated in each page. If you change the navigation, change it in all five pages.
- `cv.html` repeats the experience, education and skills from `resume.html`. Update both when a fact changes (years, headcount, titles).
- The contact form needs somewhere to send messages. A static site has no server, so by default **Submit opens the visitor's email app** with the message filled in. To send straight from the page, set `scriptEndpoint` (a Google Apps Script web app that emails you from your own Gmail, no branding) or `formEndpoint` (a Formspree form URL) at the top of `assets/js/main.js`. `scriptEndpoint` wins if both are set.
- The three contact badges appear in the hero on the home page, under the header on every other page, and in every footer.
- To change which repositories appear on the Code page, edit `hideRepos` and `featuredRepos` at the top of `assets/js/main.js`.

## Deploying on GitHub Pages

1. The repository must be named `asfawgedamu.github.io`.
2. Copy these files into the repository root and push to `main`.
3. In the repository, open Settings, then Pages, and set the source to "Deploy from a branch", branch `main`, folder `/ (root)`.
4. The site is live at https://asfawgedamu.github.io/ within a minute or two. `.nojekyll` is included so the files are served as they are.

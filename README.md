# Asfaw Gedamu | Technical Portfolio

My portfolio brings together selected work in backend development, machine learning research, enterprise technology, and technical capability development.

[Portfolio Website](https://asfawgedamu.github.io/index.html) · [GitHub Projects](https://github.com/asfawgedamu) · [LinkedIn](https://linkedin.com/in/asfawgedamu)

## Structure

Built with HTML, CSS, and JavaScript. No build step required.

| File | Page |
| --- | --- |
| `index.html` | Home: introduction and navigation |
| `work.html` | Selected projects, research, and technical work |
| `resume.html` | Professional experience, education, and skills |
| `code.html` | GitHub repositories and selected projects |
| `contact.html` | Contact form and contact information |
| `cv.html` | Printable CV, suitable for saving as PDF |

Shared files: `assets/css/style.css` (site-wide styles and design settings) and `assets/js/main.js` (theme, navigation, tabs, repository listings, and contact form behavior).

## Editing

- The header, navigation, and footer are maintained across the individual HTML pages. Update the relevant pages when changing shared links or content.
- Keep `resume.html` and `cv.html` consistent when updating professional experience, education, skills, or other CV details.
- The contact form opens the visitor's email application with the message prefilled by default. To process submissions through a web service, configure `scriptEndpoint` for a Google Apps Script web app or `formEndpoint` for a Formspree form in `assets/js/main.js`. If both are configured, `scriptEndpoint` takes precedence.
- Contact badges appear in the home page hero section, beneath the header on other pages, and in the footers.
- To manage the repositories displayed on the Code page, update `hideRepos` and `featuredRepos` in `assets/js/main.js`.

## Deploying on GitHub Pages

1. Name the repository `asfawgedamu.github.io`.
2. Place the website files in the repository root and push the changes to the `main` branch.
3. In the repository, open **Settings → Pages**. Select **Deploy from a branch**, choose `main`, and set the folder to `/(root)`.
4. Once deployment completes, the site is available at [https://asfawgedamu.github.io/index.html](https://asfawgedamu.github.io/index.html). The `.nojekyll` file allows GitHub Pages to serve the site without Jekyll processing.

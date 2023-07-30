<p align="center">
  <img src="media/remixify-logo.png" width="100" alt="Repository logo" />
</p>
<h3 align="center">Remixify</h3>
<p align="center">Learning a Full Stack web framework called <b>Remix</b><p>
<p align="center"><a href="https://main--lhbelfanti-remixify.netlify.app/"><strong>➥ Live Demo</strong></a></p>
<p align="center">
    <img src="https://img.shields.io/github/repo-size/lhbelfanti/remixify?label=Repo%20size" alt="Repo size" />
    <img src="https://img.shields.io/github/license/lhbelfanti/remixify?label=License" alt="License" />
    <a href="https://www.udemy.com/course/remix-course/">
        <img src="https://img.shields.io/badge/Course-A435F0?&logo=Udemy&logoColor=white&label=Udemy" alt="Udemy Course" />
    </a>
    <img src="https://api.netlify.com/api/v1/badges/aa7ae8e5-d9e8-4549-b9a6-ca997c899e02/deploy-status" alt="Netlify" />
</p>

---
# Remixify

This repository contains the project created during this course:

<a href="https://www.udemy.com/course/remix-course/">
    <img src="https://img.shields.io/badge/Remix.js%20%20The%20Practical%20Guide-A435F0?&logo=Udemy&logoColor=white&label=Udemy" alt="Udemy Course" />
</a>

The project is a **Full Stack web application to manage your expenses with ease**.

In the course, the application is created using JavaScript and using the V1 of the Remix framework. But, exists a new version of Remix, the V2.

I challenge myself by completing the course not by using JavaScript and Remix V1, but using Typescript and Remix V2.

There are also two more thing that I changed to give the project the structure I'm used to:
1. The instructor creates a file for each React component. I changed that to have a folder with the name of the component, and within it a file called `index.tsx` (with all the component logic), another one called `styles.css` (for the styling) and the file `types.d.ts` where I define all the types used by the other files.
2. In the course you are given the CSS files needed, but they contain the styles for all the components in 4 files, one for each page. As I structured the components in folders, I was able to divide the 4 CSS files in many CSS, where each file contains the style for one component, and is contained within the folder of that component. On the other hand there are styles that are shared between components, those styles where added in 1 "global" CSS file.

Finally, as a comment I was also exploring the stylesheets options. I found that is easy to add the preprocessor SASS and to use Tailwind, but I didn't set up this project for it. 

## Technologies

As mentioned before, this application was made with [Remix V2](https://remix.run/) and [Typescript](https://www.typescriptlang.org/).

Remix contains many options for the deployment, in this opportunity the application is deployed in [Netlify](https://www.netlify.com/)

To persist the data [Atlas (Mongo DB cloud)](https://cloud.mongodb.com/) is used.

[Prisma](https://www.prisma.io/) to connect and talk with the DB.

## Project Structure

The project is divided in 3 main parts:
- The landing page: Where you can see the pricing and also go to the expenses page.
- The expenses page: Where you can see all your expenses, create new ones or edit/remove the existing ones.
- The authentication page: Where you can create a new account with email and password, login with that account and create expenses for that account. You can also logout.

## Main topics taught in the course
                                                                     
First of all the instructor teaches you the fundamentals by creating a simple application with Remix. It contains:
- Creation of a new Remix App from scratch (using simple configuration and JavaScript)
- Understanding the Remix Form component
- Loader and action functions
- Understanding of server side rendering
- Error handling
- Setting up page metadata
                                        
In the second part of the course, the instructor creates the app uploaded in this repository. With this project he deep dives into the concepts explained in the first part.
It contains:
- Deep dive into Routing and Layouts
  - Nested paths 
  - Different ways of navigation
- Deep dive into Data fetching & mutation
  - Explaining loader and action functions in deep
  - Creating a CRUD for expenses with Mongo DB + Prisma
  - Using query parameters
  - Deep diving into forms
  - Deep diving into error handling
- User authentication
  - Creating an user, logging in and logging out using Mongo DB + Prisma
  - Using cookies
  - Protecting Routes
- Optimizations and deployment
  - Custom response headers
  - Disabling JavaScript for some pages
  - Deploying to Netlify

---
## License

[MIT](https://choosealicense.com/licenses/mit/)

# Movie Explorer Website

## Brief Description

Frontend of the diploma project at Yandex Practicum.<br/>
A service where users can search for movies based on their keywords and save them in their personal account.

## How It Should Work

After registration and authorization on the website the user is directed to a movie search page with the ability to filter by short films. The user enters keywords in the search bar and clicks the "Search" button. The website performs the following actions:

- Sends a request to a movie service with the movie data, retrieves the data, and saves it.
- Finds all relevant movies based on the entered search text and displays cards with the movie information.
- When a user saves a movie, it is displayed in a special section of the website.

The website has several pages:

1. Homepage: Contains information about the project.
2. Movie page: Includes a movie search form and a section for displaying search results.
3. Saved movies page: Shows movies saved by the user.
4. Registration page: Allows users to create an account.
5. Login page: Users can log into the system.
6. Profile editing page: Allows users to update their account information.

There are reusable blocks on the pages, which are used multiple times throughout the website. The reusable components are created using React, and BEM is used to describe the styles.

Technologies and Tools Used:

- HTML5
- CSS3 with SCSS Preprocessor
- JavaScript ES6 with React.js Library
- Node.js for [Backend](https://github.com/chepash/movies-explorer-api)

---

To access the main page, you need to register or use the guest account details:

Email: test@me.com<br/>
Password: test

### [Open the website](https://chepamovies.nomoredomains.monster/)

### [Open the Figma](https://www.figma.com/file/3OE8S3r9Yt9nzpURHTEr1n/Diploma-CHEPA?type=design&t=UMbjtJyd9hwAP22v-6)

---

### Screenshots:

<a href="https://ibb.co/0sDL4PC"><img src="https://i.ibb.co/0sDL4PC/Movie-explorer-react-1.png" alt="Movie-explorer-react-1" border="0"></a> <a href="https://ibb.co/GdsHn1k"><img src="https://i.ibb.co/GdsHn1k/Movie-explorer-react-2.png" alt="Movie-explorer-react-2" border="0"></a> <a href="https://ibb.co/WypBw3J"><img src="https://i.ibb.co/WypBw3J/Movie-explorer-react-3.png" alt="Movie-explorer-react-3" border="0"></a>

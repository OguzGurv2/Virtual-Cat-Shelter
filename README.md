﻿# Project Virtual Cat Shelter

Game Version: v1.0.1

# Table of Contents

- [Introduction](#introduction)
- [Visual-Update](#last-update)
- [Tools-and-Software-Languages](#tools-and-Software-Languages)
- [Features](#features)
- [Challenges](#challenges)
- [Future-Ideas](#future-ideas)
- [Roadmap](#roadmap)
- [Conclusion](#conclusion)
- [Resources](#resources)
- [Installation](#installation)

# Introduction
This project's intents to indicate my knowledge on HTML, Javascript and CSS as a first year Software Engineering(BSc) Student.
Virtual Cat Shelter project is an adaption of 90's Tamagotchi game where you can adopt your own pet.
As a cat shelter it can only adopt out cats to their new owners with 4 different breed selection.
After adoption owners will be responsible of their cat's life.
Thus, the game's goal is control your cat to survive against different vital attributes such as hunger, lack of sleep etc. 

# Last-Update
- Death Screen visualition polished
- Website color theme changed
- Webpages polished
- Roadmap added to README.md

# Tools-and-Software-Languages
Along creating the Virtual Cat Shelter, I have used several web application tools to enchance the game system and make an user-friendly interface.

## Visual Code Studio
VS Code is a code editor redefined and optimized for building and debugging modern web applications.
- It has a beginner-friendly and colored interface to understand the coding concept and debugging. 
- This project used VS Code for uploading the game files to GitHub and coding.

## HTML
HTML is a standart markup language for Web pages. This project written in HTML5 which is the lastest version of HTML.
Right now Virtual Cat Shelter consist of 2 HTML pages, but this number will be increase in the next versions with the new features.

### [index.html](https://github.com/OguzGurv2/Virtual-Pet/blob/main/webpages/index.html)
This is the game landing page where you can create your own cat that is consist of 2 sections.
One is the user interface that is for selecting cat breeds and a naming the cat.
Other one is for displaying cat to show user how the cat breeds appears. 
Script Source: [index.js](https://github.com/OguzGurv2/Virtual-Pet/blob/main/webpages/static/index.js)
Stylesheet Source: [index.css](https://github.com/OguzGurv2/Virtual-Pet/blob/main/webpages/css/index.css).
Once clicking Adopt Me! button the page will change to other one that includes the game interface. 

#### Cat Breed Selection System
Currently Virtual Cat Shelter has 4 breeds;

- [Scottish](https://github.com/OguzGurv2/Virtual-Pet/blob/main/webpages/svgs/scottish.svg)
- [Garfield](https://github.com/OguzGurv2/Virtual-Pet/blob/main/webpages/svgs/garfield.svg)
- [Siamese](https://github.com/OguzGurv2/Virtual-Pet/blob/main/webpages/svgs/siamese.svg)
- [Turkish Van](https://github.com/OguzGurv2/Virtual-Pet/blob/main/webpages/svgs/van.svg )

This selection system runs with a [fieldset](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset) input element and several Javascript functions.

[HTML side](https://github.com/OguzGurv2/Virtual-Pet/blob/85034816f5df811c0b6bb6e2c022b976696ad599/webpages/index.html)

[Javascript side](https://github.com/OguzGurv2/Virtual-Pet/blob/d0af8f9645894d88655dee5efb0f45d60eda01cd/webpages/static/index.js)

#### Naming System
Currently Virtual Cat Shelter only have a basic naming system that is based of following rules;

- Should at least have 4 characters and maximum of 20 characters.
- Can not contain special characters and numbers.

This naming system runs with a [text](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) input element and several Javascript functions.

[HTML side](https://github.com/OguzGurv2/Virtual-Pet/blob/d0af8f9645894d88655dee5efb0f45d60eda01cd/webpages/index.html)

[Javascript side](https://github.com/OguzGurv2/Virtual-Pet/blob/d0af8f9645894d88655dee5efb0f45d60eda01cd/webpages/static/index.js)

### [pet.html](https://github.com/OguzGurv2/Virtual-Pet/blob/main/webpages/pet.html)
Script Source: [pet.js](https://github.com/OguzGurv2/Virtual-Pet/blob/main/webpages/static/pet.js)(In addition, this page's script source type is module, so there are more than one file controls the HTML)
Stylesheet Source: [pet.css](https://github.com/OguzGurv2/Virtual-Pet/blob/main/webpages/css/pet.css) 
This page has the game interface that is consist of three sections;

- Display Section (Displays Cat)
- User Interface (Has buttons to manipulate cat's stats)
- Pet Interface (Shows cat's stats)

#### Display Section
This section displays the virtual cat with plenty of animations. These animations represents cat's state throught the gameplay.

- Eyes:
Cat's eyes changes according to using the Sleep button and death animation. Normally, it's eyes does a blinking animation by CSS animations via [@keyframes](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes).
When it sleeps, eyes starts to close and in the death animation it's eyes turns into crosses.

- Body:
Cat's body changes according to using the Feed button. Over time, it shrinks at the same rate as the hunger bar does.
This animation made by the several Javascript function calculations, but for expressing the shrink it uses [scale](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale) that is adapted to Javascript code.
When the feeding button clicked it grows which resembles feeding simulation.

- Tail:
Cat's tail whisks depending on its happiness state, if it excited this animation gets quicker otherwise it gets more slower.
This animation made by several Javascript functions and also @keyframes CSS animation.
Animation's time changes made with this [code](https://github.com/OguzGurv2/Virtual-Pet/blob/d0af8f9645894d88655dee5efb0f45d60eda01cd/webpages/static/anims.js) by using [webkit-animation-duration](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration).

- Dirts:
Dirts starts to show up when the Clean bar goes down to a certain level.
These dirt images created by SVG and all of them is consist of [dirt.svg](https://github.com/OguzGurv2/Virtual-Pet/blob/main/webpages/svgs/dirt.svg).
Dirts' animation made by several Javascipt functions and calculations such as [Math.random()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) which makes the dirts pop up in different place each time. 

#### User Interface
This section consist of 4 buttons which manipulates cat's stats.

- Feed (Doesn't have toggling)
- Clean (Doesn't have toggling)
- Sleep (Toggles off and on with clicking)
- Pet (Doesn't have toggling)

#### Pet Interface
This section consist of cat's stats with bars and text.

- Bars:
Changes its level and color according to its state.

- Text:
Indicates the mood of the cat with color.

## Javascript
JS is a programming language that is used to code web applications. This project uses it on the client side for webpage behaviour.
Right now there are 5 Javascript files that consists the Virtual Cat Shelter. It could be more in the future if there will be a database update.

### [index.js](https://github.com/OguzGurv2/Virtual-Pet/blob/main/webpages/static/index.js)
This Javascript file has the code for game landing page aka. [index.html](https://github.com/OguzGurv2/Virtual-Pet/blob/main/webpages/index.html).
Has functions to manage naming, selecting and displaying a cat breed.
Uses [fetching method](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to displaying cat breeds.[code](https://github.com/OguzGurv2/Virtual-Pet/blob/d0af8f9645894d88655dee5efb0f45d60eda01cd/webpages/static/index.js)

### [pet.js](https://github.com/OguzGurv2/Virtual-Pet/blob/main/webpages/static/pet.js)
This Javascript file has the code for actual game page aka. [pet.html](https://github.com/OguzGurv2/Virtual-Pet/blob/main/webpages/pet.html).
It is a modular Javascript file that has several imports and exports. Controls the whole game with the other JS files except index.js. 
Mostly has the [intervals](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) to start the game functions.

### [gamemanager.js](https://github.com/OguzGurv2/Virtual-Pet/blob/main/webpages/static/gamemanager.js)
This Javascript file controls game's vital functions and buttons. Basically manages the whole game.
This file is connected to [pet.js](https://github.com/OguzGurv2/Virtual-Pet/blob/main/webpages/static/pet.js) and [globals.js](https://github.com/OguzGurv2/Virtual-Pet/blob/main/webpages/static/globals.js) by several imports and exports.

### [anims.js](https://github.com/OguzGurv2/Virtual-Pet/blob/main/webpages/static/anims.js)
This Javascript file is used only for managing cat's animations via CSS.
This file is connected to [pet.js](https://github.com/OguzGurv2/Virtual-Pet/blob/main/webpages/static/pet.js) and [globals.js](https://github.com/OguzGurv2/Virtual-Pet/blob/main/webpages/static/globals.js) by several imports and exports.

### [globals.js](https://github.com/OguzGurv2/Virtual-Pet/blob/main/webpages/static/globals.js)
This Javascript file has global variables that is used along the whole game system. For that reason all the Javascript files connected to it.

## Cascading Style Sheets (CSS)
CSS is a simple mechanism for adding style to HTML webpages. This project has only 2 CSS files for now.
There will be much more CSS files in future if this project will have more HTML pages.

### [index.css](https://github.com/OguzGurv2/Virtual-Pet/blob/main/webpages/css/index.css)
This CSS file is used to style [index.html](https://github.com/OguzGurv2/Virtual-Pet/blob/main/webpages/index.html).
Also uses TrueType Font from Google's fonts.

### [pet.css](https://github.com/OguzGurv2/Virtual-Pet/blob/main/webpages/css/pet.css)
This CSS file is used to style [pet.html](https://github.com/OguzGurv2/Virtual-Pet/blob/main/webpages/pet.html).
Also uses TrueType Font from Google's fonts to match with the Game Landing Page aka. [index.html](https://github.com/OguzGurv2/Virtual-Pet/blob/main/webpages/index.html).

## Scalable Vector Graphics
SVG is used to define vector-based graphics for the Web. Uses XML format and having support for interactivity and animation.
This project has 5 SVG files including cat breed images and a dirt stain image.
I have create 4 cat breed SVG files with my own knowledge. But, I took the dirt stain image from an open SVG [source](https://freesvg.org/vector-graphics-of-splash-stain-pictogram). Resize and changed it a little to fit the game.

# Features
Virtual Cat Shelter project consist of 19 fundamental and side features that constitutes the game's system;

- Has a web server to host the web application

- Uses LocalStorage to store the data 

- Has a naming system with basic rules

- Handles button spamming by giving timeouts

- Has multiple pets to play to enrich the gameplay

- Has a display section for pets to show users before the game starts

- Cat and its stats displayed in a basic interface to ease the gameplay

- Cat's has idle animations to keep user's focus (blinking and whisking)

- A cat has 4 attributes(Sleep, Clean, Hunger, Pet) that manipulates equally its mood

- Except Pet Button each button has both negative and positive effects to the attributes.

- In sleeping animation user can not interact with cat except waking up the cat

- Happiness of the cat manipulates its tail's animation 

- Except Pet Button every button has an unique animation

- Pet attribute is an extra attribute to boost cat's happiness

- Pet can age but can not die from old age

- Pet can die after a time if the attributes' level(Except Pet) reaches to zero

- Pet also can die if all the attributes reaches to zero at the same time from neglecting

- There is a death animation when pet dies also other idle animations (whisking and blinking) stops

- Death screen shows the time that pet lived with 4 different death causes

- Has a return button when game ends to ease the access to the Game Landing Page

# Challenges
There are the challenges that I had throughout the Virtual Cat Shelter Project:

## Making the code much more simplier, efficient and compact
Partially solved it with using more for loops instead of having if statements.
Example codes that the Virtual Cat Shelter has;

- Example for if statements:
[code](https://github.com/OguzGurv2/Virtual-Pet/blob/0043475558d4514176a4bfc3acbf0e730684561e/webpages/static/anims.js)

In this code, I had a problem with writing a for loop that works with numbers.
Couldn't solved it, but still looking forward to solve it after learned Recursive concept.

- Example for for loops:
[code](https://github.com/OguzGurv2/Virtual-Pet/blob/b2fa57a3cc343242cee27303c6976da897bef492/webpages/static/anims.js)

In this code, I had lot of if statements before to manage the functions.
Solved it with specific for loop depends on object's values.

## Creating a naming system
Solved it with a basic system that does not allow user to use special characters and 4-20 characters limit.
[code](https://github.com/OguzGurv2/Virtual-Pet/blob/b2fa57a3cc343242cee27303c6976da897bef492/webpages/static/index.js)

## Creating a displaying system for selecting cats before game starts
Solved it and also made it much more simplier by having a one line [fetch code](https://github.com/OguzGurv2/Virtual-Pet/blob/b2fa57a3cc343242cee27303c6976da897bef492/webpages/static/index.js).

[code itself](https://github.com/OguzGurv2/Virtual-Pet/blob/b2fa57a3cc343242cee27303c6976da897bef492/webpages/static/index.js)

# Future-Ideas

- Having an account page for managing pets

- Having a mini-game to draw more attention

- High score boards

- Too much food, sleeping or cleaning can harm the pet or either kill the pet

- Achieving cosmetics by mini-games

- More historical user statistics

# Roadmap

- A working pet animation

- Dark mode + more polished webpages

- A fully working database based on cat's names (SQLite)

- Account systems for database (SQLite)

# Conclusion
The Virtual Cat Shelter project was my first year project on Software Engineering(BSc). Althought I did not have a background of HTML, CSS and JS before, I manage to solve most of the challenges that I faced along the way. As a result, I learned that having an efficient code is also one of the substantial outcome of a software engineer. 

# Resources
These are the resources that I have used for this project:

## Google Fonts
[Google Fonts. (2019). Google Fonts. https://fonts.google.com](https://fonts.google.com)

## MDN
[MDN Web Docs. (2019, May 29). MDN Web Docs. https://developer.mozilla.org/en-US/](https://developer.mozilla.org/en-US/)

## SVG Resizing Website
[Resize SVG Online - Free SVG Resizer Tool. (n.d.). Pixelied.com. Retrieved April 24, 2023, from https://pixelied.com/features/resize-image/resize-svg](https://pixelied.com/features/resize-image/resize-svg)

## Stack Overflow
[StackOverFlow. (2019). Stack Overflow - Where Developers Learn, Share, & Build Careers. Stack Overflow. https://stackoverflow.com](https://stackoverflow.com)

## Font Awesome
[Use a Kit. (n.d.). Fontawesome.com; Fonticons, Inc. Retrieved July 16 C.E., from](https://fontawesome.com/docs/web/setup/use-kit)

## Dirt SVG
[Vector graphics of splash stain pictogram | Free SVG. (2019). Freesvg.org. https://freesvg.org/vector-graphics-of-splash-stain-pictogram](https://freesvg.org/vector-graphics-of-splash-stain-pictogram)

# Installation
Installation Steps by using Zip file:

1. Download the zip file by clicking the Code Button

2. Unfold the zip file and open it with any code editor

3. Open terminal and paste:
    `npm i`
    `npm start`

4. Open your browser and in the browse section paste:
    `http://localhost:8080`

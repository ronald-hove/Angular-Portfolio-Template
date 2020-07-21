# Open Source Portfolio Site Template

This is a free portfolio template I wrote in angular for my own portfolio hosted @

https://ronald-hove.github.io/

# Index

  - [Usage](#usage)
  - [Add your own data](#add-your-own-data)
  - [Json data store rules](#simple-rules-for-json-formatting-data)
  - [Linkify pipe](#linkify-pipe)
  - [Download resume](#download-resume)
  - [Deployment](#deployment)


# Usage

Clone the repo, then...

run 
```bash
npm i
```

Serve
```bash
ng serve
```

# Add your own data

The app uses a simple local json data store to render data dynamically.

JSON data store files are located in **/src/assets/**

Use the following data interfaces to add your own information to the portfolio.

**Profile Data**

- In this section, icons for socials can found on [font-awesome](https://fontawesome.com/icons?d=gallery)

```ts
export interface Profile {
  email: string;
  location: string;
  name: string;
  phone: string;
  avatar: string;
  education: Education[];
  about: string;
  socials: Social[];
}

export interface Education {
  title: string;
  meta: string;
}

export interface Social {
  name: string;
  link: string;
  icon: string;
}
```

**Top Skills Data**

```ts
export interface TopSkills {
  top_skills: string[];
}
```

**Work History Data**

```ts
export interface WorkExperience {
  work: Work[];
}

export interface Work {
  date: string;
  title: string;
  description: string;
  stack: string[];
}

```

**Featured Projects Data**
```ts
export interface Projects {
  projects: Project[];
}

export interface Project {
  preview: string;
  created_at: string;
  name: string;
  description: string;
}

```

# Simple rules for json formatting data

- To separate text into paragraphs, use  the new line escape character '\n\n'
- Add a white space before a link in text strings i.e 'This is some long string\n\n [white_space] https://now-this-is-alink.com'
- Follow the data formatting in the included data interfaces

# Linkify pipe

You may want to include links in your project descriptions to reference externally hosted projects.

No worries

There is an included pipe that identifies links and renders them correctly even if 
they were just included as plain text and not correctly formatted html.

**NOTE** follow the simple rules for json formatting above to ensure no errors

```ts
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'linkify'
})
export class LinkifyPipe implements PipeTransform {

  // tslint:disable-next-line: variable-name
  constructor(private _domSanitizer?: DomSanitizer) {}

  transform(value: string): any {
    if (value) {
      const temp = value.split(' ');
      const indexOfOccurrence: any[] = [];
      const links = temp.filter((subStr, index) => {
        const condition = subStr.trim().startsWith('http') || subStr.trim().startsWith('https');
        if (condition) {
          indexOfOccurrence.push(index);
        }
        return condition;
      });
      links.forEach((link, indx) => {
        temp[indexOfOccurrence[indx]] = `<a href="${link}" target="_blank">${link}</a>`;
      });
      return this._domSanitizer.bypassSecurityTrustHtml(temp.join(' '));
    }
  }

}

```

# Download resume

- To enable download resume button, simply convert your pdf Resume into [base64](https://base64.guru/converter/encode/pdf)
- Make sure to select Data URI --data:content/type;base64

Add the base64 string to the json file located in **/src/assets/media/base64/CV.json**
- Use the following data interface

```ts
export interface Resume {
  resume: string;
}
```

# Deployment

To build run

```bash
ng build --prod --buildOptimizer=true
```

Deploy the output files located in **/dist/** to your favorite hosting platform. Enjoy & share :)

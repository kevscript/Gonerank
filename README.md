## The story behind Gonerank

As an avid football fan I've always been pretty vocal about the performances of my favorite teams. Same can be said about every other passionate supporter out there.

But as many as we are, I've never came across a specialized plateform which would allow the fans to gather and share their opinions. There has been a growing frustration for years amongst the fans about misleading evaluations from medias and journalists, completely diverging from reality.

There is nothing like an educated point of view of a concerned supporter following every match and training session. Despite how relevant they are, supporters are often the ones getting dismissed. They deserve their own tribune.

That's why I created Gonerank.

## What is Gonerank

Gonerank is a performance rating plateform for Lyon's football team. The idea is pretty simple. After every match, supporters have the opportunity to submit a rating for each player and share it on Twitter. The votes are open until the next match.

The application tracks those evaluations and computes them into readable statistics, that can be used to follow the progress of the team or its players.

## The stack

First things first : Its a living sandbox project and its evolving.

This project has seen numerous iterations in the last few years. Most of the methodology and technologies I've used so far are either educated choices based on tests and failures made on previous iterations, or simply an opportunity to learn something new.

Gonerank is a NextJS application written in Typescript and hosted on Vercel. The data is stored on a PostgresQL database managed through Prisma and hosted by Supabase. The Graphql Api is generated in a code-first approach with Nexus, served through an Apollo server, and managed by the Apollo client.

As a Javascript oriented developer, I've been using Typescript occasionaly. But this project is the perfect opportunity to use it in a sizable application, which helped me understand how helpful it can be when handling more complex environments.

As someone very attached to the React ecosystem, NextJS was also next in line. I heard great things about the framework's versatility and performances. I want to leverage its server-side and static features to help mitigate the impact a data heavy api and complex queries could have on the client performances.

PostgresQL is my entry ticket to the world of relational databases. I've been using MongoDB until this point, but previous iterations of this project showed me how tedious a non-relational database can be in some scenarios.

GraphQL's flexibility combined with nested relations allows me to retrieve specific data and display tailored statistics.

I'm using Prisma to facilited my transition from NoSQL to SQL.

Nexus is the tool I chose for a code-first approach, implements well in a type safe environment.

When it comes to the Apollo Server, its been my default go-to solution for past projects, but my plan is to eventualy switch to a more performant alternative like Mercurius (if I manage to set it up properly).

Finally, I've migrated to Supabase from Heroku hosting for 2 reasons. The first being a more generous freemium plan with a cloud storage. The second one is resolving problems I had with Heroku like sleeping/inactivity mode or Prisma migrations and shadow databases.

## Other noticable tools

- Graphql Code Generator to generate type safe queries.
- Next-Auth for handling the Twitter authentication layer.
- React Hook Form for form management and validation.
- TanStack Table v8 (React-Table) for tables.
- Jest & React Testing Library for testing.

## To do

- Implement a server-side or static solution (most likely ISR) to compute archived statistics.
- Look for a more performant GraphQL server, some queries feel slow and the database host or the client do not seem at fault.

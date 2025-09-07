# Marketing Leads

This project is a RESTful API built with Node.js, Express, and TypeScript, using Prisma as the ORM to manage data for leads, campaigns, and groups. The API's architecture follows the Controller-Service-Repository pattern, ensuring modular, easily maintainable, and testable code.

## Project structure

```
└── src/
    ├── controllers/
    │   ├── schema/
    │   │   ├── CampaignsRequestSchema.ts
    │   │   ├── GroupsRequestSchema.ts
    │   │   └── LeadRequestSchema.ts
    │   ├── CampaignsControllers.ts
    │   ├── CampaignsLeadsControllers.ts
    │   ├── GroupLeadsControllers.ts
    │   ├── GroupsControllers.ts
    │   └── LeadsControllers.ts
    ├── database/
    │   └── prisma/
    │       └── prisma.ts
    ├── errors/
    │   └── HttpError.ts
    ├── middlewares/
    │   └── errorHandler.ts
    ├── repositories/
    │   ├── prisma/
    │   │   ├── PrismaCampaignsRepository.ts
    │   │   ├── PrismaGroupsRepository.ts
    │   │   └── PrismaLeadsRepository.ts
    │   ├── CampaignsRepository.ts
    │   ├── GroupsRepository.ts
    │   └── LeadsRepository.ts
    ├── routes/
    │   ├── campaignsLeadsRoutes.ts
    │   ├── campaignsRoutes.ts
    │   ├── groupsLeadsRoutes.ts
    │   ├── groupsRoutes.ts
    │   └── leadsRoutes.ts
    ├── services/
    │   ├── CampaignsLeadsService.ts
    │   ├── CampaignsService.ts
    │   ├── GroupsService.ts
    │   └── LeadsService.ts
    └── server.ts
├── .env.example
├── .gitignore
├── package-lock.json
├── package.json
└── tsconfig.json
```
## Features
The API offers the following endpoints for managing marketing data:

## Leads

- `GET /api/leads` Lists all leads with support for pagination, sorting, and filtering by name, status, group, or campaign.
- `GET /api/leads/:id` Returns the details of a specific lead.
- `POST /api/leads` Creates a new lead.

**Body example:**
```
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "phone": "999999999",
  "status": "New" //If not informed, it is created as "new"
}
```
- `PUT /api/leads/:id` Updates an existing lead.

**Body example:**
```
{
  "name": "John Doe Updated", //Optional
  "status": "Contacted" //Optional
}
```
- `DELETE /api/leads/:id` Deletes a lead.

## Groups

- `GET /api/groups` Lists all groups.
- `GET /api/groups/:id` Returns the details of a specific group, including its leads.
- `POST /api/groups` Creates a new group.

**Body example:**
```
{
  "name": "Digital Marketing Group",
  "description: "Description..."
}
```
- `PUT /api/groups/:id` Updates a group.

**Body example:**
```
{
  "name": "Digital Marketing Group Updated" //Optional
  "description": "New description.." //Optional
}
```
- `DELETE /api/groups/:id` Deletes a group.
- `POST /api/groups/:groupId/:leads` Adds a lead to a group.
- `DELETE /api/groups/:groupId/leads/:leadId` Removes a lead from a group.

## Campaigns

- `GET /api/campaigns` Lists all campaigns.
- `GET /api/campaigns/:id` Returns the details of a specific campaign, including its leads.
- `POST /api/campaigns` Creates a new campaign.

**Body example:**
```
{
  "name": "Campaign name",
  "description"; "Campaign description",
  "startDate": "YYYY-MM-DD",
  "endDate": "YYYY-MM-DD" //Optional
}
```

- `PUT /api/campaigns/:id` Updates a campaign.

**Body example:**
```
{
  "name": "New campaign name",  //Optional
  "description"; "New campaign description",  //Optional
  "startDate": "YYYY-MM-DD",  //Optional
  "endDate": "YYYY-MM-DD" //Optional
}
```
- `DELETE /api/campaigns/:id` Deletes a campaign.
- `POST /api/campaigns/:campaignId/leads` Adds a lead to a campaign.
- `PUT /api/campaigns/:campaignId/leads/:leadId` Updates a lead's status within a campaign.
- `DELETE /api/campaigns/:campaignId/leads/:leadId` Removes a lead from a campaign.

## Technologies Used

- Node.js: The runtime environment.
- Express.js: The web framework for creating the API.
- TypeScript: A programming language with static typing.
- Prisma: An ORM (Object-Relational Mapper) for database interaction.
- Zod: A schema validation library.
- tsx: For automatic server restarts during development.
- cors: Middleware to enable CORS.

## Installation and Execution
Follow these steps to set up and run the project on your local machine.

### Prerequisites

- Node.js
- npm
- PostgreSQL

### Steps

**Clone the repository:**
```
git clone https://github.com/jvssvj/Marketing-Leads.git
cd Marketing-Leads
```

**Install dependencies:**
```
npm install
```
**Configure the database and Prisma:**

Create a `.env` file in the project root and configure your database URL.
```
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:PORT/DATABASE?schema=public"
```
**Run Prisma migrations:**
```
npx prisma migrate dev --name init
This command creates the database and tables based on your schema.prisma file.
```
**Start the development server:**
```
npm run dev
The server will start on port 3000 and automatically restart on code changes.
```
**Start the production server:**
```
npm run build
npm run start
```
The `build` command compiles the TypeScript code to JavaScript. The start command executes the compiled code.
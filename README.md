# Smart Charging Station ESP, Arduino and Server Code

Our main objective was to create this project was to reduce the charging cost for all types of charging devices (bikes, cars, mobile, etc.)
here is a simple list of all the types of technology that we have used

- AWS
- ESP32
- Arduino
-JavaScript
- TypeScript
- ReactJs, NextJs

## activeChargingDevices.ts

This file contains the function to get the list of active charging devices. The function takes a user ID as input and returns a list of objects, each of which represents a charging device. The objects contain the following information:

- Device ID
- Device name
- Device status
- Device location

## activeChargingStations.ts

This file contains the function to get the list of active charging stations. The function takes a user ID as input and returns a list of objects, each of which represents a charging station. The objects contain the following information:

- Station ID
- Station name
- Station status
- Station location

## activeUsers.ts

This file contains the function to get the list of active users. The function returns a list of objects, each of which represents a user. The objects contain the following information:

- User ID
- User name
- User email
- User phone number
- User status

## deleteUser.ts

This file contains the function to delete a user. The function takes a user ID as input and deletes the user from the database.

## getDataFromEsp32.ts

This file contains the function to get data from an ESP32 device. The function takes an ESP32 device ID as input and returns a JSON object containing the data from the device. The data may include the following information:

- Device temperature
- Device battery level
- Device status
- signin.ts

This file contains the function to sign in a user. The function takes a user name and password as input and returns a token that can be used to access the API.

## signout.ts

This file contains the function to sign out a user. The function takes a token as input and signs out the user from the API.

## signup.ts

This file contains the function to sign up a user. The function takes a user name, email, and password as input and creates a new user in the database.

## updateUser.ts

This file contains the function to update a user. The function takes a user ID and the new user information as input and updates the user in the database.


This is a [Next.js](https://nextjs.org/) frontend project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

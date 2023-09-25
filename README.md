This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:55000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

<------------- INSTALACION FRONTEND------------->

1.- Instalar node version 18.16.0 o mayor

2.- Ejecutar comando 'npm install' para instalar dependencias

3.- Utilizar el comando 'npm run dev', esto creara un servidor en el puerto 5500 de manera local


<------------- INSTALACION BACKEND------------->

1.- Instalacion de XAMPP para utilizar php (ultima version)

2.- Instalacion de la ultima version de composer.

3.- Instalacion de postgresql version 14

4.- Ya instalado XAMPP se agrego la extension pdo_pgs y la extension de pgs para utilizar postgres y establecer 
conexion a la base de datos

Craear base de datos con el nombre tasks y en el archivo de .env en las variables cambiar la contraseña y el usuario.

Una vez creada la base de datos ejecutar el comando php artisan migrate 

Ya ejecutado y con los modelos creados en y las tablas creadas en postgres ejecutar el comando php artisan db:seed para crear registros iniciales en la aplicacion.
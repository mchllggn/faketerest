# Faketerest

Faketerest is a Pinterest-inspired Laravel application for saving and managing image pins. Users can register or log in, upload image-based pins, browse pins in a responsive grid, and manage their own profile and content.

## Features

- Email/password authentication with Laravel Breeze
- Facebook login via Laravel Socialite
- Verified, authenticated user area
- Create pins with a title, optional description, and image upload
- Preview uploaded images before saving
- View, edit, replace, and delete your own pins
- Profile page with the user's pin collection
- Snowflake-style IDs for users and pins
- Responsive React UI powered by Inertia.js and Tailwind CSS

## Tech Stack

- Laravel 12
- PHP 8.2+
- Inertia.js
- React 18
- Tailwind CSS
- Vite
- Laravel Breeze
- Laravel Socialite
- SQLite by default

## Requirements

- PHP 8.2 or newer
- Composer
- Node.js
- pnpm or npm
- SQLite, MySQL, PostgreSQL, or another Laravel-supported database

## Installation

Clone the project and install the backend and frontend dependencies:

```bash
composer install
pnpm install
```

Create your environment file and application key:

```powershell
cp .env.example .env
php artisan key:generate
```

Prepare the database. The default `.env.example` uses SQLite, so create the database file if it does not exist:

```powershell
New-Item -ItemType File database/database.sqlite
php artisan migrate
```

Create the public storage link so uploaded pin images can be served from `/storage`:

```bash
php artisan storage:link
```

## Running the App

Start the Laravel server:

```bash
php artisan serve
```

In another terminal, start Vite:

```bash
pnpm dev
```

Open the app at:

```text
http://127.0.0.1:8000
```

You can also use the Composer development script to run the server, queue listener, logs, and Vite together:

```bash
composer run dev
```

## Facebook Login

Facebook OAuth is configured through `config/services.php`. Add these values to your `.env` file when you want to enable Facebook login:

```env
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret
FACEBOOK_REDIRECT_URI="${APP_URL}/auth/callback"
```

Make sure the callback URL in your Facebook app settings matches the `FACEBOOK_REDIRECT_URI` value.

## Image Uploads

Pins require an image file up to 10 MB. Uploaded images are stored on the public disk under the `pins` directory and displayed through Laravel's `/storage` symlink.

If images do not appear, run:

```bash
php artisan storage:link
```

## Useful Commands

```bash
php artisan migrate
php artisan test
pnpm dev
pnpm build
composer run dev
```

## Project Structure

- `app/Http/Controllers/PinController.php` handles pin creation, viewing, updating, and deletion.
- `app/Models/Pin.php` defines the pin model and ownership relationship.
- `resources/js/Pages/Home.jsx` displays the authenticated pin grid.
- `resources/js/Pages/Profile.jsx` displays the user's profile and pin collection.
- `resources/js/Pages/Pins/Create.jsx` contains the pin upload form.
- `resources/js/Pages/Pins/Show.jsx` contains the pin detail, edit, and delete view.
- `routes/web.php` defines the main pages, auth-protected routes, pin routes, and OAuth redirects.

## Testing

Run the Laravel test suite with:

```bash
php artisan test
```

## License

This project is built on Laravel and is open-sourced under the MIT license.

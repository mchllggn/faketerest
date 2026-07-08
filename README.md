# Faketerest

Faketerest is a Pinterest-inspired Laravel application for saving and managing image pins. Users can register or log in (email/password or via Google/Facebook OAuth), upload image-based pins, browse pins in a responsive masonry grid, search by title/description, and manage their own profile and content. An admin panel lets moderators and admins manage users, pins, and review activity logs.

## Features

### Users

- Email/password authentication with Laravel Breeze
- OAuth login via **Google** (Laravel Socialite). Facebook backend scaffolding exists but is not yet exposed in the UI.
- Email verification
- Editable profile (name, email, password, avatar)
- Public user profile pages by username (`/{username}`)
- Account/data deletion flow (deletes pins + account)

### Pins

- Create pins with a title, optional description, and image upload
- Live image preview before saving
- View, edit, replace, and delete your own pins
- Responsive masonry-style home feed with pagination
- Fuzzy search across pin titles and descriptions (supports spaces/underscores between characters)
- Snowflake-style IDs for users and pins (`godruoyi/php-snowflake`)
- Images stored on **Cloudinary** (auto quality/format/width optimization); legacy local disk support retained for edits

### Admin Panel (`/admin`)

- Role-based access (`admin` and `moderator` roles)
- Dashboard with overview stats
- Manage users (view, change role, delete)
- Manage pins (view, delete)
- Activity logs (tracks model changes with old/new values, IP, and user agent)

### UI

- Responsive React UI powered by Inertia.js and Tailwind CSS
- Animated mobile sidebars (main app + admin)
- Toast notifications (`sonner`)
- Icons from `lucide-react`

## Tech Stack

- **Backend:** Laravel 12, PHP 8.2+
- **Frontend:** React 18, Inertia.js, Tailwind CSS, Vite
- **Auth:** Laravel Breeze, Laravel Socialite (Google; Facebook backend ready but UI not yet enabled)
- **Storage:** Cloudinary (`cloudinary-labs/cloudinary-laravel`)
- **IDs:** Snowflake IDs (`godruoyi/php-snowflake`)
- **Routing helpers:** Tightenco/Ziggy
- **Database:** PostgreSQL by default (also supports SQLite, MySQL)
- **Containerization:** Docker + Nginx (local), Render-ready Dockerfile

## Requirements

- PHP 8.2 or newer
- Composer
- Node.js (v18+) and pnpm (or npm)
- PostgreSQL (or another Laravel-supported database)
- A Cloudinary account (for image uploads)
- Google OAuth credentials (optional, for Google login)

## Installation

Clone the project and install backend and frontend dependencies:

```bash
composer install
pnpm install
```

Create your environment file and application key:

```bash
cp .env.example .env
php artisan key:generate
```

### Database

The default `.env.example` is configured for PostgreSQL. Update the `DB_*` values in `.env` to match your setup, then run the migrations:

```bash
php artisan migrate
```

To use SQLite instead, set `DB_CONNECTION=sqlite`, `DB_DATABASE=database/database.sqlite`, create the file, and run `php artisan migrate`.

### Environment Variables

In addition to the standard Laravel keys, add the following to your `.env` as needed:

```dotenv
# Cloudinary (required for image uploads)
CLOUDINARY_URL=cloudinary://<key>:<secret>@<cloud_name>

# Google OAuth (optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=

# Facebook OAuth (backend ready, UI not yet enabled)
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
FACEBOOK_REDIRECT_URI=
```

## Promoting an Admin

There is no auto-admin seeder. After registering a user, promote them with the included Artisan command:

```bash
php artisan admin:make <email>
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

You can also use the Composer development script to run the server, queue listener, and Vite together:

```bash
composer run dev
```

To tail application logs:

```bash
composer run dev:logs
```

## Docker

A `docker-compose.yml` is included for local containerized development (PHP-FPM + Nginx + PostgreSQL):

```bash
docker compose up -d
```

The app will be served by Nginx on `http://localhost:8000`. A `Dockerfile.render` is also provided for deployment to Render.

## OAuth Setup

### Google

1. Create OAuth credentials at the [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2. Add the authorized redirect URI: `http://localhost:8000/auth/google/callback` (adjust for production).
3. Set `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `GOOGLE_REDIRECT_URI` in `.env`.

### Facebook (not yet enabled in UI)

The backend controller and config scaffolding for Facebook login are in place, but the "Continue with Facebook" button is currently commented out in the auth modal. To enable it, uncomment the Facebook link in `resources/js/Components/AuthModal.jsx` and provide valid credentials:

1. Create an app at the [Facebook Developers](https://developers.facebook.com/) portal.
2. Add the redirect URI: `http://localhost:8000/auth/facebook/callback` (adjust for production).
3. Set `FACEBOOK_CLIENT_ID`, `FACEBOOK_CLIENT_SECRET`, and `FACEBOOK_REDIRECT_URI` in `.env`.

## Image Uploads

Pins require an image file up to 10 MB. New uploads are sent to **Cloudinary** under the `pins` folder with automatic quality, format, and width optimization. The pin stores both the secure URL (`image_path`) and Cloudinary `public_id`; deleting a pin removes the asset from Cloudinary.

## Useful Commands

```bash
php artisan migrate            # Run migrations
php artisan admin:make <email> # Promote a user to admin
php artisan test               # Run the test suite
php artisan storage:link       # Create the public/storage symlink (local disk only)
pnpm dev                       # Start Vite dev server
pnpm build                     # Build frontend assets for production
composer run dev               # Serve + queue + Vite together
composer run dev:logs          # Tail application logs
```

## Project Structure

### Backend

- `app/Http/Controllers/PinController.php` — pin CRUD, home feed, and fuzzy search.
- `app/Http/Controllers/UserProfileController.php` — public user profiles by username.
- `app/Http/Controllers/ProfileController.php` — authenticated user profile management.
- `app/Http/Controllers/PageController.php` — privacy policy and data deletion pages.
- `app/Http/Controllers/Auth/SocialiteController.php` — Google/Facebook OAuth flow.
- `app/Http/Controllers/Admin/` — admin dashboard, user, pin, and activity log controllers.
- `app/Http/Middleware/AdminMiddleware.php` — gates admin routes to `admin`/`moderator` roles.
- `app/Models/Pin.php` — pin model with Cloudinary cleanup on delete.
- `app/Models/User.php` — user model with roles and Snowflake IDs.
- `app/Models/ActivityLog.php` — activity logging helper.
- `app/Console/Commands/MakeAdmin.php` — `admin:make` command.
- `routes/web.php` — main pages, auth-protected routes, pin routes, and OAuth redirects.
- `routes/admin.php` — admin panel routes.
- `routes/auth.php` — Breeze authentication routes.

### Frontend

- `resources/js/Pages/Home.jsx` — authenticated pin grid feed.
- `resources/js/Pages/Pins/Create.jsx` — pin upload form with live preview.
- `resources/js/Pages/Pins/Show.jsx` — pin detail, edit, and delete view.
- `resources/js/Pages/Profile/` — profile editing.
- `resources/js/Pages/User/Show.jsx` — public user profile.
- `resources/js/Pages/Admin/` — admin dashboard, users, pins, and activity logs.
- `resources/js/Layouts/AuthenticatedLayout.jsx` — main app layout with mobile sidebar.
- `resources/js/Layouts/AdminLayout.jsx` — admin layout with mobile sidebar.

## Testing

Run the Laravel test suite with:

```bash
php artisan test
```

## License

This project is built on Laravel and is open-sourced under the MIT license.

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Anterno.id</title>

    <!-- Fonts -->
    <link href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

    <!-- Styles -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />

    <style>
        body {
            font-family: 'Nunito', sans-serif;
        }
    </style>
</head>

<body class="font-sans bg-gray-200">
    <!-- Navigation Bar -->
    <nav class="bg-green-400 shadow-lg">
        <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <div class="text-white font-bold text-xl">
                    <a href="/">Anterno.id</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Banner Section -->
    <section class="bg-cover min-h-screen bg-center py-16"
        style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../bgcover1.jpg')"
        data-aos="fade-up" data-aos-duration="1000">
        <div class="container mx-auto flex items-center justify-center flex-col">
            <img class="w-64 rounded-full mb-8" src="../logo.jpg" alt="Anterno.id Logo">
            <h1 class="text-4xl font-bold text-center mb-2 text-white">Anterno.id</h1>
            <p class="text-xl text-center mb-8 text-white">Track your package with our easy-to-use tracker.</p>
        </div>
    </section>

    <!-- Tracker Form Section -->
    <section class="py-16" data-aos="fade-up" data-aos-duration="1000" id="track">
        <div class="container mx-auto">
            <div class="bg-white w-full md:w-9/12 overflow-hidden shadow-2xl md:rounded-lg sm:rounded-lg">
                <div class="p-6">
                    <h2 class="text-lg md:text-2xl font-bold mb-8">Enter Your Mobile Phone Number</h2>
                    <form>
                        <div class="mb-4">
                            <input type="text" placeholder="08xxxxxxxxxx"
                                class="block  mt-2 w-full md:w-6/12 placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                        </div>
                        <div class="flex">
                            <button
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit">
                                Track
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
    <script>
        AOS.init();
    </script>
</body>

</html>

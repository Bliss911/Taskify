<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Taskify</title>
        <link rel="stylesheet" href="/css/fonts.css">
        <link rel="stylesheet" href="/css/loader.css">
        <link rel="stylesheet" href="/css/notfound.css">
        <link rel="stylesheet" href="/css/App.css">


    </head>
    <body class="antialiased">
      <div id="app"></div>

        <script src="{{ asset('js/app.js') }}"></script>

    </body>
</html>

<!DOCTYPE html>
<html lang="en">
<head>

    <!-- Meta -->
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>{{ $title }}</title>

    <!-- Common stylesheets and extra stylesheets-->
    @include('common.stylesheets')
    @yield('stylesheets')
    
    <!-- Icon -->
    <link rel="icon" type="image/x-icon" href="{{ $favicon }}">
    @include('common.scripts')
</head>

<body>
    @yield('components')
    @yield('navigation')

    @yield('content')

    
    @yield('scripts')
</body>
</html>
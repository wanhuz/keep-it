    body {  
        background-image: url("{{asset('storage/' . $settings->firstWhere('key', '=', 'bg-img')->value)}}");
        background-size: cover; 
        background-attachment: fixed;
        background-color: rgb({{$settings->firstWhere('key', '=', 'bg-color')->value}});
    }

    .card {
        background: rgba(255,255,255, {{$settings->firstWhere('key', '=', 'card-tpc')->value}});
    }

    #header {
        background: rgba({{$settings->firstWhere('key', '=', 'head-color')->value}}, {{$settings->firstWhere('key', '=', 'header-tpc')->value}});
    }
    #sidebar {
        background: rgba({{$settings->firstWhere('key', '=', 'side-color')->value}}, {{$settings->firstWhere('key', '=', 'sidebar-tpc')->value}});
    }
    .card {
        width: var(--{{$settings->firstWhere('key', '=', 'card-size')->value}}-width);
        min-height: var(--{{$settings->firstWhere('key', '=', 'card-size')->value}}-height);
    }

@if ($settings->firstWhere('key', '=', 'card-size-style')->value == "fixed")
    .card-text {
        height: var(--{{$settings->firstWhere('key', '=', 'card-size')->value}}-height);
        overflow-y: hidden;
    }
@endif

    .card {
        font-size: {{$settings->firstWhere('key', '=', 'card-font-size')->value}};
    }
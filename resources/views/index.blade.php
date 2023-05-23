<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{$settings->firstWhere('key', '=', 'app-name')->value}}</title>
    <link rel="stylesheet" href="{{asset('css/bootstrap.min.css')}}">
    <link rel="stylesheet" href="{{asset('css/color.css')}}">
    <link rel="stylesheet" href="{{asset('css/style.css')}}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
    <link rel="icon" type="image/x-icon" href="{{asset('storage/' . $settings->firstWhere('key', '=', 'favicon-img')->value)}}">

    <!-- User defined style -->
    <style>
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

    </style>
</head>
<body>

    <!-- User preference editor -->
    <x-preference></x-preference>

    <!-- Tag editor -->
    <x-tag-manager></x-tag-manager>

    <!-- Fullscreen text editor -->
    <x-editor></x-editor>
    
    <!-- Navbar -->
    <nav id="header" class="navbar navbar-expand-lg text-light sticky-top">
        <div class="container-fluid">
            <button id="menu-btn" class="btn ms-3 me-3 nav-btn" type="button"><i class="bi bi-list"></i></button>

            <a class="navbar-brand me-5 text-white" href="#">{{$settings->firstWhere('key', '=', 'app-name')->value}}</a>
   
            <div class="collapse navbar-collapse">
                <form id="searchbar" class="d-flex ms-5" role="search" action="/search">
                    @csrf
                    <input id="search-input" class="form-control" type="search" placeholder="Search" aria-label="Search">
                </form>
            </div>    

            <div class="me-4">
                <button type="button" class="btn nav-btn" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{auth()->user()->name;}}</button>
                <ul class="dropdown-menu dropdown-menu-end end-0 mt-2 me-4">
                    <li><button class="dropdown-item" type="button" id="userprefBtn"><i class="bi bi-gear me-3"></i>Settings</button></li>
                    <li><button class="dropdown-item" type="button" id="logoutBtn"><i class="bi bi-box-arrow-right me-3"></i>Logout</button></li>
                </ul>
                <form id="logout-form" action="{{ route('logout') }}" method="POST"> @csrf </form>
            </div>

        </div>
    </nav>


    <!-- Contents -->

    <div class="container-fluid" >
        <div class="row">    
            <aside class="col align-item-start sidebar" id="sidebar">
                <div id="sidebarBtn" class="vh-100 ">
                    <form id="sidebar-btn-form" action="/load-note-by-tag" method="get">
                        @csrf
                        <button type="button" class="btn tag-btn ms-1 mt-1 text-start w-100" id="all-note-sidebar-btn"><i class="bi bi-stickies"></i><span class="ps-4">Notes</span></button>
                        <hr class="ms-1 my-1">
                        <div id="tagList" class="d-flex flex-column">
                            @foreach ($tags as $tag)
                                <x-tag-sidebtn>
                                    <x-slot:value>{{$tag->name}}</x-slot>
                                    {{$tag->name}}
                                </x-tag-sidebtn>
                            @endforeach
                        </div>
                        <hr class="ms-1 my-1">
                        <button type="button" id="manageTagBtn" class="btn tag-btn ms-1 text-start mb-auto w-100"><i class="bi bi-plus-circle"></i><span class="ps-4">Manage tag</span></button>
                    </form>
                </div>
            </aside>

            
            <main class="col mt-4 main-container">
                    <div id="editor" class="row ms-auto mx-auto mb-3">
                        <!-- Iframe will prevent page from breaking when closing the editor -->
                        <iframe name="dummyframe" id="dummyframe" style="display: none;"></iframe> 

                        <div class="col-sm-3 mx-auto"> 
                            <div id="simpleEditor" class="input-group mb-3 "> 
                                <input type="text" class="form-control shadow-none" placeholder="Take a note.." >
                                <button class="btn btn-light btn-outline-secondary" id="cancel-btn"><i class="bi bi-list-task"></i></button>
                                <button class="btn btn-light btn-outline-secondary"><i class="bi bi-image"></i></button>
                            </div>

                            <div class="d-none" id="fullEditor" >
                                <div class="card">
                                    <form target="dummyframe" id="postform">
                                        @csrf
                                        <div id="fullEditorCard" class="card-body" >
                                                <input type="text" name="title" id="titleTextArea" class="form-control border border-0 shadow-none" placeholder="Title">
                                                <textarea name="body" id="bodyTextArea" class="form-control border border-0 shadow-none" placeholder="Take a note.." id="fullEditorTextArea" cols="30" rows="3"></textarea>
                                        </div>
                                        <div class="card-footer d-flex flex-row">
                                            <button class="btn btn-light btn-outline-secondary border border-0"><i class="bi bi-list-task"></i></button>
                                            <button class="btn btn-light btn-outline-secondary border border-0"><i class="bi bi-image"></i></button>
                                            
                                            <button class="btn btn-light border border-0 ms-auto" id="cancelBtn"><i class="bi bi-x"></i></button>
                                            <button type="submit" class="btn btn-light border border-0" id="submitBtn"><i class="bi bi-check-lg"></i></button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="card-container" class="row flex-wrap ms-5">
                        @foreach ($notes as $note)
                            <x-card>
                                <x-slot:id>{{$note->id}}</x-slot>
                                <x-slot:revision_count>{{$note->revision_count}}</x-slot>
                                <x-slot:title>{{$note->title}}</x-slot>
                                <x-slot:body>{{$note->body}}</x-slot>
                            </x-card>
                        @endforeach
                    </div>
            </main>

        </div>
    </div>

    

    <script src="{{asset('js/jquery-3.6.1.min.js')}}"></script>
    <script src="{{asset('js/popper.min.js')}}"></script>
    <script src="{{asset('js/bootstrap.bundle.min.js')}}"></script>
    <script src="{{asset('js/masonry.pkgd.min.js')}}"></script>
    <script src="{{asset('js/index/tag.js')}}"></script>
    <script src="{{asset('js/index/card.js')}}"></script>
    <script src="{{asset('js/index/sidebar.js')}}"></script>
    <script src="{{asset('js/index/editor.js')}}"></script>
    <script src="{{asset('js/index/misc.js')}}"></script>
    <script src="{{asset('js/index/search.js')}}"></script>
    <script src="{{asset('js/index/userpref.js')}}"></script>
    <script src="{{asset('js/index/init.js')}}"></script>
</body>
</html>
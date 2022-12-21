<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Keep-it</title>
    <link rel="stylesheet" href="{{asset('css/bootstrap.min.css')}}">
    <link rel="stylesheet" href="{{asset('css/color.css')}}">
    <link rel="stylesheet" href="{{asset('css/style.css')}}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
</head>
<body>
    <!-- Hidden form to get note by tag -->
    <form id="formGetNoteByTag">
        @csrf
    </form>

    <!-- User preference editor -->
    <x-preference></x-preference>

    <!-- Tag editor -->
    <x-tag-add></x-tag-add>

    <!-- Fullscreen text editor -->
    <x-editor></x-editor>
    
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg bg-warning text-light sticky-top w-100">
        <div class="container-fluid w-100">
            <button class="btn" type="button"  id="sidebar-btn"><span class="navbar-toggler-icon me-2"></span></button>
            <a class="navbar-brand me-5" href="#">Keep-it</a>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <form class="d-flex ms-5" role="search" id="searchbar" action="/search">
                    @csrf
                    <input id="search-input" class="form-control me-3" type="search" placeholder="Search" aria-label="Search">
                </form>
            </div>
            <div class="navbar-right">
                <button class="btn" type="button" id="sidebar-btn"><span class="bi bi-person-circle me-2"></span></button>
                <button class="btn" type="button" id="userprefBtn"><span class="bi bi-gear me-2"></span></button>
            </div>
        </div>
    </nav>


    <!-- Contents -->

  <div class="container-fluid" >
        <div class="row">    
            <div class="col-2 bg-light vh-100 overflow-hidden w-auto" id="sidebar">
                <div class="d-flex  flex-column gap-2 justify-between-content text-left mt-2" role="group" aria-label="Vertical button group" id="sidebar-menu" >
                    <div id="sidebarBtn" class="d-flex flex-column position-fixed vh-100 ">
                        <form id="sidebar-btn-form" action="/load-note-by-tag" method="get">
                            @csrf
                            <button type="button" class="btn btn-light ms-1 text-start" id="all-note-sidebar-btn"><i class="bi bi-stickies"></i><span class="ps-4">Notes</span></button>
                            <div id="tagList" class="d-flex flex-column">
                                @foreach ($tags as $tag)
                                    <x-tag-sidebtn>
                                        <x-slot:value>{{$tag->name}}</x-slot>
                                        {{$tag->name}}
                                    </x-tag-sidebtn>
                                @endforeach
                            </div>
                            <button type="button" id="tagAddBtn" class="btn btn-light ms-1 text-start"><i class="bi bi-plus-circle"></i><span class="ps-4">Add new tag</span></button>
                        </form>
                    </div>
                </div>
            </div>
            
            <div class="col mt-4">
                <div class="container mb-3" id="editor">
                    <div class="text-center ">
                        <div id="simpleEditor" class="input-group mb-3 "> 
                            <input type="text" class="form-control shadow-none" placeholder="Take a note.." aria-label="Note" aria-roledescription="basic-addon1" aria-expanded="false">
                            <button class="btn btn-light btn-outline-secondary" id="cancel-btn"><i class="bi bi-list-task"></i></button>
                            <button class="btn btn-light btn-outline-secondary"><i class="bi bi-image"></i></button>
                        </div>
                    </div>

                    <!-- Iframe will prevent page from breaking when closing the editor -->
                    <iframe name="dummyframe" id="dummyframe" style="display: none;"></iframe> 
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

                <div class="text-center">
                    <div class="d-flex flex-row flex-wrap" id="card-container">
                        @foreach ($notes as $note)
                            <x-card>
                                <x-slot:id>{{$note->id}}</x-slot>
                                <x-slot:revision_count>{{$note->revision_count}}</x-slot>
                                <x-slot:title>{{$note->title}}</x-slot>
                                <x-slot:body>{{$note->body}}</x-slot>
                            </x-card>
                        @endforeach
                    
                    </div>
                </div>
            </div>

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
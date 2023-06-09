@extends('layouts.default')

<!-- Head -->
@section('stylesheets')
    <link rel="stylesheet" href="{{asset('css/home.css')}}">

    @parent
@endsection

<!-- Body -->
@section('navigation')
    @parent

    <x-navigation.sidebar :tags='$tags'>
    </x-navigation.sidebar>
@endsection

@section('components')
    <x-tag.manager></x-tag.manager>
    <x-card.editor></x-card.editor>
@endsection

<!-- Main -->
@section('content')
    <div class="container-fluid mt-5">
        <div class='row'>    
            <main class='col main-container'>
                    <div id='editor' class='row ms-auto mx-auto mb-3'>
                        <!-- Iframe will prevent page from breaking when closing the editor -->
                        <iframe name='dummyframe' id='dummyframe' style='display: none;'></iframe> 

                        <div class='col-sm-3 mx-auto'> 
                            <div id='simpleEditor' class='input-group mb-3'> 
                                <input type='text' class='form-control shadow-none' placeholder='Take a note..' >
                                <!-- <button class='btn btn-light btn-outline-secondary' id='cancel-btn'><i class='bi bi-list-task'></i></button>
                                <button class='btn btn-light btn-outline-secondary'><i class='bi bi-image'></i></button> -->
                            </div>

                            <div class='d-none' id='fullEditor' >
                                <div class='card'>
                                    <form target='dummyframe' id='postform'>
                                        @csrf
                                        <div id='fullEditorCard' class='card-body' >
                                                <input type='text' name='title' id='titleTextArea' class='form-control border border-0 shadow-none' placeholder='Title'>
                                                <textarea name='body' id='bodyTextArea' class='form-control border border-0 shadow-none' placeholder='Take a note..' id='fullEditorTextArea' cols='30' rows='3'></textarea>
                                        </div>
                                        <div class='card-footer d-flex flex-row'>
                                            <button class='btn btn-light btn-outline-secondary border border-0'><i class='bi bi-list-task'></i></button>
                                            <button class='btn btn-light btn-outline-secondary border border-0'><i class='bi bi-image'></i></button>
                                            
                                            <button class='btn btn-light border border-0 ms-auto' id='cancelBtn'><i class='bi bi-x'></i></button>
                                            <button class='btn btn-light border border-0' id='submitBtn'><i class='bi bi-check-lg'></i></button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id='card-container' class='row flex-wrap ms-5'>
                        @foreach ($notes as $note)
                            <x-card.note>
                                <x-slot:id>{{$note->id}}</x-slot>
                                <x-slot:revision_count>{{$note->revision_count}}</x-slot>
                                <x-slot:title>{{$note->title}}</x-slot>
                                <x-slot:body>{{$note->body}}</x-slot>
                            </x-card.note>
                        @endforeach
                    </div>
            </main>
        </div>
    </div>
@endsection

<!-- Javascripts -->
@section('scripts')
<script src="{{asset('js/home/tag.js')}}"></script>
<script src="{{asset('js/home/card.js')}}"></script>
<script src="{{asset('js/home/sidebar.js')}}"></script>
<script src="{{asset('js/home/editor.js')}}"></script>
<script src="{{asset('js/home/misc.js')}}"></script>
<script src="{{asset('js/home/search.js')}}"></script>
<script src="{{asset('js/home/userpref.js')}}"></script>
<script src="{{asset('js/home/init.js')}}"></script>
@endsection
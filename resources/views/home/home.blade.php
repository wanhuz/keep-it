@extends('layouts.default')

<!-- Head -->
@section('stylesheets')
    <link rel="stylesheet" href="{{asset('css/home.css')}}">
    <link rel="stylesheet" href="{{asset('css/editor.css')}}">
    <link rel="stylesheet" href="{{asset('css/card.css')}}">

    @parent
@endsection

<!-- Body -->
@section('navigation')
    @parent

    <x-navigation.sidebar>
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
                            </div>

                            <div class='d-none' id='fullEditor' >
                                <div class='card'>
                                    <form target='dummyframe' id='postform'>
                                        @csrf
                                        <div id='fullEditorCard' class='card-body' >
                                                <input type='text' name='title' id='titleTextArea' class='form-control border border-0 shadow-none' placeholder='Title'>
                                                <div id='fullEditorTextArea' class="element pt-4 form-control border border-0 shadow-none"></div>
                                        </div>
                                        <div class='card-footer d-flex flex-row'>
                                            <button id="bulletListBtn" class='btn btn-light btn-outline-secondary border border-0'><i class='bi bi-list-task'></i></button>
                                            <button id="orderedListBtn" class='btn btn-light btn-outline-secondary border border-0'><i class='bi bi-123'></i></button>
                                            
                                            <button class='btn btn-light border border-0 ms-auto' id='cancelBtn'><i class='bi bi-x'></i></button>
                                            <button class='btn btn-light border border-0' id='submitBtn'><i class='bi bi-check-lg'></i></button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id='card-container' class='row flex-wrap ms-5'>
                    </div>
            </main>
        </div>
    </div>
    
@endsection
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
    <x-editor.modal></x-editor>
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
                            <x-editor.placeholder></x-editor>

                            <div class='d-none' id='fullEditor' >
                                <x-editor.editor></x-editor>
                            </div>
                        </div>
                    </div>

                    <div id='card-container' class='row flex-wrap ms-5'></div>
            </main>
        </div>
    </div>
@endsection
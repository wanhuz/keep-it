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

    <x-navigation.sidebar></x-navigation.sidebar>
@endsection

@section('components')
    <x-tag.manager></x-tag.manager>
    <x-editor.edit></x-editor>
@endsection

<!-- Main -->
@section('content')
    <div class="container-fluid mt-5">
        <div class='row'>    
            <main class='col main-container'>

                <!-- Editor -->
                <div id='editor' class='row ms-auto mx-auto mb-3'>
                    <div class='col-sm-3 mx-auto'> 
                        <x-editor.placeholder></x-editor>

                        <div id='fullEditor' class='d-none'>
                            <x-editor.add></x-editor>
                        </div>
                    </div>
                </div>

                <!-- Card container -->
                <div id='card-container' class='row ms-5'></div>
            </main>
        </div>
    </div>
@endsection
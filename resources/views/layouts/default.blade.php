@extends('layouts.base', [  'title' => setting('app-name'),
                            'favicon' => asset('storage/' . setting('favicon-img')) ])

<!-- User custom stylesheets -->
@section('stylesheets')
    <style>
        @include('common.user-stylesheets')
    </style>

    <link rel="stylesheet" href="{{asset('css/navbar.css')}}">
@endsection

<!-- Navbar -->
@section('navigation')
    <x-navigation.navbar>
        <x-slot:title>{{ setting('app-name') }}</x-slot>
        <x-slot:username>{{ !empty(user('name')) ? user('name') : user('username'); }}</x-slot>
    </x-navigation.navbar>
@endsection

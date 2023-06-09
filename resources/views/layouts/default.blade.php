@extends('layouts.base', [  'title' => $settings->firstWhere('key', '=', 'app-name')->value,
                            'favicon' => asset('storage/' . $settings->firstWhere('key', '=', 'favicon-img')->value) ])

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
        <x-slot:title>{{ $settings->firstWhere('key', '=', 'app-name')->value }}</x-slot>
        <x-slot:username>{{ isset(auth()->user()->name) ? auth()->user()->name : auth()->user()->username; }}</x-slot>
    </x-navigation.navbar>
@endsection

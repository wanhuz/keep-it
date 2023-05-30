@extends('layouts.base', [  'title' => $settings->firstWhere('key', '=', 'app-name')->value,
                            'favicon' => asset('storage/' . $settings->firstWhere('key', '=', 'favicon-img')->value) ])

<!-- User custom stylesheets -->
@section('stylesheets')
    <style>
        @include('common.user-stylesheets')
    </style>
@endsection

<!-- Navbar -->
@section('navigation')
    <x-navigation.navbar>
        <x-slot:title>{{ $settings->firstWhere('key', '=', 'app-name')->value }}</x-slot>
        <x-slot:username>{{ auth()->user()->name; }}</x-slot>
    </x-navigation.navbar>
@endsection

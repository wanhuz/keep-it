@extends('layouts.settings')

@section('forms')

    <h2>Home</h2>
    <form action="/post-setting" method="POST">
        @csrf
        
        <x-preference.card>
            <x-slot:title>Home name</x-slot>
            <x-slot:desc>This name is shown in the header.</x-slot>
            <x-slot:form><input type="text" class="form-control" id="applicationNameInput" aria-label="applicationName" aria-describedby="app-name" name="app-name"></x-slot>
        </x-preference.card>

        <hr class="mt-5">

        <x-preference.card>
            <x-slot:title>Website icon</x-slot>
            <x-slot:desc>Change home favicon</x-slot>
            <x-slot:form><input class="ms-auto form-control mb-2" type="file" id="faviconInput" name="favicon-img" accept=".ico"></x-slot>
        </x-preference.card>

        <hr class="mt-5">
        
        <x-preference.card>
            <x-slot:title>Remove website image icon</x-slot>
            <x-slot:desc>Set website icon to default</x-slot>
            <x-slot:form><input class="ms-5 form-check-input float-end" type="checkbox" id="removeFaviconImgInput" name="remove-favicon-img"></x-slot>
        </x-preference.card>

        <div class="mt-5 my-5 float-end">
            <button type="submit" class="btn btn-primary px-4">Save</button>
        </div>
    </form>

@endsection
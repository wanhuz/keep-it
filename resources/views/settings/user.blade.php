@extends('layouts.settings.profile')

@section('forms')

    <h2>User</h2>
    <form action="/post-setting" method="POST">
        @csrf

        <x-preference.card>
            <x-slot:title>Navigation bar color</x-slot>
            <x-slot:desc>Change navigation bar color.</x-slot>
            <x-slot:form>
                <div class="float-end">
                    <x-form.color-picker>head-color</x-form.color-picker>  
                </div>                         
            </x-slot>
        </x-preference.card>

        <div class="mt-5 my-5 float-end">
            <button type="submit" class="btn btn-primary px-4">Save</button>
        </div>
    </form>

@endsection
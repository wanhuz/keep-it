@extends('layouts.settings.customization')

@section('forms')

    <h2>Theme</h2>
    <form action="/post-setting" method="POST">
        @csrf

        <x-preference.card>
            <x-slot:title>Navigation bar color</x-slot>
            <x-slot:desc>Change navigation bar color.</x-slot>
            <x-slot:form>
                <div class="float-end">
                    <x-form.color-picker>
                        <x-slot:name>head-color</x-slot>
                        <x-slot:value>{{ rgbToHex(setting('head-color')) }}</x-slot>
                    </x-form.color-picker>  
                </div>                         
            </x-slot>
        </x-preference.card>

        <div class="mt-5 my-5 float-end">
            <button type="submit" class="btn colored-btn px-4">Submit</button>
        </div>
    </form>

@endsection
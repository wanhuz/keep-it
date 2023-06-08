@extends('layouts.settings')

@section('forms')

    <h2>Theme</h2>
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

        <hr class="mt-5">

        <x-preference.card>
            <x-slot:title>Sidebar color</x-slot>
            <x-slot:desc>Change sidebar color.</x-slot>
            <x-slot:form>
                <div class="float-end">
                    <x-form.color-picker>side-color</x-form.color-picker>
                </div>  
            </x-slot>
        </x-preference.card>

        <hr class="mt-5">
        
        <x-preference.card>
            <x-slot:title>Background color</x-slot>
            <x-slot:desc>Change background color.</x-slot>
            <x-slot:form>
                <div class="float-end">
                    <x-form.color-picker>bg-color</x-form.color-picker>
                </div>
            </x-slot>
        </x-preference.card>

        <hr class="mt-5">

        <x-preference.card>
            <x-slot:title>Background image</x-slot>
            <x-slot:desc>Change background image. Will override background color.</x-slot>
            <x-slot:form>
                <input class="ms-auto form-control" type="file" id="backgroundImgInput" name="bg-img" accept="image/*">
            </x-slot>
        </x-preference.card>

        <hr class="mt-5">

        <x-preference.card>
            <x-slot:title>Remove background image</x-slot>
            <x-slot:desc>Set background image to none.</x-slot>
            <x-slot:form>
                <div class="float-end">
                    <input class="ms-5 form-check-input" type="checkbox" id="removeBackgroundImgInput" name="remove-bg-img">
                </div>
            </x-slot>
        </x-preference.card>

        <div class="mt-5 my-5 float-end">
            <button type="submit" class="btn btn-primary px-4">Save</button>
        </div>
    </form>

@endsection
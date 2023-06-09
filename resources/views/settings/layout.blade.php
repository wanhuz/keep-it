@extends('layouts.settings.customization')

@section('forms')

    <h2>Layout</h2>
    <form action="/post-setting" method="POST">
        @csrf

        <x-preference.card>
            <x-slot:title>Card size style</x-slot>
            <x-slot:desc>Change how text in card are displayed.</x-slot>
            <x-slot:form>
                <select class="form-select" aria-label="Default" id="cardStyleInput" name="card-size-style">
                    <option value="dynamic">Dynamic</option>
                    <option value="fixed">Fixed</option>
                </select>                              
            </x-slot>
        </x-preference.card>

        <hr class="mt-5">

        <x-preference.card>
            <x-slot:title>Card default size</x-slot>
            <x-slot:desc>Change box size of card</x-slot>
            <x-slot:form>
                <select class="form-select" aria-label="Default" id="cardSizeInput" name="card-size">
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Big</option>
                </select> 
            </x-slot>
        </x-preference.card>

        <hr class="mt-5">
        
        <x-preference.card>
            <x-slot:title>Card font size</x-slot>
            <x-slot:desc>Change font size in card</x-slot>
            <x-slot:form>
                <select class="form-select" aria-label="Default" id="cardFontSizeInput" name="card-font-size">
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select> 
            </x-slot>
        </x-preference.card>

        <div class="mt-5 my-5 float-end">
            <button type="submit" class="btn btn-primary px-4">Submit</button>
        </div>
    </form>

@endsection
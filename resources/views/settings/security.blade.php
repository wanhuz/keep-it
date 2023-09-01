@extends('layouts.settings.profile')

@section('forms')

    <h2>Security</h2>
    <form action="/post-setting" method="POST">
        @csrf

        <x-preference.card>
            <x-slot:title>Reset password</x-slot>
            <x-slot:desc>Request a password reset.</x-slot>
            <x-slot:form>
                <button type="submit" class="float-end btn colored-btn px-4">Reset password</button>
            </x-slot>
        </x-preference.card>

        <div class="mt-5 my-5 float-end">
            
        </div>
    </form>

@endsection
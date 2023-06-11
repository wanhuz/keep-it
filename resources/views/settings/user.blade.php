@extends('layouts.settings.profile')

@section('forms')

    <h2>User</h2>
    <form action="/settings/user" method="POST" enctype="multipart/form-data">
        @csrf

        <x-preference.card>
            <x-slot:title>Display name</x-slot>
            <x-slot:desc>Display name will be displayed on top navigation bar. <br> This does not change username. </x-slot>
            <x-slot:form>
                <input type="text" class="form-control" name="name">                       
            </x-slot>
        </x-preference.card>

        <hr class="mt-5">

        <x-preference.card>
            <x-slot:title>User avatar</x-slot>
            <x-slot:desc>Add or change user avatar.</x-slot>
            <x-slot:form>
                <div class="d-flex flex-column align-items-center"> 
                    <img src="{{ !empty(user('avatar')) ?  asset('storage/' . user('avatar')) : asset('avatar-default.png')  }}" alt="" class="img-thumbnail border-0 rounded-circle" width="150" height="150">
                    <input class="mt-3 ms-auto form-control form-control-sm mb-2" type="file" name="avatarImg" accept=".jpg, .png">
                </div>
            </x-slot>
        </x-preference.card>

        <div class="mt-5 my-5 float-end">
            <button type="submit" class="btn btn-primary px-4">Submit</button>
        </div>
    </form>

@endsection
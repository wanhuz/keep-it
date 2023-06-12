@extends('layouts.default')

@section('stylesheets')
    <link rel="stylesheet" href="{{asset('css/settings.css')}}">

    @parent
@endsection


@section('content')
    <div class="container mt-5">
        <div class="col-10 mx-auto">

            <div class="row mb-4">
                <div class="d-flex flex-row">
                    <div class="list-group list-group-horizontal gap-2 list-group-flush mx-auto text-nowrap">
                        <a class="list-group-item list-group-item-action border-0 rounded-0" href="/settings/user" role="button"><i class="bi bi-people"></i><span class="ms-3">Profile</span></a>
                        <a class="list-group-item list-group-item-action border-0 rounded-0" href="/settings/home" role="button"><i class="bi bi-sliders"></i><span class="ms-3">Customization</span></a>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-2 me-4">
                    <div class="d-flex flex-column">
                        <div>
                            <p class="fs-5 mb-3">Categories</p>
                            <div class="list-group gap-2 list-group-flush">
                                @yield('categories')
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col bg-white">
                    <div class="m-5">
                        @yield('forms')
                    </div>
                </div>

            </div>

        </div>
    </div>
@endsection
@extends('layouts.default')

@section('stylesheets')
    <link rel="stylesheet" href="{{asset('css/navbar.css')}}">

    @parent
@endsection


@section('content')
    <!-- <div class="d-flex flex-column min-vh-100 justify-content-center align-items-center"> -->
        <div class="container mt-5">
            <div class="col-10 mx-auto">

                <div class="row mb-4">
                    <div class="d-flex flex-row">
                        <div class="list-group list-group-horizontal gap-2 list-group-flush mx-auto text-nowrap">
                            <a class="list-group-item list-group-item-action" href="#" role="button">Customization</a>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-2 me-4">
                        <div class="d-flex flex-column">
                            <div>
                                <h5 class="mb-3">Categories</h5>
                                <div class="list-group gap-2 list-group-flush">
                                    <a class="list-group-item list-group-item-action" href="/settings/home" role="button">Home</a>
                                    <a class="list-group-item list-group-item-action" href="/settings/layout" role="button">Layout</a>
                                    <a class="list-group-item list-group-item-action" href="/settings/theme" role="button">Theme</a>
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
    <!-- </div> -->

@endsection
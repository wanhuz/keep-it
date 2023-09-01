@extends('layouts.base', [  'title' => 'Keep-it',
                            'favicon' => '' ])

<!-- Default stylesheets -->
@section('stylesheets')
<style>body {background-color: #eee;}</style>
@endsection

@section('content')
    <div class="container vh-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-5 col-xl-4">
                <div class="card text-black" style="border-radius: 5px;">  

                    <div class="d-flex flex-column">
                        <div class="card-body mx-md-4 mt-4 mb-4">
                            @yield('auth')
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
@endsection

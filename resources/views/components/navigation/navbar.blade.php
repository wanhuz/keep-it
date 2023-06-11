<nav id="header" class="navbar navbar-expand-lg text-light sticky-top">
    <div class="container-fluid">
        <button id="menu-btn" class="btn ms-3 me-3 nav-btn" type="button"><i class="bi bi-list"></i></button>

        <a class="navbar-brand me-5 text-white" href="/">{{ $title }}</a>

        <div class="collapse navbar-collapse">
            <form id="searchbar" class="mx-auto" role="search" action="/search">
                @csrf
                <input id="search-input" class="form-control" type="search" placeholder="Search" aria-label="Search">
            </form>
        </div>    

        <div class="me-4">
            <button type="button" class="btn nav-btn" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="me-2">{{ $username }}</span> 
                <x-user.avatar>
                    <x-slot:size>30</x-slot>
                </x-user.avatar>
            </button>
            
            <form id="logout-form" action="{{ route('logout') }}" method="POST"> 
                @csrf 
                <x-navigation.dropdown></x-navigation.dropdown>
            </form>
        </div>

    </div>
</nav>